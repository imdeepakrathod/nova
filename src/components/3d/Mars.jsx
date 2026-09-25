import { memo } from 'react';
import Planet from './Planet.jsx';

function Mars({
  texturePath,
  position = [3.8, 1.25, -6.5],
  scale = 0.48,
  rotation = [0.05, 0, 0.12],
  atmosphereControlRef,
  segments = 48,
}) {
  return (
    <Planet
      atmosphereColor="#FF7446"
      atmosphereOpacity={0.12}
      color="#B54A32"
      emissive="#2B0904"
      emissiveIntensity={0.16}
      position={position}
      rotation={rotation}
      rotationSpeed={0.028}
      roughness={0.88}
      scale={scale}
      segments={segments}
      texturePath={texturePath}
      atmosphereControlRef={atmosphereControlRef}
    />
  );
}

export default memo(Mars);
