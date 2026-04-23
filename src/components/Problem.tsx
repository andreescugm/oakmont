import Reveal from './Reveal'

const reasons = [
  { n: '01', text: 'El secreto que usan las pymes que crecen un 30% sin ampliar su equipo — y que el 95% de consultores en España todavía ignoran.' },
  { n: '02', text: 'Por qué la IA que has visto en demos no funciona en tu negocio — y la diferencia exacta entre implementarla bien o tirar dinero.' },
  { n: '03', text: 'Lo que nadie te dice sobre los cuellos de botella invisibles de tu empresa — y cómo resolverlos en menos de 60 días.' },
  { n: '04', text: 'El método que convierte prospectos fríos en reuniones confirmadas automáticamente — sin llamadas en frío, sin agencias de leads.' },
  { n: '05', text: 'Por qué tu empresa está dejando dinero sobre la mesa cada semana — y el diagnóstico exacto para saberlo tarda 60 minutos.' },
  { n: '06', text: 'La razón por la que la mayoría de directores nunca logran facturación predecible — y el sistema que lo resuelve de raíz.' },
]

export default function Problem() {
  return (
    <section id="problema" style={{
      background: 'var(--bg-surface)',
      padding: '88px 0',
      borderTop: '1px solid var(--border-subtle)',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 1, height: 70,
        background: 'linear-gradient(180deg, var(--copper), transparent)',
      }} />
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 48px' }}>
        <Reveal dir="left">
          <span style={{
            fontFamily: 'var(--font-caps)', fontSize: 7.5, fontWeight: 600,
            letterSpacing: 3, textTransform: 'uppercase', color: 'var(--copper-soft)',
            display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 44,
          }}>
            <span style={{ width: 26, height: 1, background: 'var(--copper)', flexShrink: 0 }} />
            El problema que nadie describe con precisión
          </span>
        </Reveal>

        <div style={{ marginBottom: 48 }}>
          {[
            <>Tu empresa funciona.</>,
            <>Pero hay tareas que consumen tiempo que nunca volverás a recuperar.</>,
            <>Tu equipo pasa horas cualificando leads a mano, respondiendo las mismas preguntas, persiguiendo presupuestos que nunca se cierran. Eso no es trabajo — <strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>es ruido caro.</strong></>,
            <>Has probado herramientas de automatización. CRMs, chatbots, software de gestión. Al mes seguían siendo un caos que alguien tenía que mantener manualmente.</>,
            <>La IA suena bien en podcasts. En tu empresa nadie sabe exactamente qué implementar primero, qué tiene ROI real y qué es <span style={{ background: 'linear-gradient(180deg, transparent 65%, var(--copper-dim) 65%)', padding: '0 2px' }}>humo de consultor.</span></>,
            <><strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>El problema no es tu equipo, ni el mercado, ni la tecnología. El problema es que nadie ha diseñado el sistema específico para tu empresa.</strong></>,
            <>Eso es exactamente lo que hacemos.</>,
          ].map((text, i) => (
            <Reveal key={i} dir="up" delay={i * 50}>
              <p style={{
                fontFamily: 'var(--font-serif)', fontSize: 19, fontWeight: 300,
                lineHeight: 1.82, color: 'var(--text-secondary)',
                marginBottom: 22, letterSpacing: '0.01em',
              }}>{text}</p>
            </Reveal>
          ))}
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 1, background: 'var(--border-subtle)',
          border: '1px solid var(--border-subtle)',
        }}>
          {reasons.map((r, i) => (
            <Reveal key={i} dir="up" delay={i * 60}>
              <div style={{
                background: 'var(--bg-surface)',
                padding: '26px 26px 24px 22px',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--bg-hover)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'var(--bg-surface)'}>
                <span style={{
                  fontFamily: 'var(--font-caps)', fontSize: 7.5, fontWeight: 600,
                  letterSpacing: 2.8, textTransform: 'uppercase',
                  color: 'var(--copper-soft)', marginBottom: 10, display: 'block',
                }}>{r.n} ·</span>
                <p style={{
                  fontFamily: 'var(--font-serif)', fontSize: 15.5, fontWeight: 300,
                  lineHeight: 1.7, color: 'var(--text-secondary)', margin: 0,
                }}>{r.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
