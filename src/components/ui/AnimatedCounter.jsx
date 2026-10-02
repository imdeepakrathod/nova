import { useEffect, useRef } from 'react';

function formatValue(value, decimals, padLength) {
  if (decimals > 0) return value.toFixed(decimals);
  return Math.round(value).toLocaleString('en-US', {
    minimumIntegerDigits: padLength,
    useGrouping: false,
  });
}

function AnimatedCounter({ value, suffix = '', decimals = 0, padLength = 1, duration = 1400 }) {
  const valueRef = useRef(null);

  useEffect(() => {
    const target = Number(value);
    const element = valueRef.current;
    if (!element || !Number.isFinite(target)) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frameId;
    let hasStarted = false;

    const update = (currentValue) => {
      element.textContent = `${formatValue(currentValue, decimals, padLength)}${suffix}`;
    };

    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      update(target * eased);
      if (progress < 1) frameId = requestAnimationFrame(animate);
    };

    const start = () => {
      if (hasStarted) return;
      hasStarted = true;
      if (reducedMotion) {
        update(target);
        return;
      }
      startTime = performance.now();
      frameId = requestAnimationFrame(animate);
    };

    const checkVisibility = () => {
      const bounds = element.getBoundingClientRect();
      if (bounds.top < window.innerHeight * 0.85 && bounds.bottom > 0) start();
    };

    let startTime = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
    }, { threshold: 0.5 });
    const onScroll = () => checkVisibility();
    observer.observe(element);
    checkVisibility();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [decimals, duration, padLength, suffix, value]);

  return (
    <span ref={valueRef}>{formatValue(0, decimals, padLength)}{suffix}</span>
  );
}

export default AnimatedCounter;
