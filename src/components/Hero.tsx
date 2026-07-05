import Reveal from './Reveal'

export default function Hero() {
  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 'clamp(120px,15vh,190px) clamp(24px,6vw,96px) clamp(70px,9vh,120px)',
      position: 'relative', overflow: 'hidden',
      background: 'var(--bg-base)',
      textAlign: 'center',
    }}>
      {/* halo central detrás del titular */}
      <div aria-hidden style={{
        position: 'absolute', left: '50%', top: '42%',
        width: 'min(900px, 90vw)', height: 'min(600px, 70vh)',
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(ellipse, rgba(193,123,58,0.10) 0%, rgba(74,144,128,0.04) 45%, transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none',
        animation: 'pulseGlow 7s ease-in-out infinite',
      }} />
      <div aria-hidden style={{
        position: 'absolute', borderRadius: '50%', pointerEvents: 'none',
        filter: 'blur(100px)', animation: 'drift 16s ease-in-out infinite alternate',
        width: 480, height: 480,
        background: 'radial-gradient(circle, rgba(74,144,128,0.05) 0%, transparent 70%)',
        bottom: -140, left: -100,
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto' }}>
        <Reveal dir="fade" delay={60}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 14,
            fontFamily: 'var(--font-caps)', fontSize: 9, fontWeight: 600,
            letterSpacing: 4, textTransform: 'uppercase', color: 'var(--copper-soft)',
            marginBottom: 'clamp(28px,4vh,44px)',
          }}>
            <span style={{ width: 26, height: 1, background: 'var(--copper)' }} />
            Talos Lynx · IA · Castilla
            <span style={{ width: 26, height: 1, background: 'var(--copper)' }} />
          </div>
        </Reveal>

        <Reveal dir="up" delay={160}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(58px,11.5vw,164px)',
            fontWeight: 400, lineHeight: 0.94, letterSpacing: '-0.04em',
            color: 'var(--text-primary)',
            marginBottom: 'clamp(26px,4vh,42px)',
          }}>
            Vende mientras
            <br />
            duermes.{' '}
            <em className="text-gradient" style={{ fontStyle: 'italic' }}>Demostrado.</em>
          </h1>
        </Reveal>

        <Reveal dir="up" delay={300}>
          <p style={{
            fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 300,
            fontSize: 'clamp(17px,2vw,23px)', lineHeight: 1.55,
            color: 'var(--text-secondary)', maxWidth: 620,
            margin: '0 auto clamp(38px,5vh,54px)',
          }}>
            IA que atiende, cualifica y cierra citas por ti — 24/7.
            No pedimos fe: <span style={{ color: 'var(--text-primary)' }}>en esta web puedes probarla en vivo.</span>
          </p>
        </Reveal>

        <Reveal dir="up" delay={420}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 26, flexWrap: 'wrap' }}>
            <a href="#pruebas" onClick={go('pruebas')}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#a86830'; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 14px 40px rgba(193,123,58,0.35)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'var(--copper)'; el.style.transform = 'none'; el.style.boxShadow = '0 8px 30px rgba(193,123,58,0.25)' }}
              style={{
                fontFamily: 'var(--font-caps)', fontSize: 9.5, fontWeight: 600,
                letterSpacing: 2.5, textTransform: 'uppercase',
                background: 'var(--copper)', color: '#fff',
                padding: '20px 48px', transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
                boxShadow: '0 8px 30px rgba(193,123,58,0.25)',
              }}>
              Probar la IA en vivo ↓
            </a>
            <a href="#contacto" onClick={go('contacto')}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--copper-soft)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)' }}
              style={{
                fontFamily: 'var(--font-sans)', fontSize: 14,
                color: 'var(--text-secondary)', paddingBottom: 3,
                borderBottom: '1px solid var(--border-mid)', transition: 'color 0.2s',
              }}>
              Reservar diagnóstico gratuito →
            </a>
          </div>
        </Reveal>

        <Reveal dir="fade" delay={580}>
          <div style={{
            marginTop: 'clamp(52px,9vh,96px)', paddingTop: 26,
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex', justifyContent: 'center', gap: 'clamp(20px,4vw,56px)', flexWrap: 'wrap',
            fontFamily: 'var(--font-caps)', fontSize: 8, fontWeight: 600,
            letterSpacing: 2.5, textTransform: 'uppercase', color: 'var(--text-muted)',
          }}>
            <span>Visto en <span style={{ color: 'var(--text-secondary)' }}>Impacto España Noticias</span></span>
            <span aria-hidden style={{ color: 'var(--copper)' }}>◆</span>
            <span>Garantía 90 días <span style={{ color: 'var(--copper-soft)' }}>firmada por contrato</span></span>
            <span aria-hidden style={{ color: 'var(--copper)' }}>◆</span>
            <span>Respuesta &lt; 24h</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
