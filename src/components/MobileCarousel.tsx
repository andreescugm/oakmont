import { useRef, useState, useEffect } from 'react'
import type { ReactNode, CSSProperties } from 'react'

export default function MobileCarousel({ count, children, style }: {
  count: number
  children: ReactNode
  style?: CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const scroll = (dir: -1 | 1) => {
    const el = ref.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: 'smooth' })
  }

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      const max = el.scrollWidth - el.clientWidth
      if (max === 0) return
      setActive(Math.min(count - 1, Math.round((el.scrollLeft / max) * (count - 1))))
    }
    el.addEventListener('scroll', update, { passive: true })
    return () => el.removeEventListener('scroll', update)
  }, [count])

  return (
    <div className="mc-wrapper">
      <div className="mc-arrows">
        <button className="mc-arrow" onClick={() => scroll(-1)} aria-label="Anterior">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 2L4 7l5 5"/>
          </svg>
        </button>
        <button className="mc-arrow" onClick={() => scroll(1)} aria-label="Siguiente">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 2l5 5-5 5"/>
          </svg>
        </button>
      </div>

      <div ref={ref} className="mobile-carousel" style={style}>
        {children}
      </div>

      <div className="mc-dots">
        {Array.from({ length: count }, (_, i) => (
          <span key={i} className={i === active ? 'mc-dot mc-dot-active' : 'mc-dot'} />
        ))}
      </div>
    </div>
  )
}
