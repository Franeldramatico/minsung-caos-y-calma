# MINSUNG — caos & calma

Experiencia web interactiva sobre la dualidad: caos y calma, rap y baile, energía y precisión.
Dedicada a Aranxita. :3

## Stack

- [Vite](https://vite.dev) + React + TypeScript + Tailwind CSS 4
- [Lenis](https://github.com/darkroomengineering/lenis) — smooth scroll
- [Three.js](https://threejs.org) vía [React Three Fiber](https://github.com/pmndrs/react-three-fiber) + drei — hero 3D de órbitas cruzadas
- [GSAP](https://gsap.com) + ScrollTrigger — animaciones de timeline y secciones pinneadas
- [Framer Motion](https://github.com/framer/motion) — microinteracciones y transiciones
- [p5.js](https://p5js.org) — canvas generativo reactivo al cursor
- UI inspirada en Aceternity UI / Magic UI (glassmorphism, shine borders, sparkles) con estética fanzine

## Desarrollo

```bash
npm install
npm run dev
```

## Deploy

Cada push a `main` despliega a GitHub Pages vía `.github/workflows/deploy.yml`:
https://franeldramatico.github.io/minsung-caos-y-calma/
