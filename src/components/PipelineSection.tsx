import { useState, useRef, useEffect } from 'react'
import Reveal from './Reveal'
import { trackLead } from '../leadScore'

interface Stage { icon: string; label: string; sub: string }
interface Event { t: string; text: string; human?: boolean }

const STAGES: Stage[] = [
  { icon: '◉', label: 'Tu web', sub: 'entra el lead' },
  { icon: '💬', label: 'Lynx', sub: 'cualifica solo' },
  { icon: '▦', label: 'CRM', sub: 'ficha completa' },
  { icon: '⚡', label: 'Agente IA', sub: 'email + seguimiento' },
  { icon: '📅', label: 'Agenda', sub: 'cita confirmada' },
  { icon: '€', label: 'Caja', sub: 'tu comercial cierra' },
]

const EVENTS: Event[] = [
  { t: '02:47', text: 'Visita entra desde una campaña. Nadie de tu equipo está despierto.' },
  { t: '02:47', text: 'Lynx la atiende: 6 preguntas, presupuesto orientativo, 0 humanos.' },
  { t: '02:48', text: 'Lead cualificado → CRM. Ficha completa: necesidad, urgencia, presupuesto.' },
  { t: '02:48', text: 'Agente IA envía propuesta personalizada por email. Programa seguimiento.' },
  { t: '02:49', text: 'Cita agendada: martes 10:00. Confirmación enviada al cliente.' },
  { t: '09:00', text: 'Tu comercial entra a trabajar. Solo tiene que cerrar.', human: true },
]

export default function PipelineSection() {
  const [step, setStep] = useState(-1)
  const [running, setRunning] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const logRef = useRef<HTMLDivElement>(null)

  useEffect(() => () => timers.current.forEach(clearTimeout), [])
  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' })
  }, [step])

  const run = () => {
    trackLead('soltó un lead en el pipeline', 10)
    timers.current.forEach(clearTimeout)
    timers.current = []
    setStep(-1)
    setRunning(true)
    STAGES.forEach((_, i) => {
      timers.current.push(setTimeout(() => setStep(i), 350 + i * 1250))
    })
    timers.current.push(setTimeout(() => setRunning(false), 350 + STAGES.length * 1250))
  }

  return (
    <section id="proceso" style={{
      background: 'var(--bg-surface)',
      borderTop: '1px solid var(--border-subtle)',
      padding: 'clamp(90px,14vh,170px) clamp(24px,6vw,96px)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Reveal dir="fade">
          <div style={{
            fontFamily: 'var(--font-caps)', fontSize: 9, fontWeight: 600,
            letterSpacing: 4, textTransform: 'uppercase', color: 'var(--copper-soft)',
            marginBottom: 26, display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <span style={{ width: 28, height: 1, background: 'var(--copper)' }} />
            04 · El proceso, por dentro
          </div>
        </Reveal>
        <Reveal dir="up" delay={100}>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 400,
            fontSize: 'clamp(36px,5.5vw,72px)', lineHeight: 1.04,
            letterSpacing: '-0.03em', color: 'var(--text-primary)',
            marginBottom: 18, maxWidth: 820,
          }}>
            La vida de un lead{' '}
            <em style={{ color: 'var(--copper-soft)' }}>con Talos dentro.</em>
          </h2>
        </Reveal>
        <Reveal dir="up" delay={200}>
          <p style={{
            fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 300,
            fontSize: 'clamp(16px,1.6vw,20px)', color: 'var(--text-secondary)',
            marginBottom: 'clamp(36px,5vh,56px)', maxWidth: 560, lineHeight: 1.6,
          }}>
            Esto no es un diagrama de PowerPoint. Es lo que pasa, minuto a minuto,
            mientras duermes. Suéltale un lead y míralo.
          </p>
        </Reveal>

        {/* pipeline */}
        <Reveal dir="up" delay={280}>
          <div className="pipeline-track" style={{ marginBottom: 34 }}>
            {STAGES.map((s, i) => {
              const active = i <= step
              const current = i === step
              return (
                <div key={s.label} style={{ display: 'flex', alignItems: 'center', flex: i < STAGES.length - 1 ? 1 : 'none', flexDirection: 'inherit' as never }}>
                  <div style={{
                    border: `1px solid ${active ? 'var(--copper)' : 'var(--border-soft)'}`,
                    background: current ? 'var(--copper-glow)' : 'var(--bg-card)',
                    boxShadow: current ? '0 0 28px var(--copper-dim)' : 'none',
                    padding: '16px 18px', minWidth: 128, textAlign: 'center',
                    transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
                    transform: current ? 'translateY(-4px)' : 'none',
                  }}>
                    <div style={{ fontSize: 19, marginBottom: 7, opacity: active ? 1 : 0.35, transition: 'opacity 0.4s' }}>{s.icon}</div>
                    <div style={{
                      fontFamily: 'var(--font-caps)', fontSize: 8.5, fontWeight: 600,
                      letterSpacing: 2, textTransform: 'uppercase',
                      color: active ? 'var(--copper-soft)' : 'var(--text-muted)',
                      marginBottom: 3, transition: 'color 0.4s',
                    }}>{s.label}</div>
                    <div style={{
                      fontFamily: 'var(--font-sans)', fontSize: 10.5,
                      color: active ? 'var(--text-secondary)' : 'var(--text-muted)',
                    }}>{s.sub}</div>
                  </div>
                  {i < STAGES.length - 1 && (
                    <div className="pipeline-link" style={{
                      flex: 1, height: 1, minWidth: 14,
                      background: i < step ? 'var(--copper)' : 'var(--border-soft)',
                      transition: 'background 0.5s', position: 'relative',
                    }}>
                      {i === step - 1 && running && (
                        <span style={{
                          position: 'absolute', top: -3, right: 0,
                          width: 7, height: 7, borderRadius: '50%',
                          background: 'var(--copper)', boxShadow: '0 0 10px var(--copper)',
                        }} />
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </Reveal>

        {/* log + botón */}
        <Reveal dir="up" delay={340}>
          <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'start' }}>
            <div ref={logRef} style={{
              border: '1px solid var(--border-soft)', background: 'var(--bg-base)',
              padding: '16px 20px', height: 168, overflowY: 'auto',
              fontFamily: 'var(--font-sans)', fontSize: 13, lineHeight: 1.5,
            }}>
              {step < 0 && (
                <span style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontFamily: 'var(--font-serif)', fontSize: 14 }}>
                  › Registro de actividad — vacío. Pulsa el botón.
                </span>
              )}
              {EVENTS.slice(0, step + 1).map((e, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 9 }}>
                  <span style={{
                    fontFamily: 'var(--font-caps)', fontSize: 9, letterSpacing: 1,
                    color: e.human ? 'var(--teal)' : 'var(--copper-soft)', paddingTop: 2, flexShrink: 0,
                  }}>{e.t}</span>
                  <span style={{ color: e.human ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{e.text}</span>
                </div>
              ))}
            </div>
            <button onClick={run} disabled={running} style={{
              fontFamily: 'var(--font-caps)', fontSize: 9.5, fontWeight: 600,
              letterSpacing: 2.5, textTransform: 'uppercase',
              background: running ? 'var(--bg-raised)' : 'var(--copper)',
              color: running ? 'var(--text-muted)' : '#fff',
              padding: '19px 38px', whiteSpace: 'nowrap',
              cursor: running ? 'default' : 'pointer', transition: 'all 0.2s',
            }}>
              {running ? 'Trabajando…' : step >= 0 ? '↻ Soltar otro lead' : '▶ Soltar un lead'}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
