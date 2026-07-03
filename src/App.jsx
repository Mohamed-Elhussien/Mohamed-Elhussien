import Navbar  from './components/Navbar.jsx'
import Hero    from './components/Hero.jsx'
import About   from './components/About.jsx'
import Skills  from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Contact  from './components/Contact.jsx'
import Footer   from './components/Footer.jsx'

export default function App() {
  return (
    <div className="relative overflow-x-hidden" style={{ background: 'var(--color-bg-primary)' }}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
