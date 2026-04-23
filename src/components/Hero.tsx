import Reveal from './Reveal'

export default function Hero() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      textAlign: 'center',
      padding: '160px 48px 100px',
      position: 'relative', overflow: 'hidden',
      background: 'var(--bg-base)',
    }}>
      {/* orbs */}
      <div style={{
        position: 'absolute', borderRadius: '50%', pointerEvents: 'none',
        filter: 'blur(80px)', animation: 'drift 12s ease-in-out infinite alternate',
        width: 480, height: 480,
        background: 'radial-gradient(circle, rgba(193,123,58,0.07) 0%, transparent 70%)',
        top: -80, right: -60,
      }} />
      <div style={{
        position: 'absolute', borderRadius: '50%', pointerEvents: 'none',
        filter: 'blur(80px)', animation: 'drift 12s ease-in-out infinite alternate',
        animationDelay: '-5s',
        width: 340, height: 340,
        background: 'radial-gradient(circle, rgba(74,144,128,0.05) 0%, transparent 70%)',
        bottom: 60, left: -50,
      }} />
      {/* ghost */}
      <div aria-hidden style={{
        position: 'absolute', right: '-2%', bottom: '-14%',
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(220px,38vw,460px)',
        fontWeight: 500, lineHeight: 1,
        color: 'var(--text-primary)', opacity: 0.022,
        pointerEvents: 'none', userSelect: 'none', letterSpacing: '-0.04em',
      }}>AO</div>
      {/* left rule */}
      <div aria-hidden style={{
        position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
        width: 2, height: 180,
        background: 'linear-gradient(180deg, transparent, var(--copper), transparent)',
        opacity: 0.38,
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 900 }}>
        {/* eyebrow */}
        <Reveal dir="fade" delay={100}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 14,
            fontFamily: 'var(--font-caps)', fontSize: 8.5, fontWeight: 600,
            letterSpacing: 4.5, textTransform: 'uppercase', color: 'var(--copper-soft)',
            marginBottom: 28,
          }}>
            <span style={{ width: 24, height: 1, background: 'var(--copper)', flexShrink: 0 }} />
            Andreescu Oakmont · Automatización con IA
            <span style={{ width: 24, height: 1, background: 'var(--copper)', flexShrink: 0 }} />
          </div>
        </Reveal>

        <Reveal dir="up" delay={200}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(46px,8.5vw,100px)',
            fontWeight: 400, lineHeight: 0.94,
            letterSpacing: '-0.03em', color: 'var(--text-primary)',
            marginBottom: 24,
          }}>
            Tu empresa a pleno<br />rendimiento<br />
            <em style={{ fontStyle: 'italic', color: 'var(--copper-soft)' }}>sin que tú estés presente.</em>
          </h1>
        </Reveal>

        <Reveal dir="up" delay={320}>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(16px,1.9vw,20px)',
            fontWeight: 300, fontStyle: 'italic',
            lineHeight: 1.65, color: 'var(--text-secondary)',
            maxWidth: 580, margin: '0 auto 44px',
          }}>
            Implementamos sistemas de automatización con IA que eliminan las tareas repetitivas,
            cualifican clientes solos y liberan a tu equipo para lo único que importa: cerrar y crecer.
          </p>
        </Reveal>

        <Reveal dir="up" delay={420}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 28, flexWrap: 'wrap', marginBottom: 36,
          }}>
            <a href="#contacto" style={{
              fontFamily: 'var(--font-caps)', fontSize: 8.5, fontWeight: 600,
              letterSpacing: 2.5, textTransform: 'uppercase',
              background: 'var(--copper)', color: '#fff',
              padding: '15px 40px', display: 'inline-block',
              transition: 'background 0.22s, transform 0.15s',
            }}
            onClick={e => { e.preventDefault(); document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#a86830'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--copper)'; (e.currentTarget as HTMLElement).style.transform = 'none' }}>
              Reservar diagnóstico gratuito →
            </a>
            <a href="#problema" style={{
              fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 400,
              color: 'var(--text-muted)',
              paddingBottom: 2,
              borderBottom: '1px solid var(--border-soft)',
              transition: 'color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--copper-soft)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)' }}>
              ¿Cuál es tu situación ahora?
            </a>
          </div>
        </Reveal>

        <Reveal dir="fade" delay={520}>
          <div style={{
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
            gap: 12, maxWidth: 480, margin: '0 auto',
            fontFamily: 'var(--font-sans)', fontSize: 13,
            color: 'var(--text-muted)', lineHeight: 1.6,
          }}>
            <div style={{
              width: 26, height: 26, flexShrink: 0, borderRadius: '50%',
              background: 'var(--copper-dim)', border: '1px solid rgba(193,123,58,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, color: 'var(--copper-soft)', marginTop: 1,
            }}>✦</div>
            <span>
              <strong style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Garantía de resultado o devolución íntegra</strong>
              {' '}— Si en 90 días no ves resultados verificables, devolvemos cada euro sin preguntas.
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
