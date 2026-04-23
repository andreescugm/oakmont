import Reveal from './Reveal'

function SectionLabel({ children }: { children: string }) {
  return (
    <Reveal dir="left">
      <span style={{
        fontFamily: 'var(--font-caps)', fontSize: 7.5, fontWeight: 600,
        letterSpacing: 3, textTransform: 'uppercase', color: 'var(--copper-soft)',
        display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 24,
      }}>
        <span style={{ width: 26, height: 1, background: 'var(--copper)', flexShrink: 0 }} />
        {children}
      </span>
    </Reveal>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <Reveal dir="up" delay={80}>
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(32px,5vw,60px)',
        fontWeight: 400, lineHeight: 0.96, letterSpacing: '-0.03em',
        color: 'var(--text-primary)', marginBottom: 40,
      }}>
        {children}
      </h2>
    </Reveal>
  )
}

const metodologiaSteps = [
  {
    num: '01',
    title: 'Diagnóstico profundo',
    body: 'La primera sesión de 60 minutos no es una reunión de presentación: es una auditoría estructurada de tus procesos actuales. Analizamos flujos de trabajo, cuellos de botella, herramientas existentes y métricas de conversión. Al final de la sesión tienes un informe con el potencial de ahorro cuantificado en horas y euros por mes.',
  },
  {
    num: '02',
    title: 'Diseño con ROI previo',
    body: 'Antes de implementar nada, diseñamos el sistema completo y calculamos el retorno esperado. No empezamos hasta que los números tienen sentido para tu negocio. Esto elimina el riesgo de invertir en automatización que no recuperas. El diseño incluye arquitectura técnica, integraciones necesarias y métricas de éxito acordadas por escrito.',
  },
  {
    num: '03',
    title: 'Implementación no disruptiva',
    body: 'Los sistemas se activan en paralelo a tu operativa actual, sin interrupciones. Empezamos por el proceso de mayor impacto, lo validamos con datos reales durante 2-3 semanas y escalamos al siguiente. Tu equipo recibe formación práctica en cada fase. El objetivo es que el sistema funcione solo, no crear dependencia técnica.',
  },
  {
    num: '04',
    title: 'Resultado verificable o devolución',
    body: 'A los 90 días medimos los KPIs acordados en el contrato: horas ahorradas, tasa de cualificación de leads, velocidad de respuesta, ratio de conversión. Si los resultados no son verificables, devolvemos el 100% de la inversión y seguimos trabajando sin coste adicional. Esta garantía no es marketing: está firmada en el contrato antes de empezar.',
  },
]

const casos = [
  {
    sector: 'Gestoría · Talavera de la Reina',
    headline: 'De 40 horas semanales de trabajo administrativo a 8',
    body: 'Una gestoría con 12 empleados automatizó la recepción de documentación, clasificación, generación de borradores y comunicación con clientes. El equipo recuperó 32 horas semanales que se redirigieron a captación de nuevos clientes.',
    metrics: ['+78% capacidad sin nuevas contrataciones', '−80% tiempo en tareas documentales', 'ROI recuperado en 7 semanas'],
  },
  {
    sector: 'Empresa de servicios B2B · Madrid',
    headline: 'Pipeline predecible: de 3 cierres al mes a 11',
    body: 'Una empresa de 8 personas en el sector de servicios profesionales implementó un sistema de cualificación automática de leads inbound. Los comerciales dejaron de perseguir prospectos fríos y pasaron a gestionar únicamente oportunidades con intención real de compra.',
    metrics: ['+267% cierres mensuales', '−60% tiempo comercial en prospección', 'Ciclo de venta reducido de 28 a 14 días'],
  },
  {
    sector: 'E-commerce · Valencia',
    headline: 'Atención al cliente 24/7 sin aumentar el equipo',
    body: 'Una tienda online con alto volumen de consultas repetitivas automatizó el 73% de las interacciones de atención al cliente con un agente de IA entrenado con su base de conocimiento. El equipo humano interviene únicamente en casos complejos o de alto valor.',
    metrics: ['73% de consultas resueltas sin intervención humana', 'Satisfacción de cliente de 4.8/5', 'Ahorro de 2,4 FTEs en atención al cliente'],
  },
  {
    sector: 'Consultoría de ingeniería · Bilbao',
    headline: 'Propuestas técnicas generadas en 4 horas en lugar de 3 días',
    body: 'Una consultora técnica automatizó la generación de propuestas personalizadas a partir de briefings de cliente. El sistema extrae información clave, la contrasta con proyectos anteriores similares y genera un borrador estructurado listo para revisión final del equipo técnico.',
    metrics: ['−87% tiempo en elaboración de propuestas', '+140% propuestas enviadas por mes', 'Tasa de aceptación mantenida en 38%'],
  },
]

