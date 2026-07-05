import { useState, useEffect, useCallback } from 'react'

const SEEN = 'tl-exit-seen'

export default function ExitIntent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    let armed = true
    try { if (sessionStorage.getItem(SEEN)) armed = false } catch { /* ok */ }
    if (!armed || window.matchMedia('(hover: none)').matches) return
    const onLeave = (e: MouseEvent) => {
      if (e.clientY > 8 || e.relatedTarget) return
      try { sessionStorage.setItem(SEEN, '1') } catch { /* ok */ }
      setShow(true)
      document.removeEventListener('mouseout', onLeave)
    }
    const t = setTimeout(() => document.addEventListener('mouseout', onLeave), 12000)
    return () => { clearTimeout(t); document.removeEventListener('mouseout', onLeave) }
  }, [])

  const close = useCallback(() => setShow(false), [])
  const goCalc = (e: React.MouseEvent) => {
    e.preventDefault()
    close()
    document.getElementById('pruebas')?.scrollIntoView({ behavior: 'smooth' })
  }

  if (!show) return null

  return (
    <div onClick={close} style={{
      position: 'fixed', inset: 0, zIndex: 4000,
      background: 'rgba(5,7,14,0.72)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        maxWidth: 520, width: '100%', background: 'var(--bg-card)',
        border: '1px solid var(--copper-dim)', padding: 'clamp(32px,5vw,48px)',
        textAlign: 'center', boxShadow: '0 30px 90px rgba(0,0,0,0.5)',
      }}>
        <div style={{
          fontFamily: 'var(--font-caps)', fontSize: 8, fontWeight: 600,
          letterSpacing: 3, textTransform: 'uppercase', color: 'var(--copper-soft)', marginBottom: 18,
        }}>
          Un segundo —
        </div>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontWeight: 400,
          fontSize: 'clamp(24px,3.5vw,34px)', lineHeight: 1.15,
          letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: 14,
        }}>
          ¿Te vas sin saber cuánto pierdes al año?
        </h3>
        <p style={{
          fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 300,
          fontSize: 16, lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: 26,
        }}>
          La calculadora tarda 20 segundos y es gratis.
          La cifra que te da, no tanto.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#pruebas" onClick={goCalc} style={{
            fontFamily: 'var(--font-caps)', fontSize: 8.5, fontWeight: 600,
            letterSpacing: 2.5, textTransform: 'uppercase',
            background: 'var(--copper)', color: '#fff', padding: '15px 30px',
          }}>
            Calcular lo que pierdo →
          </a>
          <button onClick={close} style={{
            fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-muted)',
            padding: '15px 10px',
          }}>
            Prefiero no saberlo
          </button>
        </div>
      </div>
    </div>
  )
}
