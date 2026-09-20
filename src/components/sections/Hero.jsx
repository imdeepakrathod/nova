import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import Earth from '../3d/Earth.jsx';
import Mars3D from '../3d/Mars.jsx';
import Spacecraft from '../3d/Spacecraft.jsx';
import SpaceParticles from '../3d/SpaceParticles.jsx';
import SpaceScene from '../3d/SpaceScene.jsx';
import StarField from '../3d/StarField.jsx';
import Button from '../ui/Button.jsx';

function HeroSpaceEnvironment() {
  const rigRef = useRef(null);
  const { size } = useThree();
  const isMobile = size.width < 640;
  const isTablet = size.width >= 640 && size.width < 1024;

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
      <StarField count={isMobile ? 1200 : isTablet ? 2600 : 4600} mobile={isMobile} />
      <SpaceParticles
        count={isMobile ? 80 : isTablet ? 150 : 240}
        opacity={isMobile ? 0.16 : 0.22}
        spread={isMobile ? 6.5 : 9}
      />

      <group ref={rigRef}>
        <Earth
          position={isMobile ? [1.95, -1.8, -3.6] : [-3.4, -1.35, -4.4]}
          scale={isMobile ? 1.25 : isTablet ? 1.45 : 1.78}
        />
        <Mars3D
          position={isMobile ? [2.65, 1.35, -7.5] : [4.15, 1.4, -7]}
          scale={isMobile ? 0.32 : 0.5}
        />
        <Spacecraft
          position={isMobile ? [0.98, -0.12, -0.15] : isTablet ? [1.45, -0.06, 0] : [2.08, -0.05, 0.12]}
          rotation={isMobile ? [0.16, -0.48, 0.12] : [0.18, -0.58, 0.08]}
          scale={isMobile ? 0.62 : isTablet ? 0.82 : 1.12}
        />
      </group>
    </>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen overflow-hidden bg-nova-black pt-28"
    >
      <div className="absolute inset-0">
        <SpaceScene>
          <HeroSpaceEnvironment />
        </SpaceScene>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(2,3,8,0.98)_0%,rgba(2,3,8,0.84)_38%,rgba(2,3,8,0.34)_72%,rgba(2,3,8,0.1)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,3,8,0.16)_0%,rgba(2,3,8,0)_42%,rgba(2,3,8,0.92)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
      <div className="nova-container relative z-10 flex min-h-[calc(100vh-7rem)] items-center py-16">
        <div className="max-w-4xl">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.34em] text-nova-accent">
            NOVA-01 / MARS MISSION
          </p>
          <h1 className="font-display text-6xl font-semibold uppercase leading-[0.9] text-nova-white sm:text-7xl md:text-8xl lg:text-[7.4rem]">
            Beyond Earth.
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-nova-muted sm:text-lg">
            NOVA-01 is a next-generation mission concept engineered for the
            red planet: precise orbital insertion, autonomous descent systems,
            and a human-centered command experience.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="#mission" showIcon>
              Explore Mission
            </Button>
            <Button href="#spacecraft" variant="secondary">
              Mission Data
            </Button>
          </div>

          <div className="mt-14 grid max-w-2xl grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-3">
            {[
              ['Launch', 'Q4 2028'],
              ['Transit', '214 Days'],
              ['Target', 'Mars'],
            ].map(([label, value]) => (
              <div key={label} className="bg-nova-black/80 p-5">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-nova-muted">
                  {label}
                </p>
                <p className="mt-2 text-lg font-semibold text-nova-white">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