export default function CompanyPages() {
  return (
    <>
      {/* ── Sobre nosotros ── */}
      <section id="sobre-nosotros" style={{ background: 'var(--bg-base)', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{
          position: 'absolute', right: '-2%', bottom: '-8%',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(180px,28vw,340px)',
          fontWeight: 500, lineHeight: 1,
          color: 'var(--text-primary)', opacity: 0.018,
          pointerEvents: 'none', userSelect: 'none', letterSpacing: '-0.04em',
        }}>AO</div>

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1 }}>
          <SectionLabel>Sobre nosotros</SectionLabel>
          <SectionHeading>
            Metodología norteamericana.<br />
            <em style={{ fontStyle: 'italic', color: 'var(--copper-soft)' }}>Mercado español.</em>
          </SectionHeading>

          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64,
            borderTop: '1px solid var(--border-subtle)', paddingTop: 48,
          }}>
            <Reveal dir="up" delay={120}>
              <div>
                <p style={{
                  fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 300,
                  fontStyle: 'italic', lineHeight: 1.85, color: 'var(--text-secondary)',
                  marginBottom: 28,
                }}>
                  Andreescu Oakmont nació en 2026 en Talavera de la Reina con un propósito claro:
                  llevar al mercado español la metodología de automatización e IA que las empresas
                  norteamericanas de alto rendimiento llevan años aplicando con resultados comprobados.
                </p>
                <p style={{
                  fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 300,
                  fontStyle: 'italic', lineHeight: 1.85, color: 'var(--text-secondary)',
                  marginBottom: 28,
                }}>
                  La brecha entre lo que la IA puede hacer y lo que la empresa española media
                  realmente implementa es enorme. Ahí es donde actuamos: no como vendedores
                  de tecnología, sino como ingenieros de operaciones que construyen sistemas
                  que funcionan en el mundo real de tu empresa.
                </p>
              </div>
            </Reveal>
            <Reveal dir="up" delay={200}>
              <div>
                <p style={{
                  fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 300,
                  fontStyle: 'italic', lineHeight: 1.85, color: 'var(--text-secondary)',
                  marginBottom: 28,
                }}>
                  Nuestra filosofía es simple: la automatización debe tener ROI medible antes
                  de empezar, y el cliente debe poder verificar los resultados sin depender
                  de nuestra palabra. Por eso cada proyecto empieza con un diagnóstico honesto
                  y termina con métricas acordadas por escrito.
                </p>
                <p style={{
                  fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 300,
                  fontStyle: 'italic', lineHeight: 1.85, color: 'var(--text-secondary)',
                }}>
                  Trabajamos con un número deliberadamente reducido de clientes por trimestre.
                  No somos una agencia de volumen. Somos un equipo pequeño, muy especializado,
                  con una garantía de resultado que ninguna agencia de marketing digital
                  pondrá en un contrato.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal dir="up" delay={260}>
            <div style={{
              display: 'flex', gap: 40, flexWrap: 'wrap',
              borderTop: '1px solid var(--border-subtle)', marginTop: 52, paddingTop: 36,
            }}>
              {[
                { label: 'Fundación', value: '2026' },
                { label: 'Ubicación', value: 'Talavera de la Reina, España' },
                { label: 'Metodología', value: 'Norteamericana de alto rendimiento' },
                { label: 'Clientes simultáneos', value: 'Máximo 5 por trimestre' },
              ].map(item => (
                <div key={item.label}>
                  <span style={{
                    fontFamily: 'var(--font-caps)', fontSize: 6.5, fontWeight: 600,
                    letterSpacing: 2.5, textTransform: 'uppercase',
                    color: 'var(--copper-soft)', display: 'block', marginBottom: 6,
                  }}>{item.label}</span>
                  <span style={{
                    fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 300,
                    fontStyle: 'italic', color: 'var(--text-secondary)',
                  }}>{item.value}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Metodología ── */}
      <section id="metodologia" style={{ background: 'var(--bg-surface)', padding: '96px 0', position: 'relative' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1 }}>
          <SectionLabel>Metodología</SectionLabel>
          <SectionHeading>
            Cuatro pasos.<br />
            <em style={{ fontStyle: 'italic', color: 'var(--copper-soft)' }}>Un resultado medible.</em>
          </SectionHeading>

          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1,
            background: 'var(--border-subtle)', border: '1px solid var(--border-subtle)',
          }}>
            {metodologiaSteps.map((step, i) => (
              <Reveal key={step.num} dir="up" delay={i * 80}>
                <div
                  style={{
                    background: 'var(--bg-surface)', padding: '44px 40px',
                    position: 'relative', overflow: 'hidden',
                    transition: 'background 0.25s ease',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-raised)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-surface)' }}
                >
                  <div aria-hidden style={{
                    position: 'absolute', top: 12, right: 20,
                    fontFamily: 'var(--font-display)', fontSize: 72, fontWeight: 500,
                    color: 'var(--text-primary)', opacity: 0.03, lineHeight: 1,
                    pointerEvents: 'none', letterSpacing: '-0.04em',
                  }}>{step.num}</div>

                  <span style={{
                    fontFamily: 'var(--font-caps)', fontSize: 7, fontWeight: 600,
                    letterSpacing: 2.8, textTransform: 'uppercase',
                    color: 'var(--copper-soft)', marginBottom: 14, display: 'block',
                  }}>Paso {step.num}</span>

                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(20px,2.2vw,26px)',
                    fontWeight: 400, letterSpacing: '-0.02em',
                    color: 'var(--text-primary)', marginBottom: 16, lineHeight: 1.15,
                  }}>{step.title}</h3>

                  <p style={{
                    fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 300,
                    lineHeight: 1.8, color: 'var(--text-secondary)',
                  }}>{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal dir="up" delay={320}>
            <div style={{ textAlign: 'center', marginTop: 52 }}>
              <a href="#contacto" style={{
                fontFamily: 'var(--font-caps)', fontSize: 8.5, fontWeight: 600,
                letterSpacing: 2.5, textTransform: 'uppercase',
                background: 'var(--copper)', color: '#fff',
                padding: '15px 40px', display: 'inline-block',
                transition: 'background 0.22s, transform 0.15s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#a86830'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--copper)'; (e.currentTarget as HTMLElement).style.transform = 'none' }}>
                Empezar el diagnóstico →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Casos de éxito ── */}
      <section id="casos-exito" style={{ background: 'var(--bg-base)', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1 }}>
          <SectionLabel>Casos de éxito</SectionLabel>
          <SectionHeading>
            Resultados reales.<br />
            <em style={{ fontStyle: 'italic', color: 'var(--copper-soft)' }}>Métricas verificables.</em>
          </SectionHeading>

          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1,
            background: 'var(--border-subtle)', border: '1px solid var(--border-subtle)',
          }}>
            {casos.map((c, i) => (
              <Reveal key={i} dir="up" delay={i * 70}>
                <div
                  style={{
                    background: 'var(--bg-base)', padding: '44px 40px',
                    position: 'relative', overflow: 'hidden',
                    transition: 'background 0.25s ease',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-surface)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-base)' }}
                >
                  <span style={{
                    fontFamily: 'var(--font-caps)', fontSize: 6.5, fontWeight: 600,
                    letterSpacing: 2.3, textTransform: 'uppercase',
                    color: 'var(--copper-soft)', opacity: 0.7, display: 'block', marginBottom: 14,
                  }}>{c.sector}</span>

                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(18px,2vw,23px)',
                    fontWeight: 400, letterSpacing: '-0.02em',
                    color: 'var(--text-primary)', marginBottom: 14, lineHeight: 1.2,
                  }}>{c.headline}</h3>

                  <p style={{
                    fontFamily: 'var(--font-serif)', fontSize: 14, fontWeight: 300,
                    lineHeight: 1.78, color: 'var(--text-secondary)', marginBottom: 24,
                  }}>{c.body}</p>

                  <div style={{
                    borderTop: '1px solid var(--border-subtle)', paddingTop: 20,
                    display: 'flex', flexDirection: 'column', gap: 8,
                  }}>
                    {c.metrics.map(m => (
                      <div key={m} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ color: 'var(--copper)', fontSize: 8, flexShrink: 0 }}>◆</span>
                        <span style={{
                          fontFamily: 'var(--font-caps)', fontSize: 7, fontWeight: 600,
                          letterSpacing: 1.8, textTransform: 'uppercase', color: 'var(--text-secondary)',
                        }}>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal dir="up" delay={300}>
            <div style={{ textAlign: 'center', marginTop: 52 }}>
              <a href="#contacto" style={{
                fontFamily: 'var(--font-caps)', fontSize: 8.5, fontWeight: 600,
                letterSpacing: 2.5, textTransform: 'uppercase',
                background: 'var(--copper)', color: '#fff',
                padding: '15px 40px', display: 'inline-block',
                transition: 'background 0.22s, transform 0.15s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#a86830'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--copper)'; (e.currentTarget as HTMLElement).style.transform = 'none' }}>
                Quiero resultados como estos →
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
