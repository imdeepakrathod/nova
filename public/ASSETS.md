# NOVA local assets

This repository currently ships without binary GLB, GLTF, JPG, or PNG assets. The procedural spacecraft, Earth, and Mars visuals are the production default.

To enable local assets, add optimized files to the directories below and set `useLocalAssets` to `true` in `src/config/assets.js`:

```text
public/
  models/
    nova-01.glb
    astronaut.glb
  textures/
    earth-surface.jpg
    earth-normal.jpg
    earth-clouds.png
    mars-surface.jpg
    mars-normal.jpg
  images/
    crew-amina-okafor.jpg
    crew-jonas-reed.jpg
    crew-lena-petrov.jpg
```

Recommended limits:

- GLB spacecraft: under 8 MB, centered at the origin, with compressed meshes and embedded or colocated textures.
- Planet color textures: 2048px maximum, JPEG or WebP.
- Planet normal maps: 1024px maximum, JPEG or WebP.
- Earth cloud map: 2048px maximum, PNG or WebP with transparency.
- Crew images: 1200px maximum, WebP or AVIF where possible.

Missing or invalid assets are caught by the existing model, texture, and image fallbacks. Do not enable paths until the matching files exist.
