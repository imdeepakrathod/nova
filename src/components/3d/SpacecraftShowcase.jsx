import { memo } from 'react';
import { assets, resolveAsset } from '../../config/assets.js';
import Spacecraft from './Spacecraft.jsx';
import ShowcaseCanvas from './ShowcaseCanvas.jsx';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion.js';

function SpacecraftShowcase() {
  const reducedMotion = usePrefersReducedMotion();
  return (
    <ShowcaseCanvas camera={[0, 0, 5.4]}>
      <Spacecraft
        modelPath={resolveAsset(assets.models.spacecraft)}
        position={[0, 0, 0]}
        rotation={[0.08, -0.32, 0.06]}
        scale={0.94}
        reducedMotion={reducedMotion}
      />
    </ShowcaseCanvas>
  );
}

export default memo(SpacecraftShowcase);
