import { useState } from 'react'
import Reveal from './Reveal'

const reasons = [
  { n: '01', title: 'Crecer sin ampliar', text: 'El secreto que usan las pymes que crecen un 30% sin ampliar su equipo — y que el 95% de consultores en España todavía ignoran.' },
  { n: '02', title: 'IA con ROI real',     text: 'Por qué la IA que has visto en demos no funciona en tu negocio — y la diferencia exacta entre implementarla bien o tirar dinero.' },
  { n: '03', title: 'Cuellos invisibles',  text: 'Lo que nadie te dice sobre los cuellos de botella invisibles de tu empresa — y cómo resolverlos en menos de 60 días.' },
  { n: '04', title: 'Pipeline automático', text: 'El método que convierte prospectos fríos en reuniones confirmadas automáticamente — sin llamadas en frío, sin agencias de leads.' },
  { n: '05', title: 'Dinero sobre la mesa', text: 'Por qué tu empresa está dejando dinero sobre la mesa cada semana — y el diagnóstico exacto para saberlo tarda 60 minutos.' },
  { n: '06', title: 'Facturación predecible', text: 'La razón por la que la mayoría de directores nunca logran facturación predecible — y el sistema que lo resuelve de raíz.' },
]

export default function Problem() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="problema" style={{
      background: 'var(--bg-surface)',
      padding: 'clamp(100px,14vh,180px) clamp(24px,6vw,96px)',
      borderTop: '1px solid var(--border-subtle)',
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
        <span>02 · El problema</span>
      </div>

      <div style={{ maxWidth: 1320, margin: '0 auto', position: 'relative' }}>
        {/* eyebrow */}
        <Reveal dir="left">
          <span style={{
            fontFamily: 'var(--font-caps)', fontSize: 9, fontWeight: 600,
            letterSpacing: 4, textTransform: 'uppercase', color: 'var(--copper-soft)',
            display: 'inline-flex', alignItems: 'center', gap: 14,
            marginBottom: 'clamp(28px,4vh,44px)',
          }}>
            <span style={{ width: 28, height: 1, background: 'var(--copper)' }} />
            El problema que nadie describe con precisión
          </span>
        </Reveal>

        {/* H2 monstruoso */}
        <Reveal dir="up" delay={120}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(44px,8vw,108px)',
            fontWeight: 400, lineHeight: 0.94, letterSpacing: '-0.035em',
            color: 'var(--text-primary)',
            marginBottom: 'clamp(56px,8vh,96px)',
            maxWidth: '16ch',
          }}>
            Tu equipo no está roto.{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--copper-soft)' }}>
              El sistema sí.
            </em>
          </h2>
        </Reveal>

        {/* grid 2 cols: manifiesto serif | acordeón razones */}
        <div className="grid-2col" style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 1fr) minmax(320px, 1.1fr)',
          gap: 'clamp(48px,7vw,112px)',
          alignItems: 'start',
        }}>
          {/* manifiesto serif izq */}
          <div>
            {[
              <>Tu empresa funciona.</>,
              <>Pero hay tareas que consumen tiempo que nunca volverás a recuperar.</>,
              <>Tu equipo pasa horas cualificando leads a mano, respondiendo las mismas preguntas, persiguiendo presupuestos que nunca se cierran. Eso no es trabajo — <strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>es ruido caro.</strong></>,
              <>Has probado herramientas de automatización. CRMs, chatbots, software de gestión. Al mes seguían siendo un caos que alguien tenía que mantener manualmente.</>,
              <>La IA suena bien en podcasts. En tu empresa nadie sabe qué implementar primero, qué tiene ROI real y qué es <span style={{ background: 'linear-gradient(180deg, transparent 65%, var(--copper-dim) 65%)', padding: '0 2px' }}>humo de consultor.</span></>,
              <><strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>El problema no es tu equipo, ni el mercado, ni la tecnología. Es que nadie ha diseñado el sistema específico para tu empresa.</strong></>,
              <>Eso es exactamente lo que hacemos.</>,
            ].map((text, i) => (
              <Reveal key={i} dir="up" delay={i * 60}>
                <p style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(18px,1.5vw,22px)',
                  fontWeight: 300, lineHeight: 1.65,
                  color: 'var(--text-secondary)',
                  marginBottom: 22, letterSpacing: '0.005em',
                }}>{text}</p>
              </Reveal>
            ))}
          </div>

          {/* accordion razones derecha */}
          <Reveal dir="up" delay={200}>
            <div>
              {reasons.map((r, i) => {
                const isOpen = open === i
                return (
                  <div key={r.n} style={{
                    borderBottom: '1px solid var(--border-subtle)',
                  }}>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      style={{
                        width: '100%',
                        padding: '28px 0',
                        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                        gap: 24, textAlign: 'left',
                        background: 'transparent', border: 'none', cursor: 'pointer',
                        transition: 'opacity 0.25s',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.75' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, flex: 1, minWidth: 0 }}>
                        <span style={{
                          fontFamily: 'var(--font-caps)', fontSize: 9, fontWeight: 600,
                          letterSpacing: 2.5, color: 'var(--copper-soft)',
                          flexShrink: 0,
                        }}>{r.n}</span>
                        <span style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(22px,2.6vw,34px)',
                          fontWeight: 400, lineHeight: 1.15, letterSpacing: '-0.02em',
                          color: 'var(--text-primary)',
                        }}>{r.title}</span>
                      </div>
                      <span aria-hidden style={{
                        fontFamily: 'var(--font-caps)', fontSize: 18, fontWeight: 300,
                        color: 'var(--copper-soft)',
                        transition: 'transform 0.45s cubic-bezier(0.19,1,0.22,1)',
                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
                        lineHeight: 1, flexShrink: 0, marginTop: 4,
                      }}>+</span>
                    </button>
                    <div style={{
                      maxHeight: isOpen ? 400 : 0,
                      overflow: 'hidden',
                      transition: 'max-height 0.7s cubic-bezier(0.19,1,0.22,1)',
                    }}>
                      <p style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(15px,1.3vw,18px)',
                        fontWeight: 300, lineHeight: 1.7,
                        color: 'var(--text-secondary)',
                        padding: '0 36px 32px 36px',
                        margin: 0,
                      }}>{r.text}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
