import { useEffect, useRef, useState } from 'react'
import { Layers } from 'lucide-react'

const SKILL_CATEGORIES = [
  {
    category: 'Core Languages',
    color: '#F59E0B',
    skills: [
      { name: 'HTML5',      level: 95, icon: '🌐' },
      { name: 'CSS3',       level: 90, icon: '🎨' },
      { name: 'JavaScript', level: 88, icon: '⚡' },
    ],
  },
  {
    category: 'Frameworks & Libraries',
    color: '#8B5CF6',
    skills: [
      { name: 'React',       level: 85, icon: '⚛️' },
      { name: 'Tailwind CSS',level: 92, icon: '💨' },
    ],
  },
  {
    category: 'Tools & Workflow',
    color: '#06B6D4',
    skills: [
      { name: 'Git',    level: 82, icon: '🌿' },
      { name: 'GitHub', level: 88, icon: '🐙' },
    ],
  },
]

const BADGE_SKILLS = [
  { name: 'HTML5',       icon: '🌐', bg: '#F59E0B22', border: '#F59E0B44', color: '#FCD34D' },
  { name: 'CSS3',        icon: '🎨', bg: '#3B82F622', border: '#3B82F644', color: '#60A5FA' },
  { name: 'JavaScript',  icon: '⚡', bg: '#FACC1522', border: '#FACC1544', color: '#FDE047' },
  { name: 'React',       icon: '⚛️', bg: '#06B6D422', border: '#06B6D444', color: '#22D3EE' },
  { name: 'Tailwind CSS',icon: '💨', bg: '#8B5CF622', border: '#8B5CF644', color: '#A78BFA' },
  { name: 'Git',         icon: '🌿', bg: '#F9731622', border: '#F9731644', color: '#FB923C' },
  { name: 'GitHub',      icon: '🐙', bg: '#94A3B822', border: '#94A3B844', color: '#CBD5E1' },
  { name: 'Responsive Design', icon: '📱', bg: '#22C55E22', border: '#22C55E44', color: '#4ADE80' },
  { name: 'Figma',       icon: '🖌️', bg: '#EC489922', border: '#EC489944', color: '#F472B6' },
  { name: 'REST APIs',   icon: '🔌', bg: '#06B6D422', border: '#06B6D444', color: '#67E8F9' },
  { name: 'Vite',        icon: '⚡', bg: '#F59E0B22', border: '#F59E0B44', color: '#FCD34D' },
  { name: 'npm',         icon: '📦', bg: '#EF444422', border: '#EF444444', color: '#FCA5A5' },
]

function useInView(ref, threshold = 0.15) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref, threshold])
  return inView
}

function ProgressBar({ level, color, inView }) {
  return (
    <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', overflow: 'hidden' }}>
      <div
        style={{
          height: '100%',
          borderRadius: '999px',
          background: `linear-gradient(90deg, ${color}, ${color}99)`,
          width: inView ? `${level}%` : '0%',
          transition: 'width 1.2s cubic-bezier(0.4,0,0.2,1)',
          boxShadow: `0 0 10px ${color}55`,
        }}
      />
    </div>
  )
}

export default function Skills() {
  const ref    = useRef(null)
  const inView = useInView(ref)

  return (
    <section
      id="skills"
      ref={ref}
      style={{ padding: '7rem 0', position: 'relative', overflow: 'hidden', background: 'rgba(255,255,255,0.01)' }}
    >
      <div className="orb orb-purple" style={{ width: '450px', height: '450px', top: '0', left: '-150px', opacity: 0.18 }} />
      <div className="orb orb-cyan"   style={{ width: '350px', height: '350px', bottom: '0', right: '-100px', opacity: 0.18 }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
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
            <Layers size={12} />
            My Toolkit
          </span>
          <h2 style={{ marginTop: '1rem', fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', fontWeight: 800, color: 'var(--color-text-primary)' }}>
            Skills &amp; <span className="gradient-text">Technologies</span>
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '500px', margin: '1rem auto 0', fontSize: '0.95rem' }}>
            A carefully cultivated stack built for building modern, performant web applications.
          </p>
        </div>

        {/* Badge cloud */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            justifyContent: 'center',
            marginBottom: '4rem',
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.6s ease 0.2s',
          }}
        >
          {BADGE_SKILLS.map((s, i) => (
            <div
              key={s.name}
              className="skill-badge"
              style={{
                background: s.bg,
                borderColor: s.border,
                color: s.color,
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : 'scale(0.8)',
                transition: `all 0.4s ease ${0.05 * i}s`,
              }}
            >
              <span>{s.icon}</span>
              <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>{s.name}</span>
            </div>
          ))}
        </div>

        {/* Proficiency cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {SKILL_CATEGORIES.map(({ category, color, skills }, ci) => (
            <div
              key={category}
              className="card glass"
              style={{
                padding: '1.75rem',
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : 'translateY(24px)',
                transition: `all 0.6s ease ${0.3 + ci * 0.12}s`,
              }}
            >
              {/* Category header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
                <div
                  style={{
                    width: '10px', height: '10px',
                    borderRadius: '50%',
                    background: color,
                    boxShadow: `0 0 10px ${color}`,
                  }}
                />
                <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-primary)', letterSpacing: '0.02em' }}>
                  {category}
                </h3>
              </div>

              {/* Skills */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {skills.map(({ name, level, icon }) => (
                  <div key={name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>{icon}</span>
                        <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>{name}</span>
                      </div>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color }}>
                        {level}%
                      </span>
                    </div>
                    <ProgressBar level={level} color={color} inView={inView} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
