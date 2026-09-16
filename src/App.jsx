import VideoBackground from './components/VideoBackground.jsx'
import FadeSection from './components/FadeSection.jsx'
import ContactSection from './components/ContactSection.jsx'
import MarqueeBar from './components/MarqueeBar.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <>
      <VideoBackground src="/video/seat-leon.mp4" />

      <main className="content">
        <FadeSection
          variant="hero"
          align="center"
          title="Gestoría G.I.A"
          hint="scroll ↓"
        >
          <p>Gestiones del automóvil</p>
        </FadeSection>

        <FadeSection eyebrow="Quiénes somos" title="Tu gestoría de confianza para todo lo relacionado con tu vehículo">
          <p>
            En Gestoría G.I.A gestionamos todos los trámites de tu vehículo:
            transferencias, bajas, notificaciones, gestión fiscal, laboral y
            contable, y toda la gestión integral ante la DGT.
          </p>
          <p>
            Todo se puede tramitar vía WhatsApp, sin necesidad de moverte de
            casa. Atendemos los 365 días del año.
          </p>
        </FadeSection>

        <FadeSection eyebrow="Servicios" title="Transferencias, bajas y notificaciones" align="right">
          <p>
            Transferencias de titularidad, bajas definitivas o temporales y
            notificaciones de venta, con gestión integral ante la Dirección
            General de Tráfico (DGT).
          </p>
        </FadeSection>

        <FadeSection eyebrow="Servicios" title="Fiscal, laboral y contable">
          <p>
            Además de los trámites del vehículo, te ayudamos con la gestión
            fiscal, laboral y contable de tu negocio o actividad.
          </p>
        </FadeSection>

        <FadeSection eyebrow="Servicios" title="Compraventa de vehículos" align="right">
          <p>
            Te acompañamos en la compraventa de tu vehículo, incluida la
            compra de vehículos en subastas.
          </p>
        </FadeSection>

        <FadeSection eyebrow="Compro tu coche" title="Vendemos tu coche con la máxima tasación">
          <p>
            Compramos motos, turismos, clásicos, furgonetas, camiones,
            monovolúmenes y 4x4, en cualquier estado, con o sin ITV —
            incluidos vehículos con problemas de documentación, embargos o
            reservas.
          </p>
          <p>
            Tasación a domicilio y baja gratuita en la DGT. Contacta con
            Rafael por WhatsApp:{' '}
            <a href="https://wa.me/34635560497" target="_blank" rel="noreferrer">
              635 56 04 97
            </a>
            .
          </p>
        </FadeSection>

        <ContactSection />
      </main>

      <MarqueeBar />
      <Footer />
    </>
  )
}

export default App
