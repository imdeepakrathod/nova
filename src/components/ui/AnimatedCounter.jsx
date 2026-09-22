import { useEffect, useState } from 'react';

function formatValue(value, decimals, padLength) {
  if (decimals > 0) return value.toFixed(decimals);
  return Math.round(value).toLocaleString('en-US', {
    minimumIntegerDigits: padLength,
    useGrouping: false,
  });
}

function AnimatedCounter({ value, suffix = '', decimals = 0, padLength = 1, duration = 1400 }) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const target = Number(value);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setHasStarted(true);
    }, { threshold: 0.5 });

    const element = document.querySelector(`[data-counter="${value}-${suffix}"]`);
    if (element) observer.observe(element);

    if (hasStarted) {
      if (reducedMotion) {
        setDisplayValue(target);
        return () => observer.disconnect();
      }

      let frameId;
      const start = performance.now();
      const animate = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - (1 - progress) ** 3;
        setDisplayValue(target * eased);
        if (progress < 1) frameId = requestAnimationFrame(animate);
      };
      frameId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(frameId);
    }

    return () => observer.disconnect();
  }, [duration, hasStarted, suffix, value]);

  return (
    <span data-counter={`${value}-${suffix}`}>
      {formatValue(displayValue, decimals, padLength)}{suffix}
    </span>
  );
}

export default AnimatedCounter;
