import { useEffect, useRef, useState } from 'react'
import './ScrollVideo.css'

/**
 * Sección "pinned" que convierte el scroll vertical en el playhead de un vídeo.
 * Mientras el usuario recorre `lengthVh` viewports de alto, el vídeo se mantiene
 * fijo en pantalla (position: sticky) y su `currentTime` avanza en proporción
 * exacta al progreso de scroll dentro de la sección — el coche del vídeo gira
 * en su sitio porque eso es lo que muestra el propio clip fotograma a fotograma.
 *
 * El mapeo scroll -> currentTime se hace con un bucle continuo de
 * requestAnimationFrame (en vez de depender solo del evento "scroll"), que es
 * la técnica estándar para este efecto: no se pierde ni un frame aunque el
 * navegador coalesque o retrase los eventos de scroll.
 */
export default function ScrollVideo({
  src,
  lengthVh = 350,
  title,
  subtitle,
}) {
  const wrapperRef = useRef(null)
  const videoRef = useRef(null)
  const rafRef = useRef(null)
  const durationRef = useRef(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const video = videoRef.current
    const wrapper = wrapperRef.current
    if (!video || !wrapper) return

    const clamp = (n, min, max) => Math.min(Math.max(n, min), max)

    const setDurationFrom = (value) => {
      if (Number.isFinite(value) && value > 0) durationRef.current = value
    }

    const onLoadedMetadata = () => {
      setDurationFrom(video.duration)
      // Algunos contenedores/navegadores devuelven Infinity hasta forzar un seek
      if (!Number.isFinite(video.duration) || video.duration === Infinity) {
        try {
          video.currentTime = 1e7
        } catch {
          /* se reintenta cuando lleguen más datos */
        }
      }
    }
    const onDurationChange = () => setDurationFrom(video.duration)

    video.addEventListener('loadedmetadata', onLoadedMetadata)
    video.addEventListener('durationchange', onDurationChange)

    // Fuerza la carga de metadatos por si el navegador la había diferido
    video.preload = 'auto'
    video.load()
    if (video.readyState >= 1) onLoadedMetadata()

    const tick = () => {
      const rect = wrapper.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const scrolled = clamp(-rect.top, 0, total)
      const p = total > 0 ? scrolled / total : 0

      setProgress(p)

      const duration = durationRef.current
      if (duration > 0) {
        const targetTime = clamp(p * duration, 0, duration)
        // Evita "seeks" redundantes cuando el delta es mínimo
        if (Math.abs(video.currentTime - targetTime) > 0.016) {
          try {
            video.currentTime = targetTime
          } catch {
            /* seek en curso: se reintenta en el próximo frame */
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
      video.removeEventListener('loadedmetadata', onLoadedMetadata)
      video.removeEventListener('durationchange', onDurationChange)
    }
  }, [])

  // El texto de portada se desvanece en el primer tramo del scroll
  const overlayOpacity = Math.max(0, 1 - progress / 0.18)

  return (
    <section
      ref={wrapperRef}
      className="scroll-video"
      style={{ height: `${lengthVh}vh` }}
    >
      <div className="scroll-video__sticky">
        <video
          ref={videoRef}
          className="scroll-video__el"
          src={src}
          muted
          playsInline
          preload="auto"
          // el propio scroll controla el playhead: nunca reproduce solo
          disableRemotePlayback
        />

        {(title || subtitle) && (
          <div
            className="scroll-video__overlay"
            style={{ opacity: overlayOpacity }}
          >
            {title && <h1 className="scroll-video__title">{title}</h1>}
            {subtitle && <p className="scroll-video__subtitle">{subtitle}</p>}
          </div>
        )}

        <div className="scroll-video__hint" style={{ opacity: overlayOpacity }}>
          scroll ↓
        </div>
      </div>
    </section>
  )
}
