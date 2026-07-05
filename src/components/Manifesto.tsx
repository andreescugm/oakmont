import Reveal from './Reveal'

type Block =
  | { type: 'big'; text: string; em?: boolean; gradient?: boolean }
  | { type: 'serif'; text: string }

const BLOCKS: Block[] = [
  { type: 'big', text: 'Nos dicen que somos demasiado jóvenes.' },
  { type: 'big', text: 'Tienen razón. Ese es exactamente el punto.', em: true },
  { type: 'serif', text: 'Crecimos con la IA como tú creciste con el teléfono: sin manual, sin miedo y sin poder imaginar el mundo sin ella. Mientras el sector añadía "IA" a sus PowerPoints, nosotros construíamos sistemas que cogen el teléfono, cualifican leads y cierran citas de madrugada. No estudiamos esta tecnología. Somos de ella.' },
  { type: 'big', text: '¿Arrogancia? Mira lo que firmamos.' },
  { type: 'serif', text: 'Arrogancia es cobrar por horas sin prometer nada. Arrogancia es un informe de ochenta páginas que nadie lee y un "ya si eso te llamamos". Lo nuestro es lo contrario: resultados verificables en 90 días o devolvemos cada euro — y seguimos trabajando gratis hasta conseguirlo. Cuando puedes firmar eso delante de notario, no es chulería. Es tener el trabajo hecho antes de abrir la boca.' },
  { type: 'big', text: 'Castellanos. Tierra de gente que llegó donde nadie.', gradient: true },
  { type: 'serif', text: 'Aquí se inventó lo de cruzar el mapa sin permiso. Nosotros solo lo aplicamos a tu empresa: entrar donde todos ven imposible, montar el sistema y volver con resultados. Sin épica. Con contrato.' },
  { type: 'big', text: 'Quedan pocos linces. Quedan menos como nosotros.', em: true },
  { type: 'big', text: 'Los mejores no prometen. Enseñan. ↓' },
]

export default function Manifesto() {
  return (
    <section style={{
      background: 'var(--bg-surface)',
      borderTop: '1px solid var(--border-subtle)',
      padding: 'clamp(100px,16vh,190px) clamp(24px,6vw,96px)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* orb teal de fondo */}
      <div aria-hidden style={{
        position: 'absolute', borderRadius: '50%', pointerEvents: 'none',
        filter: 'blur(100px)', width: 480, height: 480,
        background: 'radial-gradient(circle, rgba(74,144,128,0.06) 0%, transparent 70%)',
        bottom: -160, right: -120,
        animation: 'drift 16s ease-in-out infinite alternate',
      }} />
      <div style={{ maxWidth: 1050, margin: '0 auto', position: 'relative' }}>
        <Reveal dir="fade">
          <div style={{
            fontFamily: 'var(--font-caps)', fontSize: 9, fontWeight: 600,
            letterSpacing: 4, textTransform: 'uppercase', color: 'var(--copper-soft)',
            marginBottom: 'clamp(40px,6vh,60px)', display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <span style={{ width: 28, height: 1, background: 'var(--copper)' }} />
            05 · Quiénes somos
          </div>
        </Reveal>

        {BLOCKS.map((b, i) => (
          <Reveal key={i} dir="up" delay={Math.min(i * 70, 280)}>
            {b.type === 'big' ? (
              <p
                className={b.gradient ? 'text-gradient' : undefined}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(30px,5vw,62px)',
                  fontWeight: 400, lineHeight: 1.12, letterSpacing: '-0.025em',
                  color: b.gradient ? undefined : b.em ? 'var(--copper-soft)' : 'var(--text-primary)',
                  fontStyle: b.em ? 'italic' : 'normal',
                  margin: 'clamp(26px,4vh,44px) 0 clamp(10px,1.6vh,18px)',
                }}>
                {b.text}
              </p>
            ) : (
              <p style={{
                fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 300,
                fontSize: 'clamp(17px,1.9vw,23px)', lineHeight: 1.72,
                color: 'var(--text-secondary)', maxWidth: 760,
                borderLeft: '1px solid var(--copper-dim)', paddingLeft: 'clamp(18px,2.5vw,32px)',
              }}>
                {b.text}
              </p>
            )}
          </Reveal>
        ))}
      </div>
    </section>
  )
}
