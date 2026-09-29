import { Canvas, useThree } from '@react-three/fiber';
import { Suspense, memo, useMemo } from 'react';
import WebGLFallback from '../ui/WebGLFallback.jsx';

function ShowcaseLighting() {
  const { size } = useThree();
  const isMobile = size.width < 640;

  return (
    <>
      <ambientLight color="#AFC8FF" intensity={isMobile ? 0.24 : 0.34} />
      <directionalLight color="#FFFFFF" intensity={isMobile ? 1.6 : 2.2} position={[4, 3, 5]} />
      {!isMobile && <directionalLight color="#FF4D00" intensity={0.8} position={[-3, -2, 3]} />}
    </>
  );
}

function ShowcaseCanvas({ children, camera = [0, 0, 6], className = '' }) {
  const gl = useMemo(() => ({ alpha: true, antialias: true, powerPreference: 'high-performance' }), []);

  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas camera={{ position: camera, fov: 38, near: 0.1, far: 100 }} dpr={[1, 1.2]} fallback={<WebGLFallback />} frameloop="always" gl={gl}>
        <ShowcaseLighting />
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}

export default memo(ShowcaseCanvas);
