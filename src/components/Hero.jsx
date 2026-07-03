import { useState, useEffect, useRef } from 'react'
import { Download, ArrowRight, GitBranch, Briefcase, AtSign } from 'lucide-react'

const ROLES = [
  'Frontend Developer',
  'React Specialist',
  'UI/UX Enthusiast',
  'Open Source Contributor',
]

const CODE_LINES = [
  { indent: 0, tokens: [{ t: 'keyword', v: 'const ' }, { t: 'var', v: 'developer' }, { t: 'op', v: ' = {' }] },
  { indent: 1, tokens: [{ t: 'prop', v: 'name' }, { t: 'op', v: ': ' }, { t: 'str', v: '"Mohamed Elhussien"' }, { t: 'op', v: ',' }] },
  { indent: 1, tokens: [{ t: 'prop', v: 'role' }, { t: 'op', v: ': ' }, { t: 'str', v: '"Frontend Developer"' }, { t: 'op', v: ',' }] },
  { indent: 1, tokens: [{ t: 'prop', v: 'stack' }, { t: 'op', v: ': [' }, { t: 'str', v: '"React"' }, { t: 'op', v: ', ' }, { t: 'str', v: '"Tailwind"' }, { t: 'op', v: '],' }] },
  { indent: 1, tokens: [{ t: 'prop', v: 'passion' }, { t: 'op', v: ': ' }, { t: 'str', v: '"Building beautiful UIs"' }, { t: 'op', v: ',' }] },
  { indent: 1, tokens: [{ t: 'fn', v: 'available' }, { t: 'op', v: ': () => ' }, { t: 'keyword', v: 'true' }] },
  { indent: 0, tokens: [{ t: 'op', v: '}' }] },
  { indent: 0, tokens: [] },
  { indent: 0, tokens: [{ t: 'comment', v: '// Currently open to opportunities 🚀' }] },
]

const TOKEN_COLORS = {
  keyword: '#C084FC',
  var:     '#60A5FA',
  prop:    '#34D399',
  str:     '#FBBF24',
  op:      '#94A3B8',
  fn:      '#F472B6',
  comment: '#4B5563',
}

