import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'

function useCounter(target: number, duration = 1800) {
  const [val, setVal] = useState(0)
  const started = useRef(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const t0 = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - t0) / duration, 1)
          setVal(Math.round((1 - Math.pow(1 - p, 3)) * target))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.4 })
    obs.observe(el); return () => obs.disconnect()
  }, [target, duration])
  return { val, ref }
}

interface StatItem {
  label: string
  value: string | number
  unit?: string
  desc: string
  isCounter?: boolean
}

function StatCell({ item }: { item: StatItem }) {
  const { val, ref } = useCounter(item.isCounter ? Number(item.value) : 0)
  return (
    <div ref={ref} style={{
      padding: 'clamp(36px,5vw,64px) 0',
      borderRight: '1px solid var(--border-subtle)',
      paddingRight: 'clamp(20px,3vw,40px)',
      paddingLeft: 'clamp(20px,3vw,40px)',
    }}>
      <span style={{
        fontFamily: 'var(--font-caps)', fontSize: 9, fontWeight: 600,
        letterSpacing: 2.8, textTransform: 'uppercase', color: 'var(--copper-soft)',
        display: 'block', marginBottom: 24,
      }}>{item.label}</span>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 18 }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(72px,11vw,160px)',
          fontWeight: 400,
          color: 'var(--text-primary)', lineHeight: 0.92, letterSpacing: '-0.045em',
        }}>
          {item.isCounter ? val : item.value}
        </span>
        {item.unit && (
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px,4vw,52px)',
            fontWeight: 400, fontStyle: 'italic',
            color: 'var(--copper-soft)', lineHeight: 1,
          }}>{item.unit}</span>
        )}
      </div>

      <p style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(15px,1.2vw,17px)',
        fontWeight: 300, fontStyle: 'italic', lineHeight: 1.55,
        color: 'var(--text-secondary)', maxWidth: '32ch',
      }}>{item.desc}</p>
    </div>
  )
}

const stats: StatItem[] = [
  { isCounter: true, label: 'Garantía de plazo',     value: 90,   unit: 'd', desc: 'Días para resultados verificables o devolución íntegra.' },
  { label: 'Tiempo liberado',         value: '3', unit: 'h',  desc: 'Promedio por empleado al día, redirigido a tareas de alto valor.' },
  { label: 'Coste si no se cumple',   value: '0', unit: '€',  desc: 'Y seguimos trabajando sin coste hasta lograrlo.' },
]

// "Logo wall" como Clay, pero sin logos reales — uso de etiquetas de sector que sí tienen sentido para una agencia B2B
const sectores = [
  'Consultoría', 'Logística', 'Servicios jurídicos', 'Reformas',
  'E-commerce', 'Clínicas', 'Formación', 'Seguros',
  'IT & SaaS', 'Construcción',
]

export default function Stats() {
  return (
    <section style={{
      background: 'var(--bg-surface)',
      padding: 'clamp(100px,14vh,180px) clamp(24px,6vw,96px)',
      position: 'relative',
    }}>
      {/* section index */}
      <div aria-hidden style={{
        position: 'absolute', top: 'clamp(80px,12vh,140px)', right: 'clamp(24px,6vw,96px)',
        fontFamily: 'var(--font-caps)', fontSize: 9, fontWeight: 400,
        letterSpacing: 3.5, textTransform: 'uppercase',
        color: 'var(--text-muted)',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <span style={{ width: 32, height: 1, background: 'var(--border-mid)' }} />
        <span>04 · Números</span>
      </div>

      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        {/* eyebrow */}
        <Reveal dir="left">
          <span style={{
            fontFamily: 'var(--font-caps)', fontSize: 9, fontWeight: 600,
            letterSpacing: 4, textTransform: 'uppercase', color: 'var(--copper-soft)',
            display: 'inline-flex', alignItems: 'center', gap: 14,
            marginBottom: 'clamp(28px,4vh,44px)',
          }}>
            <span style={{ width: 28, height: 1, background: 'var(--copper)' }} />
            Los números que importan
          </span>
        </Reveal>

        {/* statement + subhead, grid 2col estilo Clay capabilities */}
        <div className="grid-2col" style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 1.1fr) minmax(280px, 0.9fr)',
          gap: 'clamp(40px,6vw,96px)',
          alignItems: 'end',
          marginBottom: 'clamp(64px,9vh,120px)',
        }}>
          <Reveal dir="up">
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(42px,7.5vw,100px)',
              fontWeight: 400, lineHeight: 0.94, letterSpacing: '-0.035em',
              color: 'var(--text-primary)',
              maxWidth: '13ch',
            }}>
              Resultados medibles.{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--copper-soft)' }}>No promesas.</em>
            </h2>
          </Reveal>
          <Reveal dir="up" delay={120}>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(17px,1.5vw,20px)',
              fontWeight: 300, fontStyle: 'italic', lineHeight: 1.65,
              color: 'var(--text-secondary)',
              maxWidth: 460,
            }}>
              Metodología norteamericana de alto rendimiento aplicada al mercado español.
              La única firma en España que garantiza resultados por contrato —
              porque operar sin esa garantía significaría no confiar en el propio trabajo.
            </p>
          </Reveal>
        </div>

        {/* fila de stats gigantes */}
        <Reveal dir="up" delay={80}>
          <div className="grid-3col" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            borderTop: '1px solid var(--border-subtle)',
            borderBottom: '1px solid var(--border-subtle)',
          }}>
            {stats.map((s, i) => (
              <div key={i} style={{
                borderRight: i < stats.length - 1 ? '1px solid var(--border-subtle)' : 'none',
              }}>
                <StatCell item={s} />
              </div>
            ))}
          </div>
        </Reveal>

        {/* "Logo wall" estilo Clay — sectores en lugar de logos */}
        <Reveal dir="fade" delay={200}>
          <div style={{
            marginTop: 'clamp(80px,10vh,140px)',
          }}>
            <div style={{
              fontFamily: 'var(--font-caps)', fontSize: 9, fontWeight: 400,
              letterSpacing: 3.5, textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginBottom: 36,
              display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <span style={{ width: 24, height: 1, background: 'var(--border-mid)' }} />
              Sectores donde hemos implementado
            </div>
            <div style={{
              display: 'flex', flexWrap: 'wrap',
              gap: 0,
              borderTop: '1px solid var(--border-subtle)',
              borderLeft: '1px solid var(--border-subtle)',
            }}>
              {sectores.map((sec) => (
                <span key={sec} style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(20px,2.4vw,32px)',
                  fontWeight: 400, fontStyle: 'italic',
                  color: 'var(--text-secondary)',
                  padding: 'clamp(18px,2.5vw,28px) clamp(24px,3vw,40px)',
                  borderRight: '1px solid var(--border-subtle)',
                  borderBottom: '1px solid var(--border-subtle)',
                  letterSpacing: '-0.01em',
                  transition: 'color 0.25s, background 0.25s',
                  cursor: 'default',
                }}
                  onMouseEnter={e => {
                    ;(e.currentTarget as HTMLElement).style.color = 'var(--copper-soft)'
                    ;(e.currentTarget as HTMLElement).style.background = 'var(--bg-raised)'
                  }}
                  onMouseLeave={e => {
                    ;(e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'
                    ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                  }}
                >{sec}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
