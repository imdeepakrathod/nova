import { Stars } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { memo, useEffect, useMemo, useRef } from 'react';

function StarField({ count = 4200, mobile = false, intensityRef, reducedMotion = false }) {
  const groupRef = useRef(null);
  const materialsRef = useRef([]);
  const lastIntensityRef = useRef(null);
  const layers = useMemo(
    () => [
      {
        count,
        depth: mobile ? 36 : 56,
        factor: mobile ? 2.5 : 3,
        radius: mobile ? 46 : 72,
        saturation: 0,
        speed: 0.16,
      },
      {
        count: Math.round(count * 0.32),
        depth: mobile ? 22 : 34,
        factor: mobile ? 1.2 : 1.55,
        radius: mobile ? 28 : 42,
        saturation: 0.12,
        speed: 0.07,
      },
    ],
    [count, mobile],
  );

  useEffect(() => {
    if (!groupRef.current) return undefined;

    const materials = [];
    groupRef.current.traverse((child) => {
      if (!child.material?.transparent) return;
      const material = child.material;
      material.userData.novaBaseOpacity ??= material.opacity;
      materials.push(material);
    });
    materialsRef.current = materials;
    lastIntensityRef.current = null;

    return () => {
      materialsRef.current = [];
    };
  }, [layers]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (reducedMotion) return;

    groupRef.current.rotation.y += delta * 0.005;
    groupRef.current.rotation.x += delta * 0.0015;

    const intensity = intensityRef?.current?.value;
    if (intensity !== undefined && intensity !== lastIntensityRef.current) {
      lastIntensityRef.current = intensity;
      materialsRef.current.forEach((material) => {
        material.opacity = material.userData.novaBaseOpacity * intensity;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {layers.map((layer) => (
        <Stars
          key={`${layer.count}-${layer.radius}`}
          count={layer.count}
          depth={layer.depth}
          factor={layer.factor}
          fade
          radius={layer.radius}
          saturation={layer.saturation}
          speed={reducedMotion ? 0 : layer.speed}
        />
      ))}
    </group>
  );
}

export default memo(StarField);
