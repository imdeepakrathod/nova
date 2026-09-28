import { configureGsap, gsap } from './gsapConfig.js';

export function createJourneyAnimation({ scene, isMobile, reducedMotion = false }) {
  configureGsap();
  if (reducedMotion) return () => {};

  const context = gsap.context(() => {
    const missionReveals = gsap.utils.toArray('.mission-reveal');
    const missionValues = gsap.utils.toArray('.mission-value');
    const mobile = isMobile;
    const timeline = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: '#top',
        endTrigger: '#mars',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.6,
        invalidateOnRefresh: true,
      },
    });

    timeline
      // EARTH -> LAUNCH
      .addLabel('launch')
      .to(scene.spacecraft.position, { x: mobile ? 0.55 : 0.28, y: 0.05, z: mobile ? 0.7 : 1.3, duration: 1 }, 'launch')
      .to(scene.camera.position, { x: mobile ? 0.12 : 0.22, z: mobile ? 7.7 : 6.25, duration: 1 }, 'launch')
      .to(scene.earth.position, { x: mobile ? -3.6 : -5.2, y: mobile ? -2.25 : -2.4, duration: 1 }, 'launch')
      .to(scene.stars.scale, { x: mobile ? 1.08 : 1.14, y: mobile ? 1.08 : 1.14, z: mobile ? 1.08 : 1.14, duration: 1 }, 'launch')
      .to(scene.stars.rotation, { y: 0.08, duration: 1 }, 'launch')

      // LAUNCH -> MISSION DATA
      .addLabel('missionData', 'launch+=0.15')
      .fromTo(missionReveals, { opacity: 0.2, y: 18 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.55, ease: 'power1.out' }, 'missionData')
      .fromTo(missionValues, { opacity: 0.25, letterSpacing: '0.28em' }, { opacity: 1, letterSpacing: '0.08em', stagger: 0.12, duration: 0.5, ease: 'power1.out' }, 'missionData+=0.1')

      // MISSION -> SPACECRAFT FOCUS
      .addLabel('spacecraftFocus')
      .to(scene.camera.position, { x: mobile ? -0.05 : -0.18, y: mobile ? 0.05 : 0.15, z: mobile ? 6.8 : 5.5, duration: 0.9 }, 'spacecraftFocus')
      .to(scene.spacecraft.position, { x: mobile ? 0.05 : 0.18, y: 0.15, z: mobile ? 0.55 : 0.95, duration: 0.9 }, 'spacecraftFocus')
      .to(scene.spacecraft.rotation, { y: mobile ? 0.18 : 0.3, z: -0.08, duration: 0.9 }, 'spacecraftFocus')

      // SPACECRAFT -> DEEP SPACE
      .addLabel('deepSpace')
      .to(scene.spacecraft.position, { x: mobile ? -0.25 : -0.7, y: 0.3, z: mobile ? 0.3 : 1.05, duration: 1.4 }, 'deepSpace')
      .to(scene.camera.position, { x: mobile ? -0.14 : -0.32, y: 0.1, z: mobile ? 7.1 : 5.95, duration: 1.4 }, 'deepSpace')
      .to(scene.starIntensity, { value: mobile ? 1.02 : 1.18, duration: 1.4 }, 'deepSpace')
      .to('.deep-space-ui', { opacity: 1, y: 0, duration: 0.45 }, 'deepSpace+=0.55')

      // MISSION -> MARS APPROACH
      .addLabel('marsApproach')
      .to(scene.mars.position, { x: mobile ? 0.5 : 0.95, y: mobile ? 0.1 : 0.35, z: mobile ? -2.4 : -1.9, duration: 1.5 }, 'marsApproach')
      .to(scene.mars.scale, { x: mobile ? 1.8 : 2.25, y: mobile ? 1.8 : 2.25, z: mobile ? 1.8 : 2.25, duration: 1.5 }, 'marsApproach')
      .to(scene.spacecraft.position, { x: mobile ? 0.8 : 1.4, y: -0.25, z: -1.2, duration: 1.5 }, 'marsApproach')
      .to(scene.camera.position, { x: mobile ? 0.35 : 0.8, y: 0.1, z: mobile ? 7.8 : 6.8, duration: 1.5 }, 'marsApproach')
      .to(scene.marsGlow, { opacity: mobile ? 0.52 : 0.72, duration: 1.5 }, 'marsApproach')
      .to('.mars-reveal', { opacity: 1, y: 0, duration: 0.6, ease: 'power1.out' }, 'marsApproach+=0.7');
  });

  return () => context.revert();
}
