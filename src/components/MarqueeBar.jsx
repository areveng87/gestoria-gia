import './MarqueeBar.css'

const REPEATS = 8

/**
 * Cintillo siempre visible, justo encima del footer: fondo blanco, letras
 * negras, con el texto desplazándose cíclicamente de derecha a izquierda.
 * Al hacer clic, lleva el scroll hasta la sección de contacto.
 */
export default function MarqueeBar() {
  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <button
      type="button"
      className="marquee-bar"
      onClick={scrollToContact}
      aria-label="Ir al formulario de contacto: compramos tu coche"
    >
      <div className="marquee-bar__track">
        <div className="marquee-bar__group">
          {Array.from({ length: REPEATS }).map((_, i) => (
            <span className="marquee-bar__text" key={`a-${i}`}>
              COMPRAMOS TU COCHE
            </span>
          ))}
        </div>
        <div className="marquee-bar__group" aria-hidden="true">
          {Array.from({ length: REPEATS }).map((_, i) => (
            <span className="marquee-bar__text" key={`b-${i}`}>
              COMPRAMOS TU COCHE
            </span>
          ))}
        </div>
      </div>
    </button>
  )
}
