# NOVA

NOVA is a cinematic Mars mission landing page for the fictional NOVA-01 mission.

## Live Demo

https://nova-007.netlify.app/

## Features

- Interactive Three.js mission environment
- Scroll-driven spacecraft journey
- Responsive desktop, tablet, and mobile camera modes
- Reduced-motion support
- Lazy-mounted 3D showcase scenes
- Accessible navigation and fullscreen spacecraft preview
- Mission countdown
- Procedural spacecraft, Earth, Mars, and crew fallbacks

## Tech Stack

- React
- Three.js
- React Three Fiber
- Drei
- GSAP and ScrollTrigger
- Lenis
- Tailwind CSS
- Vite

## Getting Started

```bash
npm ci
npm run dev
```

Open `http://localhost:5173`.

## Production Build

```bash
npm run build
npm run preview
```

## Asset Status

The project uses procedural 3D fallbacks and local crew illustrations. Optional binary model and planet texture support is documented in [public/ASSETS.md](public/ASSETS.md).
