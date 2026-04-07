import { useLang } from '../i18n'
import './Services.css'

export default function Services() {
  const { t } = useLang()

  const services = [
    {
      icon: '🏗', title: t('svc1_title'), desc: t('svc1_desc'),
      items: [t('svc1_i1'), t('svc1_i2'), t('svc1_i3')], featured: true,
    },
    {
      icon: '🔨', title: t('svc2_title'), desc: t('svc2_desc'),
      items: [t('svc2_i1'), t('svc2_i2'), t('svc2_i3')],
    },
    {
      icon: '🏠', title: t('svc3_title'), desc: t('svc3_desc'),
      items: [t('svc3_i1'), t('svc3_i2'), t('svc3_i3')],
    },
    {
      icon: '🏢', title: t('svc4_title'), desc: t('svc4_desc'),
      items: [t('svc4_i1'), t('svc4_i2'), t('svc4_i3')],
    },
    {
      icon: '🎨', title: t('svc5_title'), desc: t('svc5_desc'),
      items: [t('svc5_i1'), t('svc5_i2'), t('svc5_i3')],
    },
    {
      icon: '🔧', title: t('svc6_title'), desc: t('svc6_desc'),
      items: [t('svc6_i1'), t('svc6_i2'), t('svc6_i3')],
    },
  ]

  return (
    <section className="services" id="services">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">{t('svc_tag')}</span>
          <h2>{t('svc_title')} <span className="gold-text">{t('svc_title_gold')}</span></h2>
          <p>{t('svc_sub')}</p>
        </div>
        <div className="services-grid">
          {services.map((s, i) => (
            <div key={i} className={`service-card reveal ${s.featured ? 'featured' : ''}`} style={{ transitionDelay: `${i * 0.07}s` }}>
              <span className="svc-icon">{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <ul className="svc-list">
                {s.items.map((item, j) => <li key={j}>{item}</li>)}
              </ul>
              {s.featured && <div className="featured-bar" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
