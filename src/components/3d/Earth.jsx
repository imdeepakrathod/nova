import { memo } from 'react';
import Planet from './Planet.jsx';

function Earth({
  texturePath,
  normalPath,
  position = [-3.2, -1.3, -4],
  scale = 1.6,
  rotation = [0.12, 0, -0.18],
  segments = 48,
}) {
  return (
    <Planet
      atmosphereColor="#2D7DFF"
      atmosphereOpacity={0.15}
      color="#0D2F5F"
      emissive="#03142B"
      emissiveIntensity={0.18}
      position={position}
      rotation={rotation}
      rotationSpeed={0.035}
      roughness={0.72}
      scale={scale}
      segments={segments}
      normalPath={normalPath}
      texturePath={texturePath}
    />
  );
}

export default memo(Earth);
