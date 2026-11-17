// Keep disabled until the corresponding files are added to public/.
const useLocalAssets = false;

export const assets = {
  // Binary assets are intentionally opt-in until the files documented in public/ASSETS.md exist.
  source: useLocalAssets ? 'local' : 'procedural-fallback',
  useLocalAssets,
  models: {
    spacecraft: '/models/nova-01.glb',
    astronaut: '/models/astronaut.glb',
  },
  textures: {
    earth: {
      surface: '/textures/earth-surface.jpg',
      normal: '/textures/earth-normal.jpg',
      clouds: '/textures/earth-clouds.png',
    },
    mars: {
      surface: '/textures/mars-surface.jpg',
      normal: '/textures/mars-normal.jpg',
      clouds: null,
    },
  },
  images: {
    crew: [
      '/images/crew-amina-okafor.jpg',
      '/images/crew-jonas-reed.jpg',
      '/images/crew-lena-petrov.jpg',
    ],
    crewFallbacks: [
      '/images/crew-amina-okafor.svg',
      '/images/crew-jonas-reed.svg',
      '/images/crew-lena-petrov.svg',
    ],
  },
};

export function resolveAsset(path) {
  return useLocalAssets ? path : null;
}

export function resolveImage(path, fallback) {
  return useLocalAssets ? path : fallback;
}
