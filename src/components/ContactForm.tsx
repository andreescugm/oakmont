import { useForm, ValidationError } from '@formspree/react'
import Reveal from './Reveal'

export default function ContactForm() {
  const [state, handleSubmit] = useForm('myklaqoe')

  const fieldStyle: React.CSSProperties = {
    width: '100%',
    background: 'var(--bg-raised)',
    border: '1px solid var(--border-mid)',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-serif)',
    fontSize: 16,
    fontWeight: 300,
    fontStyle: 'italic',
    padding: '14px 18px',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-caps)',
    fontSize: 7,
    fontWeight: 600,
    letterSpacing: 2.3,
    textTransform: 'uppercase',
    color: 'var(--copper-soft)',
    display: 'block',
    marginBottom: 8,
  }

  return (
    <section id="contacto" style={{
      background: 'var(--bg-surface)',
      padding: '96px 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* subtle grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 80% at 50% 50%, black, transparent)',
        maskImage: 'radial-gradient(ellipse 70% 80% at 50% 50%, black, transparent)',
      }} />
      {/* orb */}
      <div style={{
        position: 'absolute', borderRadius: '50%', pointerEvents: 'none',
        filter: 'blur(80px)',
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(193,123,58,0.06) 0%, transparent 70%)',
        top: -60, right: -40,
      }} />

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1 }}>
        <Reveal dir="left">
          <span style={{
            fontFamily: 'var(--font-caps)', fontSize: 7.5, fontWeight: 600,
            letterSpacing: 3, textTransform: 'uppercase', color: 'var(--copper-soft)',
            display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 24,
          }}>
            <span style={{ width: 26, height: 1, background: 'var(--copper)', flexShrink: 0 }} />
            Contacto
          </span>
        </Reveal>

        <Reveal dir="up" delay={80}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px,6vw,68px)',
            fontWeight: 400, lineHeight: 0.94,
            letterSpacing: '-0.03em', color: 'var(--text-primary)',
            marginBottom: 16,
          }}>
            Reserva tu diagnóstico<br />
            <em style={{ fontStyle: 'italic', color: 'var(--copper-soft)' }}>gratuito ahora.</em>
          </h2>
        </Reveal>

        <Reveal dir="up" delay={140}>
          <p style={{
            fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 300,
            fontStyle: 'italic', lineHeight: 1.75, color: 'var(--text-secondary)',
            marginBottom: 52,
          }}>
            60 minutos. Sin compromiso. Sin tarjeta de crédito.
            Analizamos tu operativa y calculamos el impacto real de la automatización en tu negocio.
          </p>
        </Reveal>

        <Reveal dir="up" delay={200}>
          {state.succeeded ? (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              background: 'var(--bg-raised)', border: '1px solid var(--border-mid)',
              padding: '14px 24px',
            }}>
              <span style={{ color: 'var(--copper-soft)', fontSize: 16 }}>✓</span>
              <span style={{
                fontFamily: 'var(--font-caps)', fontSize: 7.5, fontWeight: 600,
                letterSpacing: 2, textTransform: 'uppercase', color: 'var(--text-secondary)',
              }}>Solicitud recibida. Te contactaremos en menos de 24 horas.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {/* nombre + empresa */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div>
                  <label style={labelStyle} htmlFor="nombre">Nombre *</label>
                  <input
                    id="nombre" name="nombre" required
                    placeholder="Tu nombre"
                    style={fieldStyle}
                    onFocus={e => { e.currentTarget.style.borderColor = 'var(--copper)' }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'var(--border-mid)' }}
                  />
                </div>
                <div>
                  <label style={labelStyle} htmlFor="empresa">Empresa *</label>
                  <input
                    id="empresa" name="empresa" required
                    placeholder="Nombre de tu empresa"
                    style={fieldStyle}
                    onFocus={e => { e.currentTarget.style.borderColor = 'var(--copper)' }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'var(--border-mid)' }}
                  />
                </div>
              </div>

              {/* email + teléfono */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div>
                  <label style={labelStyle} htmlFor="email">Email *</label>
                  <input
                    id="email" name="email" type="email" required
                    placeholder="tu@empresa.com"
                    style={fieldStyle}
                    onFocus={e => { e.currentTarget.style.borderColor = 'var(--copper)' }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'var(--border-mid)' }}
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} />
                </div>
                <div>
                  <label style={labelStyle} htmlFor="telefono">Teléfono</label>
                  <input
                    id="telefono" name="telefono" type="tel"
                    placeholder="+34 600 000 000"
                    style={fieldStyle}
                    onFocus={e => { e.currentTarget.style.borderColor = 'var(--copper)' }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'var(--border-mid)' }}
                  />
                </div>
              </div>

              {/* mensaje */}
              <div>
                <label style={labelStyle} htmlFor="mensaje">Cuéntanos tu situación</label>
                <textarea
                  id="mensaje" name="mensaje"
                  rows={5}
                  placeholder="¿Cuál es el mayor cuello de botella operativo en tu empresa ahora mismo?"
                  style={{ ...fieldStyle, resize: 'vertical', lineHeight: 1.7 }}
                  onFocus={e => { e.currentTarget.style.borderColor = 'var(--copper)' }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'var(--border-mid)' }}
                />
              </div>

              {/* submit */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap', minHeight: 52 }}>
                <button
                  type="submit"
                  disabled={state.submitting}
                  style={{
                    fontFamily: 'var(--font-caps)', fontSize: 8.5, fontWeight: 600,
                    letterSpacing: 2.5, textTransform: 'uppercase',
                    background: 'var(--copper)', color: '#fff',
                    padding: '15px 40px', border: 'none', cursor: state.submitting ? 'not-allowed' : 'pointer',
                    opacity: state.submitting ? 0.7 : 1,
                    transition: 'background 0.22s, transform 0.15s',
                  }}
                  onMouseEnter={e => { if (!state.submitting) { (e.currentTarget as HTMLElement).style.background = '#a86830'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)' } }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--copper)'; (e.currentTarget as HTMLElement).style.transform = 'none' }}
                >
                  {state.submitting ? 'Enviando...' : 'Reservar diagnóstico gratuito →'}
                </button>
                <span style={{
                  fontFamily: 'var(--font-caps)', fontSize: 6.5, fontWeight: 400,
                  letterSpacing: 2, textTransform: 'uppercase', color: 'var(--text-muted)',
                }}>Sin compromiso · Sin tarjeta</span>
              </div>
            </form>
          )}
        </Reveal>

        {/* trust badges */}
        <Reveal dir="fade" delay={300}>
          <div style={{
            display: 'flex', gap: 32, flexWrap: 'wrap',
            borderTop: '1px solid var(--border-subtle)', marginTop: 48, paddingTop: 32,
          }}>
            {[
              'Respuesta en menos de 24h',
              'Garantía 90 días o devolución',
              'Sin coste · Sin compromiso',
            ].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: 'var(--copper)', fontSize: 8 }}>◆</span>
                <span style={{
                  fontFamily: 'var(--font-caps)', fontSize: 7, fontWeight: 600,
                  letterSpacing: 2, textTransform: 'uppercase', color: 'var(--text-muted)',
                }}>{t}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
