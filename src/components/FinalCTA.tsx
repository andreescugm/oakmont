import { useState } from 'react'
import Reveal from './Reveal'

interface FAQ { q: string; a: string }

const faqs: FAQ[] = [
  {
    q: '¿Cómo es realmente el diagnóstico gratuito?',
    a: '60 minutos de conversación estructurada. Llegamos con preguntas concretas sobre tu operativa, identificamos los 3 procesos con mayor potencial de automatización y te dejamos un resumen escrito con el impacto estimado. Sin venta, sin presión, sin tarjeta.',
  },
  {
    q: '¿Cuánto cuesta implementar el sistema completo?',
    a: 'Depende del alcance, pero te damos cifras concretas en la primera sesión, no estimaciones vagas. Trabajamos por proyecto cerrado con fechas y entregables — nada de horas facturables ni bolsas de horas abiertas.',
  },
  {
    q: '¿Trabajáis con cualquier sector?',
    a: 'Hemos implementado en consultoría, logística, servicios jurídicos, reformas, e-commerce, clínicas, formación, seguros, IT y construcción. El criterio no es el sector — es que haya un proceso repetitivo que consuma tiempo y tenga ROI claro al automatizarlo.',
  },
  {
    q: '¿Y si en 90 días no veo resultados?',
    a: 'Devolvemos el 100% de la inversión y seguimos trabajando gratis hasta lograrlo. Está escrito en el contrato. No es un eslogan: es una cláusula firmada antes de empezar.',
  },
]

