import { useRef, useState, useEffect } from 'react'
import { ExternalLink, GitBranch, FolderOpen } from 'lucide-react'

const PROJECTS = [
  {
    id: 'proj-ecommerce',
    title: 'E-Commerce Dashboard',
    description: 'A fully responsive admin dashboard for managing products, orders, and analytics — built with React and Tailwind CSS with dark-mode support.',
    tags: ['React', 'Tailwind CSS', 'JavaScript'],
    accentColor: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #4C1D95 0%, #1E1B4B 100%)',
    live: '#',
    repo: '#',
    featured: true,
  },
  {
    id: 'proj-weather',
    title: 'Weather App',
    description: 'Real-time weather application consuming the OpenWeatherMap API. Animated sky backgrounds that change based on weather conditions.',
    tags: ['JavaScript', 'CSS3', 'REST API'],
    accentColor: '#06B6D4',
    gradient: 'linear-gradient(135deg, #0C4A6E 0%, #082F49 100%)',
    live: '#',
    repo: '#',
    featured: false,
  },
  {
    id: 'proj-portfolio-v1',
    title: 'Personal Portfolio v1',
    description: 'My first portfolio built with pure HTML, CSS and JavaScript. Smooth scroll, custom cursor, and CSS-only animations.',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    accentColor: '#F59E0B',
    gradient: 'linear-gradient(135deg, #78350F 0%, #1C1917 100%)',
    live: '#',
    repo: '#',
    featured: false,
  },
  {
    id: 'proj-task-manager',
    title: 'Task Manager',
    description: 'Kanban-style task manager with drag-and-drop, local storage persistence, priority labels, and smooth board transitions.',
    tags: ['React', 'JavaScript', 'CSS3'],
    accentColor: '#22C55E',
    gradient: 'linear-gradient(135deg, #14532D 0%, #052E16 100%)',
    live: '#',
    repo: '#',
    featured: false,
  },
  {
    id: 'proj-component-lib',
    title: 'UI Component Library',
    description: 'A self-built React component library — buttons, modals, toasts, inputs — all documented with usage examples and design tokens.',
    tags: ['React', 'Tailwind CSS', 'Storybook'],
    accentColor: '#EC4899',
    gradient: 'linear-gradient(135deg, #831843 0%, #1F1023 100%)',
    live: '#',
    repo: '#',
    featured: false,
  },
  {
    id: 'proj-landing-page',
    title: 'SaaS Landing Page',
    description: 'High-converting SaaS landing page with scroll-triggered animations, responsive hero, pricing section, and contact form integration.',
    tags: ['React', 'Tailwind CSS', 'Vite'],
    accentColor: '#A78BFA',
    gradient: 'linear-gradient(135deg, #312E81 0%, #0F0E2B 100%)',
    live: '#',
    repo: '#',
    featured: false,
  },
]

function useInView(ref, threshold = 0.1) {
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

function ProjectCard({ project, index, inView }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      id={project.id}
      className="project-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(32px)',
        transition: `all 0.6s ease ${index * 0.1}s`,
        cursor: 'default',
        ...(project.featured ? { gridColumn: 'span 2' } : {}),
      }}
    >
      {/* Banner area */}
      <div
        style={{
          height: project.featured ? '200px' : '160px',
          background: project.gradient,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', top: '-40px', right: '-40px' }} />
        <div style={{ position: 'absolute', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', bottom: '-30px', left: '-30px' }} />

        {/* Hover overlay */}
        {hovered && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              animation: 'fadeInUp 0.2s ease forwards',
            }}
          >
            <a
              href={project.live}
              id={`${project.id}-live`}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.55rem 1.25rem',
                borderRadius: '999px',
                background: project.accentColor,
                color: '#fff',
                fontSize: '0.8rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <ExternalLink size={14} /> Live Demo
            </a>
            <a
              href={project.repo}
              id={`${project.id}-repo`}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.55rem 1.25rem',
                borderRadius: '999px',
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.25)',
                color: '#fff',
                fontSize: '0.8rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-1"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
            </a>
          </div>
        )}

        <span style={{ fontSize: project.featured ? '4rem' : '3rem', filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.5))' }}>
          {project.emoji}
        </span>

        {project.featured && (
          <div style={{ position: 'absolute', top: '1rem', left: '1rem', padding: '0.3rem 0.8rem', borderRadius: '999px', background: project.accentColor, color: '#fff', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            ⭐ Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: project.featured ? '1.15rem' : '1rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.6rem' }}>
          {project.title}
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.75, marginBottom: '1.25rem' }}>
          {project.description}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {project.tags.map(tag => (
            <span
              key={tag}
              style={{
                padding: '0.25rem 0.7rem',
                borderRadius: '999px',
                fontSize: '0.72rem',
                fontWeight: 600,
                background: `${project.accentColor}18`,
                border: `1px solid ${project.accentColor}40`,
                color: project.accentColor,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const ref    = useRef(null)
  const inView = useInView(ref)

  return (
    <section
      id="projects"
      ref={ref}
      style={{ padding: '7rem 0', position: 'relative', overflow: 'hidden' }}
    >
      <div className="orb orb-purple" style={{ width: '500px', height: '500px', top: '10%', right: '-150px', opacity: 0.2 }} />
      <div className="orb orb-cyan"   style={{ width: '400px', height: '400px', bottom: '5%', left: '-120px', opacity: 0.18 }} />

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
            <FolderOpen size={12} />
            Portfolio
          </span>
          <h2 style={{ marginTop: '1rem', fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', fontWeight: 800, color: 'var(--color-text-primary)' }}>
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '500px', margin: '1rem auto 0', fontSize: '0.95rem' }}>
            A selection of real-world projects that showcase my skills across the full frontend spectrum.
          </p>
        </div>

        {/* Grid — featured spans 2 cols on md+ */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} inView={inView} />
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '3.5rem', opacity: inView ? 1 : 0, transition: 'opacity 0.7s ease 0.6s' }}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
            id="projects-view-all"
            style={{ display: 'inline-flex' }}
          >
            <GitBranch size={16} />
            View All on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
