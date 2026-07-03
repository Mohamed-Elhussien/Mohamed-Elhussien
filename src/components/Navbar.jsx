import { useState, useEffect } from 'react'
import { Menu, X, Code2 } from 'lucide-react'

const LINKS = [
  { label: 'Home',     href: '#home'    },
  { label: 'About',    href: '#about'   },
  { label: 'Skills',   href: '#skills'  },
  { label: 'Projects', href: '#projects'},
  { label: 'Contact',  href: '#contact' },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [activeLink, setActive]   = useState('#home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = LINKS.map(l => document.querySelector(l.href)).filter(Boolean)
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive('#' + e.target.id) })
      },
      { threshold: 0.45 }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const handleLinkClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    setActive(href)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      role="banner"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.3s ease',
        ...(scrolled
          ? { background: 'rgba(8,11,20,0.8)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid var(--color-border)' }
          : { background: 'transparent' }
        ),
      }}
    >
      <div className="section-container">
        <nav
          className="flex justify-between items-center"
          style={{ height: '70px' }}
          aria-label="Main navigation"
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={e => handleLinkClick(e, '#home')}
            className="flex items-center gap-2 font-bold text-lg"
            style={{ textDecoration: 'none', color: 'var(--color-text-primary)' }}
            aria-label="Mohamed Elhussien — Home"
          >
            <span
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, var(--color-accent), #06B6D4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Code2 size={18} color="#fff" />
            </span>
            <span style={{ color: 'var(--color-text-primary)' }}>
              Elhussien<span style={{ color: 'var(--color-accent-light)' }}>.</span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8" style={{ listStyle: 'none' }}>
            {LINKS.map(l => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={e => handleLinkClick(e, l.href)}
                  className={`nav-link${activeLink === l.href ? ' active' : ''}`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              onClick={e => handleLinkClick(e, '#contact')}
              className="btn-primary"
              style={{ padding: '0.55rem 1.4rem', fontSize: '0.82rem' }}
              id="nav-cta"
            >
              <span>Hire Me</span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-toggle"
            className="md:hidden flex items-center justify-center"
            style={{
              width: '40px', height: '40px',
              borderRadius: '10px',
              border: '1px solid var(--color-border)',
              background: 'var(--color-bg-card)',
              color: 'var(--color-text-primary)',
              cursor: 'pointer',
            }}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden glass"
          style={{ borderTop: '1px solid var(--color-border)', padding: '1.5rem' }}
        >
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {LINKS.map(l => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={e => handleLinkClick(e, l.href)}
                  className={`nav-link${activeLink === l.href ? ' active' : ''}`}
                  style={{ fontSize: '1rem' }}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={e => handleLinkClick(e, '#contact')}
                className="btn-primary"
                id="nav-cta-mobile"
                style={{ width: '100%' }}
              >
                <span>Hire Me</span>
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