export default function Hero() {
  const [roleIdx, setRoleIdx]   = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting]   = useState(false)
  const [visibleLines, setVisible] = useState(0)

  // Typing animation
  useEffect(() => {
    const target = ROLES[roleIdx]
    let timeout

    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60)
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length - 1)), 35)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIdx(i => (i + 1) % ROLES.length)
    }
    return () => clearTimeout(timeout)
  }, [displayed, deleting, roleIdx])

  // Code lines reveal
  useEffect(() => {
    const id = setInterval(() => {
      setVisible(v => {
        if (v >= CODE_LINES.length) { clearInterval(id); return v }
        return v + 1
      })
    }, 200)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        paddingTop: '70px',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient orbs */}
      <div className="orb orb-purple" style={{ width: '600px', height: '600px', top: '-150px', left: '-200px', opacity: 0.5 }} />
      <div className="orb orb-cyan"   style={{ width: '500px', height: '500px', bottom: '-100px', right: '-150px', opacity: 0.4 }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 1, paddingTop: '4rem', paddingBottom: '5rem' }}>
        <div
          className="flex flex-col lg:flex-row items-center justify-between"
          style={{ gap: '3rem' }}
        >
          {/* ── LEFT: Text ── */}
          <div className="w-full lg:w-1/2 flex flex-col" style={{ gap: '1.75rem' }}>
            {/* Badge */}
            <div className="animate-fade-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
              <span className="section-label">
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22C55E', display: 'inline-block', animation: 'blink 2s ease infinite' }} />
                Available for work
              </span>
            </div>

            {/* Heading */}
            <div className="animate-fade-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
              <h1
                style={{
                  fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                  fontWeight: 800,
                  lineHeight: 1.1,
                  color: 'var(--color-text-primary)',
                }}
              >
                Hi, I&apos;m{' '}
                <span className="gradient-text">Mohamed</span>
                <br />Elhussien
              </h1>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginTop: '1rem',
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                  fontWeight: 600,
                  color: 'var(--color-text-secondary)',
                  minHeight: '2rem',
                }}
              >
                <span style={{ color: 'var(--color-accent-light)' }}>{displayed}</span>
                <span className="cursor-blink" />
              </div>
            </div>

            {/* Description */}
            <p
              className="animate-fade-up"
              style={{
                animationDelay: '0.35s',
                opacity: 0,
                color: 'var(--color-text-secondary)',
                fontSize: '1rem',
                maxWidth: '520px',
                lineHeight: 1.8,
              }}
            >
              I craft pixel-perfect, performant user interfaces with modern web technologies.
              Obsessed with clean code, smooth animations, and outstanding user experiences.
            </p>

            {/* CTA Row */}
            <div
              className="animate-fade-up flex flex-col sm:flex-row"
              style={{ animationDelay: '0.5s', opacity: 0, gap: '1rem' }}
            >
              <a
                href="#projects"
                className="btn-primary"
                id="hero-view-work"
                onClick={e => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}
              >
                <span>View My Work</span>
                <ArrowRight size={16} style={{ position: 'relative', zIndex: 1 }} />
              </a>
              <a
                href="#"
                className="btn-secondary"
                id="hero-download-cv"
                download
              >
                <Download size={16} />
                Download CV
              </a>
            </div>

            {/* Social row */}
            <div
              className="animate-fade-up flex items-center"
              style={{ animationDelay: '0.65s', opacity: 0, gap: '0.75rem' }}
            >
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Follow</span>
              <div style={{ width: '40px', height: '1px', background: 'var(--color-border)' }} />
              {[
                { icon: GitBranch, href: 'https://github.com',   label: 'GitHub',   id: 'social-github'   },
                { icon: Briefcase, href: 'https://linkedin.com', label: 'LinkedIn', id: 'social-linkedin' },
                { icon: AtSign,    href: 'https://twitter.com',  label: 'Twitter',  id: 'social-twitter'  },
              ].map(({ icon: Icon, href, label, id }) => (
                <a key={id} id={id} href={href} target="_blank" rel="noreferrer" aria-label={label} className="social-link">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Code Window ── */}
          <div
            className="w-full lg:w-1/2 flex justify-center lg:justify-end animate-fade-up"
            style={{ animationDelay: '0.4s', opacity: 0 }}
          >
            <div
              className="code-window animate-float"
              style={{ width: '100%', maxWidth: '480px' }}
            >
              {/* Window chrome */}
              <div className="code-window-bar">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
                <span style={{ marginLeft: '0.75rem', color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
                  developer.js
                </span>
              </div>

              {/* Code body */}
              <div style={{ padding: '1.5rem', minHeight: '260px' }}>
                {CODE_LINES.slice(0, visibleLines).map((line, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      paddingLeft: `${line.indent * 1.5}rem`,
                      lineHeight: 1.9,
                      opacity: 0,
                      animation: 'fadeInUp 0.3s ease forwards',
                      animationDelay: `${i * 0.05}s`,
                    }}
                  >
                    <span style={{ color: 'var(--color-text-muted)', minWidth: '2rem', userSelect: 'none', fontSize: '0.72rem' }}>
                      {i + 1}
                    </span>
                    <span>
                      {line.tokens.length === 0
                        ? <span>&nbsp;</span>
                        : line.tokens.map((tok, j) => (
                          <span key={j} style={{ color: TOKEN_COLORS[tok.t] ?? '#94A3B8' }}>{tok.v}</span>
                        ))
                      }
                    </span>
                  </div>
                ))}
                {visibleLines < CODE_LINES.length && (
                  <div style={{ display: 'flex', paddingLeft: '2rem' }}>
                    <span className="cursor-blink" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="flex flex-col items-center animate-fade-up"
          style={{ animationDelay: '1s', opacity: 0, marginTop: '3rem', gap: '0.5rem' }}
        >
          <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Scroll</span>
          <div
            style={{
              width: '24px',
              height: '38px',
              border: '2px solid var(--color-border)',
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '6px',
            }}
          >
            <div
              style={{
                width: '4px',
                height: '8px',
                borderRadius: '2px',
                background: 'var(--color-accent)',
                animation: 'float 1.5s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
