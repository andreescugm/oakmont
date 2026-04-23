import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'

function useCounter(target: number, duration = 1500) {
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

function StatCell({ label, value, desc, isCounter }: { label: string; value: string | number; desc: string; isCounter?: boolean }) {
  const { val, ref } = useCounter(isCounter ? Number(value) : 0)
  return (
    <div ref={ref} style={{
      background: 'var(--bg-raised)', padding: '38px 30px', textAlign: 'left',
      position: 'relative', transition: 'background 0.2s',
    }}
    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--bg-hover)'}
    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'var(--bg-raised)'}>
      <span style={{
        fontFamily: 'var(--font-caps)', fontSize: 7, fontWeight: 600,
        letterSpacing: 2.8, textTransform: 'uppercase', color: 'var(--copper-soft)',
        paddingBottom: 10, marginBottom: 14, borderBottom: '1px solid var(--copper-dim)', display: 'block',
      }}>{label}</span>
      <div style={{
        fontFamily: 'var(--font-display)', fontSize: 50, fontWeight: 400,
        color: 'var(--text-primary)', lineHeight: 1, letterSpacing: '-0.04em',
      }}>
        {isCounter ? val : value}
      </div>
      <div style={{
        fontFamily: 'var(--font-serif)', fontSize: 14, fontWeight: 300, fontStyle: 'italic',
        color: 'var(--text-muted)', marginTop: 8,
      }}>{desc}</div>
    </div>
  )
}

export default function Stats() {
  return (
    <section style={{ background: 'var(--bg-surface)', padding: '88px 0 80px', textAlign: 'center' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px' }}>
        <Reveal dir="left">
          <span style={{
            fontFamily: 'var(--font-caps)', fontSize: 7.5, fontWeight: 600,
            letterSpacing: 3, textTransform: 'uppercase', color: 'var(--copper-soft)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 36,
          }}>
            <span style={{ width: 26, height: 1, background: 'var(--copper)', flexShrink: 0 }} />
            Los números que importan
          </span>
        </Reveal>
        <Reveal dir="up">
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(34px,5.5vw,68px)',
            fontWeight: 400, lineHeight: 0.94, letterSpacing: '-0.03em',
            color: 'var(--text-primary)', marginBottom: 28, textAlign: 'center',
          }}>
            Resultados medibles.<br />
            <em style={{ fontStyle: 'italic', color: 'var(--copper-soft)' }}>No promesas.</em>
          </h2>
        </Reveal>
        <Reveal dir="up" delay={100}>
          <p style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(16px,1.7vw,19px)',
            fontWeight: 300, fontStyle: 'italic', lineHeight: 1.7,
            color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto 56px',
          }}>
            Metodología norteamericana de alto rendimiento aplicada al mercado español.
            La única firma en España que garantiza resultados por contrato —
            porque operar sin esa garantía significaría no confiar en el propio trabajo.
          </p>
        </Reveal>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
        gap: 1, background: 'var(--copper-dim)', border: '1px solid var(--copper-dim)',
        maxWidth: 920, margin: '0 auto',
      }}>
        <StatCell isCounter label="Garantía de plazo" value={90} desc="días para resultados verificables o devolución íntegra" />
        <StatCell label="Tiempo liberado" value="3h" desc="promedio por empleado al día" />
        <StatCell label="Coste si no se cumple" value="0€" desc="y seguimos trabajando gratis hasta lograrlo" />
      </div>
    </section>
  )
}
