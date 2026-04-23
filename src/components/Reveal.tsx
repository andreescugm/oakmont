import { useEffect, useRef, useState } from 'react'
import type { ReactNode, CSSProperties, JSX } from 'react'

type Dir = 'up' | 'left' | 'fade' | 'scale'

interface RevealProps {
  children: ReactNode
  dir?: Dir
  delay?: number
  className?: string
  style?: CSSProperties
  as?: keyof JSX.IntrinsicElements
}

const initial: Record<Dir, CSSProperties> = {
  up:    { opacity: 0, transform: 'translateY(22px)' },
  left:  { opacity: 0, transform: 'translateX(-18px)' },
  fade:  { opacity: 0 },
  scale: { opacity: 0, transform: 'scale(0.96)' },
}
const visible: CSSProperties = { opacity: 1, transform: 'none' }

export default function Reveal({
  children, dir = 'up', delay = 0, className = '', style = {}, as: Tag = 'div',
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          obs.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const base: CSSProperties = {
    ...(revealed ? visible : initial[dir]),
    transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    willChange: 'opacity, transform',
    ...style,
  }

  return (
    // @ts-ignore
    <Tag ref={ref} className={className} style={base}>
      {children}
    </Tag>
  )
}
