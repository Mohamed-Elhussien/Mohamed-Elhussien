import { useEffect, useRef, useState } from 'react'
import { User, MapPin, Calendar, Coffee } from 'lucide-react'

const STATS = [
  { number: '2+',  label: 'Years Experience', icon: Calendar },
  { number: '20+', label: 'Projects Built',   icon: Coffee   },
  { number: '10+', label: 'Technologies',     icon: User     },
  { number: '∞',   label: 'Lines of Code',    icon: MapPin   },
]

const INFO_ITEMS = [
  { label: 'Name',     value: 'Mohamed Elhussien' },
  { label: 'Role',     value: 'Frontend Developer' },
  { label: 'Location', value: 'Egypt 🇪🇬' },
  { label: 'Email',    value: 'hello@elhussien.dev' },
  { label: 'Status',   value: '✅ Available for hire' },
]

function useInView(ref, threshold = 0.2) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref, threshold])
  return inView
}

export default function About() {
  const sectionRef = useRef(null)
  const inView     = useInView(sectionRef)

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ padding: '7rem 0', position: 'relative', overflow: 'hidden' }}
    >
      {/* Background orbs */}
      <div className="orb orb-cyan"   style={{ width: '400px', height: '400px', top: '10%', right: '-100px', opacity: 0.25 }} />
      <div className="orb orb-purple" style={{ width: '350px', height: '350px', bottom: '5%', left: '-80px',  opacity: 0.2  }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '4rem',
            opacity: inView ? 1 : 0,
            transform: inView ? 'none' : 'translateY(24px)',
            transition: 'all 0.7s ease',
          }}
        >
          <span className="section-label" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            <User size={12} />
            About Me
          </span>
          <h2
            style={{
              marginTop: '1rem',
              fontSize: 'clamp(1.9rem, 4vw, 2.8rem)',
              fontWeight: 800,
              color: 'var(--color-text-primary)',
            }}
          >
            Who I <span className="gradient-text">Am</span>
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '540px', margin: '1rem auto 0', fontSize: '0.95rem' }}>
            Passionate about crafting experiences that live at the intersection of design and code.
          </p>
        </div>

        {/* Two-column layout */}
        <div
          className="flex flex-col lg:flex-row items-start justify-between"
          style={{ gap: '3.5rem' }}
        >
          {/* ── LEFT: Bio + Info ── */}
          <div
            className="w-full lg:w-1/2"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'none' : 'translateX(-32px)',
              transition: 'all 0.8s ease 0.15s',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.75rem',
            }}
          >
            {/* Avatar + name card */}
            <div
              className="glass-strong"
              style={{
                borderRadius: 'var(--radius-xl)',
                padding: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  flexShrink: 0,
                  background: 'linear-gradient(135deg, var(--color-accent), var(--color-cyan))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: '#fff',
                  border: '3px solid rgba(255,255,255,0.15)',
                  boxShadow: '0 0 30px var(--color-accent-glow)',
                }}
              >
                ME
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  Mohamed Elhussien
                </h3>
                <p style={{ color: 'var(--color-accent-light)', fontSize: '0.875rem', fontWeight: 500 }}>
                  Frontend Developer
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.4rem' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22C55E', animation: 'blink 2s ease infinite', display: 'inline-block' }} />
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '0.78rem' }}>Open to opportunities</span>
                </div>
              </div>
            </div>

            {/* Bio paragraphs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.9 }}>
                I&apos;m a <span style={{ color: 'var(--color-accent-light)', fontWeight: 600 }}>Frontend Developer</span> who transforms
                design concepts into fast, accessible, and visually stunning digital products. I live for the details —
                the micro-animation that delights, the layout that guides, the color that communicates.
              </p>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.9 }}>
                My core stack revolves around <span style={{ color: 'var(--color-cyan)', fontWeight: 600 }}>React</span> and{' '}
                <span style={{ color: 'var(--color-accent-light)', fontWeight: 600 }}>Tailwind CSS</span>, but I&apos;m always
                expanding my toolkit. When I&apos;m not coding, you&apos;ll find me exploring design systems or contributing to open-source.
              </p>
            </div>

            {/* Info table */}
            <div
              className="glass"
              style={{ borderRadius: 'var(--radius-lg)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
            >
              {INFO_ITEMS.map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingBottom: '0.6rem',
                    borderBottom: '1px solid var(--color-border)',
                  }}
                >
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</span>
                  <span style={{ color: 'var(--color-text-primary)', fontSize: '0.88rem', fontWeight: 500 }}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Stats Grid ── */}
          <div
            className="w-full lg:w-1/2"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'none' : 'translateX(32px)',
              transition: 'all 0.8s ease 0.3s',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.75rem',
            }}
          >
            {/* Stats 2×2 grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem',
              }}
            >
              {STATS.map(({ number, label, icon: Icon }, i) => (
                <div
                  key={label}
                  className="stat-card"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'none' : 'translateY(20px)',
                    transition: `all 0.6s ease ${0.4 + i * 0.1}s`,
                  }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: 'var(--color-accent-dim)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '0.75rem',
                    }}
                  >
                    <Icon size={20} style={{ color: 'var(--color-accent-light)' }} />
                  </div>
                  <div className="stat-number">{number}</div>
                  <div className="stat-label">{label}</div>
                </div>
              ))}
            </div>

            {/* Philosophy quote */}
            <div
              className="glass-strong"
              style={{
                borderRadius: 'var(--radius-xl)',
                padding: '2rem',
                borderLeft: '3px solid var(--color-accent)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1.5rem',
                  fontSize: '5rem',
                  lineHeight: 1,
                  color: 'var(--color-accent-dim)',
                  fontFamily: 'Georgia, serif',
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              >
                &ldquo;
              </div>
              <p
                style={{
                  fontSize: '1rem',
                  fontStyle: 'italic',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.9,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                Clean code isn&apos;t just about working software — it&apos;s about crafting experiences that users
                fall in love with, one pixel at a time.
              </p>
              <div
                style={{
                  marginTop: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <div style={{ width: '32px', height: '2px', background: 'linear-gradient(90deg, var(--color-accent), var(--color-cyan))' }} />
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-accent-light)' }}>Mohamed Elhussien</span>
              </div>
            </div>

            {/* CTA row */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href="#contact"
                className="btn-primary"
                id="about-cta-contact"
                onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
              >
                <span>Let&apos;s Connect</span>
              </a>
              <a
                href="#projects"
                className="btn-secondary"
                id="about-cta-projects"
                onClick={e => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}
              >
                See My Work
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
