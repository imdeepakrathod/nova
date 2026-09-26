import { useGLTF } from '@react-three/drei';
import { useMemo } from 'react';

function SpacecraftModel({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  const model = useMemo(() => scene.clone(true), [scene]);

  return <primitive object={model} dispose={null} />;
}

export default SpacecraftModel;
