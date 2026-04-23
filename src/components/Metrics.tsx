import { useEffect, useRef, useState } from 'react'

function useCounter(target: number, duration = 1400) {
  const [val, setVal] = useState(0)
  const started = useRef(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setVal(Math.round(eased * target))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, duration])

  return { val, ref }
}

const items = [
  { key: 'counter', label: 'Garantía por contrato', display: '100%' },
  { key: 'days', label: 'Días o devolución íntegra', target: 90 },
  { key: 'static', label: 'Liberadas por empleado/día', display: '3h' },
  { key: 'zero', label: 'Coste si no se cumple', display: '0€' },
]

function MetricItem({ item, idx }: { item: typeof items[0], idx: number }) {
  const { val, ref } = useCounter(item.target ?? 0, 1400)
  return (
    <div
      ref={ref}
      className="metrics-card"
      style={{
        padding: '32px 28px',
        borderRight: idx < 3 ? '1px solid rgba(255,255,255,0.12)' : 'none',
        transition: 'background 0.2s',
      }}
    >
      <div className="metrics-num" style={{
        fontFamily: 'var(--font-display)', fontSize: 46, fontWeight: 400,
        color: '#fff', lineHeight: 1, letterSpacing: '-0.04em', marginBottom: 6,
      }}>
        {item.target !== undefined ? `${val}` : item.display}
      </div>
      <div className="metrics-label" style={{
        fontFamily: 'var(--font-caps)', fontSize: 7, fontWeight: 600,
        letterSpacing: 2.8, textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)',
      }}>{item.label}</div>
    </div>
  )
}

export default function Metrics() {
  return (
    <div style={{ background: 'var(--copper)', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%)',
      }} />
      <div className="metrics-grid" style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
        position: 'relative', zIndex: 1,
      }}>
        {items.map((item, idx) => (
          <MetricItem key={idx} item={item} idx={idx} />
        ))}
      </div>
    </div>
  )
}
