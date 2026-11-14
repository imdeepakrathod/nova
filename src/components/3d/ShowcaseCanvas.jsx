import { Canvas, useThree } from '@react-three/fiber';
import { Suspense, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import WebGLFallback from '../ui/WebGLFallback.jsx';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion.js';

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
  const containerRef = useRef(null);
  const [shouldMount, setShouldMount] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [contextLost, setContextLost] = useState(false);
  const rendererRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const gl = useMemo(() => ({ alpha: true, antialias: true, powerPreference: 'high-performance' }), []);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return undefined;
    if (!('IntersectionObserver' in window)) {
      setShouldMount(true);
      setIsVisible(true);
      return undefined;
    }

    const mountObserver = new IntersectionObserver(
      ([entry]) => setShouldMount(entry.isIntersecting),
      { rootMargin: '320px 0px', threshold: 0.01 },
    );
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.01 },
    );
    mountObserver.observe(element);
    visibilityObserver.observe(element);

    return () => {
      mountObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, []);

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
    renderer.setClearColor('#020308', 0);
    rendererRef.current = { renderer, canvas, onContextLost, onContextRestored };
  }, []);

  useEffect(() => {
    if (shouldMount) return undefined;
    setContextLost(false);
    cleanupRenderer();
    return undefined;
  }, [cleanupRenderer, shouldMount]);

  useEffect(() => cleanupRenderer, [cleanupRenderer]);

  return (
    <div ref={containerRef} className={`absolute inset-0 ${className}`} aria-busy={shouldMount && !isVisible}>
      {shouldMount && (
        <Canvas
          camera={{ position: camera, fov: 38, near: 0.1, far: 100 }}
          dpr={[1, 1.2]}
          fallback={<WebGLFallback />}
          frameloop={reducedMotion ? 'demand' : isVisible ? 'always' : 'never'}
          gl={gl}
          onCreated={handleCreated}
        >
          <ShowcaseLighting />
          <Suspense fallback={null}>{children}</Suspense>
        </Canvas>
      )}
      {contextLost && (
        <div className="absolute inset-0 z-10">
          <WebGLFallback
            message="The 3D preview lost its graphics context. It will resume automatically when the context is restored."
            title="NOVA-01 / 3D preview paused"
          />
        </div>
      )}
    </div>
  );
}

export default memo(ShowcaseCanvas);
