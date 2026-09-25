import { Loader } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { Suspense, memo, useEffect, useMemo } from 'react';

function ResponsiveCamera({ desktop, tablet, mobile }) {
  const { camera, size } = useThree();

  useEffect(() => {
    const config =
      size.width < 640 ? mobile : size.width < 1024 ? tablet : desktop;

    camera.position.set(...config.position);
    camera.fov = config.fov;
    camera.near = config.near ?? 0.1;
    camera.far = config.far ?? 120;
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [camera, desktop, mobile, size.width, tablet]);

  return null;
}

function SpaceScene({
  children,
  className = '',
  transparent = true,
  camera = { position: [0, 0, 7.2], fov: 42, near: 0.1, far: 120 },
  tabletCamera = { position: [0, 0, 8.2], fov: 46, near: 0.1, far: 120 },
  mobileCamera = { position: [0, 0, 9.8], fov: 52, near: 0.1, far: 120 },
}) {
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
        <ambientLight color="#AFC8FF" intensity={0.26} />
        <directionalLight
          color="#FFFFFF"
          intensity={2.1}
          position={[4.5, 3.2, 4]}
        />
        <directionalLight
          color="#FF4D00"
          intensity={0.85}
          position={[-3.5, -1.5, 2.5]}
        />
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
      <Loader
        containerStyles={{ background: 'rgba(2, 3, 8, 0.72)' }}
        dataStyles={{
          color: '#FFFFFF',
          fontFamily: 'Inter, system-ui, sans-serif',
          letterSpacing: '0.16em',
        }}
        innerStyles={{ backgroundColor: '#FFFFFF' }}
        barStyles={{ backgroundColor: '#FF4D00' }}
      />
    </div>
  );
}

export default memo(SpaceScene);
