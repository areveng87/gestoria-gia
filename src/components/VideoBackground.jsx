import { useEffect, useRef } from 'react'
import './VideoBackground.css'

/**
 * Vídeo de fondo, fijo a pantalla completa durante TODO el recorrido de la
 * página. Su `currentTime` se sincroniza con el scroll global del documento
 * (0 = arriba del todo, duration = abajo del todo) mediante un bucle
 * continuo de requestAnimationFrame — el coche gira en su sitio porque eso
 * es lo que muestra el propio clip fotograma a fotograma, y el contenido
 * (título, servicios, contacto) se superpone encima con fade mientras
 * scrolleas.
 *
 * Para que el scrubbing se vea fluido, el vídeo debe estar codificado con un
 * keyframe por fotograma (ver public/video/seat-leon.mp4) — si no, el
 * navegador tiene que redecodificar una cadena larga de fotogramas en cada
 * salto y se nota a tirones. Además del vídeo optimizado, aquí suavizamos el
 * movimiento con un pequeño "lerp" hacia el tiempo objetivo en vez de saltar
 * directamente, para que no se note el paso entre fotogramas.
 */
export default function VideoBackground({ src }) {
  const videoRef = useRef(null)
  const rafRef = useRef(null)
  const durationRef = useRef(0)
  const currentRef = useRef(0)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

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

    video.preload = 'auto'
    video.load()
    if (video.readyState >= 1) onLoadedMetadata()

    const tick = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = clamp(window.scrollY, 0, total)
      const p = total > 0 ? scrolled / total : 0

      const duration = durationRef.current
      if (duration > 0) {
        const targetTime = clamp(p * duration, 0, duration)
        // Suaviza el movimiento acercándose al objetivo en vez de saltar de golpe
        const next = currentRef.current + (targetTime - currentRef.current) * 0.35
        currentRef.current = Math.abs(targetTime - next) < 0.01 ? targetTime : next

        if (Math.abs(video.currentTime - currentRef.current) > 0.008) {
          try {
            video.currentTime = currentRef.current
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

  return (
    <div className="video-bg">
      <video
        ref={videoRef}
        className="video-bg__el"
        src={src}
        muted
        playsInline
        preload="auto"
        disableRemotePlayback
      />
      <div className="video-bg__scrim" />
    </div>
  )
}
