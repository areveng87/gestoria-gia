import { useEffect, useRef, useState } from 'react'
import './ContactSection.css'

/**
 * Sección de contacto: una tarjeta con esquinas redondeadas y fondo
 * semitransparente (efecto "glass") que combina los datos de contacto con
 * un formulario. Sin backend propio, el formulario abre el cliente de
 * correo del usuario con los datos ya rellenados (mailto:) — si más
 * adelante se conecta un servicio de envío (Formspree, EmailJS, un
 * endpoint propio…), basta con sustituir `handleSubmit`.
 */
export default function ContactSection() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15, rootMargin: '-8% 0px -8% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.target
    const nombre = form.nombre.value.trim()
    const email = form.email.value.trim()
    const mensaje = form.mensaje.value.trim()

    const subject = encodeURIComponent(`Consulta desde la web — ${nombre || 'Sin nombre'}`)
    const body = encodeURIComponent(`Nombre: ${nombre}\nEmail: ${email}\n\n${mensaje}`)

    window.location.href = `mailto:gestorautomovil65@gmail.com?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <section
      id="contacto"
      ref={ref}
      className={`contact-section ${visible ? 'is-visible' : ''}`}
    >
      <div className="contact-card">
        <div className="contact-card__info">
          <span className="contact-card__eyebrow">Contacto</span>
          <h2 className="contact-card__title">¿Hablamos de tu trámite?</h2>

          <ul className="contact-card__list">
            <li>
              Llama e infórmate: <a href="tel:+34915772667">915 77 26 67</a>
            </li>
            <li>
              WhatsApp (compro tu coche):{' '}
              <a href="https://wa.me/34635560497" target="_blank" rel="noreferrer">
                635 56 04 97
              </a>
            </li>
            <li>
              <a href="mailto:gestorautomovil65@gmail.com">
                gestorautomovil65@gmail.com
              </a>
            </li>
            <li>
              <a
                href="https://www.google.com/maps/place/Compramos+Tu+coche/@40.3920066,-3.6489924,3a,75y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgIDlt8bicQ!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAHRPTWmLP8bojixVMDVEis6N-pZvBOx1FneFVFxHZnCImurW2-RkQS7ja9h6g7XNDFNNtYGf2sQWe-Rfw-2p2PS9YrXmsmCA95KZd-TAaqa-ZZasWli2tDBzapGw7ooJx3ObmB_9XTmC%3Dw152-h86-k-no!7i2048!8i1152!4m16!1m8!3m7!1s0xd4225c24d87b93f:0x86f259d8272f931a!2sC.+de+Carlos+Sol%C3%A9,+58,+Loc+1,+Puente+de+Vallecas,+28038+Madrid!3b1!8m2!3d40.3918826!4d-3.6490105!16s%2Fg%2F11vlz4qdyc!3m6!1s0xd4225cd6971d459:0xb9c724bd840ecc1f!8m2!3d40.3918826!4d-3.6490105!10e5!16s%2Fg%2F11y225w8g0?entry=ttu&g_ep=EgoyMDI2MDkxMy4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noreferrer"
              >
                C. de Carlos Solé, 58, Loc 1, Puente de Vallecas, 28038 Madrid
              </a>
            </li>
            <li>Atendemos los 365 días del año</li>
          </ul>
        </div>

        <form className="contact-card__form" onSubmit={handleSubmit}>
          <label>
            Nombre
            <input type="text" name="nombre" autoComplete="name" required />
          </label>
          <label>
            Email
            <input type="email" name="email" autoComplete="email" required />
          </label>
          <label>
            Mensaje
            <textarea name="mensaje" rows={4} required />
          </label>
          <button type="submit">Enviar</button>
          {sent && (
            <p className="contact-card__hint">
              Se abrirá tu programa de correo con el mensaje listo para enviar.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
