import { useEffect, useRef } from 'react';
import { configureGsap, ScrollTrigger } from '../animations/gsapConfig.js';

export default function useScrollProgress() {
  const progress = useRef(0);

  useEffect(() => {
    configureGsap();

    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        progress.current = self.progress;
      },
    });

    return () => trigger.kill();
  }, []);

  return progress;
}
