import { useState } from 'react'
import Reveal from './Reveal'

const cards = [
  { num: '01', tag: 'Fase 01', title: 'Diagnóstico estratégico', titleEm: ' (60 min)', body: 'Identificamos los 3 procesos que más tiempo consumen y calculamos el impacto exacto de automatizarlos. Sin humo. Sin venta disfrazada de consultoría.', link: '#contacto', linkText: 'Reservar sesión' },
  { num: '02', tag: 'Fase 02', title: 'Diseño del ', titleEm: 'sistema', body: 'Mapeamos el flujo completo: qué automatizar, con qué herramienta, en qué orden y con qué métrica de éxito. Un plan real, no un PowerPoint.', link: '#contacto', linkText: 'Ver metodología' },
  { num: '03', tag: 'Fase 03', title: 'Implementación y ', titleEm: 'activación', body: 'Construimos e integramos el sistema en tu operativa actual. Sin interrupciones. Sin curva de aprendizaje larga.', link: '#contacto', linkText: 'Cómo funciona' },
  { num: '04', tag: 'Fase 04', title: 'Resultado medible ', titleEm: 'en 90 días', body: 'Definimos la métrica de éxito antes de empezar. Si no se cumple, devolvemos la inversión íntegra. Compromiso escrito y firmado en el contrato.', link: '#garantia', linkText: 'Ver garantía' },
  { num: '05', tag: 'Resultado', title: 'Pipeline ', titleEm: 'predecible', body: 'Agentes de IA que cualifican, nutren y dan seguimiento a prospectos automáticamente. Dejas de depender de referidos y de los meses buenos.', link: '#contacto', linkText: 'Ver demo' },
  { num: '06', tag: 'Resultado', title: 'Crecimiento sin ', titleEm: 'fricción', body: 'El sistema absorbe el volumen adicional sin añadir trabajo manual ni nuevas contrataciones urgentes. Los mismos recursos, resultados distintos.', link: '#contacto', linkText: 'Casos reales' },
]

export default function Offering() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="sistema" style={{
      background: 'var(--bg-base)',
      padding: 'clamp(100px,14vh,180px) clamp(24px,6vw,96px)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* grid pattern fondo */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 30% 40%, black, transparent)',
        maskImage: 'radial-gradient(ellipse 70% 70% at 30% 40%, black, transparent)',
        opacity: 0.6,
      }} />

      {/* section index */}
      <div aria-hidden style={{
        position: 'absolute', top: 'clamp(80px,12vh,140px)', right: 'clamp(24px,6vw,96px)',
        fontFamily: 'var(--font-caps)', fontSize: 9, fontWeight: 400,
        letterSpacing: 3.5, textTransform: 'uppercase',
        color: 'var(--text-muted)',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <span style={{ width: 32, height: 1, background: 'var(--border-mid)' }} />
        <span>03 · La solución</span>
      </div>

      <div style={{ maxWidth: 1320, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* eyebrow */}
        <Reveal dir="left">
          <span style={{
            fontFamily: 'var(--font-caps)', fontSize: 9, fontWeight: 600,
            letterSpacing: 4, textTransform: 'uppercase', color: 'var(--copper-soft)',
            display: 'inline-flex', alignItems: 'center', gap: 14,
            marginBottom: 'clamp(28px,4vh,44px)',
          }}>
            <span style={{ width: 28, height: 1, background: 'var(--copper)' }} />
            La solución
          </span>
        </Reveal>

        {/* grid layout statement izq + acordeón dch */}
        <div className="grid-2col" style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 0.85fr) minmax(360px, 1.2fr)',
          gap: 'clamp(48px,7vw,128px)',
          alignItems: 'start',
        }}>
          {/* statement izquierda */}
          <div style={{ position: 'sticky', top: 120, alignSelf: 'start' }}>
            <Reveal dir="up">
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(40px,6.5vw,86px)',
                fontWeight: 400, lineHeight: 0.94, letterSpacing: '-0.03em',
                color: 'var(--text-primary)', marginBottom: 32,
              }}>
                Sistemas de IA que trabajan{' '}
                <em style={{ fontStyle: 'italic', color: 'var(--copper-soft)' }}>mientras tú cierras.</em>
              </h2>
            </Reveal>
            <Reveal dir="up" delay={100}>
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(17px,1.5vw,21px)',
                fontWeight: 300, fontStyle: 'italic', lineHeight: 1.6,
                color: 'var(--text-secondary)',
                maxWidth: 460,
              }}>
                Combinamos diagnóstico estratégico, diseño de sistemas y agentes de IA
                para construir un negocio que opera con o sin tu intervención diaria.
              </p>
            </Reveal>
          </div>

          {/* acordeón derecha */}
          <Reveal dir="up" delay={150}>
            <div>
              {cards.map((c, i) => {
                const isOpen = open === i
                return (
                  <div key={c.num} style={{
                    borderBottom: '1px solid var(--border-subtle)',
                  }}>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      style={{
                        width: '100%',
                        padding: '32px 0',
                        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                        gap: 24, textAlign: 'left',
                        background: 'transparent', border: 'none', cursor: 'pointer',
                        transition: 'opacity 0.25s',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.7' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 22, flex: 1, minWidth: 0 }}>
                        <span style={{
                          fontFamily: 'var(--font-caps)', fontSize: 9, fontWeight: 600,
                          letterSpacing: 2.5, color: 'var(--copper-soft)',
                          flexShrink: 0,
                        }}>{c.num}</span>
                        <span style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(26px,3.4vw,46px)',
                          fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.025em',
                          color: 'var(--text-primary)',
                        }}>
                          {c.title}<em style={{ fontStyle: 'italic', color: 'var(--copper-soft)' }}>{c.titleEm}</em>
                        </span>
                      </div>
                      <span aria-hidden style={{
                        fontFamily: 'var(--font-caps)', fontSize: 22, fontWeight: 300,
                        color: 'var(--copper-soft)',
                        transition: 'transform 0.45s cubic-bezier(0.19,1,0.22,1)',
                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
                        lineHeight: 1, flexShrink: 0, marginTop: 6,
                      }}>+</span>
                    </button>
                    <div style={{
                      maxHeight: isOpen ? 500 : 0,
                      overflow: 'hidden',
                      transition: 'max-height 0.7s cubic-bezier(0.19,1,0.22,1)',
                    }}>
                      <div style={{ padding: '0 44px 40px 44px' }}>
                        <p style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: 'clamp(16px,1.4vw,19px)',
                          fontWeight: 300, lineHeight: 1.7,
                          color: 'var(--text-secondary)',
                          marginBottom: 22, maxWidth: 580,
                        }}>{c.body}</p>
                        <a
                          href={c.link}
                          onClick={e => {
                            if (c.link.startsWith('#')) {
                              e.preventDefault()
                              document.getElementById(c.link.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                            }
                          }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--copper)' }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--copper-dim)' }}
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            fontFamily: 'var(--font-caps)', fontSize: 8.5, fontWeight: 600,
                            letterSpacing: 2.3, textTransform: 'uppercase',
                            color: 'var(--copper-soft)',
                            borderBottom: '1px solid var(--copper-dim)', paddingBottom: 3,
                            transition: 'border-color 0.2s',
                          }}
                        >
                          {c.linkText} <span aria-hidden>→</span>
                        </a>
                      </div>
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
