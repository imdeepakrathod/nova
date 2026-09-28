import { memo } from 'react';
import { assets, resolveAsset } from '../../config/assets.js';
import Mars from './Mars.jsx';
import ShowcaseCanvas from './ShowcaseCanvas.jsx';

function MarsShowcase() {
  return (
    <ShowcaseCanvas camera={[0, 0, 4.6]}>
      <Mars
        normalPath={resolveAsset(assets.textures.mars.normal)}
        position={[0, 0, 0]}
        scale={1.45}
        segments={48}
        texturePath={resolveAsset(assets.textures.mars.surface)}
      />
    </ShowcaseCanvas>
  );
}

export default memo(MarsShowcase);
