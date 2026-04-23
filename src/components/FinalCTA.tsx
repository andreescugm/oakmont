import Reveal from './Reveal'

export default function FinalCTA() {
  return (
    <section id="diagnostico" style={{
      background: 'var(--bg-base)',
      padding: '96px 48px', textAlign: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* ghost number */}
      <div aria-hidden style={{
        position: 'absolute', right: '4%', top: '50%', transform: 'translateY(-50%)',
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(160px,24vw,300px)',
        fontWeight: 500, lineHeight: 1,
        color: 'var(--text-primary)', opacity: 0.022,
        pointerEvents: 'none', letterSpacing: '-0.04em',
      }}>5</div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Reveal dir="left">
          <span style={{
            fontFamily: 'var(--font-caps)', fontSize: 7.5, fontWeight: 600,
            letterSpacing: 3, textTransform: 'uppercase', color: 'var(--copper-soft)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 18,
          }}>
            <span style={{ width: 26, height: 1, background: 'var(--copper)', flexShrink: 0 }} />
            Reserva ahora
          </span>
        </Reveal>

        <Reveal dir="up" delay={80}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(38px,6.5vw,82px)',
            fontWeight: 400, lineHeight: 0.94,
            letterSpacing: '-0.03em', color: 'var(--text-primary)',
            margin: '0 auto 40px', maxWidth: 860,
          }}>
            60 minutos que pueden<br />cambiar cómo opera<br />
            <em style={{ fontStyle: 'italic', color: 'var(--copper-soft)' }}>tu empresa.</em>
          </h2>
        </Reveal>

        <Reveal dir="up" delay={160}>
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
            Reservar diagnóstico gratuito ahora
          </a>
        </Reveal>

        <Reveal dir="fade" delay={220}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 24, flexWrap: 'wrap', marginTop: 18,
            fontFamily: 'var(--font-caps)', fontSize: 7, fontWeight: 400,
            letterSpacing: 2.8, textTransform: 'uppercase', color: 'var(--text-muted)',
          }}>
            {['5 plazas · Esta semana', 'Sin tarjeta', 'Sin presión'].map(t => (
              <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: 'var(--copper)', fontSize: 5 }}>◆</span>{t}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal dir="up" delay={100}>
          <div style={{
            maxWidth: 680, margin: '52px auto 0',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: 40, textAlign: 'left',
          }}>
            <p style={{
              fontFamily: 'var(--font-serif)', fontSize: 16, fontStyle: 'italic', fontWeight: 300,
              lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: 20,
            }}>
              P.D. Si has llegado hasta aquí ya sabes suficiente para tomar una decisión.
              La sesión es gratuita, la garantía es real, las plazas son limitadas.
              Lo único que tienes que hacer es reservar.
            </p>
            <p style={{
              fontFamily: 'var(--font-serif)', fontSize: 16, fontStyle: 'italic', fontWeight: 300,
              lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: 20,
            }}>
              Si en 90 días no ves los resultados, te devolvemos cada euro.
              Si los ves — y los verás — habrás tomado la mejor decisión operativa del año.
            </p>
            <a href="#contacto" style={{
              fontFamily: 'var(--font-caps)', fontSize: 8, fontWeight: 600,
              letterSpacing: 2.3, textTransform: 'uppercase', color: 'var(--copper-soft)',
              borderBottom: '1px solid var(--copper-dim)', paddingBottom: 2,
              display: 'inline-block', transition: 'border-color 0.2s',
            }}
            onClick={e => { e.preventDefault(); document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--copper)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--copper-dim)'}>
              Reservar mi plaza ahora →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
