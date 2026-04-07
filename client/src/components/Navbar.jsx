import { useState, useEffect } from 'react'
import { useLang } from '../i18n'
import './Navbar.css'

export default function Navbar() {
  const { lang, setLang, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#services', label: t('nav_services') },
    { href: '#why',      label: t('nav_why') },
    { href: '#projects', label: t('nav_projects') },
    { href: '#reviews',  label: t('nav_reviews') },
  ]

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#hero" className="logo">
          <span className="logo-hs">H<span className="amp">&</span>S</span>
          <span className="logo-sub">WORLD (M) SDN. BHD.</span>
        </a>
        <ul className="nav-links">
          {links.map(l => (
            <li key={l.href}><a href={l.href}>{l.label}</a></li>
          ))}
          <li>
            <button
              className="lang-toggle"
              onClick={() => setLang(lang === 'en' ? 'bm' : 'en')}
              aria-label="Toggle language"
            >
              <span className={lang === 'en' ? 'active' : ''}>EN</span>
              <span className="lang-sep">|</span>
              <span className={lang === 'bm' ? 'active' : ''}>BM</span>
            </button>
          </li>
          <li><a href="#contact" className="nav-cta">{t('nav_contact')}</a></li>
        </ul>
        <div className="nav-right-mobile">
          <button
            className="lang-toggle mobile-lang"
            onClick={() => setLang(lang === 'en' ? 'bm' : 'en')}
          >
            <span className={lang === 'en' ? 'active' : ''}>EN</span>
            <span className="lang-sep">|</span>
            <span className={lang === 'bm' ? 'active' : ''}>BM</span>
          </button>
          <button className={`hamburger ${open ? 'active' : ''}`} onClick={() => setOpen(!open)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </div>
      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        {links.map(l => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
        ))}
        <a href="#contact" className="mobile-cta" onClick={() => setOpen(false)}>{t('nav_contact')}</a>
      </div>
    </nav>
  )
}
