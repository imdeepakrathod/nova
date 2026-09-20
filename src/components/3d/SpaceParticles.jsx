import { useFrame } from '@react-three/fiber';
import { memo, useMemo, useRef } from 'react';

function SpaceParticles({
  count = 220,
  spread = 9,
  color = '#FFB38A',
  size = 0.018,
  opacity = 0.22,
}) {
  const pointsRef = useRef(null);
  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const i = index * 3;
      values[i] = (Math.random() - 0.5) * spread;
      values[i + 1] = (Math.random() - 0.5) * spread * 0.68;
      values[i + 2] = -Math.random() * spread - 0.5;
    }

    return values;
  }, [count, spread]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    pointsRef.current.rotation.y += delta * 0.009;
    pointsRef.current.rotation.z += delta * 0.003;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        depthWrite={false}
        opacity={opacity}
        size={size}
        sizeAttenuation
        transparent
      />
    </points>
  );
}

export default memo(SpaceParticles);
