import type { ReactNode } from 'react'
import Reveal from './Reveal'
import ChatbotDemo from './demos/ChatbotDemo'
import VoiceDemo from './demos/VoiceDemo'
import DemoWebs from './demos/DemoWebs'
import RoiCalculator from './demos/RoiCalculator'

interface Slide {
  n: string
  claim: string
  proof: string
  desc: string
  demo: ReactNode
}

const SLIDES: Slide[] = [
  {
    n: '01',
    claim: 'Habla con nuestra IA. Intenta pillarla.',
    proof: 'En vivo, ahora',
    desc: 'Lynx atiende tu visita sin que nadie de nuestro equipo mire. Lo mismo que hará con tus clientes.',
    demo: <ChatbotDemo />,
  },
  {
    n: '02',
    claim: 'Coge el teléfono. Y no parece máquina.',
    proof: 'Escúchala',
    desc: 'La misma voz que puede contestar en tu número. A las 21:40 también.',
    demo: <VoiceDemo />,
  },
  {
    n: '03',
    claim: 'Así queda tu web con Talos dentro.',
    proof: 'Tres ejemplos',
    desc: 'Negocios ficticios. IA real. Y si quieres verlo a pantalla completa: entra en la web del restaurante, arrastra la carta y reserva mesa con el camarero digital.',
    demo: <DemoWebs />,
  },
  {
    n: '04',
    claim: 'Esto es lo que pierdes cada año.',
    proof: 'Calcúlalo',
    desc: 'Tres deslizadores. Tu cifra. Gratis — como el plan para recuperarla.',
    demo: <RoiCalculator />,
  },
]

export default function ProofSection() {
  return (
    <section id="pruebas" style={{ position: 'relative' }}>
      {/* intro slide */}
      <div style={{
        position: 'sticky', top: 0, minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg-base)', zIndex: 1,
        borderTop: '1px solid var(--border-subtle)',
        padding: 'clamp(100px,12vh,160px) clamp(24px,6vw,96px)',
      }}>
        <div style={{ textAlign: 'center', maxWidth: 900 }}>
          <Reveal dir="fade">
            <div style={{
              fontFamily: 'var(--font-caps)', fontSize: 9, fontWeight: 600,
              letterSpacing: 4, textTransform: 'uppercase', color: 'var(--copper-soft)',
              marginBottom: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14,
            }}>
              <span style={{ width: 28, height: 1, background: 'var(--copper)' }} />
              02 · Las pruebas
              <span style={{ width: 28, height: 1, background: 'var(--copper)' }} />
            </div>
          </Reveal>
          <Reveal dir="up" delay={120}>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 400,
              fontSize: 'clamp(40px,6.5vw,84px)', lineHeight: 1.02,
              letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: 28,
            }}>
              Cualquiera puede prometer.{' '}
              <em style={{ color: 'var(--copper-soft)' }}>Nosotros enseñamos.</em>
            </h2>
          </Reveal>
          <Reveal dir="up" delay={260}>
            <p style={{
              fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 300,
              fontSize: 'clamp(17px,1.8vw,22px)', lineHeight: 1.6,
              color: 'var(--text-secondary)', maxWidth: 640, margin: '0 auto',
            }}>
              Cuatro demos funcionando en esta página. Tócalas. Rómpelas si puedes.
            </p>
          </Reveal>
          <Reveal dir="fade" delay={420}>
            <div style={{
              marginTop: 48, fontFamily: 'var(--font-caps)', fontSize: 8,
              letterSpacing: 3, textTransform: 'uppercase', color: 'var(--text-muted)',
            }}>
              Desliza ↓
            </div>
          </Reveal>
        </div>
      </div>

      {/* proof slides — stack over each other */}
      {SLIDES.map((s, i) => (
        <div key={s.n} style={{
          position: 'sticky', top: 0, minHeight: '100vh',
          zIndex: 2 + i,
          background: i % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-base)',
          borderTop: '1px solid var(--border-soft)',
          boxShadow: '0 -30px 60px rgba(0,0,0,0.35)',
          display: 'flex', alignItems: 'center',
          padding: 'clamp(100px,12vh,150px) clamp(24px,6vw,96px) clamp(60px,8vh,100px)',
        }}>
          <div className="grid-2col" style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(36px,5vw,80px)', alignItems: 'center',
            maxWidth: 1200, margin: '0 auto', width: '100%',
          }}>
            <div>
              <Reveal dir="left">
                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: 'clamp(60px,8vw,110px)',
                  color: 'var(--text-primary)', opacity: 0.08, lineHeight: 1, marginBottom: 8,
                }}>{s.n}</div>
              </Reveal>
              <Reveal dir="up" delay={100}>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontWeight: 400,
                  fontSize: 'clamp(28px,3.6vw,46px)', lineHeight: 1.12,
                  letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: 18,
                }}>
                  {s.claim}
                </h3>
              </Reveal>
              <Reveal dir="up" delay={200}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 12,
                  fontFamily: 'var(--font-caps)', fontSize: 10, fontWeight: 600,
                  letterSpacing: 3, textTransform: 'uppercase', color: 'var(--copper-soft)',
                  marginBottom: 20,
                }}>
                  <span style={{ width: 24, height: 1, background: 'var(--copper)' }} />
                  {s.proof} →
                </div>
              </Reveal>
              <Reveal dir="up" delay={300}>
                <p style={{
                  fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 300,
                  fontSize: 'clamp(15px,1.5vw,18px)', lineHeight: 1.65,
                  color: 'var(--text-secondary)', maxWidth: 460,
                }}>
                  {s.desc}
                </p>
              </Reveal>
            </div>
            <Reveal dir="scale" delay={200} style={{ display: 'flex', justifyContent: 'center' }}>
              {s.demo}
            </Reveal>
          </div>
        </div>
      ))}
    </section>
  )
}
