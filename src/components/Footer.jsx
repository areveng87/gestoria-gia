import './Footer.css'

export default function Footer() {
  return (
    <footer className="site-footer">
      <span className="site-footer__brand">Gestoría G.I.A · Gestiones del Automóvil</span>
      <a className="site-footer__contact" href="tel:+34915772667">
        915 77 26 67
      </a>
      <span className="site-footer__copy">
        © {new Date().getFullYear()} Todos los derechos reservados
      </span>
    </footer>
  )
}
