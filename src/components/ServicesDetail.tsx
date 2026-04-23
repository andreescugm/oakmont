import Reveal from './Reveal'

const services = [
  {
    id: 'diagnostico-estrategico',
    num: '01',
    tag: 'F · 01',
    title: 'Diagnóstico ',
    titleEm: 'Estratégico',
    body: 'En una sesión de 60 minutos analizamos en profundidad los procesos críticos de tu empresa: identificamos los tres cuellos de botella que más tiempo y dinero consumen, calculamos el impacto económico exacto de automatizarlos y te entregamos un informe priorizado con el mapa de oportunidades. Sin humo, sin pitch de venta disfrazado de consultoría. Solo datos, diagnóstico y próximos pasos concretos.',
    cta: 'Reservar diagnóstico →',
  },
  {
    id: 'diseno-sistema',
    num: '02',
    tag: 'F · 02',
    title: 'Diseño del ',
    titleEm: 'Sistema',
    body: 'Diseñamos la arquitectura completa del sistema de automatización adaptada a tu operativa: qué procesos automatizar, con qué herramientas, en qué orden y con qué métrica de éxito. El resultado es un plan de implementación detallado, no un PowerPoint con promesas. Cada decisión está justificada por ROI esperado y tiempo de retorno de la inversión antes de escribir una sola línea de código.',
    cta: 'Ver metodología →',
  },
  {
    id: 'implementacion-ia',
    num: '03',
    tag: 'F · 03',
    title: 'Implementación ',
    titleEm: 'IA',
    body: 'Construimos e integramos el sistema de IA en tu operativa actual de forma no disruptiva. Utilizamos los modelos de lenguaje y las herramientas de automatización más adecuadas para cada caso: desde agentes conversacionales hasta flujos de trabajo multi-paso. La activación es gradual, con formación incluida para tu equipo y sin curva de aprendizaje prolongada. El sistema trabaja desde el primer día.',
    cta: 'Cómo funciona →',
  },
  {
    id: 'automatizacion-comercial',
    num: '04',
    tag: 'F · 04',
    title: 'Automatización ',
    titleEm: 'Comercial',
    body: 'Automatizamos el ciclo comercial completo: captación, nutrición, seguimiento y cierre. Los sistemas de IA gestionan la prospección inicial, envían secuencias personalizadas en el momento preciso y alertan a tu equipo únicamente cuando un prospecto está listo para comprar. Resultado: tu equipo comercial dedica el 100% de su tiempo a cerrar, no a perseguir leads fríos ni a actualizar el CRM.',
    cta: 'Ver casos reales →',
  },
  {
    id: 'cualificacion-leads',
    num: '05',
    tag: 'Cualificación',
    title: 'Cualificación de ',
    titleEm: 'Leads',
    body: 'Agentes de IA que cualifican automáticamente cada lead entrante según tu perfil de cliente ideal: hacen las preguntas correctas, puntúan la oportunidad y la enrutan al comercial adecuado o la nutren de forma autónoma hasta que esté lista. Eliminas el tiempo perdido en reuniones que nunca iban a cerrar y concentras la energía de tu equipo en oportunidades con probabilidad real de conversión.',
    cta: 'Ver demo →',
  },
]

export default function ServicesDetail() {
  return (
    <section id="servicios" style={{ background: 'var(--bg-surface)', padding: '96px 0', position: 'relative' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 90% at 50% 50%, black, transparent)',
        maskImage: 'radial-gradient(ellipse 80% 90% at 50% 50%, black, transparent)',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1 }}>
        <Reveal dir="left">
          <span style={{
            fontFamily: 'var(--font-caps)', fontSize: 7.5, fontWeight: 600,
            letterSpacing: 3, textTransform: 'uppercase', color: 'var(--copper-soft)',
            display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 16,
          }}>
            <span style={{ width: 26, height: 1, background: 'var(--copper)', flexShrink: 0 }} />
            Nuestros servicios
          </span>
        </Reveal>

        <Reveal dir="up" delay={80}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px,6vw,72px)',
            fontWeight: 400, lineHeight: 0.94, letterSpacing: '-0.03em',
            color: 'var(--text-primary)', marginBottom: 72,
          }}>
            Cinco sistemas que<br />
            <em style={{ fontStyle: 'italic', color: 'var(--copper-soft)' }}>transforman tu operativa.</em>
          </h2>
        </Reveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--border-subtle)' }}>
          {services.map((s, i) => (
            <Reveal key={s.id} dir="up" delay={i * 60}>
              <section
                id={s.id}
                style={{
                  background: 'var(--bg-surface)', padding: '56px 48px',
                  position: 'relative', overflow: 'hidden',
                  display: 'grid', gridTemplateColumns: '1fr 1.6fr',
                  gap: 64, alignItems: 'start',
                  transition: 'background 0.25s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-raised)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-surface)' }}
              >
                {/* top accent line */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                  background: 'linear-gradient(90deg, var(--copper), transparent)',
                  opacity: 0,
                  transition: 'opacity 0.35s ease',
                }}
                  ref={el => {
                    if (!el) return
                    const parent = el.parentElement!
                    parent.addEventListener('mouseenter', () => { el.style.opacity = '1' })
                    parent.addEventListener('mouseleave', () => { el.style.opacity = '0' })
                  }}
                />

                {/* ghost number */}
                <div aria-hidden style={{
                  position: 'absolute', right: 32, top: '50%', transform: 'translateY(-50%)',
                  fontFamily: 'var(--font-display)', fontSize: 120, fontWeight: 500,
                  color: 'var(--text-primary)', opacity: 0.025, lineHeight: 1,
                  pointerEvents: 'none', letterSpacing: '-0.04em',
                }}>{s.num}</div>

                <div>
                  <span style={{
                    fontFamily: 'var(--font-caps)', fontSize: 7, fontWeight: 600,
                    letterSpacing: 2.8, textTransform: 'uppercase',
                    color: 'var(--copper-soft)', marginBottom: 16, display: 'block',
                  }}>{s.tag}</span>

                  <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(24px,3vw,36px)',
                    fontWeight: 400, letterSpacing: '-0.025em',
                    color: 'var(--text-primary)', lineHeight: 1.12,
                  }}>
                    {s.title}<em style={{ fontStyle: 'italic', color: 'var(--copper-soft)' }}>{s.titleEm}</em>
                  </h2>
                </div>

                <div>
                  <p style={{
                    fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 300,
                    lineHeight: 1.85, color: 'var(--text-secondary)', marginBottom: 24,
                  }}>{s.body}</p>

                  <a href="#contacto" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    fontFamily: 'var(--font-caps)', fontSize: 7.5, fontWeight: 600,
                    letterSpacing: 2.3, textTransform: 'uppercase',
                    background: 'var(--copper)', color: '#fff',
                    padding: '11px 24px',
                    transition: 'background 0.2s, transform 0.15s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#a86830'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--copper)'; (e.currentTarget as HTMLElement).style.transform = 'none' }}>
                    {s.cta}
                  </a>
                </div>
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
