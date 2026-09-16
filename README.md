# GHIA Automóvil — Web

Sitio en React + Vite con una sección de vídeo "scrubbed" por scroll (el coche
gira en su sitio a medida que se hace scroll) y secciones de contenido que
aparecen con fade. Footer negro fijo siempre visible, tipografía Helvetica
Neue Thin.

## Poner en marcha

```bash
npm install
npm run dev
```

Abre la URL que indique la consola (normalmente http://localhost:5173).

## Compilar para producción

```bash
npm run build
npm run preview   # para probar el build localmente
```

## Estructura

- `src/components/ScrollVideo.jsx` — sección "pinned" (350vh por defecto) que
  mapea el progreso de scroll al `currentTime` del vídeo en
  `public/video/seat-leon.mp4`. Cambia `lengthVh` para que el efecto dure
  más o menos scroll.
- `src/components/FadeSection.jsx` — bloques de contenido con fade-in al
  entrar en el viewport (IntersectionObserver). El texto actual es de
  ejemplo — edítalo en `src/App.jsx`.
- `src/components/Footer.jsx` — footer negro fijo, siempre visible.
- `src/index.css` — declara la fuente `Helvetica Neue Thin` desde
  `public/fonts/HelveticaNeueThin.otf` y la aplica como tipografía base.

## Notas

- El vídeo nunca se reproduce solo: está silenciado y pausado, y solo su
  fotograma cambia según el scroll.
- Si quieres que el efecto dure más recorrido de scroll, sube `lengthVh` en
  `<ScrollVideo lengthVh={350} ... />` (por ejemplo a 500).
"# gestoria-gia" 
