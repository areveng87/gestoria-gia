import { useEffect, useRef, useState } from 'react'
import './MarqueeBar.css'

const REPEATS = 8

/**
 * Icono de cursor (puntero de ratón) en rojo: indica visualmente que el
 * cintillo es clicable.
 */
function CursorIcon() {
  return (
    <svg
      className="marquee-bar__cursor"
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="#e0261f"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 3l7.07 16.97 2.51-7.39 7.39-2.51L4 3z" fill="#e0261f" />
      <path d="M13 13l6 6" />
    </svg>
  )
}

/**
 * Cintillo siempre visible, justo encima del footer: fondo blanco, letras
 * negras, con el texto desplazándose cíclicamente de derecha a izquierda sin
 * detenerse nunca. Al hacer clic: se invierten los colores (fondo negro,
 * letras blancas) durante un segundo como confirmación visual, y se lleva
 * el scroll hasta la sección de contacto.
 */
export default function MarqueeBar() {
  const [flash, setFlash] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleClick = () => {
    document.getElementById('contacto')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })

    setFlash(true)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setFlash(false), 1000)
  }

  return (
    <button
      type="button"
      className={`marquee-bar${flash ? ' marquee-bar--flash' : ''}`}
      onClick={handleClick}
      aria-label="Ir al formulario de contacto: compramos tu coche"
    >
      <div className="marquee-bar__track">
        <div className="marquee-bar__group">
          {Array.from({ length: REPEATS }).map((_, i) => (
            <span className="marquee-bar__text" key={`a-${i}`}>
              COMPRAMOS TU COCHE
              <CursorIcon />
            </span>
          ))}
        </div>
        <div className="marquee-bar__group" aria-hidden="true">
          {Array.from({ length: REPEATS }).map((_, i) => (
            <span className="marquee-bar__text" key={`b-${i}`}>
              COMPRAMOS TU COCHE
              <CursorIcon />
            </span>
          ))}
        </div>
      </div>
    </button>
  )
}
