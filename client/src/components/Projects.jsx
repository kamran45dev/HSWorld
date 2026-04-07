import { useLang } from '../i18n'
import './Projects.css'

export default function Projects() {
  const { t } = useLang()

  const projects = [
    {
      type: t('residential'), typeKey: 'residential',
      location: t('proj1_loc'), title: t('proj1_title'),
      before: { icon: '🏚', label: t('proj1_b') },
      after:  { icon: '🏡', label: t('proj1_a') },
      meta: [t('proj1_m1'), t('proj1_m2'), t('proj1_m3')],
    },
    {
      type: t('commercial'), typeKey: 'commercial',
      location: t('proj2_loc'), title: t('proj2_title'),
      before: { icon: '🏚', label: t('proj2_b') },
      after:  { icon: '🍽', label: t('proj2_a') },
      meta: [t('proj2_m1'), t('proj2_m2'), t('proj2_m3')],
    },
    {
      type: t('residential'), typeKey: 'residential',
      location: t('proj3_loc'), title: t('proj3_title'),
      before: { icon: '🏠', label: t('proj3_b') },
      after:  { icon: '✨', label: t('proj3_a') },
      meta: [t('proj3_m1'), t('proj3_m2'), t('proj3_m3')],
    },
  ]

  return (
    <section className="projects" id="projects">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">{t('proj_tag')}</span>
          <h2>{t('proj_title')} <span className="gold-text">{t('proj_title_gold')}</span></h2>
          <p>{t('proj_sub')}</p>
        </div>
        <div className="ba-grid">
          {projects.map((p, i) => (
            <div key={i} className="ba-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="ba-top">
                <span className={`ptype ${p.typeKey}`}>{p.type}</span>
                <span className="ploc">📍 {p.location}</span>
              </div>
              <h3 className="ba-title">{p.title}</h3>
              <div className="ba-compare">
                <div className="ba-side">
                  <div className="ba-img before-img">
                    <span className="ba-big-icon">{p.before.icon}</span>
                    <span className="ba-img-lbl">{p.before.label}</span>
                  </div>
                  <span className="ba-tag btag">{t('before_lbl')}</span>
                </div>
                <span className="ba-arrow">→</span>
                <div className="ba-side">
                  <div className="ba-img after-img">
                    <span className="ba-big-icon">{p.after.icon}</span>
                    <span className="ba-img-lbl">{p.after.label}</span>
                  </div>
                  <span className="ba-tag atag">{t('after_lbl')}</span>
                </div>
              </div>
              <div className="ba-meta">
                {p.meta.map((m, j) => <span key={j}>{m}</span>)}
              </div>
            </div>
          ))}
        </div>
        <div className="projects-cta reveal">
          <p>{t('proj_cta_text')}</p>
          <a href="#contact" className="btn-primary">{t('proj_cta_btn')}</a>
        </div>
      </div>
    </section>
  )
}
