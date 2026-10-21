import { Canvas, useThree } from '@react-three/fiber';
import { Suspense, memo, useEffect, useMemo } from 'react';
import WebGLFallback from '../ui/WebGLFallback.jsx';

const DESKTOP_CAMERA = Object.freeze({ position: [0, 0, 7.2], fov: 42, near: 0.1, far: 120 });
const TABLET_CAMERA = Object.freeze({ position: [0, 0, 8.2], fov: 46, near: 0.1, far: 120 });
const MOBILE_CAMERA = Object.freeze({ position: [0, 0, 9.8], fov: 52, near: 0.1, far: 120 });

function SceneLighting() {
  const { size } = useThree();
  const isMobile = size.width < 640;

  return (
    <>
      <ambientLight color="#AFC8FF" intensity={isMobile ? 0.2 : 0.26} />
      <directionalLight color="#FFFFFF" intensity={isMobile ? 1.55 : 2.1} position={[4.5, 3.2, 4]} />
      {!isMobile && <directionalLight color="#FF4D00" intensity={0.85} position={[-3.5, -1.5, 2.5]} />}
      {!isMobile && <pointLight color="#FF4D00" distance={9} decay={2} intensity={1.1} position={[2, -0.7, 1.5]} />}
    </>
  );
}

function ResponsiveCamera({ desktop, tablet, mobile }) {
  const { camera, size } = useThree();
  const breakpoint = size.width < 640 ? 'mobile' : size.width < 1024 ? 'tablet' : 'desktop';

  useEffect(() => {
    const config = breakpoint === 'mobile' ? mobile : breakpoint === 'tablet' ? tablet : desktop;

    if (!camera.userData.novaCameraInitialized) {
      camera.position.set(...config.position);
      camera.userData.novaCameraInitialized = true;
    }
    camera.fov = config.fov;
    camera.near = config.near ?? 0.1;
    camera.far = config.far ?? 120;
    camera.updateProjectionMatrix();
  }, [breakpoint, camera, desktop, mobile, tablet]);

  return null;
}

function SpaceScene({
  children,
  className = '',
  transparent = true,
  camera = DESKTOP_CAMERA,
  tabletCamera = TABLET_CAMERA,
  mobileCamera = MOBILE_CAMERA,
}) {
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
        onCreated={({ gl: renderer }) => {
          renderer.setClearColor('#020308', transparent ? 0 : 1);
        }}
        performance={{ min: 0.55 }}
      >
        <ResponsiveCamera
          desktop={camera}
          mobile={mobileCamera}
          tablet={tabletCamera}
        />
        <SceneLighting />
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}

export default memo(SpaceScene);
