import { useLang } from '../i18n'
import './WhyUs.css'

export default function WhyUs() {
  const { t } = useLang()

  const reasons = [
    { icon: '🏆', title: t('why1_title'), desc: t('why1_desc') },
    { icon: '📋', title: t('why2_title'), desc: t('why2_desc') },
    { icon: '⏰', title: t('why3_title'), desc: t('why3_desc') },
    { icon: '💰', title: t('why4_title'), desc: t('why4_desc') },
    { icon: '🔍', title: t('why5_title'), desc: t('why5_desc') },
    { icon: '🤝', title: t('why6_title'), desc: t('why6_desc') },
  ]

  return (
    <section className="whyus" id="why">
      <div className="whyus-bg" />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-header dark reveal">
          <span className="section-tag light">{t('why_tag')}</span>
          <h2>{t('why_title')} <span className="gold-text">{t('why_title_gold')}</span> {t('why_title_2')}</h2>
          <p>{t('why_sub')}</p>
        </div>
        <div className="why-grid">
          {reasons.map((r, i) => (
            <div key={i} className="why-card reveal" style={{ transitionDelay: `${i * 0.07}s` }}>
              <span className="why-icon">{r.icon}</span>
              <h4>{r.title}</h4>
              <p>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
