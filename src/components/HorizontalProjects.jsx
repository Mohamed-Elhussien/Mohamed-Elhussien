import { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import HorizontalProjectCard from './HorizontalProjectCard'
import ProjectModal from './ProjectModal'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { projects } from '../data/projects'

gsap.registerPlugin(ScrollTrigger)

export default function HorizontalProjects() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const currentProject = useMemo(() => projects[activeIndex], [activeIndex])

  // ⚡ Optimized: بيمنع re-render لو الـ index نفسه
  const updateActiveIndex = useCallback((progress) => {
    const index = Math.round(progress * (projects.length - 1))
    setActiveIndex((prev) => (prev !== index ? index : prev))
  }, [])

  // Modal handlers — memoized
  const handleSelectProject = useCallback((project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 350)
  }, [])

  // GSAP Horizontal Scroll — Optimized
  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return

    const ctx = gsap.context(() => {
      // ⚡ كل القيم دي بقت functions عشان تتحسب من جديد صح لو المستخدم
      // عمل resize للنافذة (GSAP بيعيد النداء عليها تلقائيًا وقت refresh)
      const getCardStep = () => window.innerWidth * 0.75 // cardW (70vw) + gap (5vw)
      const getTotalMove = () => (projects.length - 1) * getCardStep()

      // ⚡ طول السكرول المحجوز بقى بيتناسب مع عدد المشاريع
      // بدل ما كان رقم ثابت (2 شاشات) مهما كان عدد المشاريع.
      // كل مشروع بياخد تقريبًا شاشة كاملة من السكرول عشان يكمل يعدي كل الكروت
      // قبل ما الـ pin يتفك وينزل للسكشن اللي بعده.
      const getScrollLength = () =>
        Math.max(1, projects.length - 1) * window.innerHeight

      gsap.fromTo(
        trackRef.current,
        { x: 0 },
        {
          x: () => -getTotalMove(),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${getScrollLength()}`,
            pin: true,
            pinSpacing: true,
            scrub: prefersReducedMotion ? false : true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            snap: {
              snapTo: (progress, self) => {
                const step = 1 / (projects.length - 1)
                const rawIndex = progress / step
                const floorIndex = Math.floor(rawIndex)
                const frac = rawIndex - floorIndex

                // ⚡ Snap اتجاهي: بيقلل المسافة المطلوبة عشان تنتقل
                // للمشروع التالي حسب اتجاه السكرول الحالي (self.direction
                // بيرجع 1 لما تنزل/تتحرك للقدام، و -1 لما ترجع لورا).
                // بدل ما نستنى نعدي نص المسافة (rounding عادي)، هنا
                // بيكفي إنك تعدي ~30% بس في اتجاه حركتك عشان يكمل.
                const forwardThreshold = 0.3
                const backwardThreshold = 0.7

                let index
                if (self.direction === 1) {
                  index = frac > forwardThreshold ? floorIndex + 1 : floorIndex
                } else {
                  index = frac < backwardThreshold ? floorIndex : floorIndex + 1
                }

                index = Math.max(0, Math.min(projects.length - 1, index))
                return index * step
              },
              duration: { min: 0.15, max: 0.35 },
              delay: 0,
              ease: 'power2.out',
            },
            onUpdate: (self) => updateActiveIndex(self.progress),
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [updateActiveIndex, prefersReducedMotion])

  // Background glow color — CSS transition بدل AnimatePresence
  const glowGradient = useMemo(() => {
    return currentProject?.color || 'from-purple-500 to-pink-500'
  }, [currentProject])

  // Progress width — inline style (أخف من motion.div)
  const progressWidth = useMemo(() => {
    return `${((activeIndex + 1) / projects.length) * 100}%`
  }, [activeIndex])

  return (
    // ⚡ الـ id بقى هنا على الـ div الخارجي اللي بيلف السكشن كله (الهيرو +
    // منطقة الكروت المثبتة/pinned). لو حطيناه بس على سكشن "My Work" الصغير،
    // الـ Navbar هيفقد تتبع السكشن أول ما تعدي أول شاشة وتدخل في منطقة
    // الكروت (لأنها بتاخد وقت/مسافة سكرول طويلة وهي بره أي عنصر بـ id).
    <div id="projects" className="bg-gray-950 text-white">
      {/* Hero */}
      <section className="h-screen flex flex-col items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
        >
          My Work
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-4 text-gray-400 text-lg"
        >
          Scroll down to explore ↓
        </motion.p>
      </section>

      {/* Horizontal Scroll Section */}
      <section
        ref={sectionRef}
        className="relative h-screen overflow-hidden bg-gray-950"
      >
        {/* Background Glow — CSS transition (أخف من AnimatePresence) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className={`w-[500px] h-[500px] rounded-full bg-gradient-to-br ${glowGradient} blur-3xl transition-opacity duration-700`}
            style={{ opacity: 0.08 }}
          />
        </div>

        {/* Progress Bar */}
        <div className="absolute top-28 left-1/2 -translate-x-1/2 w-48 h-1 bg-gray-800 rounded-full overflow-hidden z-50">
          <div
            className="h-full bg-white rounded-full transition-all duration-300 ease-out"
            style={{ width: progressWidth }}
          />
        </div>

        {/* Track */}
        <div
          ref={trackRef}
          className="flex items-center h-full gap-[5vw] will-change-transform"
        >
          {projects.map((project, i) => (
            <HorizontalProjectCard
              key={project.id}
              project={project}
              index={i}
              isActive={i === activeIndex}
              isPrev={i === activeIndex - 1}
              isNext={i === activeIndex + 1}
              isFirst={i === 0}
              isLast={i === projects.length - 1}
              onSelect={handleSelectProject}
            />
          ))}
        </div>

        {/* Scroll Hint
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 text-sm z-50 animate-pulse">
          Scroll to navigate
        </div> */}
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}