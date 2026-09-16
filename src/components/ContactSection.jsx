import { useEffect, useRef, useState } from 'react'
import './ContactSection.css'

/**
 * Sección de contacto: una tarjeta con esquinas redondeadas y fondo
 * semitransparente (efecto "glass") que combina los datos de contacto con
 * un formulario. El formulario envía el email de forma interna, mediante
 * el script `public/send-mail.php` (se copia automáticamente a `dist/` al
 * hacer `npm run build`), que usa la función mail() de PHP en el propio
 * hosting — sin abrir ninguna app de correo ni depender de un servicio
 * externo. Requiere que `send-mail.php` esté publicado en el mismo
 * dominio que la web (ver el propio archivo para más detalle).
 */
const ENDPOINT = '/send-mail.php'

export default function ContactSection() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  // idle | sending | sent | error
  const [status, setStatus] = useState('idle')

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

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.target
    const nombre = form.nombre.value.trim()
    const email = form.email.value.trim()
    const mensaje = form.mensaje.value.trim()
    const website = form.website.value // honeypot anti-spam, debe llegar vacío

    setStatus('sending')

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, mensaje, website }),
      })

      const data = await res.json().catch(() => null)

      if (res.ok && data?.ok) {
        setStatus('sent')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
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
              <a href="mailto:info@gestoriagia.es">
                info@gestoriagia.es
              </a>
            </li>
            <li>
              <a
                href="https://maps.app.goo.gl/2K36mZ1CUt9V1BwT7"
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

          {/* Honeypot anti-spam: campo oculto que un humano nunca rellena */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="contact-card__honeypot"
            aria-hidden="true"
          />

          <button type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Enviando…' : 'Enviar'}
          </button>

          {status === 'sent' && (
            <p className="contact-card__hint contact-card__hint--ok">
              Mensaje enviado. Te responderemos lo antes posible.
            </p>
          )}
          {status === 'error' && (
            <p className="contact-card__hint contact-card__hint--error">
              No se pudo enviar el mensaje. Llámanos o escríbenos directamente
              a info@gestoriagia.es.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
