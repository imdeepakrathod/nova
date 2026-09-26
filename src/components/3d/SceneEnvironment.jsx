import { useThree, useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import Earth from './Earth.jsx';
import Mars from './Mars.jsx';
import Spacecraft from './Spacecraft.jsx';
import SpaceParticles from './SpaceParticles.jsx';
import StarField from './StarField.jsx';
import { assets, resolveAsset } from '../../config/assets.js';

function SceneEnvironment({ sceneRefs }) {
  const rigRef = useRef(null);
  const starsRef = useRef(null);
  const earthRef = useRef(null);
  const marsRef = useRef(null);
  const spacecraftRef = useRef(null);
  const marsGlowRef = useRef({ opacity: 0.12 });
  const starIntensityRef = useRef({ value: 0.72 });
  const { camera, size } = useThree();
  const isMobile = size.width < 640;
  const isTablet = size.width >= 640 && size.width < 1024;

  useEffect(() => {
    Object.assign(sceneRefs.current, {
      camera,
      rig: rigRef.current,
      stars: starsRef.current,
      earth: earthRef.current,
      mars: marsRef.current,
      spacecraft: spacecraftRef.current,
      marsGlow: marsGlowRef.current,
      starIntensity: starIntensityRef.current,
    });
  }, [camera, sceneRefs]);

  useFrame(({ pointer }, delta) => {
    if (!rigRef.current) return;

    const targetY = pointer.x * (isMobile ? 0.035 : 0.075);
    const targetX = -pointer.y * (isMobile ? 0.018 : 0.035);
    rigRef.current.rotation.y += (targetY - rigRef.current.rotation.y) * delta;
    rigRef.current.rotation.x += (targetX - rigRef.current.rotation.x) * delta;
  });

  return (
    <>
      <fog attach="fog" args={['#020308', isMobile ? 8 : 10, 34]} />
      <group ref={starsRef}>
        <StarField
          count={isMobile ? 700 : isTablet ? 1700 : 3200}
          intensityRef={starIntensityRef}
          mobile={isMobile}
        />
      </group>
      <SpaceParticles count={isMobile ? 50 : isTablet ? 110 : 180} opacity={isMobile ? 0.13 : 0.2} spread={isMobile ? 6 : 9} />

      <group ref={rigRef}>
        <group ref={earthRef} position={isMobile ? [1.95, -1.8, -3.6] : [-3.4, -1.35, -4.4]}>
          <Earth
            position={[0, 0, 0]}
            scale={isMobile ? 1.25 : isTablet ? 1.45 : 1.78}
            segments={isMobile ? 32 : 48}
            normalPath={resolveAsset(assets.textures.earth.normal)}
            texturePath={resolveAsset(assets.textures.earth.surface)}
          />
        </group>
        <group ref={marsRef} position={isMobile ? [2.65, 1.35, -7.5] : [4.15, 1.4, -7]}>
          <Mars
            atmosphereControlRef={marsGlowRef}
            position={[0, 0, 0]}
            scale={isMobile ? 0.32 : 0.5}
            segments={isMobile ? 32 : 48}
            normalPath={resolveAsset(assets.textures.mars.normal)}
            texturePath={resolveAsset(assets.textures.mars.surface)}
          />
        </group>
        <group ref={spacecraftRef} position={isMobile ? [0.98, -0.12, -0.15] : isTablet ? [1.45, -0.06, 0] : [2.08, -0.05, 0.12]}>
          <Spacecraft
            modelPath={resolveAsset(assets.models.spacecraft)}
            position={[0, 0, 0]}
            rotation={isMobile ? [0.16, -0.48, 0.12] : [0.18, -0.58, 0.08]}
            scale={isMobile ? 0.62 : isTablet ? 0.82 : 1.12}
          />
        </group>
      </group>
    </>
  );
}

export default SceneEnvironment;
