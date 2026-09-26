import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Component, Suspense, memo, useEffect, useMemo, useRef } from 'react';
import SpacecraftFallback from './SpacecraftFallback.jsx';
import SpacecraftModel from './SpacecraftModel.jsx';

class ModelErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate(previousProps) {
    if (previousProps.modelPath !== this.props.modelPath && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) return this.props.fallback;

    return this.props.children;
  }
}

function Spacecraft({
  modelPath,
  position = [1.8, -0.1, 0],
  rotation = [0.18, -0.55, 0.1],
  scale = 1,
}) {
  const groupRef = useRef(null);
  const fallback = useMemo(() => <SpacecraftFallback />, []);

  useEffect(() => {
    if (modelPath) useGLTF.preload(modelPath);
  }, [modelPath]);

  useFrame((state) => {
    if (!groupRef.current) return;

    const elapsed = state.clock.elapsedTime;
    groupRef.current.position.y = position[1] + Math.sin(elapsed * 0.75) * 0.09;
    groupRef.current.rotation.y = rotation[1] + Math.sin(elapsed * 0.42) * 0.08;
    groupRef.current.rotation.z = rotation[2] + Math.sin(elapsed * 0.58) * 0.035;
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {modelPath ? (
        <ModelErrorBoundary fallback={fallback}>
          <Suspense fallback={fallback}>
            <SpacecraftModel modelPath={modelPath} />
          </Suspense>
        </ModelErrorBoundary>
      ) : (
        fallback
      )}
    </group>
  );
}

export default memo(Spacecraft);
