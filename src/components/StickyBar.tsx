interface Props { show: boolean }

export default function StickyBar({ show }: Props) {
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 999,
      background: 'var(--bg-raised)',
      borderTop: '2px solid var(--copper)',
      padding: '12px 28px',
      display: 'flex', alignItems: 'center', gap: 16,
      boxShadow: '0 -6px 32px rgba(0,0,0,0.28)',
      transform: show ? 'translateY(0)' : 'translateY(100%)',
      transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
    }}>
      <span style={{
        fontFamily: 'var(--font-caps)', fontSize: 7.5, fontWeight: 600,
        letterSpacing: 2.3, textTransform: 'uppercase',
        color: 'var(--text-muted)', whiteSpace: 'nowrap', flexShrink: 0,
      }}>Solo 5 plazas este mes</span>
      <a href="#contacto" style={{
        fontFamily: 'var(--font-caps)', fontSize: 8.5, fontWeight: 600,
        letterSpacing: 2.5, textTransform: 'uppercase',
        background: 'var(--copper)', color: '#fff',
        padding: '11px 28px', display: 'inline-block',
        transition: 'background 0.22s',
      }}
      onClick={e => { e.preventDefault(); document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#a86830'}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'var(--copper)'}>
        Reservar diagnóstico →
      </a>
    </div>
  )
}
