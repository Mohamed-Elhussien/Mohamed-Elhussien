import { useRef, useState, useEffect } from 'react'
import { Mail, Send, MapPin, Clock, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react'

const INFO_CARDS = [
  { icon: Mail,    label: 'Email',    value: 'hello@elhussien.dev',  sub: 'Typically replies within 24h',  color: '#8B5CF6', id: 'contact-info-email'    },
  { icon: MapPin,  label: 'Location', value: 'Egypt 🇪🇬',           sub: 'Open to remote worldwide',      color: '#06B6D4', id: 'contact-info-location' },
  { icon: Clock,   label: 'Timezone', value: 'EET (UTC +3)',         sub: 'Available 9am – 10pm',          color: '#22C55E', id: 'contact-info-timezone' },
]

export default function Contact() {
  const ref    = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const [form,   setForm]   = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = 'Name is required'
    if (!form.email.trim())   e.email   = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleSubmit = e => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStatus('sending')
    setTimeout(() => setStatus('success'), 1800)
  }

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: '' }))
  }

  const inputStyle = hasError => ({
    width: '100%',
    padding: '0.85rem 1.1rem',
    background: 'rgba(255,255,255,0.04)',
    border: `1px solid ${hasError ? '#EF4444' : 'var(--color-border)'}`,
    borderRadius: 'var(--radius-md)',
    color: 'var(--color-text-primary)',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.9rem',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    ...(hasError ? { boxShadow: '0 0 0 3px rgba(239,68,68,0.15)' } : {}),
  })

  return (
    <section
      id="contact"
      ref={ref}
      style={{ padding: '7rem 0', position: 'relative', overflow: 'hidden', background: 'rgba(255,255,255,0.01)' }}
    >
      <div className="orb orb-purple" style={{ width: '450px', height: '450px', bottom: '-100px', right: '-100px', opacity: 0.2 }} />
      <div className="orb orb-cyan"   style={{ width: '400px', height: '400px', top: '0', left: '-120px', opacity: 0.15 }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: 'all 0.7s ease' }}>
          <span className="section-label" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            <MessageSquare size={12} />
            Get in Touch
          </span>
          <h2 style={{ marginTop: '1rem', fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', fontWeight: 800, color: 'var(--color-text-primary)' }}>
            Let&apos;s <span className="gradient-text">Work Together</span>
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '520px', margin: '1rem auto 0', fontSize: '0.95rem' }}>
            Have a project in mind or want to chat about opportunities? I&apos;d love to hear from you.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-between" style={{ gap: '3rem' }}>
          {/* LEFT – Info cards */}
          <div
            className="w-full lg:w-[38%]"
            style={{
              display: 'flex', flexDirection: 'column', gap: '1.25rem',
              opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(-24px)',
              transition: 'all 0.7s ease 0.15s',
            }}
          >
            {INFO_CARDS.map(({ icon: Icon, label, value, sub, color, id }) => (
              <div
                key={id} id={id}
                className="glass"
                style={{ borderRadius: 'var(--radius-lg)', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1.1rem', transition: 'border-color 0.3s, transform 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.transform = 'translateX(6px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.transform = 'none' }}
              >
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${color}20`, border: `1px solid ${color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>{label}</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>{value}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{sub}</div>
                </div>
              </div>
            ))}

            {/* Availability */}
            <div style={{ borderRadius: 'var(--radius-lg)', padding: '1.25rem 1.5rem', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 10px #22C55E', flexShrink: 0, animation: 'blink 2s ease infinite', display: 'inline-block' }} />
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#4ADE80' }}>Currently Available</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Open to freelance &amp; full-time roles</div>
              </div>
            </div>
          </div>

          {/* RIGHT – Form */}
          <div
            className="w-full lg:w-[60%]"
            style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(24px)', transition: 'all 0.7s ease 0.3s' }}
          >
            <div className="glass-strong" style={{ borderRadius: 'var(--radius-xl)', padding: '2.25rem' }}>
              {status === 'success' ? (
                <div style={{ textAlign: 'center', padding: '2rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                  <CheckCircle size={52} style={{ color: '#22C55E' }} />
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>Message Sent! 🎉</h3>
                  <p style={{ color: 'var(--color-text-secondary)', maxWidth: '340px' }}>
                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                  <button className="btn-secondary" style={{ marginTop: '0.5rem', cursor: 'pointer', border: '1px solid var(--color-border-hover)', borderRadius: '999px', padding: '0.7rem 1.5rem', background: 'transparent', color: 'var(--color-text-primary)', fontWeight: 600 }} onClick={() => { setStatus('idle'); setForm({ name: '', email: '', subject: '', message: '' }) }}>
                    Send Another
                  </button>
                </div>
              ) : (
                <form id="contact-form" onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {/* Name + Email */}
                  <div className="flex flex-col sm:flex-row" style={{ gap: '1.25rem' }}>
                    <div style={{ flex: 1 }}>
                      <label htmlFor="contact-name" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: '0.45rem' }}>
                        Full Name <span style={{ color: 'var(--color-accent-light)' }}>*</span>
                      </label>
                      <input id="contact-name" name="name" type="text" placeholder="John Doe" value={form.name} onChange={handleChange} style={inputStyle(!!errors.name)} />
                      {errors.name && <p style={{ color: '#EF4444', fontSize: '0.75rem', marginTop: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><AlertCircle size={12} />{errors.name}</p>}
                    </div>
                    <div style={{ flex: 1 }}>
                      <label htmlFor="contact-email" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: '0.45rem' }}>
                        Email Address <span style={{ color: 'var(--color-accent-light)' }}>*</span>
                      </label>
                      <input id="contact-email" name="email" type="email" placeholder="john@example.com" value={form.email} onChange={handleChange} style={inputStyle(!!errors.email)} />
                      {errors.email && <p style={{ color: '#EF4444', fontSize: '0.75rem', marginTop: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><AlertCircle size={12} />{errors.email}</p>}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="contact-subject" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: '0.45rem' }}>Subject</label>
                    <input id="contact-subject" name="subject" type="text" placeholder="Project inquiry / Job opportunity / Just saying hi!" value={form.subject} onChange={handleChange} style={inputStyle(false)} />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: '0.45rem' }}>
                      Message <span style={{ color: 'var(--color-accent-light)' }}>*</span>
                    </label>
                    <textarea
                      id="contact-message" name="message" rows={5}
                      placeholder="Tell me about your project, goals, and timeline…"
                      value={form.message} onChange={handleChange}
                      style={{ ...inputStyle(!!errors.message), resize: 'vertical', minHeight: '130px' }}
                    />
                    {errors.message && <p style={{ color: '#EF4444', fontSize: '0.75rem', marginTop: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><AlertCircle size={12} />{errors.message}</p>}
                  </div>

                  {/* Submit */}
                  <button
                    id="contact-submit" type="submit"
                    className="btn-primary"
                    disabled={status === 'sending'}
                    style={{ alignSelf: 'flex-start', opacity: status === 'sending' ? 0.7 : 1, cursor: status === 'sending' ? 'not-allowed' : 'pointer' }}
                  >
                    <span>{status === 'sending' ? 'Sending…' : 'Send Message'}</span>
                    <Send size={15} style={{ position: 'relative', zIndex: 1 }} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
