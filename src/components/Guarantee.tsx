export default function Guarantee() {
  return (
    <section id="garantia" style={{
      background: 'var(--copper)',
      padding: '80px 48px', textAlign: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)',
        pointerEvents: 'none',
      }} />
      {/* shimmer */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 50%, transparent 100%)',
        animation: 'shimmer 3.5s infinite',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <span style={{
          fontFamily: 'var(--font-caps)', fontSize: 8, fontWeight: 700,
          letterSpacing: 3.5, textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.55)', display: 'block', marginBottom: 18,
        }}>100% Garantía de resultado</span>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(32px,4.5vw,58px)',
          fontWeight: 400, fontStyle: 'italic',
          color: '#fff', marginBottom: 18,
          letterSpacing: '-0.025em', lineHeight: 1.05,
        }}>
          Si no ves resultados en 90 días,<br />devolvemos todo y seguimos gratis.
        </h2>

        <p style={{
          fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 300, fontStyle: 'italic',
          lineHeight: 1.8, color: 'rgba(255,255,255,0.8)',
          maxWidth: 660, margin: '0 auto 34px',
        }}>
          Esta no es la garantía que la mayoría de consultores menciona y nunca aplica.
          Es un compromiso escrito y firmado en el contrato, sin excepciones ni cláusulas.
          Si implementamos el sistema y al día 90 no hay resultados verificables, devolvemos
          el 100% de la inversión y continuamos trabajando sin coste adicional hasta lograrlo.
        </p>

        <a href="#contacto" style={{
          fontFamily: 'var(--font-caps)', fontSize: 8.5, fontWeight: 600,
          letterSpacing: 2.5, textTransform: 'uppercase',
          background: '#fff', color: 'var(--copper)',
          padding: '15px 44px', display: 'inline-block',
          transition: 'background 0.2s, transform 0.15s',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#f5f2ec'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; (e.currentTarget as HTMLElement).style.transform = 'none' }}>
          Reservar diagnóstico gratuito →
        </a>
      </div>
    </section>
  )
}
