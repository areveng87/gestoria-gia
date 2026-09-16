import { useEffect, useRef, useState } from 'react'
import './ContactSection.css'
import PrivacyPolicyModal from './PrivacyPolicyModal'

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
  const [showPrivacy, setShowPrivacy] = useState(false)

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
    const telefono = form.telefono.value.trim()
    const email = form.email.value.trim()
    const provincia = form.provincia.value
    const marca = form.marca.value
    const modelo = form.modelo.value.trim()
    const anio = form.anio.value.trim()
    const kilometraje = form.kilometraje.value.trim()
    const estado = form.estado.value
    const website = form.website.value // honeypot anti-spam, debe llegar vacío

    setStatus('sending')

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          telefono,
          email,
          provincia,
          marca,
          modelo,
          anio,
          kilometraje,
          estado,
          website,
        }),
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
          <div className="contact-card__form-row">
            <label>
              Nombre
              <input type="text" name="nombre" autoComplete="name" required />
            </label>
            <label>
              Teléfono
              <input type="tel" name="telefono" autoComplete="tel" required />
            </label>
          </div>

          <div className="contact-card__form-row">
            <label>
              Email
              <input type="email" name="email" autoComplete="email" required />
            </label>
            <label>
              Provincia
              <select name="provincia" defaultValue="Madrid">
                <option value="Madrid">Madrid</option>
                <option value="Toledo">Toledo</option>
                <option value="Guadalajara">Guadalajara</option>
                <option value="Otra">Otra provincia</option>
              </select>
            </label>
          </div>

          <div className="contact-card__form-row">
            <label>
              Marca
              <select name="marca" defaultValue="" required>
                <option value="" disabled>
                  Selecciona tu marca
                </option>
                <option>Alfa Romeo</option>
                <option>Audi</option>
                <option>BMW</option>
                <option>Citroën</option>
                <option>Cupra</option>
                <option>Fiat</option>
                <option>Ford</option>
                <option>Hyundai</option>
                <option>Kia</option>
                <option>Mercedes-Benz</option>
                <option>Nissan</option>
                <option>Opel</option>
                <option>Peugeot</option>
                <option>Porsche</option>
                <option>Renault</option>
                <option>Seat</option>
                <option>Skoda</option>
                <option>Toyota</option>
                <option>Volkswagen</option>
                <option>Volvo</option>
                <option value="Otra">Otra marca / Furgoneta</option>
              </select>
            </label>
            <label>
              Modelo
              <input type="text" name="modelo" placeholder="Ej: A3 / Focus" required />
            </label>
          </div>

          <div className="contact-card__form-row">
            <label>
              Año
              <input type="number" name="anio" placeholder="Ej: 2018" min="1950" max="2100" />
            </label>
            <label>
              Kilometraje
              <input type="number" name="kilometraje" placeholder="Ej: 95000" min="0" />
            </label>
          </div>

          <label>
            Estado del vehículo / Observaciones
            <select name="estado" defaultValue="" required>
              <option value="" disabled>
                Selecciona una opción
              </option>
              <option>Perfecto estado con ITV</option>
              <option value="Sin ITV / Averiado">Sin ITV o con desperfectos</option>
              <option>Interesado en alta gama a la carta</option>
            </select>
          </label>

          <label className="contact-card__checkbox">
            <input type="checkbox" name="privacidad" required />
            <span>
              He leído y acepto la{' '}
              <a
                href="/politica-privacidad"
                onClick={(event) => {
                  event.preventDefault()
                  setShowPrivacy(true)
                }}
              >
                Política de Privacidad
              </a>
            </span>
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
            {status === 'sending' ? 'Enviando…' : 'Tasar mi coche'}
          </button>

          {status === 'sent' && (
            <p className="contact-card__hint contact-card__hint--ok">
              Solicitud enviada. Te responderemos lo antes posible.
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

      <PrivacyPolicyModal open={showPrivacy} onClose={() => setShowPrivacy(false)} />
    </section>
  )
}
