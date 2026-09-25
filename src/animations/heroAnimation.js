import { configureGsap, gsap } from './gsapConfig.js';

export function createHeroAnimation({ scene, isMobile, reducedMotion = false }) {
  configureGsap();
  if (reducedMotion) return () => {};

  const distance = isMobile ? 0.7 : 1.25;
  const cameraDepth = isMobile ? 0.8 : 1.35;
  const context = gsap.context(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#top',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.8,
        invalidateOnRefresh: true,
      },
    });

    timeline
      .to(scene.spacecraft.position, { z: 2.2 * distance, x: -0.25 * distance, ease: 'none' }, 0)
      .to(scene.spacecraft.rotation, { y: '+=0.34', z: '-=0.12', ease: 'none' }, 0)
      .to(scene.camera.position, { z: 6.5 - cameraDepth, x: 0.22 * distance, ease: 'none' }, 0)
      .to(scene.earth.position, { x: -5.4 * distance, y: -2.4 * distance, ease: 'none' }, 0)
      .to(scene.stars.scale, { x: isMobile ? 1.06 : 1.14, y: isMobile ? 1.06 : 1.14, z: isMobile ? 1.06 : 1.14, ease: 'none' }, 0)
      .to(scene.stars.rotation, { y: 0.08, ease: 'none' }, 0);
  });

  return () => {
    context.revert();
  };
}
