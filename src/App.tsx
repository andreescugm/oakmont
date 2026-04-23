import { useState, useEffect, useRef } from 'react'

type Theme = 'dark' | 'light'
import AnnBar from './components/AnnBar'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Metrics from './components/Metrics'
import Problem from './components/Problem'
import Offering from './components/Offering'
import Stats from './components/Stats'
import Deliverables from './components/Deliverables'
import Testimonials from './components/Testimonials'
import Guarantee from './components/Guarantee'
import FinalCTA from './components/FinalCTA'
import ServicesDetail from './components/ServicesDetail'
import CompanyPages from './components/CompanyPages'
import ContactForm from './components/ContactForm'
import Legal from './components/Legal'
import Footer from './components/Footer'
import StickyBar from './components/StickyBar'

const HIDDEN_SECTIONS = new Set([
  'sobre-nosotros', 'metodologia', 'casos-exito',
  'servicios', 'diagnostico-estrategico', 'diseno-sistema',
  'implementacion-ia', 'automatizacion-comercial', 'cualificacion-leads',
  'privacidad', 'aviso-legal',
])

type SectionView = 'services' | 'sobre-nosotros' | 'metodologia' | 'casos-exito' | 'privacidad' | 'aviso-legal'

const HASH_TO_VIEW: Record<string, SectionView> = {
  servicios: 'services',
  'diagnostico-estrategico': 'services',
  'diseno-sistema': 'services',
  'implementacion-ia': 'services',
  'automatizacion-comercial': 'services',
  'cualificacion-leads': 'services',
  'sobre-nosotros': 'sobre-nosotros',
  metodologia: 'metodologia',
  'casos-exito': 'casos-exito',
  privacidad: 'privacidad',
  'aviso-legal': 'aviso-legal',
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('ao-theme') as Theme) || 'dark'
  })
  const [scrollPct, setScrollPct] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const savedScrollY = useRef(0)

  useEffect(() => {
    document.documentElement.className = ''
    document.documentElement.classList.add(theme)
  }, [theme])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrollPct(max > 0 ? (y / max) * 100 : 0)
      setScrollY(y)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash && HIDDEN_SECTIONS.has(hash)) {
      setActiveSection(hash)
    }
  }, [])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest('a')
      if (!a) return
      const href = a.getAttribute('href') ?? ''
      if (!href.startsWith('#')) return
      const hash = href.slice(1)
      if (!HIDDEN_SECTIONS.has(hash)) return
      e.preventDefault()
      savedScrollY.current = window.scrollY
      setActiveSection(hash)
      window.scrollTo(0, 0)
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  useEffect(() => {
    if (activeSection === null) {
      window.scrollTo(0, savedScrollY.current)
    } else if (HASH_TO_VIEW[activeSection] === 'services' && activeSection !== 'servicios') {
      requestAnimationFrame(() => {
        const el = document.getElementById(activeSection)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  }, [activeSection])

  const toggle = (t: Theme) => {
    setTheme(t)
    localStorage.setItem('ao-theme', t)
  }

  const goBack = () => setActiveSection(null)

  const view = activeSection ? HASH_TO_VIEW[activeSection] : null

  return (
    <>
      <div id="scroll-bar" style={{ width: `${scrollPct}%` }} />
      <AnnBar />
      <Nav theme={theme} onToggle={toggle} scrollY={scrollY} />
      {view ? (
        <>
          <button
            onClick={goBack}
            style={{
              position: 'fixed', top: 90, left: 24, zIndex: 1001,
              fontFamily: 'var(--font-caps)', fontSize: 8, fontWeight: 600,
              letterSpacing: 2, textTransform: 'uppercase',
              background: 'var(--bg-raised)', color: 'var(--text-secondary)',
              border: '1px solid var(--border-mid)',
              padding: '10px 20px', cursor: 'pointer',
              transition: 'color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.color = 'var(--copper-soft)'
              el.style.borderColor = 'var(--copper)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.color = 'var(--text-secondary)'
              el.style.borderColor = 'var(--border-mid)'
            }}
          >
            ← Volver
          </button>
          <main>
            {view === 'services' && <ServicesDetail />}
            {view === 'sobre-nosotros' && <CompanyPages />}
            {view === 'metodologia' && <CompanyPages />}
            {view === 'casos-exito' && <CompanyPages />}
            {view === 'privacidad' && <Legal />}
            {view === 'aviso-legal' && <Legal />}
          </main>
          <Footer />
        </>
      ) : (
        <>
          <main>
            <Hero />
            <Metrics />
            <Problem />
            <Offering />
            <Stats />
            <Deliverables />
            <Testimonials />
            <Guarantee />
            <ContactForm />
            <FinalCTA />
          </main>
          <Footer />
          <StickyBar show={scrollY > 800} />
        </>
      )}
    </>
  )
}
