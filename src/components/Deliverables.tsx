import { useRef } from 'react'
import Reveal from './Reveal'
import MobileCarousel from './MobileCarousel'
import CarouselArrows from './CarouselArrows'

const cells = [
  { num: '01 · Tiempo', title: 'Tiempo recuperado', body: <>Las horas que tu equipo gasta en tareas repetitivas vuelven a estar disponibles para lo que genera ingresos. <strong style={{ color: 'var(--copper-soft)', fontWeight: 500 }}>Cualificación, seguimiento, atención inicial — automatizados.</strong></> },
  { num: '02 · Comercial', title: 'Pipeline predecible', body: <>Dejas de depender de referidos y de los meses buenos. <strong style={{ color: 'var(--copper-soft)', fontWeight: 500 }}>Un sistema que genera oportunidades de forma consistente</strong>, con métricas que demuestran que funciona.</> },
  { num: '03 · Equipo', title: 'Equipo más efectivo', body: <>Tu equipo deja de hacer trabajo de bajo valor y empieza a operar con herramientas que multiplican su capacidad. <strong style={{ color: 'var(--copper-soft)', fontWeight: 500 }}>Los mismos recursos, resultados distintos.</strong></> },
  { num: '04 · Ventaja', title: 'Ventaja competitiva real', body: <>El 90% de tus competidores no tiene esto implementado. <strong style={{ color: 'var(--copper-soft)', fontWeight: 500 }}>Cuando tú sí lo tienes, la diferencia es visible</strong> antes de abrir la boca en una reunión.</> },
]

export default function Deliverables() {
  const carouselRef = useRef<HTMLDivElement>(null)
  return (
    <section style={{ background: 'var(--bg-base)', padding: '88px 0', position: 'relative' }}>
      <CarouselArrows scrollRef={carouselRef} />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px' }}>
        <Reveal dir="left">
          <span style={{
            fontFamily: 'var(--font-caps)', fontSize: 7.5, fontWeight: 600,
            letterSpacing: 3, textTransform: 'uppercase', color: 'var(--copper-soft)',
            display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 40,
          }}>
            <span style={{ width: 26, height: 1, background: 'var(--copper)', flexShrink: 0 }} />
            Qué cambia en tu empresa
          </span>
        </Reveal>
        <Reveal dir="up">
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(34px,5.5vw,68px)',
            fontWeight: 400, lineHeight: 0.94, letterSpacing: '-0.03em',
            color: 'var(--text-primary)', marginBottom: 52,
          }}>
            No vendemos tecnología.<br />
            <em style={{ fontStyle: 'italic', color: 'var(--copper-soft)' }}>Vendemos lo que produce.</em>
          </h2>
        </Reveal>

        <MobileCarousel count={cells.length} scrollRef={carouselRef} style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 1, background: 'var(--border-subtle)', border: '1px solid var(--border-subtle)',
          maxWidth: 1000, margin: '0 auto 56px',
        }}>
          {cells.map((c, i) => (
            <Reveal key={i} dir="up" delay={i * 70}>
              <div
                style={{ background: 'var(--bg-base)', padding: '40px 38px', position: 'relative', transition: 'background 0.2s', height: '100%' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--bg-surface)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'var(--bg-base)'}
              >
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                  background: 'var(--copper)', transform: 'scaleX(0)', transformOrigin: 'left',
                  transition: 'transform 0.4s ease',
                }} ref={el => {
                  if (!el) return
                  const p = el.parentElement!
                  p.addEventListener('mouseenter', () => { el.style.transform = 'scaleX(1)' })
                  p.addEventListener('mouseleave', () => { el.style.transform = 'scaleX(0)' })
                }} />
                <span style={{
                  fontFamily: 'var(--font-caps)', fontSize: 7, fontWeight: 600,
                  letterSpacing: 2.8, textTransform: 'uppercase',
                  color: 'var(--copper-soft)', marginBottom: 12, display: 'block',
                }}>{c.num}</span>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 400,
                  color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 10,
                }}>{c.title}</h3>
                <p style={{
                  fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 300,
                  lineHeight: 1.72, color: 'var(--text-secondary)',
                }}>{c.body}</p>
              </div>
            </Reveal>
          ))}
        </MobileCarousel>

        <div style={{ textAlign: 'center' }}>
          <Reveal dir="up">
            <a href="#diagnostico" style={{
              fontFamily: 'var(--font-caps)', fontSize: 8.5, fontWeight: 600,
              letterSpacing: 2.5, textTransform: 'uppercase',
              background: 'var(--copper)', color: '#fff',
              padding: '15px 40px', display: 'inline-block',
              transition: 'background 0.22s, transform 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#a86830'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--copper)'; (e.currentTarget as HTMLElement).style.transform = 'none' }}>
              Reservar diagnóstico gratuito →
            </a>
          </Reveal>
          <Reveal dir="fade" delay={100}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 24, flexWrap: 'wrap', marginTop: 20,
              fontFamily: 'var(--font-caps)', fontSize: 7, fontWeight: 400,
              letterSpacing: 2.8, textTransform: 'uppercase', color: 'var(--text-muted)',
            }}>
              {['Sin tarjeta', 'Sin compromiso', 'Sin trampa'].map(t => (
                <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: 'var(--copper)', fontSize: 5 }}>◆</span>{t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
