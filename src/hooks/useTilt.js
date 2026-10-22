import { useEffect, useRef } from 'react';
import usePrefersReducedMotion from './usePrefersReducedMotion.js';

export default function useTilt({ strength = 6, reducedMotion = false } = {}) {
  const ref = useRef(null);
  const systemReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reducedMotion || systemReducedMotion || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;

    const reset = () => {
      element.style.setProperty('--tilt-x', '0deg');
      element.style.setProperty('--tilt-y', '0deg');
      element.style.setProperty('--tilt-lift', '0px');
    };

    const move = (event) => {
      const bounds = element.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      element.style.setProperty('--tilt-x', `${y * -strength}deg`);
      element.style.setProperty('--tilt-y', `${x * strength}deg`);
      element.style.setProperty('--tilt-lift', '-4px');
    };

    element.addEventListener('pointermove', move);
    element.addEventListener('pointerleave', reset);
    return () => {
      element.removeEventListener('pointermove', move);
      element.removeEventListener('pointerleave', reset);
    };
  }, [reducedMotion, strength, systemReducedMotion]);

  return ref;
}
