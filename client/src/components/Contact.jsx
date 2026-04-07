import { useState } from 'react'
import { useLang } from '../i18n'
import './Contact.css'

export default function Contact() {
  const { t } = useLang()
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name:'', phone:'', email:'', type:'', message:'' })

  const handleSubmit = (e) => { e.preventDefault(); setSent(true) }

  const opts = ['ftype_opt1','ftype_opt2','ftype_opt3','ftype_opt4','ftype_opt5','ftype_opt6']

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact-wrap">
          <div className="contact-info reveal">
            <span className="section-tag light">{t('contact_tag')}</span>
            <h2>{t('contact_title')} <span className="gold-text">{t('contact_title_gold')}</span></h2>
            <p>{t('contact_sub')}</p>
            <div className="cinfo-items">
              {[
                { icon:'📞', label: t('contact_call'),  val:'+60 12-345 6789',            href:'tel:+60123456789' },
                { icon:'✉️', label: t('contact_email'), val:'info@hsworldsdn.com',         href:'mailto:info@hsworldsdn.com' },
                { icon:'📍', label: t('contact_area'),  val: t('contact_area_val'),        href: null },
                { icon:'⏰', label: t('contact_hours'), val: t('contact_hours_val'),       href: null },
              ].map((c, i) => (
                c.href
                  ? <a key={i} href={c.href} className="cinfo-item"><span className="ci-icon">{c.icon}</span><div><strong>{c.label}</strong><span>{c.val}</span></div></a>
                  : <div key={i} className="cinfo-item"><span className="ci-icon">{c.icon}</span><div><strong>{c.label}</strong><span>{c.val}</span></div></div>
              ))}
            </div>
            <a href="https://wa.me/60123456789" target="_blank" rel="noreferrer" className="wa-btn">
              <span>💬</span> {t('contact_wa')}
            </a>
          </div>

          <div className="contact-form-wrap reveal" style={{ transitionDelay: '0.1s' }}>
            <h3>{t('form_quote_title')}</h3>
            {sent ? (
              <div className="cf-success">
                <span>✅</span>
                <h4>{t('form_fsent_h')}</h4>
                <p>{t('form_fsent_p')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>{t('form_fname')} *</label>
                    <input type="text" placeholder={t('form_fname_ph')} required value={form.name} onChange={e => setForm(f=>({...f,name:e.target.value}))} />
                  </div>
                  <div className="form-group">
                    <label>{t('form_phone')} *</label>
                    <input type="tel" placeholder={t('form_phone_ph')} required value={form.phone} onChange={e => setForm(f=>({...f,phone:e.target.value}))} />
                  </div>
                </div>
                <div className="form-group">
                  <label>{t('form_femail')}</label>
                  <input type="email" placeholder={t('form_femail_ph')} value={form.email} onChange={e => setForm(f=>({...f,email:e.target.value}))} />
                </div>
                <div className="form-group">
                  <label>{t('form_ftype')} *</label>
                  <select required value={form.type} onChange={e => setForm(f=>({...f,type:e.target.value}))}>
                    <option value="">{t('form_ftype_ph')}</option>
                    {opts.map(k => <option key={k}>{t(k)}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>{t('form_fmsg')}</label>
                  <textarea rows={4} placeholder={t('form_fmsg_ph')} value={form.message} onChange={e => setForm(f=>({...f,message:e.target.value}))} />
                </div>
                <button type="submit" className="btn-primary full-cta">{t('form_fsend')}</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
