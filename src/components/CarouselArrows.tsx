import type { RefObject } from 'react'

export default function CarouselArrows({ scrollRef }: { scrollRef: RefObject<HTMLDivElement | null> }) {
  const scroll = (dir: -1 | 1) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: 'smooth' })
  }
  return (
    <div className="car-arrows">
      <button className="car-arrow" onClick={() => scroll(-1)} aria-label="Anterior">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 2L4 7l5 5"/>
        </svg>
      </button>
      <button className="car-arrow" onClick={() => scroll(1)} aria-label="Siguiente">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 2l5 5-5 5"/>
        </svg>
      </button>
    </div>
  )
}
