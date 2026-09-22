import { configureGsap, gsap, ScrollTrigger } from './gsapConfig.js';

export function createMarsAnimation({ scene, isMobile, reducedMotion = false }) {
  configureGsap();
  if (reducedMotion) return () => {};

  const context = gsap.context(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#mars',
        start: 'top 78%',
        end: 'bottom 20%',
        scrub: 1.8,
        invalidateOnRefresh: true,
      },
    });

    timeline
      .to(scene.mars.position, { x: isMobile ? 0.5 : 0.95, y: isMobile ? 0.1 : 0.35, z: isMobile ? -2.4 : -1.9, ease: 'none' }, 0)
      .to(scene.mars.scale, { x: isMobile ? 1.8 : 2.25, y: isMobile ? 1.8 : 2.25, z: isMobile ? 1.8 : 2.25, ease: 'none' }, 0)
      .to(scene.spacecraft.position, { x: isMobile ? 0.8 : 1.4, y: -0.25, z: -1.2, ease: 'none' }, 0)
      .to(scene.camera.position, { x: isMobile ? 0.35 : 0.8, y: 0.1, z: isMobile ? 7.8 : 6.8, ease: 'none' }, 0)
      .to(scene.marsGlow, { opacity: isMobile ? 0.52 : 0.72, ease: 'none' }, 0)
      .to('.mars-reveal', { opacity: 1, y: 0, ease: 'power1.out' }, 0.3);
  });

  return () => {
    context.revert();
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars.trigger === '#mars') trigger.kill();
    });
  };
}
