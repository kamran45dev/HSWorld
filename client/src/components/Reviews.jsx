import { useState, useEffect } from 'react'
import { useLang } from '../i18n'
import './Reviews.css'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const PROJECT_TYPES_EN = [
  'New Residential Build','Home Renovation','Commercial Fit-Out',
  'Office Renovation','Interior Fit-Out','Project Management','Other',
]
const PROJECT_TYPES_BM = [
  'Bina Baharu (Kediaman)','Renovasi Rumah','Fit-Out Komersial',
  'Renovasi Pejabat','Fit-Out Dalaman','Pengurusan Projek','Lain-lain',
]

function Stars({ rating, interactive = false, onSet }) {
  const [hover, setHover] = useState(0)
  return (
    <div className={`stars-row ${interactive ? 'interactive' : ''}`}>
      {[1,2,3,4,5].map(n => (
        <button
          key={n}
          type={interactive ? 'button' : undefined}
          className={`star ${n <= (interactive ? hover || rating : rating) ? 'filled' : ''}`}
          onMouseEnter={() => interactive && setHover(n)}
          onMouseLeave={() => interactive && setHover(0)}
          onClick={() => interactive && onSet && onSet(n)}
          aria-label={`${n} star`}
        >★</button>
      ))}
    </div>
  )
}

function ReviewCard({ review, featured, t }) {
  const initials = review.name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase()
  const date = new Date(review.created_at).toLocaleDateString('en-MY', { year:'numeric', month:'short' })
  return (
    <div className={`review-card ${featured ? 'featured' : ''}`}>
      {featured && <span className="top-badge">{t('rev_top')}</span>}
      <Stars rating={review.rating} />
      <p className="review-text">"{review.review}"</p>
      <div className="reviewer">
        <div className="avatar">{initials}</div>
        <div>
          <strong>{review.name}</strong>
          <span>{review.location}</span>
        </div>
        <div className="review-meta-right">
          <span className="review-project">{review.project_type}</span>
          <span className="review-date">{date}</span>
        </div>
      </div>
    </div>
  )
}

function RatingBar({ label, count, total }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0
  return (
    <div className="rating-bar-row">
      <span className="rb-label">{label}</span>
      <div className="rb-track"><div className="rb-fill" style={{ width: `${pct}%` }} /></div>
      <span className="rb-count">{count}</span>
    </div>
  )
}

export default function Reviews() {
  const { t, lang } = useLang()
  const [reviews, setReviews] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formError, setFormError] = useState('')
  const [form, setForm] = useState({ name:'', location:'', project_type:'', rating:0, review:'' })

  const projectTypes = lang === 'bm' ? PROJECT_TYPES_BM : PROJECT_TYPES_EN

  const fetchData = async () => {
    try {
      setLoading(true)
      const [rRes, sRes] = await Promise.all([
        fetch(`${API}/api/reviews`),
        fetch(`${API}/api/reviews/stats`)
      ])
      if (!rRes.ok || !sRes.ok) throw new Error('Failed to load')
      setReviews(await rRes.json())
      setStats(await sRes.json())
    } catch (e) {
      setError(t('rev_error'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    if (form.rating === 0) return setFormError(t('err_rating'))
    if (form.review.trim().length < 10) return setFormError(t('err_short'))
    setSubmitting(true)
    try {
      const res = await fetch(`${API}/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || 'Failed') }
      setSubmitted(true)
      await fetchData()
    } catch (e) {
      setFormError(e.message)
    } finally {
      setSubmitting(false)
    }
  }

  const field = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const ratingHints = ['', t('form_rating_hint_1'), t('form_rating_hint_2'), t('form_rating_hint_3'), t('form_rating_hint_4'), t('form_rating_hint_5')]

  return (
    <section className="reviews-sec" id="reviews">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">{t('rev_tag')}</span>
          <h2>{t('rev_title')} <span className="gold-text">{t('rev_title_gold')}</span></h2>
          <p>{t('rev_sub')}</p>
        </div>

        {stats && (
          <div className="stats-panel reveal">
            <div className="stats-left">
              <div className="big-rating">{stats.average}<span>/5</span></div>
              <Stars rating={Math.round(stats.average)} />
              <p className="total-reviews">{t('rev_based').replace('{n}', stats.total)}</p>
            </div>
            <div className="stats-bars">
              {[
                { label: '5 ★', count: stats.five_star },
                { label: '4 ★', count: stats.four_star },
                { label: '3 ★', count: stats.three_star },
                { label: '2 ★', count: stats.two_star },
                { label: '1 ★', count: stats.one_star },
              ].map(r => <RatingBar key={r.label} {...r} total={stats.total} />)}
            </div>
          </div>
        )}

        {loading && <div className="reviews-loading">{t('rev_loading')}</div>}
        {error && <div className="reviews-error">⚠️ {error}</div>}
        {!loading && !error && (
          <div className="reviews-grid">
            {reviews.map((r, i) => (
              <ReviewCard key={r.id} review={r} featured={i === 0} t={t} />
            ))}
          </div>
        )}

        <div className="write-review-wrap reveal">
          {!showForm ? (
            <div className="write-prompt">
              <div>
                <h3>{t('write_h3')}</h3>
                <p>{t('write_p')}</p>
              </div>
              <button className="btn-primary" onClick={() => setShowForm(true)}>{t('write_btn')}</button>
            </div>
          ) : submitted ? (
            <div className="form-success">
              <span className="success-icon">🎉</span>
              <h3>{t('form_success_h')}</h3>
              <p>{t('form_success_p')}</p>
              <button className="btn-primary" onClick={() => { setShowForm(false); setSubmitted(false); setForm({ name:'', location:'', project_type:'', rating:0, review:'' }) }}>
                {t('form_close')}
              </button>
            </div>
          ) : (
            <form className="review-form" onSubmit={handleSubmit}>
              <div className="rf-header">
                <h3>{t('form_title')}</h3>
                <button type="button" className="close-btn" onClick={() => setShowForm(false)}>✕</button>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>{t('form_name')} *</label>
                  <input type="text" placeholder={t('form_name_ph')} required value={form.name} onChange={e => field('name', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>{t('form_loc')} *</label>
                  <input type="text" placeholder={t('form_loc_ph')} required value={form.location} onChange={e => field('location', e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label>{t('form_type')} *</label>
                <select required value={form.project_type} onChange={e => field('project_type', e.target.value)}>
                  <option value="">{t('form_type_ph')}</option>
                  {projectTypes.map(pt => <option key={pt}>{pt}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>{t('form_rating')} *</label>
                <Stars rating={form.rating} interactive onSet={v => field('rating', v)} />
                <span className="rating-hint">
                  {form.rating === 0 ? t('form_rating_hint_0') : ratingHints[form.rating]}
                </span>
              </div>
              <div className="form-group">
                <label>{t('form_review')} *</label>
                <textarea rows={4} placeholder={t('form_review_ph')} required value={form.review} onChange={e => field('review', e.target.value)} />
                <span className="char-count">{form.review.length}/2000</span>
              </div>
              {formError && <div className="form-error">⚠️ {formError}</div>}
              <button type="submit" className="btn-primary full-w" disabled={submitting}>
                {submitting ? t('form_submitting') : t('form_submit')}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
