import { useFrame, useLoader } from '@react-three/fiber';
import { memo, useMemo, useRef } from 'react';
import { BackSide, SRGBColorSpace, TextureLoader } from 'three';

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
}) {
  const planetRef = useRef(null);
  const atmosphereRef = useRef(null);
  const sphereArgs = useMemo(() => [1, 64, 64], []);

  useFrame((state, delta) => {
    if (!planetRef.current) return;

    planetRef.current.rotation.y += delta * rotationSpeed;

    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y -= delta * rotationSpeed * 0.35;
      atmosphereRef.current.material.opacity =
        atmosphereOpacity + Math.sin(state.clock.elapsedTime * 0.7) * 0.025;
    }
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh ref={planetRef}>
        <sphereGeometry args={sphereArgs} />
        {texturePath ? (
          <PlanetSurface
            color={color}
            metalness={metalness}
            roughness={roughness}
            texturePath={texturePath}
          />
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
