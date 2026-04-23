import { useRef } from 'react'
import Reveal from './Reveal'
import MobileCarousel from './MobileCarousel'
import CarouselArrows from './CarouselArrows'

const cards = [
  { num: 1, tag: 'F · 01', title: 'Diagnóstico Estratégico', titleEm: '60 min', body: 'Identificamos los 3 procesos que más tiempo consumen y calculamos el impacto exacto de automatizarlos. Sin humo. Sin venta disfrazada de consultoría.', link: '#diagnostico', linkText: 'Reservar sesión →' },
  { num: 2, tag: 'F · 02', title: 'Diseño del ', titleEm: 'Sistema', body: 'Mapeamos el flujo completo: qué automatizar, con qué herramienta, en qué orden y con qué métrica de éxito. Un plan real, no un PowerPoint.', link: '#', linkText: 'Ver metodología →' },
  { num: 3, tag: 'F · 03', title: 'Implementación y ', titleEm: 'Activación', body: 'Construimos e integramos el sistema en tu operativa actual. Sin interrupciones. Sin curva de aprendizaje larga.', link: '#', linkText: 'Cómo funciona →' },
  { num: 4, tag: 'F · 04', title: 'Resultado Medible ', titleEm: 'en 90 días', body: 'Definimos la métrica de éxito antes de empezar. Si no se cumple, devolvemos la inversión íntegra. Compromiso escrito y firmado en el contrato.', link: '#', linkText: 'Ver garantía →' },
  { num: 5, tag: 'Cualificación', title: 'Pipeline ', titleEm: 'Predecible', body: 'Agentes de IA que cualifican, nutren y dan seguimiento a prospectos automáticamente. Dejas de depender de referidos y de los meses buenos.', link: '#', linkText: 'Ver demo →' },
  { num: 6, tag: 'Escalabilidad', title: 'Crecimiento sin ', titleEm: 'fricción', body: 'El sistema absorbe el volumen adicional sin añadir trabajo manual ni nuevas contrataciones urgentes. Los mismos recursos, resultados distintos.', link: '#', linkText: 'Casos reales →' },
]

export default function Offering() {
  const carouselRef = useRef<HTMLDivElement>(null)
  return (
    <section style={{ background: 'var(--bg-base)', padding: '88px 0', position: 'relative', overflow: 'hidden' }}>
      <CarouselArrows scrollRef={carouselRef} />
      {/* grid pattern */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1 }}>
        <Reveal dir="left">
          <span style={{
            fontFamily: 'var(--font-caps)', fontSize: 7.5, fontWeight: 600,
            letterSpacing: 3, textTransform: 'uppercase', color: 'var(--copper-soft)',
            display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 40,
          }}>
            <span style={{ width: 26, height: 1, background: 'var(--copper)', flexShrink: 0 }} />
            La solución
          </span>
        </Reveal>

        <Reveal dir="up">
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px,6vw,72px)',
            fontWeight: 400, lineHeight: 0.94, letterSpacing: '-0.03em',
            color: 'var(--text-primary)', marginBottom: 56,
          }}>
            Sistemas de IA que trabajan<br />
            <em style={{ fontStyle: 'italic', color: 'var(--copper-soft)' }}>mientras tú cierras.</em>
          </h2>
        </Reveal>

        <MobileCarousel count={cards.length} scrollRef={carouselRef} style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 1, background: 'var(--border-subtle)',
          border: '1px solid var(--border-subtle)',
        }}>
          {cards.map((c, i) => (
            <Reveal key={i} dir="up" delay={i * 60}>
              <div
                style={{ background: 'var(--bg-base)', padding: '40px 38px', position: 'relative', overflow: 'hidden', transition: 'background 0.25s ease', height: '100%' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-surface)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-base)' }}
              >
                <div style={{
                  position: 'absolute', top: 0, left: 0, height: 2, width: 0,
                  background: 'linear-gradient(90deg, var(--copper), var(--copper-soft))',
                  transition: 'width 0.45s ease',
                }}
                  ref={el => {
                    if (!el) return
                    const parent = el.parentElement!
                    parent.addEventListener('mouseenter', () => { el.style.width = '100%' })
                    parent.addEventListener('mouseleave', () => { el.style.width = '0' })
                  }}
                />
                <div style={{
                  position: 'absolute', top: 14, right: 20,
                  fontFamily: 'var(--font-display)', fontSize: 68, fontWeight: 500,
                  color: 'var(--text-primary)', opacity: 0.03, lineHeight: 1,
                  pointerEvents: 'none', letterSpacing: '-0.04em',
                }}>{c.num}</div>

                <span style={{
                  fontFamily: 'var(--font-caps)', fontSize: 7, fontWeight: 600,
                  letterSpacing: 2.8, textTransform: 'uppercase',
                  color: 'var(--copper-soft)', marginBottom: 12, display: 'block',
                }}>{c.tag}</span>

                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(18px,2vw,24px)',
                  fontWeight: 400, letterSpacing: '-0.02em',
                  color: 'var(--text-primary)', marginBottom: 12, lineHeight: 1.18,
                }}>
                  {c.title}<em style={{ fontStyle: 'italic', color: 'var(--copper-soft)' }}>{c.titleEm}</em>
                </h3>

                <p style={{
                  fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 300,
                  lineHeight: 1.75, color: 'var(--text-secondary)',
                }}>{c.body}</p>

                <a href={c.link} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  marginTop: 18,
                  fontFamily: 'var(--font-caps)', fontSize: 7, fontWeight: 600,
                  letterSpacing: 2.3, textTransform: 'uppercase', color: 'var(--copper-soft)',
                  borderBottom: '1px solid var(--copper-dim)', paddingBottom: 2,
                  transition: 'border-color 0.2s, gap 0.2s',
                }}>{c.linkText}</a>
              </div>
            </Reveal>
          ))}
        </MobileCarousel>
      </div>
    </section>
  )
}
