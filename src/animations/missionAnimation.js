import { configureGsap, gsap, ScrollTrigger } from './gsapConfig.js';

export function createMissionAnimation({ scene, isMobile, reducedMotion = false }) {
  configureGsap();
  if (reducedMotion) return () => {};

  const context = gsap.context(() => {
    const values = gsap.utils.toArray('.mission-value');
    const reveals = gsap.utils.toArray('.mission-reveal');
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#mission',
        start: 'top 72%',
        end: 'bottom 38%',
        scrub: 1.5,
        invalidateOnRefresh: true,
      },
    });

    timeline
      .to(scene.camera.position, { x: isMobile ? 0.25 : 0.55, y: 0.25, z: isMobile ? 7.7 : 6.9, ease: 'none' }, 0)
      .to(scene.spacecraft.position, { x: isMobile ? 0.35 : 0.8, y: 0.9, z: -0.4, ease: 'none' }, 0)
      .to(scene.spacecraft.rotation, { x: '+=0.18', y: '+=0.5', ease: 'none' }, 0)
      .fromTo(reveals, { opacity: 0.2, y: 18 }, { opacity: 1, y: 0, stagger: 0.18, ease: 'power1.out' }, 0.12)
      .fromTo(values, { opacity: 0.25, letterSpacing: '0.28em' }, { opacity: 1, letterSpacing: '0.08em', stagger: 0.18, ease: 'power1.out' }, 0.2);
  });

  return () => {
    context.revert();
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars.trigger === '#mission') trigger.kill();
    });
  };
}
