import Reveal from './Reveal'

export default function Hero() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'flex-end',
      padding: 'clamp(140px,18vh,220px) clamp(24px,6vw,96px) clamp(80px,10vh,140px)',
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--bg-base)',
    }}>
      {/* orbs (mantenidos pero recolocados para tipografía más grande) */}
      <div aria-hidden style={{
        position: 'absolute', borderRadius: '50%', pointerEvents: 'none',
        filter: 'blur(90px)', animation: 'drift 14s ease-in-out infinite alternate',
        width: 560, height: 560,
        background: 'radial-gradient(circle, rgba(193,123,58,0.09) 0%, transparent 70%)',
        top: -120, right: -120,
      }} />
      <div aria-hidden style={{
        position: 'absolute', borderRadius: '50%', pointerEvents: 'none',
        filter: 'blur(80px)', animation: 'drift 14s ease-in-out infinite alternate',
        animationDelay: '-7s',
        width: 380, height: 380,
        background: 'radial-gradient(circle, rgba(74,144,128,0.05) 0%, transparent 70%)',
        bottom: -40, left: -80,
      }} />

      {/* ghost AO — gigante de fondo, alineado a la derecha */}
      <div aria-hidden style={{
        position: 'absolute', right: '-5%', bottom: '-22%',
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(280px,46vw,640px)',
        fontWeight: 500, lineHeight: 1,
        color: 'var(--text-primary)', opacity: 0.025,
        pointerEvents: 'none', userSelect: 'none', letterSpacing: '-0.05em',
      }}>AO</div>

      {/* index numérico estilo agency en esquina superior derecha */}
      <div aria-hidden style={{
        position: 'absolute', top: 'clamp(100px,14vh,160px)', right: 'clamp(24px,6vw,96px)',
        fontFamily: 'var(--font-caps)', fontSize: 9, fontWeight: 400,
        letterSpacing: 3.5, textTransform: 'uppercase',
        color: 'var(--text-muted)',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <span style={{ width: 32, height: 1, background: 'var(--border-mid)' }} />
        <span>01 · Inicio</span>
      </div>

      {/* contenido principal — alineado a la izquierda, max-width amplio */}
      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 1320 }}>
        {/* eyebrow */}
        <Reveal dir="left" delay={80}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 14,
            fontFamily: 'var(--font-caps)', fontSize: 9, fontWeight: 600,
            letterSpacing: 4, textTransform: 'uppercase', color: 'var(--copper-soft)',
            marginBottom: 'clamp(28px,4vh,44px)',
          }}>
            <span style={{ width: 28, height: 1, background: 'var(--copper)', flexShrink: 0 }} />
            Andreescu Oakmont · Automatización con IA
          </div>
        </Reveal>

        {/* H1 monstruoso — alineado a izquierda */}
        <Reveal dir="up" delay={180}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(54px,11vw,144px)',
            fontWeight: 400,
            lineHeight: 0.92,
            letterSpacing: '-0.035em',
            color: 'var(--text-primary)',
            marginBottom: 'clamp(36px,5vh,56px)',
            maxWidth: '14ch',
          }}>
            Tu empresa a pleno rendimiento{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--copper-soft)' }}>
              sin que tú estés presente.
            </em>
          </h1>
        </Reveal>

        {/* fila inferior: subhead + CTAs en dos columnas */}
        <div className="grid-2col" style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 520px) 1fr',
          gap: 'clamp(40px,6vw,80px)',
          alignItems: 'end',
        }}>
          <Reveal dir="up" delay={300}>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(17px,1.7vw,22px)',
              fontWeight: 300, fontStyle: 'italic',
              lineHeight: 1.55,
              color: 'var(--text-secondary)',
            }}>
              Implementamos sistemas de automatización con IA que eliminan tareas repetitivas,
              cualifican clientes solos y liberan a tu equipo para lo único que importa:
              <span style={{ color: 'var(--text-primary)', fontStyle: 'italic' }}> cerrar y crecer.</span>
            </p>
          </Reveal>

          <Reveal dir="up" delay={400}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap',
              justifyContent: 'flex-start',
            }}>
              <a
                href="#contacto"
                onClick={e => {
                  e.preventDefault()
                  document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                onMouseEnter={e => {
                  ;(e.currentTarget as HTMLElement).style.background = '#a86830'
                  ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={e => {
                  ;(e.currentTarget as HTMLElement).style.background = 'var(--copper)'
                  ;(e.currentTarget as HTMLElement).style.transform = 'none'
                }}
                style={{
                  fontFamily: 'var(--font-caps)', fontSize: 9, fontWeight: 600,
                  letterSpacing: 2.5, textTransform: 'uppercase',
                  background: 'var(--copper)', color: '#fff',
                  padding: '18px 44px', display: 'inline-block',
                  transition: 'background 0.22s, transform 0.15s',
                }}
              >
                Reservar diagnóstico gratuito →
              </a>
              <a
                href="#problema"
                onClick={e => {
                  e.preventDefault()
                  document.getElementById('problema')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--copper-soft)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)' }}
                style={{
                  fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 400,
                  color: 'var(--text-secondary)',
                  paddingBottom: 3,
                  borderBottom: '1px solid var(--border-mid)',
                  transition: 'color 0.2s',
                }}
              >
                ¿Cuál es tu situación ahora? ↓
              </a>
            </div>
          </Reveal>
        </div>

        {/* fila inferior de trust indicators */}
        <Reveal dir="fade" delay={560}>
          <div className="grid-4col" style={{
            marginTop: 'clamp(60px,9vh,110px)',
            paddingTop: 28,
            borderTop: '1px solid var(--border-subtle)',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'clamp(20px,3vw,48px)',
          }}>
            {[
              { k: 'Garantía',    v: '90 días o devolución' },
              { k: 'Respuesta',   v: 'En menos de 24 horas' },
              { k: 'Diagnóstico', v: 'Gratuito · Sin tarjeta' },
              { k: 'Sector',      v: 'PYME 1M–50M facturación' },
            ].map((it, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{
                  fontFamily: 'var(--font-caps)', fontSize: 7.5, fontWeight: 600,
                  letterSpacing: 2.5, textTransform: 'uppercase', color: 'var(--copper-soft)',
                }}>{it.k}</span>
                <span style={{
                  fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 300,
                  fontStyle: 'italic', color: 'var(--text-secondary)', lineHeight: 1.4,
                }}>{it.v}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