export default function FinalCTA() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="diagnostico" style={{
      background: '#06070a',
      padding: 'clamp(100px,14vh,180px) clamp(24px,6vw,96px) clamp(80px,10vh,140px)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* ghost 5 al fondo */}
      <div aria-hidden style={{
        position: 'absolute', right: '-2%', top: '50%', transform: 'translateY(-50%)',
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(260px,42vw,640px)',
        fontWeight: 500, lineHeight: 1,
        color: '#fff', opacity: 0.025,
        pointerEvents: 'none', userSelect: 'none', letterSpacing: '-0.05em',
      }}>5</div>

      {/* orb cobre tenue */}
      <div aria-hidden style={{
        position: 'absolute', borderRadius: '50%', pointerEvents: 'none',
        filter: 'blur(100px)',
        width: 540, height: 540,
        background: 'radial-gradient(circle, rgba(193,123,58,0.10) 0%, transparent 70%)',
        top: -100, left: -120,
      }} />

      {/* section index */}
      <div aria-hidden style={{
        position: 'absolute', top: 'clamp(80px,12vh,140px)', right: 'clamp(24px,6vw,96px)',
        fontFamily: 'var(--font-caps)', fontSize: 9, fontWeight: 400,
        letterSpacing: 3.5, textTransform: 'uppercase',
        color: 'rgba(237,232,223,0.4)',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <span style={{ width: 32, height: 1, background: 'rgba(237,232,223,0.2)' }} />
        <span>09 · Reserva</span>
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
            Reserva ahora
          </span>
        </Reveal>

        {/* claim editorial XL */}
        <Reveal dir="up" delay={120}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(48px,9vw,140px)',
            fontWeight: 400, lineHeight: 0.92, letterSpacing: '-0.035em',
            color: '#ede8df',
            marginBottom: 'clamp(48px,7vh,88px)',
            maxWidth: '16ch',
          }}>
            60 minutos que cambian{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--copper-soft)' }}>cómo opera tu empresa.</em>
          </h2>
        </Reveal>

        {/* CTA principal + meta */}
        <Reveal dir="up" delay={220}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap',
            paddingTop: 32, paddingBottom: 32,
            borderTop: '1px solid rgba(237,232,223,0.1)',
            borderBottom: '1px solid rgba(237,232,223,0.1)',
            marginBottom: 'clamp(80px,10vh,128px)',
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
                padding: '20px 52px', display: 'inline-block',
                transition: 'background 0.22s, transform 0.15s',
              }}
            >
              Reservar diagnóstico gratuito ahora
            </a>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap',
              fontFamily: 'var(--font-caps)', fontSize: 8, fontWeight: 400,
              letterSpacing: 2.8, textTransform: 'uppercase', color: 'rgba(237,232,223,0.5)',
            }}>
              {['5 plazas esta semana', 'Sin tarjeta', 'Sin presión'].map(t => (
                <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: 'var(--copper)', fontSize: 5 }}>◆</span>{t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* FAQ section — patrón Clay puro */}
        <Reveal dir="up" delay={120}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px,5vw,64px)',
            fontWeight: 400, lineHeight: 1, letterSpacing: '-0.03em',
            color: '#ede8df',
            marginBottom: 'clamp(40px,6vh,72px)',
          }}>
            <em style={{ fontStyle: 'italic', color: 'var(--copper-soft)' }}>FAQ</em>
          </h3>
        </Reveal>

        <div>
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <Reveal key={i} dir="up" delay={80 + i * 60}>
                <div style={{
                  borderTop: '1px solid rgba(237,232,223,0.1)',
                  borderBottom: i === faqs.length - 1 ? '1px solid rgba(237,232,223,0.1)' : 'none',
                }}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    style={{
                      width: '100%',
                      padding: 'clamp(28px,4vw,40px) 0',
                      display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                      gap: 32, textAlign: 'left',
                      background: 'transparent', border: 'none', cursor: 'pointer',
                      transition: 'opacity 0.25s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.65' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
                  >
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(22px,2.6vw,34px)',
                      fontWeight: 400, lineHeight: 1.2, letterSpacing: '-0.02em',
                      color: '#ede8df', maxWidth: '40ch',
                    }}>{f.q}</span>
                    <span aria-hidden style={{
                      fontFamily: 'var(--font-caps)', fontSize: 22, fontWeight: 300,
                      color: 'var(--copper-soft)',
                      transition: 'transform 0.45s cubic-bezier(0.19,1,0.22,1)',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
                      lineHeight: 1, flexShrink: 0, marginTop: 8,
                    }}>+</span>
                  </button>
                  <div style={{
                    maxHeight: isOpen ? 500 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.7s cubic-bezier(0.19,1,0.22,1)',
                  }}>
                    <p style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'clamp(16px,1.4vw,19px)',
                      fontWeight: 300, lineHeight: 1.7,
                      color: 'rgba(237,232,223,0.65)',
                      padding: '0 0 36px 0', margin: 0, maxWidth: '70ch',
                    }}>{f.a}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* P.D. final estilo carta */}
        <Reveal dir="up" delay={120}>
          <div style={{
            marginTop: 'clamp(80px,10vh,140px)',
            paddingTop: 'clamp(40px,6vh,64px)',
            borderTop: '1px solid rgba(237,232,223,0.1)',
            display: 'grid',
            gridTemplateColumns: 'minmax(280px, 1fr) minmax(280px, 1.4fr)',
            gap: 'clamp(40px,6vw,96px)',
            alignItems: 'start',
          }} className="grid-2col">
            <span style={{
              fontFamily: 'var(--font-caps)', fontSize: 9, fontWeight: 600,
              letterSpacing: 3.5, textTransform: 'uppercase',
              color: 'var(--copper-soft)',
            }}>P.D.</span>
            <div>
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(17px,1.5vw,22px)',
                fontWeight: 300, fontStyle: 'italic', lineHeight: 1.65,
                color: 'rgba(237,232,223,0.75)',
                marginBottom: 22,
              }}>
                Si has llegado hasta aquí ya sabes suficiente para tomar una decisión.
                La sesión es gratuita, la garantía es real, las plazas son limitadas.
                Lo único que tienes que hacer es reservar.
              </p>
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(17px,1.5vw,22px)',
                fontWeight: 300, fontStyle: 'italic', lineHeight: 1.65,
                color: 'rgba(237,232,223,0.75)',
                marginBottom: 32,
              }}>
                Si en 90 días no ves resultados, te devolvemos cada euro.
                Si los ves — y los verás — habrás tomado la mejor decisión operativa del año.
              </p>
              <a
                href="#contacto"
                onClick={e => {
                  e.preventDefault()
                  document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--copper)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--copper-dim)' }}
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-caps)', fontSize: 9, fontWeight: 600,
                  letterSpacing: 2.3, textTransform: 'uppercase', color: 'var(--copper-soft)',
                  borderBottom: '1px solid var(--copper-dim)', paddingBottom: 3,
                  transition: 'border-color 0.2s',
                }}
              >
                Reservar mi plaza ahora →
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
