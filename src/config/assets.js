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
    crewFallbacks: [
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=85',
    ],
  },
};

export function resolveAsset(path) {
  return useLocalAssets ? path : null;
}

export function resolveImage(path, fallback) {
  return useLocalAssets ? path : fallback;
}
