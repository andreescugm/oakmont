export default function AnnBar() {
  return (
    <div style={{
      background: 'var(--copper)',
      padding: '9px 24px', textAlign: 'center',
      fontFamily: 'var(--font-caps)', fontSize: 7.5, fontWeight: 600,
      letterSpacing: 3, textTransform: 'uppercase', color: '#fff',
      position: 'relative', zIndex: 200, overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 50%, transparent 100%)',
        animation: 'shimmer 3.5s infinite', pointerEvents: 'none',
      }} />
      Atención directores y dueños de empresa que facturan más de 5.000€/mes — y quieren crecer sin contratar más
    </div>
  )
}
