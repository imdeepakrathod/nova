const useLocalAssets = false;

export const assets = {
  useLocalAssets,
  models: {
    spacecraft: '/models/nova-01.glb',
    astronaut: '/models/astronaut.glb',
  },
  textures: {
    earth: {
      surface: '/textures/earth-surface.jpg',
      normal: '/textures/earth-normal.jpg',
    },
    mars: {
      surface: '/textures/mars-surface.jpg',
      normal: '/textures/mars-normal.jpg',
    },
  },
  images: {
    crew: [
      '/images/crew-amina-okafor.jpg',
      '/images/crew-jonas-reed.jpg',
      '/images/crew-lena-petrov.jpg',
    ],
  },
};

export function resolveAsset(path) {
  return useLocalAssets ? path : null;
}
