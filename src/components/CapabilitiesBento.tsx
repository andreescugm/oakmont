import type { CSSProperties, ReactNode } from 'react'
import Reveal from './Reveal'

/* ── micro-visuales ── */

const line = (w: string, d = 0): CSSProperties => ({
  height: 5, width: w, background: 'var(--border-mid)',
  animation: `pulseGlow 2.6s ease-in-out ${d}s infinite`,
})

function VisualWeb() {
  return (
    <div style={{ border: '1px solid var(--border-soft)', background: 'var(--bg-base)', padding: 10, width: '100%', maxWidth: 300 }}>
      <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
        {[0, 1, 2].map(i => <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--border-mid)' }} />)}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ ...line('70%'), height: 10, background: 'var(--text-muted)' }} />
        <div style={line('90%', 0.3)} />
        <div style={line('55%', 0.6)} />
        <div style={{
          marginTop: 6, width: 92, padding: '6px 0', textAlign: 'center',
          background: 'var(--copper)', color: '#fff',
          fontFamily: 'var(--font-caps)', fontSize: 6, letterSpacing: 1.5, textTransform: 'uppercase',
          animation: 'cursorTap 3.2s ease-in-out infinite',
        }}>Reservar →</div>
      </div>
    </div>
  )
}

function VisualCRM() {
  const card = (d: number): CSSProperties => ({
    height: 16, background: 'var(--bg-raised)', border: '1px solid var(--border-soft)',
    animation: `floatCard 3s ease-in-out ${d}s infinite`,
  })
  return (
    <div style={{ display: 'flex', gap: 6, width: '100%', maxWidth: 220 }}>
      {[0, 1, 2].map(col => (
        <div key={col} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div style={{ height: 4, background: col === 2 ? 'var(--copper)' : 'var(--border-mid)' }} />
          {Array.from({ length: 3 - col }).map((_, i) => <div key={i} style={card(col * 0.4 + i * 0.6)} />)}
          {col === 2 && <div style={{ ...card(0.2), borderColor: 'var(--copper)', background: 'var(--copper-glow)' }} />}
        </div>
      ))}
    </div>
  )
}

function VisualAgent() {
  return (
    <div style={{ position: 'relative', width: 64, height: 64 }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          position: 'absolute', inset: i * 10,
          border: '1px solid var(--copper)', borderRadius: '50%',
          opacity: 0.25 + i * 0.2,
          animation: `ringPulse ${2 + i * 0.5}s ease-in-out infinite`,
        }} />
      ))}
      <span style={{
        position: 'absolute', inset: 26, borderRadius: '50%',
        background: 'var(--copper)', boxShadow: '0 0 14px var(--copper)',
      }} />
    </div>
  )
}

function VisualChat() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%', maxWidth: 170 }}>
      <div style={{ alignSelf: 'flex-end', width: '62%', height: 14, background: 'var(--bg-raised)', border: '1px solid var(--border-soft)' }} />
      <div style={{
        alignSelf: 'flex-start', padding: '5px 10px', display: 'flex', gap: 4,
        background: 'var(--copper-glow)', border: '1px solid var(--copper-dim)',
      }}>
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            width: 5, height: 5, borderRadius: '50%', background: 'var(--copper-soft)',
            animation: `typingDot 1.2s ${i * 0.2}s infinite`,
          }} />
        ))}
      </div>
    </div>
  )
}

function VisualFlow() {
  return (
    <svg viewBox="0 0 200 56" style={{ width: '100%', maxWidth: 220 }}>
      {[[8, 8], [88, 8], [168, 8]].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width={24} height={24} fill="none"
          stroke={i === 1 ? 'var(--copper)' : 'var(--border-mid)'} strokeWidth="1.2" />
      ))}
      <path d="M32 20 H88 M112 20 H168" stroke="var(--copper)" strokeWidth="1.2"
        strokeDasharray="5 5" style={{ animation: 'dashFlow 1.2s linear infinite' }} />
      <path d="M100 32 V44 H40" stroke="var(--border-mid)" strokeWidth="1"
        strokeDasharray="4 4" style={{ animation: 'dashFlow 1.6s linear infinite' }} fill="none" />
    </svg>
  )
}

function VisualApp() {
  return (
    <div style={{
      width: 52, border: '1px solid var(--border-mid)', background: 'var(--bg-base)',
      padding: '8px 6px 10px', display: 'flex', flexDirection: 'column', gap: 5,
    }}>
      <div style={{ ...line('100%'), height: 8, background: 'var(--copper-dim)' }} />
      <div style={line('80%', 0.3)} />
      <div style={line('60%', 0.6)} />
      <div style={{ marginTop: 4, height: 9, background: 'var(--copper)', animation: 'cursorTap 3s 1s ease-in-out infinite' }} />
    </div>
  )
}

