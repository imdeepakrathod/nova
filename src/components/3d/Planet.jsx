import { useFrame, useLoader } from '@react-three/fiber';
import { Component, memo, useEffect, useMemo, useRef } from 'react';
import { BackSide, SRGBColorSpace, TextureLoader } from 'three';

class PlanetTextureBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

function PlanetSurface({ texturePath, color, roughness, metalness }) {
  const texture = useLoader(TextureLoader, texturePath);

  texture.colorSpace = SRGBColorSpace;

  return (
    <meshStandardMaterial
      color={color}
      map={texture}
      metalness={metalness}
      roughness={roughness}
    />
  );
}

function Planet({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  color = '#B54A32',
  emissive = '#160604',
  emissiveIntensity = 0.12,
  atmosphereColor = '#FF6A3A',
  atmosphereOpacity = 0.18,
  texturePath,
  rotationSpeed = 0.05,
  roughness = 0.78,
  metalness = 0,
  atmosphereControlRef,
  segments = 48,
}) {
  const planetRef = useRef(null);
  const atmosphereRef = useRef(null);
  const sphereArgs = useMemo(() => [1, segments, segments], [segments]);

  useEffect(() => {
    if (atmosphereControlRef?.current && atmosphereRef.current) {
      atmosphereControlRef.current.material = atmosphereRef.current.material;
    }
  }, [atmosphereControlRef]);

  useFrame((state, delta) => {
    if (!planetRef.current) return;

    planetRef.current.rotation.y += delta * rotationSpeed;

    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y -= delta * rotationSpeed * 0.35;
      const baseOpacity = atmosphereControlRef?.current?.opacity ?? atmosphereOpacity;
      atmosphereRef.current.material.opacity =
        baseOpacity + Math.sin(state.clock.elapsedTime * 0.7) * 0.025;
    }
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh ref={planetRef}>
        <sphereGeometry args={sphereArgs} />
        {texturePath ? (
          <PlanetTextureBoundary
            fallback={(
              <meshStandardMaterial
                color={color}
                emissive={emissive}
                emissiveIntensity={emissiveIntensity}
                metalness={metalness}
                roughness={roughness}
              />
            )}
          >
            <PlanetSurface
              color={color}
              metalness={metalness}
              roughness={roughness}
              texturePath={texturePath}
            />
          </PlanetTextureBoundary>
        ) : (
          <meshStandardMaterial
            color={color}
            emissive={emissive}
            emissiveIntensity={emissiveIntensity}
            metalness={metalness}
            roughness={roughness}
          />
        )}
      </mesh>

      <mesh ref={atmosphereRef} scale={1.075}>
        <sphereGeometry args={sphereArgs} />
        <meshBasicMaterial
          color={atmosphereColor}
          transparent
          opacity={atmosphereOpacity}
          side={BackSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export default memo(Planet);
