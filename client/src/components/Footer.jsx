import { useLang } from '../i18n'
import './Footer.css'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="f-brand">
            <div className="f-logo">
              <span className="flogo-hs">H<span className="amp">&</span>S</span>
              <span className="flogo-sub">WORLD (M) SDN. BHD.</span>
            </div>
            <p>{t('footer_desc')}</p>
          </div>
          <div className="f-col">
            <h5>{t('footer_links')}</h5>
            <a href="#services">{t('nav_services')}</a>
            <a href="#why">{t('nav_why')}</a>
            <a href="#projects">{t('nav_projects')}</a>
            <a href="#reviews">{t('nav_reviews')}</a>
            <a href="#contact">{t('nav_contact')}</a>
          </div>
          <div className="f-col">
            <h5>{t('footer_services')}</h5>
            <span>{t('footer_svc1')}</span>
            <span>{t('footer_svc2')}</span>
            <span>{t('footer_svc3')}</span>
            <span>{t('footer_svc4')}</span>
          </div>
          <div className="f-col">
            <h5>{t('footer_contact')}</h5>
            <a href="tel:+60123456789">📞 +60 12-345 6789</a>
            <a href="mailto:info@hsworldsdn.com">✉ info@hsworldsdn.com</a>
            <span>📍 Selangor &amp; KL, Malaysia</span>
            <a href="https://wa.me/60123456789" className="wa-mini" target="_blank" rel="noreferrer">💬 WhatsApp</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{t('footer_copy')}</span>
          <span>{t('footer_cidb')}</span>
        </div>
      </div>
    </footer>
  )
}
