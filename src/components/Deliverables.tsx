import Reveal from './Reveal'
import type { CSSProperties, ReactNode } from 'react'

interface Cell {
  num: string
  tag: string
  title: string
  body: ReactNode
  aspect: string
  span?: number      // 1 o 2 columnas en desktop
  offset?: boolean   // mt-32 estilo Clay
  visual: 'pulse' | 'flow' | 'grid' | 'arc' | 'wave'
}

const cells: Cell[] = [
  {
    num: '01 · Tiempo', tag: 'Tiempo recuperado', title: 'Tiempo recuperado',
    body: <>Las horas que tu equipo gasta en tareas repetitivas vuelven a estar disponibles para lo que genera ingresos. <strong style={{ color: 'var(--copper-soft)', fontWeight: 500 }}>Cualificación, seguimiento, atención inicial — automatizados.</strong></>,
    aspect: '1 / 1', visual: 'pulse',
  },
  {
    num: '02 · Comercial', tag: 'Pipeline predecible', title: 'Pipeline predecible',
    body: <>Dejas de depender de referidos y de los meses buenos. <strong style={{ color: 'var(--copper-soft)', fontWeight: 500 }}>Un sistema que genera oportunidades de forma consistente</strong>, con métricas que demuestran que funciona.</>,
    aspect: '4 / 5', offset: true, visual: 'flow',
  },
  {
    num: '03 · Equipo', tag: 'Equipo más efectivo', title: 'Equipo más efectivo',
    body: <>Tu equipo deja de hacer trabajo de bajo valor y empieza a operar con herramientas que multiplican su capacidad. <strong style={{ color: 'var(--copper-soft)', fontWeight: 500 }}>Los mismos recursos, resultados distintos.</strong></>,
    aspect: '16 / 9', span: 2, visual: 'grid',
  },
  {
    num: '04 · Ventaja', tag: 'Ventaja competitiva real', title: 'Ventaja competitiva real',
    body: <>El 90% de tus competidores no tiene esto implementado. <strong style={{ color: 'var(--copper-soft)', fontWeight: 500 }}>Cuando tú sí lo tienes, la diferencia es visible</strong> antes de abrir la boca en una reunión.</>,
    aspect: '1 / 1', visual: 'arc',
  },
]

// Visuales CSS-art para cada card — sin imágenes externas
function Visual({ kind }: { kind: Cell['visual'] }) {
  const base: CSSProperties = {
    position: 'absolute', inset: 0,
    background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-raised) 100%)',
    overflow: 'hidden',
  }

  if (kind === 'pulse') {
    // anillos concéntricos
    return (
      <div style={base}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
            width: `${i * 90}px`, height: `${i * 90}px`,
            borderRadius: '50%',
            border: `1px solid var(--copper-dim)`,
            opacity: 0.6 - i * 0.1,
            animation: `drift ${10 + i * 2}s ease-in-out infinite alternate`,
            animationDelay: `${-i * 1.5}s`,
          }} />
        ))}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 14, height: 14, borderRadius: '50%',
          background: 'var(--copper)',
          boxShadow: '0 0 24px var(--copper-glow), 0 0 60px var(--copper-glow)',
        }} />
      </div>
    )
  }
  if (kind === 'flow') {
    // líneas diagonales en flujo
    return (
      <div style={base}>
        <svg width="100%" height="100%" viewBox="0 0 400 500" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
          {[0, 1, 2, 3, 4, 5].map(i => (
            <path
              key={i}
              d={`M -20 ${60 + i * 80} Q 200 ${80 + i * 70} 420 ${40 + i * 90}`}
              stroke="var(--copper-dim)"
              strokeWidth="1"
              fill="none"
              opacity={0.7 - i * 0.08}
            />
          ))}
          <circle cx="200" cy="250" r="6" fill="var(--copper)" opacity="0.9" />
        </svg>
      </div>
    )
  }
  if (kind === 'grid') {
    // grid de puntos
    return (
      <div style={base}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(var(--copper-dim) 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent)',
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 80, height: 80, borderRadius: '50%',
          background: 'radial-gradient(circle, var(--copper-glow) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }} />
      </div>
    )
  }
  if (kind === 'arc') {
    // arcos / parábola
    return (
      <div style={base}>
        <svg width="100%" height="100%" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: 0 }}>
          {[200, 160, 120, 80].map((r, i) => (
            <path
              key={i}
              d={`M ${200 - r} 320 A ${r} ${r} 0 0 1 ${200 + r} 320`}
              stroke="var(--copper-dim)"
              strokeWidth={i === 0 ? 1.5 : 1}
              fill="none"
              opacity={0.85 - i * 0.15}
            />
          ))}
          <line x1="40" y1="320" x2="360" y2="320" stroke="var(--copper)" strokeWidth="1" opacity="0.5" />
        </svg>
      </div>
    )
  }
  // wave
  return (
    <div style={base}>
      <svg width="100%" height="100%" viewBox="0 0 800 200" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
        {[0, 1, 2].map(i => (
          <path
            key={i}
            d={`M 0 ${100 + i * 20} Q 200 ${40 + i * 20} 400 ${100 + i * 20} T 800 ${100 + i * 20}`}
            stroke="var(--copper-dim)"
            strokeWidth="1"
            fill="none"
            opacity={0.7 - i * 0.2}
          />
        ))}
      </svg>
    </div>
  )
}

