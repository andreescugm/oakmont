import { useRef, useState, useEffect } from 'react'
import type { ReactNode, CSSProperties, RefObject } from 'react'

interface Props {
  count: number
  children: ReactNode
  style?: CSSProperties
  scrollRef?: RefObject<HTMLDivElement | null>
}

export default function MobileCarousel({ count, children, style, scrollRef: externalRef }: Props) {
  const internalRef = useRef<HTMLDivElement>(null)
  const ref = externalRef ?? internalRef
  const [active, setActive] = useState(0)

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
