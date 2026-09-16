import { useEffect } from 'react'
import './PrivacyPolicyModal.css'

/**
 * Modal con la Política de Privacidad. Se abre desde el checkbox de
 * consentimiento del formulario de contacto, sin necesidad de una ruta
 * aparte (evita problemas de 404 en el hosting estático al refrescar en
 * /politica-privacidad, ya que la web no usa un router).
 *
 * IMPORTANTE: los datos fiscales (NIF/CIF y denominación exacta del
 * responsable) están marcados como [PENDIENTE] — sustitúyelos por los
 * datos reales de la gestoría antes de publicar.
 */
export default function PrivacyPolicyModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="privacy-modal__overlay"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="privacy-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="privacy-modal__close"
          onClick={onClose}
          aria-label="Cerrar política de privacidad"
        >
          ×
        </button>

        <div className="privacy-modal__body">
          <h2 id="privacy-modal-title">Política de Privacidad</h2>
          <p className="privacy-modal__updated">Última actualización: septiembre de 2026</p>

          <h3>1. Responsable del tratamiento</h3>
          <p>
            Gestoría G.I.A (en adelante, «el Responsable») es el titular y
            responsable del tratamiento de los datos personales recabados a
            través de este sitio web.
          </p>
          <ul>
            <li>NIF/CIF: [PENDIENTE — completar con el dato real]</li>
            <li>Domicilio: C. de Carlos Solé, 58, Local 1, 28038 Madrid</li>
            <li>Teléfono: 915 77 26 67</li>
            <li>Email: info@gestoriagia.es</li>
          </ul>

          <h3>2. Finalidad del tratamiento</h3>
          <p>
            Los datos facilitados a través del formulario de contacto y
            tasación (nombre, teléfono, email, provincia y datos del
            vehículo: marca, modelo, año, kilometraje y estado) se utilizan
            exclusivamente para:
          </p>
          <ul>
            <li>Atender tu solicitud de información o de tasación de vehículo.</li>
            <li>Contactar contigo por teléfono, email o WhatsApp para gestionar tu trámite o la compraventa de tu coche.</li>
            <li>Elaborar, si procede, una valoración u oferta económica sobre el vehículo indicado.</li>
          </ul>

          <h3>3. Legitimación</h3>
          <p>
            La base legal para el tratamiento de tus datos es tu
            consentimiento expreso, otorgado al marcar la casilla de
            aceptación y enviar el formulario, así como la ejecución de
            medidas precontractuales a petición tuya (preparar una
            tasación u oferta).
          </p>

          <h3>4. Conservación de los datos</h3>
          <p>
            Los datos se conservarán mientras exista una relación comercial
            o de gestión contigo y, posteriormente, durante los plazos
            legalmente exigibles para atender eventuales responsabilidades.
            Si no llegas a formalizar ningún trámite u operación, los datos
            se conservarán únicamente el tiempo necesario para gestionar tu
            consulta y se eliminarán a partir de entonces.
          </p>

          <h3>5. Destinatarios</h3>
          <p>
            Los datos no se ceden a terceros, salvo obligación legal. No se
            realizan transferencias internacionales de datos. El envío del
            formulario utiliza un script propio alojado en el mismo
            servidor de la gestoría, sin depender de servicios externos de
            terceros.
          </p>

          <h3>6. Tus derechos</h3>
          <p>
            Puedes ejercer tus derechos de acceso, rectificación,
            supresión, oposición, limitación del tratamiento y portabilidad
            de tus datos escribiendo a{' '}
            <a href="mailto:info@gestoriagia.es">info@gestoriagia.es</a>,
            indicando el derecho que deseas ejercer y adjuntando copia de
            un documento que acredite tu identidad. También tienes derecho
            a presentar una reclamación ante la Agencia Española de
            Protección de Datos (www.aepd.es) si consideras que el
            tratamiento no se ajusta a la normativa vigente.
          </p>

          <h3>7. Seguridad</h3>
          <p>
            Se han adoptado las medidas técnicas y organizativas necesarias
            para garantizar la seguridad e integridad de los datos
            personales, así como para evitar su alteración, pérdida,
            tratamiento o acceso no autorizado.
          </p>

          <h3>8. Cambios en esta política</h3>
          <p>
            Esta Política de Privacidad puede actualizarse para adaptarse a
            futuros cambios legislativos o en la forma en que se prestan
            los servicios. Se recomienda revisar esta página periódicamente.
          </p>
        </div>
      </div>
    </div>
  )
}
