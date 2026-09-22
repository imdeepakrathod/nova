import { configureGsap, gsap, ScrollTrigger } from './gsapConfig.js';

export function createSpacecraftAnimation({ scene, isMobile, reducedMotion = false }) {
  configureGsap();
  if (reducedMotion) return () => {};

  const context = gsap.context(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#spacecraft',
        start: 'top 78%',
        end: 'bottom 28%',
        scrub: 1.8,
        invalidateOnRefresh: true,
      },
    });

    timeline
      .to(scene.stars.scale, { x: isMobile ? 1.16 : 1.28, y: isMobile ? 1.16 : 1.28, z: isMobile ? 1.16 : 1.28, ease: 'none' }, 0)
      .to(scene.starIntensity, { value: isMobile ? 1.02 : 1.18, ease: 'none' }, 0)
      .to(scene.spacecraft.position, { x: isMobile ? -0.25 : -0.7, y: 0.35, z: isMobile ? 0.4 : 1.1, ease: 'none' }, 0)
      .to(scene.camera.position, { x: isMobile ? -0.15 : -0.35, y: 0.1, z: isMobile ? 7 : 6.1, ease: 'none' }, 0)
      .to('.deep-space-ui', { opacity: 1, y: 0, stagger: 0.1, ease: 'power1.out' }, 0.18);
  });

  return () => {
    context.revert();
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars.trigger === '#spacecraft') trigger.kill();
    });
  };
}
