import { Canvas, useThree } from '@react-three/fiber';
import { Suspense, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import WebGLFallback from '../ui/WebGLFallback.jsx';
import ResponsiveCamera from './ResponsiveCamera.jsx';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion.js';

const DESKTOP_CAMERA = Object.freeze({ position: [0, 0, 7.2], target: [0, 0, 0], fov: 42, near: 0.1, far: 120 });
const TABLET_CAMERA = Object.freeze({ position: [0, 0, 8.2], target: [0, 0, 0], fov: 46, near: 0.1, far: 120 });
const MOBILE_CAMERA = Object.freeze({ position: [0, 0, 9.8], target: [0, 0, 0], fov: 52, near: 0.1, far: 120 });

function SceneLighting() {
  const { size } = useThree();
  const isMobile = size.width < 768;

  return (
    <>
      <ambientLight color="#AFC8FF" intensity={isMobile ? 0.2 : 0.26} />
      <directionalLight color="#FFFFFF" intensity={isMobile ? 1.55 : 2.1} position={[4.5, 3.2, 4]} />
      {!isMobile && <directionalLight color="#FF4D00" intensity={0.85} position={[-3.5, -1.5, 2.5]} />}
      {!isMobile && <pointLight color="#FF4D00" distance={9} decay={2} intensity={1.1} position={[2, -0.7, 1.5]} />}
    </>
  );
}

function SpaceScene({
  children,
  className = '',
  transparent = true,
  camera = DESKTOP_CAMERA,
  tabletCamera = TABLET_CAMERA,
  mobileCamera = MOBILE_CAMERA,
}) {
  const reducedMotion = usePrefersReducedMotion();
  const [contextLost, setContextLost] = useState(false);
  const rendererRef = useRef(null);
  const eventSource = useMemo(
    () => (typeof document === 'undefined' ? undefined : document.body),
    [],
  );
  const gl = useMemo(
    () => ({
      alpha: transparent,
      antialias: true,
      depth: true,
      powerPreference: 'high-performance',
      stencil: false,
    }),
    [transparent],
  );
  const cleanupRenderer = useCallback(() => {
    const activeRenderer = rendererRef.current;
    if (!activeRenderer) return;
    activeRenderer.canvas.removeEventListener('webglcontextlost', activeRenderer.onContextLost);
    activeRenderer.canvas.removeEventListener('webglcontextrestored', activeRenderer.onContextRestored);
    rendererRef.current = null;
  }, []);
  const handleCreated = useCallback(({ gl: renderer }) => {
    const canvas = renderer.domElement;
    const onContextLost = (event) => {
      event.preventDefault();
      setContextLost(true);
    };
    const onContextRestored = () => setContextLost(false);

    canvas.addEventListener('webglcontextlost', onContextLost, false);
    canvas.addEventListener('webglcontextrestored', onContextRestored, false);
    renderer.setClearColor('#020308', transparent ? 0 : 1);
    rendererRef.current = { renderer, canvas, onContextLost, onContextRestored };
  }, [transparent]);

  useEffect(() => cleanupRenderer, [cleanupRenderer]);

  return (
    <div className={`relative h-full w-full ${className}`}>
      <Canvas
        camera={camera}
        dpr={[1, 1.35]}
        frameloop="always"
        gl={gl}
        fallback={<WebGLFallback />}
        eventSource={eventSource}
        eventPrefix="client"
        onCreated={handleCreated}
        performance={{ min: 0.55 }}
      >
        <ResponsiveCamera
          desktop={camera}
          mobile={mobileCamera}
          reducedMotion={reducedMotion}
          tablet={tabletCamera}
        />
        <SceneLighting />
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
      {contextLost && (
        <div className="pointer-events-none absolute inset-0 z-10">
          <WebGLFallback
            message="The global 3D scene lost its graphics context. The mission interface remains available while it recovers."
            title="NOVA-01 / global scene paused"
          />
        </div>
      )}
    </div>
  );
}

export default memo(SpaceScene);
