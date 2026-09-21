import { useEffect } from 'react';
import Lenis from 'lenis';
import { configureGsap, gsap, ScrollTrigger } from '../animations/gsapConfig.js';

export default function useSmoothScroll() {
  useEffect(() => {
    configureGsap();

    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.15,
      smoothWheel: true,
      syncTouch: false,
    });

    const onTick = (time) => {
      lenis.raf(time * 1000);
    };

    const onScroll = () => ScrollTrigger.update();

    gsap.ticker.add(onTick);
    lenis.on('scroll', onScroll);
    gsap.ticker.lagSmoothing(1000, 16);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.off('scroll', onScroll);
      lenis.destroy();
    };
  }, []);
}
