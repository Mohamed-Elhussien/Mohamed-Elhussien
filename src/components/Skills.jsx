import { useEffect, useRef, useState, memo } from 'react'
import {
  Layers, Code2, GitBranch, Zap, Box, Atom, Wind,
  Plug, Database, Server, Activity, Timer, Globe, Gauge, FileCode,
} from 'lucide-react'

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

const SKILL_CATEGORIES = [
  {
    category: 'Languages',
    color: '#F59E0B',
    icon: Code2,
    skills: [
      { name: 'JavaScript', level: 88 },
      { name: 'TypeScript', level: 85 },
    ],
  },
  {
    category: 'Frontend Stack',
    color: '#8B5CF6',
    icon: Atom,
    skills: [
      { name: 'React', level: 85 },
      { name: 'Next.js', level: 82 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'Framer Motion', level: 80 },
    ],
  },
  {
    category: 'Animation & 3D',
    color: '#06B6D4',
    icon: Box,
    skills: [
      { name: 'GSAP (ScrollTrigger)', level: 78 },
      { name: 'React Three Fiber', level: 75 },
    ],
  },
  {
    category: 'Backend & State',
    color: '#22C55E',
    icon: Database,
    skills: [
      { name: 'Zustand', level: 80 },
      { name: 'Node.js', level: 70 },
      { name: 'Express.js', level: 68 },
      { name: 'Web Performance', level: 85 },
    ],
  },
]

const BADGE_SKILLS = [
  { name: 'JavaScript', icon: Zap, color: '#F7DF1E' },
  { name: 'TypeScript', icon: FileCode, color: '#3178C6' },
  { name: 'React', icon: Atom, color: '#61DAFB' },
  { name: 'Next.js', icon: Globe, color: '#E2E8F0' },
  { name: 'Tailwind CSS', icon: Wind, color: '#38BDF8' },
  { name: 'Framer Motion', icon: Activity, color: '#EC4899' },
  { name: 'GSAP', icon: Timer, color: '#88CE02' },
  { name: 'React Three Fiber', icon: Box, color: '#F97316' },
  { name: 'Zustand', icon: Database, color: '#FFAA00' },
  { name: 'Web Performance', icon: Gauge, color: '#EF4444' },
  { name: 'Node.js', icon: Server, color: '#339933' },
  { name: 'Express.js', icon: Plug, color: '#94A3B8' },
  { name: 'Git', icon: GitBranch, color: '#F05032' },
  { name: 'GitHub', icon: GitBranch, color: '#94A3B8' },
  { name: 'Vite', icon: Zap, color: '#646CFF' },
  { name: 'npm', icon: Box, color: '#CB3837' },
]

/* ═══════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════ */

function useInView(ref, threshold = 0.15) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true)
          observer.disconnect() // ⚡ cleanup مرة واحدة بس
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, threshold])
  return inView
}

/* ═══════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════ */

const SkillBar = memo(function SkillBar({ level, color, inView }) {
  return (
    <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          background: `linear-gradient(90deg, ${color}, ${color}99)`,
          width: inView ? `${level}%` : '0%',
          boxShadow: `0 0 10px ${color}55`,
        }}
      />
    </div>
  )
})

/* ═══════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════ */

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref)

  return (
    <section
      id="skills"
      ref={ref}
      className="relative overflow-hidden py-28 bg-white/[0.01]"
    >
      {/* Background orbs */}
      <div className="orb orb-purple top-0 -left-40 w-[450px] h-[450px] opacity-20" />
      <div className="orb orb-cyan bottom-0 -right-24 w-[350px] h-[350px] opacity-20" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ease-out ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="section-label inline-flex items-center gap-2 mb-4">
            <Layers size={12} />
            My Toolkit
          </span>
          <h2 className="mt-4 text-[clamp(1.9rem,4vw,2.8rem)] font-extrabold text-white">
            Skills &amp; <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto mt-4 text-base">
            A modern stack built for performant, interactive, and scalable web experiences.
          </p>
        </div>

        {/* Badge cloud */}
        <div
          className={`flex flex-wrap gap-3 justify-center mb-16 transition-opacity duration-600 delay-200 ${
            inView ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {BADGE_SKILLS.map((skill, i) => {
            const Icon = skill.icon
            return (
              <div
                key={skill.name}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-400 hover:-translate-y-0.5 hover:shadow-lg ${
                  inView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                }`}
                style={{
                  background: `${skill.color}18`,
                  borderColor: `${skill.color}40`,
                  color: skill.color,
                  transitionDelay: `${i * 40}ms`,
                }}
              >
                <Icon size={16} />
                <span className="text-white font-medium">{skill.name}</span>
              </div>
            )
          })}
        </div>

        {/* Proficiency cards — 2×2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_CATEGORIES.map(({ category, color, icon: CategoryIcon, skills }, ci) => (
            <div
              key={category}
              className={`glass rounded-2xl p-7 transition-all duration-600 ease-out hover:border-white/20 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${300 + ci * 120}ms` }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${color}20`, color }}
                >
                  <CategoryIcon size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white tracking-wide">
                    {category}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: color, boxShadow: `0 0 8px ${color}` }}
                    />
                    <span className="text-xs text-slate-500">{skills.length} skills</span>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-col gap-5">
                {skills.map(({ name, level }) => (
                  <div key={name} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                        {name}
                      </span>
                      <span className="text-xs font-bold" style={{ color }}>
                        {level}%
                      </span>
                    </div>
                    <SkillBar level={level} color={color} inView={inView} />
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