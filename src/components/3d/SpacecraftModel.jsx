import { useGLTF } from '@react-three/drei';
import { useMemo } from 'react';
import { Box3, Vector3 } from 'three';

function SpacecraftModel({ modelPath, targetSize = 2.8, rotation = [0, 0, 0] }) {
  const { scene } = useGLTF(modelPath);
  const model = useMemo(() => {
    const clone = scene.clone(true);
    const bounds = new Box3().setFromObject(clone);
    const center = bounds.getCenter(new Vector3());
    const size = bounds.getSize(new Vector3());
    const largestDimension = Math.max(size.x, size.y, size.z);
    const normalizationScale = largestDimension > 0 ? targetSize / largestDimension : 1;

    clone.position.sub(center);
    clone.scale.setScalar(normalizationScale);
    return clone;
  }, [scene, targetSize]);

  return (
    <group rotation={rotation}>
      <primitive object={model} dispose={null} />
    </group>
  );
}

export default SpacecraftModel;
