import Reveal from './Reveal'

export default function Guarantee() {
  return (
    <section id="garantia" style={{
      background: 'var(--copper)',
      padding: 'clamp(100px,14vh,180px) clamp(24px,6vw,96px)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* tinta encima */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 45%, rgba(0,0,0,0.18) 100%)',
      }} />
      {/* shimmer sutil */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
        animation: 'shimmer 5s infinite',
      }} />
      {/* ghost 90 al fondo */}
      <div aria-hidden style={{
        position: 'absolute', right: '-3%', bottom: '-22%',
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(280px,42vw,640px)',
        fontWeight: 500, lineHeight: 1,
        color: '#fff', opacity: 0.05,
        pointerEvents: 'none', userSelect: 'none', letterSpacing: '-0.05em',
      }}>90</div>

      {/* section index sobre cobre */}
      <div aria-hidden style={{
        position: 'absolute', top: 'clamp(80px,12vh,140px)', right: 'clamp(24px,6vw,96px)',
        fontFamily: 'var(--font-caps)', fontSize: 9, fontWeight: 400,
        letterSpacing: 3.5, textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.5)',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <span style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.35)' }} />
        <span>07 · Garantía</span>
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1320, margin: '0 auto' }}>
        {/* eyebrow */}
        <Reveal dir="left">
          <span style={{
            fontFamily: 'var(--font-caps)', fontSize: 9, fontWeight: 600,
            letterSpacing: 4, textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)',
            display: 'inline-flex', alignItems: 'center', gap: 14,
            marginBottom: 'clamp(28px,4vh,44px)',
          }}>
            <span style={{ width: 28, height: 1, background: 'rgba(255,255,255,0.45)' }} />
            100% garantía de resultado
          </span>
        </Reveal>

        {/* claim editorial XL */}
        <Reveal dir="up" delay={120}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(44px,8vw,120px)',
            fontWeight: 400, fontStyle: 'italic',
            color: '#fff',
            lineHeight: 0.96, letterSpacing: '-0.035em',
            marginBottom: 'clamp(40px,6vh,72px)',
            maxWidth: '16ch',
          }}>
            Si no ves resultados en 90 días, devolvemos todo{' '}
            <span style={{ fontStyle: 'normal', color: 'rgba(255,255,255,0.7)' }}>y seguimos gratis.</span>
          </h2>
        </Reveal>

        {/* grid 2col: explicación + CTA */}
        <div className="grid-2col" style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 1.2fr) minmax(260px, 0.8fr)',
          gap: 'clamp(40px,6vw,96px)',
          alignItems: 'end',
          paddingTop: 32,
          borderTop: '1px solid rgba(255,255,255,0.18)',
        }}>
          <Reveal dir="up" delay={200}>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(17px,1.6vw,22px)',
              fontWeight: 300, fontStyle: 'italic',
              lineHeight: 1.65, color: 'rgba(255,255,255,0.88)',
              maxWidth: 640,
            }}>
              No es la garantía que la mayoría de consultores menciona y nunca aplica.
              Es un compromiso escrito y firmado en el contrato, sin excepciones ni cláusulas.
              Si implementamos el sistema y al día 90 no hay resultados verificables,
              devolvemos el 100% de la inversión y continuamos trabajando sin coste adicional
              hasta lograrlo.
            </p>
          </Reveal>

          <Reveal dir="up" delay={280}>
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16,
            }}>
              <a
                href="#contacto"
                onClick={e => {
                  e.preventDefault()
                  document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                onMouseEnter={e => {
                  ;(e.currentTarget as HTMLElement).style.background = '#f5f2ec'
                  ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={e => {
                  ;(e.currentTarget as HTMLElement).style.background = '#fff'
                  ;(e.currentTarget as HTMLElement).style.transform = 'none'
                }}
                style={{
                  fontFamily: 'var(--font-caps)', fontSize: 9, fontWeight: 600,
                  letterSpacing: 2.5, textTransform: 'uppercase',
                  background: '#fff', color: 'var(--copper)',
                  padding: '18px 44px', display: 'inline-block',
                  transition: 'background 0.2s, transform 0.15s',
                }}
              >
                Reservar diagnóstico gratuito →
              </a>
              <span style={{
                fontFamily: 'var(--font-caps)', fontSize: 8, fontWeight: 400,
                letterSpacing: 2.5, textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.65)',
              }}>
                Compromiso por contrato · Sin excepciones
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
