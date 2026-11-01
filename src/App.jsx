import { useCallback, useEffect, useRef, useState } from 'react';
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
import { createJourneyAnimation } from './animations/journeyAnimation.js';
import { createTimelineAnimation } from './animations/timelineAnimation.js';
import useSmoothScroll from './hooks/useSmoothScroll.js';
import { createPagePolish } from './animations/pagePolish.js';
import CustomCursor from './components/ui/CustomCursor.jsx';
import LoadingScreen from './components/ui/LoadingScreen.jsx';
import { getCameraBreakpoint } from './components/3d/ResponsiveCamera.jsx';
import usePrefersReducedMotion from './hooks/usePrefersReducedMotion.js';

function SceneAnimationController({ ready, sceneRefs, reducedMotion }) {
  const { size } = useThree();
  const responsiveMode = getCameraBreakpoint(size.width);

  useEffect(() => {
    if (!ready) return undefined;

    const scene = sceneRefs.current;
    if (!scene.camera || !scene.cameraTarget || !scene.spacecraft || !scene.earth || !scene.mars || !scene.stars) return undefined;

    const options = {
      scene,
      isMobile: responsiveMode === 'mobile',
      isTablet: responsiveMode === 'tablet',
      reducedMotion,
    };
    const cleanups = [
      createJourneyAnimation(options),
      createTimelineAnimation(options),
    ];

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [ready, responsiveMode, reducedMotion, sceneRefs]);

  return null;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [sceneReady, setSceneReady] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  useSmoothScroll(reducedMotion);
  const sceneRefs = useRef({});
  const completeLoading = useCallback(() => setIsLoading(false), []);
  const handleSceneReady = useCallback((ready = true) => setSceneReady(ready), []);

  useEffect(() => {
    return createPagePolish({ reducedMotion });
  }, [reducedMotion]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-nova-black text-nova-white">
      {isLoading && <LoadingScreen onComplete={completeLoading} ready={sceneReady} />}
      <CustomCursor />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-90">
        <SpaceScene>
          <SceneEnvironment onReady={handleSceneReady} sceneRefs={sceneRefs} />
          <SceneAnimationController ready={sceneReady} sceneRefs={sceneRefs} reducedMotion={reducedMotion} />
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
