import { useLang } from '../i18n'
import './Hero.css'

export default function Hero() {
  const { t } = useLang()

  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <div className="hero-grid" />
        <div className="hero-orb orb1" />
        <div className="hero-orb orb2" />
      </div>

      <div className="hero-inner container">
        <div className="hero-content">
          <div className="hero-badge">{t('hero_badge')}</div>
          <h1>
            {t('hero_title_1')} <br />
            <span className="gold-text">{t('hero_title_2')}</span> {t('hero_title_3')}<br />
            <span className="outline-text">{t('hero_title_4')}</span>
          </h1>
          <p className="hero-sub">{t('hero_sub')}</p>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary">{t('hero_cta1')}</a>
            <a href="#projects" className="btn-outline">{t('hero_cta2')}</a>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num">{t('hero_stat1_num')}</span>
              <span className="stat-lbl">{t('hero_stat1_lbl')}</span>
            </div>
            <div className="stat-div" />
            <div className="stat">
              <span className="stat-num">{t('hero_stat2_num')}</span>
              <span className="stat-lbl">{t('hero_stat2_lbl')}</span>
            </div>
            <div className="stat-div" />
            <div className="stat">
              <span className="stat-num">{t('hero_stat3_num')}</span>
              <span className="stat-lbl">{t('hero_stat3_lbl')}</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card card-top">
            <div className="hcard-inner">
              <span className="hcard-icon">🏢</span>
              <div>
                <strong>{t('hero_card1_title')}</strong>
                <span>{t('hero_card1_sub')}</span>
              </div>
            </div>
            <div className="hcard-tag">{t('hero_completed')}</div>
          </div>
          <div className="hero-card card-mid">
            <div className="hcard-inner">
              <span className="hcard-icon">🏡</span>
              <div>
                <strong>{t('hero_card2_title')}</strong>
                <span>{t('hero_card2_sub')}</span>
              </div>
            </div>
            <div className="hcard-tag">{t('hero_completed')}</div>
          </div>
          <div className="hero-card card-bot">
            <div className="hcard-inner">
              <span className="hcard-icon">🔨</span>
              <div>
                <strong>{t('hero_card3_title')}</strong>
                <span>{t('hero_card3_sub')}</span>
              </div>
            </div>
            <div className="hcard-tag">{t('hero_completed')}</div>
          </div>
          <div className="hero-float-badge">
            <span className="fb-num">{t('hero_stat2_num')}</span>
            <span className="fb-lbl">{t('hero_float')}</span>
          </div>
        </div>
      </div>

      <a href="#services" className="scroll-down">
        <span>{t('scroll_label')}</span>
        <div className="scroll-line" />
      </a>
    </section>
  )
}
