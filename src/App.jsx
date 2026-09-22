import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Countdown from './components/sections/Countdown.jsx';
import Crew from './components/sections/Crew.jsx';
import Hero from './components/sections/Hero.jsx';
import Mars from './components/sections/Mars.jsx';
import Mission from './components/sections/Mission.jsx';
import Spacecraft from './components/sections/Spacecraft.jsx';
import Timeline from './components/sections/Timeline.jsx';
import SceneEnvironment from './components/3d/SceneEnvironment.jsx';
import SpaceScene from './components/3d/SpaceScene.jsx';
import { createHeroAnimation } from './animations/heroAnimation.js';
import { createMissionAnimation } from './animations/missionAnimation.js';
import { createMarsAnimation } from './animations/marsAnimation.js';
import { createSpacecraftAnimation } from './animations/spacecraftAnimation.js';
import { createTimelineAnimation } from './animations/timelineAnimation.js';
import useSmoothScroll from './hooks/useSmoothScroll.js';
import useScrollProgress from './hooks/useScrollProgress.js';

function SceneAnimationController({ sceneRefs }) {
  const { size } = useThree();

  useEffect(() => {
    const scene = sceneRefs.current;
    if (!scene.camera || !scene.spacecraft || !scene.earth || !scene.mars) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const options = { scene, isMobile: size.width < 640, reducedMotion };
    const cleanups = [
      createHeroAnimation(options),
      createMissionAnimation(options),
      createSpacecraftAnimation(options),
      createMarsAnimation(options),
      createTimelineAnimation(options),
    ];

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [sceneRefs, size.width]);

  return null;
}

function App() {
  useSmoothScroll();
  useScrollProgress();
  const sceneRefs = useRef({});

  return (
    <div className="min-h-screen overflow-x-hidden bg-nova-black text-nova-white">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-90">
        <SpaceScene>
          <SceneEnvironment sceneRefs={sceneRefs} />
          <SceneAnimationController sceneRefs={sceneRefs} />
        </SpaceScene>
      </div>
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Mission />
        <Spacecraft />
        <Timeline />
        <Mars />
        <Crew />
        <Countdown />
      </main>
      <Footer />
    </div>
  );
}

export default App;