function VisualVoice() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 3, height: 34 }}>
      {[0.9, 0.5, 1, 0.4, 0.75, 1, 0.55, 0.85, 0.4, 0.7].map((h, i) => (
        <span key={i} style={{
          width: 4, height: 30 * h, background: 'var(--copper-soft)', transformOrigin: 'center',
          animation: `waveBar ${0.9 + (i % 4) * 0.22}s ease-in-out ${i * 0.08}s infinite`,
        }} />
      ))}
    </div>
  )
}

function VisualUX() {
  return (
    <div style={{ position: 'relative', width: 130, height: 52 }}>
      <div style={{
        position: 'absolute', top: 8, left: 0, width: 96, height: 30,
        border: '1px solid var(--border-mid)', background: 'var(--bg-base)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-caps)', fontSize: 6, letterSpacing: 1.5,
        textTransform: 'uppercase', color: 'var(--text-secondary)',
      }}>Comprar</div>
      <span style={{
        position: 'absolute', top: 26, left: 82, fontSize: 15,
        animation: 'cursorTap 2.4s ease-in-out infinite', color: 'var(--copper-soft)',
      }}>➤</span>
    </div>
  )
}

/* ── celdas ── */

interface Cell {
  span: string
  label: string
  copy: string
  visual: ReactNode
}

const CELLS: Cell[] = [
  { span: 'span 2', label: 'Webs que venden', copy: 'Diseño premium, copy con colmillo y cada píxel apuntando a la conversión.', visual: <VisualWeb /> },
  { span: 'auto', label: 'CRMs a medida', copy: 'Tu pipeline, tus reglas. Cero Excel.', visual: <VisualCRM /> },
  { span: 'auto', label: 'Agentes de IA', copy: 'Deciden, ejecutan, escalan. Solos.', visual: <VisualAgent /> },
  { span: 'auto', label: 'Chatbots con criterio', copy: 'Venden a las 2:47. Ya lo has probado.', visual: <VisualChat /> },
  { span: 'span 2', label: 'Automatizaciones y flujos', copy: 'Lead → CRM → email → cita → caja. Sin manos humanas por el camino.', visual: <VisualFlow /> },
  { span: 'auto', label: 'Apps y sistemas internos', copy: 'Herramientas que tu equipo usa de verdad.', visual: <VisualApp /> },
  { span: 'auto', label: 'Voz IA', copy: 'Coge el teléfono. No parece máquina.', visual: <VisualVoice /> },
  { span: 'auto', label: 'UI/UX de producto', copy: 'Interfaces que no hay que explicar.', visual: <VisualUX /> },
  { span: 'span 2', label: 'Productos digitales completos', copy: 'De la idea al sistema en producción. Diseñado, construido y medido por el mismo equipo.', visual: <VisualFlow /> },
]

export default function CapabilitiesBento() {
  return (
    <section id="capacidades" style={{
      background: 'var(--bg-base)',
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
            03 · Qué construimos
          </div>
        </Reveal>
        <Reveal dir="up" delay={100}>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 400,
            fontSize: 'clamp(36px,5.5vw,72px)', lineHeight: 1.04,
            letterSpacing: '-0.03em', color: 'var(--text-primary)',
            marginBottom: 'clamp(40px,6vh,64px)', maxWidth: 800,
          }}>
            Todo lo que tu negocio toca,{' '}
            <em style={{ color: 'var(--copper-soft)' }}>lo construimos.</em>
          </h2>
        </Reveal>

        <div className="bento-grid">
          {CELLS.map((c, i) => (
            <Reveal key={c.label} dir="up" delay={i * 60} style={{ gridColumn: c.span }}>
              <div className="bento-cell" style={{
                border: '1px solid var(--border-soft)', background: 'var(--bg-card)',
                padding: 'clamp(20px,2.4vw,30px)', height: '100%', minHeight: 210,
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 18,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', minHeight: 70 }}>
                  {c.visual}
                </div>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-caps)', fontSize: 9.5, fontWeight: 600,
                    letterSpacing: 2.5, textTransform: 'uppercase',
                    color: 'var(--text-primary)', marginBottom: 8,
                  }}>{c.label}</div>
                  <p style={{
                    fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 300,
                    fontSize: 14.5, lineHeight: 1.55, color: 'var(--text-secondary)',
                  }}>{c.copy}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
