import { configureGsap, gsap } from './gsapConfig.js';

export function createJourneyAnimation({ scene, isMobile, isTablet = false, reducedMotion = false }) {
  configureGsap();
  if (reducedMotion) return () => {};

  const context = gsap.context(() => {
    const missionReveals = gsap.utils.toArray('.mission-reveal');
    const missionValues = gsap.utils.toArray('.mission-value');
    const mobile = isMobile;
    const tablet = isTablet;
    const horizontalScale = mobile ? 0.72 : tablet ? 0.88 : 1;
    const depthScale = mobile ? 0.78 : tablet ? 0.92 : 1;
    const cameraZ = mobile ? 1.1 : tablet ? 0.92 : 0.82;
    const cameraX = mobile ? 0.72 : tablet ? 0.88 : 1;
    const spacecraftX = mobile ? 0.72 : tablet ? 0.9 : 1;
    const marsScale = mobile ? 1.8 : tablet ? 2.05 : 2.25;
    const timeline = gsap.timeline({
      defaults: { ease: 'power1.inOut' },
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
      // EARTH -> SPACECRAFT LAUNCH
      .addLabel('launch')
      .to(scene.spacecraft.position, { x: (mobile ? 0.4 : 0.2) * spacecraftX, y: 0.02, z: (mobile ? 0.42 : 0.9) * depthScale, duration: 0.8 }, 'launch')
      .to(scene.camera.position, { x: 0.12 * cameraX, y: 0.02, z: (7.2 - 0.35 * cameraZ), duration: 0.8 }, 'launch')
      .to(scene.cameraTarget, { x: 0.14 * horizontalScale, y: 0.02, z: 0.28 * depthScale, duration: 0.8 }, 'launch')
      .to(scene.earth.position, { x: mobile ? -3.75 : -3.95, y: mobile ? -1.9 : -1.55, z: mobile ? -4 : -4.65, duration: 0.8 }, 'launch')
      .to(scene.stars.scale, { x: mobile ? 1.08 : 1.14, y: mobile ? 1.08 : 1.14, z: mobile ? 1.08 : 1.14, duration: 1 }, 'launch')
      .to(scene.stars.rotation, { y: 0.08, duration: 1 }, 'launch')

      // SPACECRAFT LAUNCH -> EARTH ORBIT
      .addLabel('earthOrbit', 'launch+=0.8')
      .to(scene.spacecraft.position, { x: (mobile ? 0.62 : 0.48) * spacecraftX, y: 0.08, z: (mobile ? 0.78 : 1.35) * depthScale, duration: 1 }, 'earthOrbit')
      .to(scene.spacecraft.rotation, { x: mobile ? 0.12 : 0.16, y: mobile ? -0.25 : -0.34, z: 0.04, duration: 1 }, 'earthOrbit')
      .to(scene.camera.position, { x: 0.18 * cameraX, y: 0.06, z: 7.2 - 0.72 * cameraZ, duration: 1 }, 'earthOrbit')
      .to(scene.cameraTarget, { x: 0.2 * horizontalScale, y: 0.04, z: 0.42 * depthScale, duration: 1 }, 'earthOrbit')
      .to(scene.earth.position, { x: mobile ? -4.2 : -4.55, y: mobile ? -2.05 : -1.8, z: mobile ? -4.7 : -5.1, duration: 1 }, 'earthOrbit')

      // EARTH ORBIT -> MISSION DATA
      .addLabel('missionData', 'earthOrbit+=0.2')
      .fromTo(missionReveals, { opacity: 0.2, y: 18 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.55, ease: 'power1.out' }, 'missionData')
      .fromTo(missionValues, { opacity: 0.25, letterSpacing: '0.28em' }, { opacity: 1, letterSpacing: '0.08em', stagger: 0.12, duration: 0.5, ease: 'power1.out' }, 'missionData+=0.1')

      // MISSION DATA -> SPACECRAFT FOCUS
      .addLabel('spacecraftFocus')
      .to(scene.camera.position, { x: (mobile ? -0.05 : -0.18) * horizontalScale, y: mobile ? 0.05 : 0.12, z: 5.95 - 0.35 * cameraZ, duration: 1 }, 'spacecraftFocus')
      .to(scene.cameraTarget, { x: (mobile ? 0.05 : 0.15) * horizontalScale, y: 0.12, z: (mobile ? 0.55 : 0.82) * depthScale, duration: 1 }, 'spacecraftFocus')
      .to(scene.spacecraft.position, { x: (mobile ? 0.08 : 0.18) * spacecraftX, y: 0.14, z: (mobile ? 0.55 : 0.95) * depthScale, duration: 1 }, 'spacecraftFocus')
      .to(scene.spacecraft.rotation, { x: mobile ? 0.14 : 0.18, y: mobile ? 0.18 : 0.3, z: -0.08, duration: 1 }, 'spacecraftFocus')

      // SPACECRAFT -> DEEP SPACE
      .addLabel('deepSpace')
      .to(scene.spacecraft.position, { x: (mobile ? -0.25 : -0.7) * spacecraftX, y: 0.3, z: (mobile ? 0.3 : 1.05) * depthScale, duration: 1.5 }, 'deepSpace')
      .to(scene.camera.position, { x: (mobile ? -0.14 : -0.32) * cameraX, y: 0.1, z: 5.35 - 0.3 * cameraZ, duration: 1.5 }, 'deepSpace')
      .to(scene.cameraTarget, { x: (mobile ? -0.1 : -0.22) * horizontalScale, y: 0.18, z: (mobile ? 0.65 : 0.95) * depthScale, duration: 1.5 }, 'deepSpace')
      .to(scene.earth.position, { x: mobile ? -5.3 : -5.8, y: mobile ? -2.45 : -2.55, z: mobile ? -5.8 : -6.2, duration: 1.5 }, 'deepSpace')
      .to(scene.starIntensity, { value: mobile ? 1.02 : 1.18, duration: 1.4 }, 'deepSpace')
      .to('.deep-space-ui', { opacity: 1, y: 0, duration: 0.45 }, 'deepSpace+=0.55')

      // DEEP SPACE -> MARS APPROACH
      .addLabel('marsApproach')
      .to(scene.mars.position, { x: (mobile ? 0.28 : 0.58) * horizontalScale, y: mobile ? 0.02 : 0.2, z: mobile ? -3.8 : -3.25, duration: 1.2 }, 'marsApproach')
      .to(scene.mars.scale, { x: marsScale * 0.58, y: marsScale * 0.58, z: marsScale * 0.58, duration: 1.2 }, 'marsApproach')
      .to(scene.spacecraft.position, { x: (mobile ? 0.55 : 1.05) * spacecraftX, y: -0.12, z: -0.55, duration: 1.2 }, 'marsApproach')
      .to(scene.camera.position, { x: (mobile ? 0.2 : 0.52) * cameraX, y: 0.08, z: 5.7 - 0.25 * cameraZ, duration: 1.2 }, 'marsApproach')
      .to(scene.cameraTarget, { x: (mobile ? 0.28 : 0.52) * horizontalScale, y: mobile ? 0.06 : 0.16, z: mobile ? -1.05 : -1.15, duration: 1.2 }, 'marsApproach')
      .to(scene.marsGlow, { opacity: mobile ? 0.34 : 0.48, duration: 1.2 }, 'marsApproach')

      // MARS APPROACH -> MARS
      .addLabel('mars')
      .to(scene.mars.position, { x: (mobile ? 0.5 : 0.95) * horizontalScale, y: mobile ? 0.1 : 0.35, z: mobile ? -2.4 : -1.9, duration: 1.35 }, 'mars')
      .to(scene.mars.scale, { x: marsScale, y: marsScale, z: marsScale, duration: 1.35 }, 'mars')
      .to(scene.spacecraft.position, { x: (mobile ? 0.8 : 1.4) * spacecraftX, y: -0.25, z: -1.2, duration: 1.35 }, 'mars')
      .to(scene.camera.position, { x: (mobile ? 0.35 : 0.8) * cameraX, y: 0.1, z: 6.3 - 0.2 * cameraZ, duration: 1.35 }, 'mars')
      .to(scene.cameraTarget, { x: (mobile ? 0.45 : 0.72) * horizontalScale, y: mobile ? 0.08 : 0.2, z: mobile ? -1.35 : -1.55, duration: 1.35 }, 'mars')
      .to(scene.marsGlow, { opacity: mobile ? 0.52 : 0.72, duration: 1.35 }, 'mars')
      .to('.mars-reveal', { opacity: 1, y: 0, duration: 0.6, ease: 'power1.out' }, 'mars+=0.7');
  });

  return () => context.revert();
}
