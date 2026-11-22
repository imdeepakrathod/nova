import { useFrame, useLoader } from '@react-three/fiber';
import { Component, memo, useEffect, useMemo, useRef } from 'react';
import {
  AdditiveBlending,
  BackSide,
  NoColorSpace,
  SRGBColorSpace,
  TextureLoader,
} from 'three';

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

function PlanetSurface({ texturePath, normalPath, color, roughness, metalness }) {
  const textures = useLoader(
    TextureLoader,
    normalPath ? [texturePath, normalPath] : [texturePath],
  );
  const [texture, normalTexture] = textures;

  texture.colorSpace = SRGBColorSpace;
  if (normalTexture && normalPath) normalTexture.colorSpace = NoColorSpace;

  return (
    <meshStandardMaterial
      color={color}
      map={texture}
      metalness={metalness}
      normalMap={normalPath ? normalTexture : null}
      roughness={roughness}
    />
  );
}

function CloudLayer({ texturePath, sphereArgs }) {
  const texture = useLoader(TextureLoader, texturePath);
  texture.colorSpace = SRGBColorSpace;

  return (
    <mesh scale={1.018}>
      <sphereGeometry args={sphereArgs} />
      <meshStandardMaterial
        alphaTest={0.05}
        depthWrite={false}
        map={texture}
        opacity={0.42}
        transparent
        color="#FFFFFF"
      />
    </mesh>
  );
}

const marsCraters = [
  { position: [-0.58, 0.44, 0.7], scale: 0.16, ring: 0.018 },
  { position: [0.34, 0.64, 0.7], scale: 0.11, ring: 0.012 },
  { position: [0.68, -0.18, 0.72], scale: 0.13, ring: 0.015 },
  { position: [-0.28, -0.42, 0.86], scale: 0.09, ring: 0.012 },
  { position: [0.02, 0.04, 1.01], scale: 0.07, ring: 0.009 },
  { position: [-0.74, -0.05, 0.65], scale: 0.08, ring: 0.011 },
  { position: [0.56, 0.24, 0.82], scale: 0.055, ring: 0.008 },
];

function ProceduralSurfaceDetail({ detailRef, color }) {
  return (
    <group ref={detailRef}>
      {marsCraters.map(({ position, scale, ring }, index) => (
        <group key={`${position.join('-')}-${index}`} position={position}>
          <mesh scale={[scale, scale * 0.22, scale]}>
            <sphereGeometry args={[1, 12, 8]} />
            <meshStandardMaterial color={color} roughness={1} transparent opacity={0.38} />
          </mesh>
          <mesh position={[0, scale * 0.12, 0]} scale={[scale + ring, ring, scale + ring]}>
            <torusGeometry args={[1, 0.18, 6, 20]} />
            <meshStandardMaterial color="#B85A3D" roughness={0.92} transparent opacity={0.22} />
          </mesh>
        </group>
      ))}
    </group>
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
  normalPath,
  cloudPath,
  rotationSpeed = 0.05,
  roughness = 0.78,
  metalness = 0,
  atmosphereControlRef,
  segments = 48,
  reducedMotion = false,
  proceduralDetail = false,
}) {
  const planetRef = useRef(null);
  const atmosphereRef = useRef(null);
  const glowRef = useRef(null);
  const cloudRef = useRef(null);
  const detailRef = useRef(null);
  const sphereArgs = useMemo(() => [1, segments, segments], [segments]);

  useEffect(() => {
    if (atmosphereControlRef?.current && atmosphereRef.current) {
      atmosphereControlRef.current.material = atmosphereRef.current.material;
    }
  }, [atmosphereControlRef]);

  useFrame((state, delta) => {
    if (!planetRef.current) return;
    if (reducedMotion) return;

    planetRef.current.rotation.y += delta * rotationSpeed;
    if (detailRef.current) detailRef.current.rotation.y += delta * rotationSpeed;
    if (cloudRef.current) cloudRef.current.rotation.y += delta * rotationSpeed * 0.72;

    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y -= delta * rotationSpeed * 0.35;
      const baseOpacity = atmosphereControlRef?.current?.opacity ?? atmosphereOpacity;
      atmosphereRef.current.material.opacity =
        baseOpacity + Math.sin(state.clock.elapsedTime * 0.7) * 0.025;
    }

    if (glowRef.current) {
      glowRef.current.material.opacity =
        (atmosphereControlRef?.current?.opacity ?? atmosphereOpacity) * 0.7;
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
              normalPath={normalPath}
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
      {proceduralDetail && !texturePath && (
        <ProceduralSurfaceDetail color="#5E2118" detailRef={detailRef} />
      )}
      {cloudPath && (
        <PlanetTextureBoundary fallback={null}>
          <group ref={cloudRef}>
            <CloudLayer sphereArgs={sphereArgs} texturePath={cloudPath} />
          </group>
        </PlanetTextureBoundary>
      )}

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
      <mesh ref={glowRef} scale={1.12}>
        <sphereGeometry args={sphereArgs} />
        <meshBasicMaterial
          blending={AdditiveBlending}
          color={atmosphereColor}
          depthWrite={false}
          opacity={atmosphereOpacity * 0.7}
          side={BackSide}
          transparent
        />
      </mesh>
    </group>
  );
}

export default memo(Planet);
