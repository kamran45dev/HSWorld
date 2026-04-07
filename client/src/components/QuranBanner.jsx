import { useLang } from '../i18n'
import './QuranBanner.css'

export default function QuranBanner() {
  const { t } = useLang()

  return (
    <section className="quran-section">
      <div className="qb-bg">
        <div className="qb-pattern" />
        <div className="qb-glow" />
      </div>

      <div className="container qb-inner">
        {/* Left ornament */}
        <div className="qb-ornament left-orn">
          <svg viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M40 5 Q10 30 10 60 Q10 90 40 115 Q70 90 70 60 Q70 30 40 5Z" stroke="#c9a84c" strokeWidth="1.5" fill="none" opacity="0.5"/>
            <path d="M40 20 Q20 40 20 60 Q20 80 40 100 Q60 80 60 60 Q60 40 40 20Z" stroke="#c9a84c" strokeWidth="1" fill="none" opacity="0.35"/>
            <circle cx="40" cy="60" r="5" fill="#c9a84c" opacity="0.6"/>
            <circle cx="40" cy="20" r="3" fill="#c9a84c" opacity="0.4"/>
            <circle cx="40" cy="100" r="3" fill="#c9a84c" opacity="0.4"/>
          </svg>
        </div>

        <div className="qb-content reveal">
          <span className="qb-label">{t('quran_label')}</span>

          {/* Arabic text */}
          <div className="qb-arabic-wrap">
            <div className="qb-arabic-line top-line" />
            <p className="qb-arabic" lang="ar" dir="rtl">
              {t('quran_arabic')}
            </p>
            <div className="qb-arabic-line bottom-line" />
          </div>

          {/* Translation */}
          <p className="qb-translation">
            {t('quran_translation')}
          </p>

          <p className="qb-ref">{t('quran_ref')}</p>

          {/* Divider */}
          <div className="qb-divider">
            <span className="qb-diamond">◆</span>
          </div>

          {/* Body text */}
          <p className="qb-body">{t('quran_body')}</p>
        </div>

        {/* Right ornament */}
        <div className="qb-ornament right-orn">
          <svg viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M40 5 Q10 30 10 60 Q10 90 40 115 Q70 90 70 60 Q70 30 40 5Z" stroke="#c9a84c" strokeWidth="1.5" fill="none" opacity="0.5"/>
            <path d="M40 20 Q20 40 20 60 Q20 80 40 100 Q60 80 60 60 Q60 40 40 20Z" stroke="#c9a84c" strokeWidth="1" fill="none" opacity="0.35"/>
            <circle cx="40" cy="60" r="5" fill="#c9a84c" opacity="0.6"/>
            <circle cx="40" cy="20" r="3" fill="#c9a84c" opacity="0.4"/>
            <circle cx="40" cy="100" r="3" fill="#c9a84c" opacity="0.4"/>
          </svg>
        </div>
      </div>
    </section>
  )
}