export default function Deliverables() {
  return (
    <section style={{
      background: 'var(--bg-base)',
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
        <span>05 · Resultados</span>
      </div>

      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        {/* eyebrow + H2 + subhead en grid 2col */}
        <Reveal dir="left">
          <span style={{
            fontFamily: 'var(--font-caps)', fontSize: 9, fontWeight: 600,
            letterSpacing: 4, textTransform: 'uppercase', color: 'var(--copper-soft)',
            display: 'inline-flex', alignItems: 'center', gap: 14,
            marginBottom: 'clamp(28px,4vh,44px)',
          }}>
            <span style={{ width: 28, height: 1, background: 'var(--copper)' }} />
            Qué cambia en tu empresa
          </span>
        </Reveal>

        <div className="grid-2col" style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 1.1fr) minmax(280px, 0.9fr)',
          gap: 'clamp(40px,6vw,96px)',
          alignItems: 'end',
          marginBottom: 'clamp(80px,10vh,140px)',
        }}>
          <Reveal dir="up">
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(42px,7.5vw,100px)',
              fontWeight: 400, lineHeight: 0.94, letterSpacing: '-0.035em',
              color: 'var(--text-primary)', maxWidth: '14ch',
            }}>
              No vendemos tecnología.{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--copper-soft)' }}>Vendemos lo que produce.</em>
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
              Cuatro cambios concretos que ocurren en tu operativa cuando un sistema
              bien diseñado se hace cargo del ruido. Sin métricas vanidosas.
            </p>
          </Reveal>
        </div>

        {/* grid asimétrico estilo Clay work list */}
        <div className="grid-2col" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(48px,5vw,80px) clamp(40px,4vw,64px)',
        }}>
          {cells.map((c, i) => (
            <Reveal key={i} dir="up" delay={i * 80} style={{
              gridColumn: c.span === 2 ? '1 / -1' : 'auto',
              marginTop: c.offset ? 'clamp(40px, 8vh, 128px)' : 0,
            }}>
              <div className="dl-card" style={{
                cursor: 'default',
              }}>
                <div style={{
                  position: 'relative',
                  aspectRatio: c.aspect,
                  borderRadius: 24,
                  overflow: 'hidden',
                  marginBottom: 28,
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-card)',
                }}>
                  <Visual kind={c.visual} />
                  {/* tag esquina superior */}
                  <span style={{
                    position: 'absolute', top: 22, left: 24,
                    fontFamily: 'var(--font-caps)', fontSize: 8, fontWeight: 600,
                    letterSpacing: 2.5, textTransform: 'uppercase',
                    color: 'var(--copper-soft)',
                    padding: '6px 12px',
                    background: 'rgba(9,11,20,0.55)', backdropFilter: 'blur(6px)',
                    border: '1px solid var(--border-mid)',
                  }}>{c.num}</span>
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px,3.4vw,46px)',
                  fontWeight: 400, lineHeight: 1.04, letterSpacing: '-0.025em',
                  color: 'var(--text-primary)',
                  marginBottom: 16,
                }}>{c.title}</h3>
                <p style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(16px,1.4vw,18px)',
                  fontWeight: 300, lineHeight: 1.7,
                  color: 'var(--text-secondary)',
                  maxWidth: '52ch',
                }}>{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA cerrando sección */}
        <Reveal dir="up" delay={120}>
          <div style={{
            marginTop: 'clamp(80px,10vh,140px)',
            paddingTop: 'clamp(40px,6vh,64px)',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap',
          }}>
            <a
              href="#contacto"
              onClick={e => {
                e.preventDefault()
                document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLElement).style.background = '#a86830'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLElement).style.background = 'var(--copper)'
                ;(e.currentTarget as HTMLElement).style.transform = 'none'
              }}
              style={{
                fontFamily: 'var(--font-caps)', fontSize: 9, fontWeight: 600,
                letterSpacing: 2.5, textTransform: 'uppercase',
                background: 'var(--copper)', color: '#fff',
                padding: '18px 44px', display: 'inline-block',
                transition: 'background 0.22s, transform 0.15s',
              }}
            >
              Reservar diagnóstico gratuito →
            </a>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap',
              fontFamily: 'var(--font-caps)', fontSize: 8, fontWeight: 400,
              letterSpacing: 2.8, textTransform: 'uppercase', color: 'var(--text-muted)',
            }}>
              {['Sin tarjeta', 'Sin compromiso', 'Sin trampa'].map(t => (
                <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: 'var(--copper)', fontSize: 5 }}>◆</span>{t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
