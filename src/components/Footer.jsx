import { GitBranch, Briefcase, AtSign, Mail, Code2, Heart, ArrowUp } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Home',     href: '#home'     },
  { label: 'About',    href: '#about'    },
  { label: 'Skills',   href: '#skills'   },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact'  },
]

const SOCIAL_LINKS = [
  { icon: GitBranch, href: 'https://github.com',   label: 'GitHub',   id: 'footer-social-github'   },
  { icon: Briefcase, href: 'https://linkedin.com', label: 'LinkedIn', id: 'footer-social-linkedin' },
  { icon: AtSign,    href: 'https://twitter.com',  label: 'Twitter',  id: 'footer-social-twitter'  },
  { icon: Mail,      href: 'mailto:hello@elhussien.dev', label: 'Email', id: 'footer-social-email' },
]

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      role="contentinfo"
      style={{
        position: 'relative',
        borderTop: '1px solid var(--color-border)',
        background: 'rgba(0,0,0,0.25)',
        overflow: 'hidden',
      }}
    >
      {/* Top glow line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--color-accent), var(--color-cyan), transparent)',
        }}
      />

      <div className="section-container" style={{ paddingTop: '4rem', paddingBottom: '2.5rem' }}>
        {/* Main footer grid */}
        <div
          className="flex flex-col lg:flex-row items-start justify-between"
          style={{ gap: '3rem', marginBottom: '3rem' }}
        >
          {/* Brand column */}
          <div style={{ maxWidth: '320px' }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span
                style={{
                  width: '38px', height: '38px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, var(--color-accent), var(--color-cyan))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <Code2 size={18} color="#fff" />
              </span>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                Elhussien<span style={{ color: 'var(--color-accent-light)' }}>.</span>
              </span>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              Frontend Developer crafting pixel-perfect, high-performance web experiences with modern tools and a passion for beautiful design.
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '0.65rem' }}>
              {SOCIAL_LINKS.map(({ icon: Icon, href, label, id }) => (
                <a
                  key={id}
                  id={id}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="social-link"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation column */}
          <div>
            <h3 style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text-primary)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1.25rem' }}>
              Navigation
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {NAV_LINKS.map(l => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={e => { e.preventDefault(); document.querySelector(l.href)?.scrollIntoView({ behavior: 'smooth' }) }}
                    className="nav-link"
                    style={{ fontSize: '0.88rem' }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Stack column */}
          <div>
            <h3 style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text-primary)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1.25rem' }}>
              Built With
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', maxWidth: '240px' }}>
              {['React 19', 'Tailwind CSS v4', 'Vite 8', 'Lucide Icons', 'CSS Custom Properties'].map(tech => (
                <span
                  key={tech}
                  style={{
                    padding: '0.3rem 0.75rem',
                    borderRadius: '999px',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    background: 'var(--color-accent-dim)',
                    border: '1px solid rgba(139,92,246,0.25)',
                    color: 'var(--color-accent-light)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTA column */}
          <div>
            <h3 style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text-primary)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1.25rem' }}>
              Hire Me
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '1.25rem', maxWidth: '200px', lineHeight: 1.7 }}>
              Open to freelance projects &amp; full-time Frontend roles.
            </p>
            <a
              href="#contact"
              onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="btn-primary"
              id="footer-cta"
              style={{ padding: '0.6rem 1.4rem', fontSize: '0.82rem' }}
            >
              <span>Let&apos;s Talk</span>
              <Mail size={14} style={{ position: 'relative', zIndex: 1 }} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'var(--color-border)', marginBottom: '1.75rem' }} />

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between"
          style={{ gap: '1rem' }}
        >
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            © {year} Mohamed Elhussien · Made with{' '}
            <Heart size={13} style={{ color: '#EC4899', fill: '#EC4899' }} />{' '}
            &amp; lots of ☕
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>All rights reserved.</span>
            <button
              id="scroll-to-top"
              onClick={scrollToTop}
              aria-label="Scroll to top"
              style={{
                width: '36px', height: '36px',
                borderRadius: '10px',
                border: '1px solid var(--color-border)',
                background: 'var(--color-bg-card)',
                color: 'var(--color-text-secondary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--color-accent)'
                e.currentTarget.style.color       = 'var(--color-accent-light)'
                e.currentTarget.style.transform   = 'translateY(-3px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--color-border)'
                e.currentTarget.style.color       = 'var(--color-text-secondary)'
                e.currentTarget.style.transform   = 'none'
              }}
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
