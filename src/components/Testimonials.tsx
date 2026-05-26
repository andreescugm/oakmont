import Reveal from './Reveal'

interface Review {
  featured?: boolean
  text: string
  initials: string
  name: string
  role: string
}

const reviews: Review[] = [
  { featured: true, text: 'Les escribí a las 3 de la mañana porque no podía dormir pensando en un cuello de botella que llevaba meses sin resolver. Me respondieron al instante. Al día siguiente, a las 8 am, escuché a mi equipo hablar con ellos como si nada. No tiene precedentes.', initials: 'MR', name: 'M. Rodríguez', role: 'Director General · Clínica Dental, Madrid' },
  { text: 'Lo que más me flipó es que supieran dónde perdíamos pasta antes que yo. Vinieron con los deberes hechos. Identificaron las fugas de tiempo en logística en 20 minutos. El ojo que tienen para los negocios es mejor que el sistema.', initials: 'CP', name: 'C. Palacios', role: 'Dir. Comercial · Logística, Bilbao' },
  { text: 'He visto muchos PowerPoints de consultores y ya no me fío de nadie. Aquí no hubo diapositivas, hubo soluciones. Se nota cuando alguien sabe de lo que habla.', initials: 'AT', name: 'A. Tamarit', role: 'Fundadora · E-commerce, Barcelona' },
  { text: 'Tres semanas. Ni un día más. Llevaba dos años con empresas que solo daban largas y presupuestos vagos. Se sentaron, me dieron un plan con fechas y lo cumplieron. Formalidad de la que ya no queda.', initials: 'JL', name: 'J. Llorente', role: 'CEO · Servicios jurídicos, Valencia' },
  { featured: true, text: 'Llevamos 6 meses. Hemos cerrado un 40% más de obras sin contratar a nadie más en oficina. El bot de seguimiento hace el trabajo de dos personas y, lo mejor, no pide vacaciones ni se olvida de llamar a nadie.', initials: 'SG', name: 'S. García', role: 'CEO · Reformas, Sevilla' },
  { text: 'Me dijeron que NO automatizara un proceso que yo quería. Me explicaron que el ROI sería negativo. ¿Qué empresa te dice que no le pagues por algo? Ahí me ganaron. Honestidad bruta.', initials: 'FN', name: 'F. Navarro', role: 'Dir. Operaciones · Seguros, Zaragoza' },
  { featured: true, text: '60 minutos de diagnóstico gratuito. En esa hora aprendí más de mi propia empresa que en los últimos dos años. Tienen un método que te saca los colores, pero es lo que necesitas para espabilar.', initials: 'IC', name: 'I. Cabrera', role: 'CEO · Consultoría RRHH, Madrid' },
  { text: 'El sistema respondió a un cliente a las 2:47 am con una propuesta personalizada. Cerramos el contrato al despertarnos. Si esperamos a las 9, ese cliente se habría ido a la competencia.', initials: 'EF', name: 'E. Fuentes', role: 'Dir. Desarrollo · IT, Madrid' },
  { text: 'Teníamos un pipeline que parecía un cementerio de leads. El 60% se perdía porque no dábamos abasto. Ahora el sistema los calienta y me los sirve. Mi tasa de cierre subió 28 puntos. Los números no mienten.', initials: 'NA', name: 'N. Arredondo', role: 'Dir. Comercial · Formación, Madrid' },
  { text: 'Empecé asustada porque no sé ni usar Excel bien. Me hablaron en idioma "negocio", no en "programador". Lo entendí todo a la primera y funciona exactamente como me prometieron.', initials: 'TP', name: 'T. Paredes', role: 'Propietaria · Clínica veterinaria, Burgos' },
]

const featuredReviews = reviews.filter(r => r.featured)
const tickerReviews = reviews.filter(r => !r.featured)

function TickerCard({ r }: { r: Review }) {
  return (
    <div style={{
      flexShrink: 0,
      width: 'clamp(320px, 32vw, 460px)',
      padding: '32px 32px 28px',
      background: 'var(--bg-card)',
      border: '1px solid var(--border-subtle)',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      minHeight: 280,
    }}>
      <p style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 16, fontWeight: 300, lineHeight: 1.65,
        color: 'var(--text-secondary)',
        position: 'relative', paddingLeft: 4,
        marginBottom: 24,
      }}>
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: 52, lineHeight: 0,
          color: 'var(--copper)', opacity: 0.2,
          position: 'absolute', top: 18, left: -6, pointerEvents: 'none',
        }}>"</span>
        {r.text}
      </p>
      <div style={{
        borderTop: '1px solid var(--border-subtle)', paddingTop: 14,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
          background: 'var(--copper-dim)', border: '1px solid var(--copper-dim)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-caps)', fontSize: 10, fontWeight: 600, color: 'var(--copper-soft)',
        }}>{r.initials}</div>
        <div>
          <span style={{
            fontFamily: 'var(--font-caps)', fontSize: 8, fontWeight: 600,
            letterSpacing: 2.2, textTransform: 'uppercase',
            color: 'var(--text-primary)', display: 'block', marginBottom: 2,
          }}>{r.name}</span>
          <span style={{
            fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 300,
            color: 'var(--text-muted)', display: 'block',
          }}>{r.role}</span>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  // Duplicar para loop continuo
  const tickerSet = [...tickerReviews, ...tickerReviews]

  return (
    <section style={{
      background: 'var(--bg-surface)',
      padding: 'clamp(100px,14vh,180px) 0',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* section index */}
      <div aria-hidden style={{
        position: 'absolute', top: 'clamp(80px,12vh,140px)', right: 'clamp(24px,6vw,96px)',
        fontFamily: 'var(--font-caps)', fontSize: 9, fontWeight: 400,
        letterSpacing: 3.5, textTransform: 'uppercase',
        color: 'var(--text-muted)',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <span style={{ width: 32, height: 1, background: 'var(--border-mid)' }} />
        <span>06 · Testimonios</span>
      </div>

      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 clamp(24px,6vw,96px)' }}>
        <Reveal dir="left">
          <span style={{
            fontFamily: 'var(--font-caps)', fontSize: 9, fontWeight: 600,
            letterSpacing: 4, textTransform: 'uppercase', color: 'var(--copper-soft)',
            display: 'inline-flex', alignItems: 'center', gap: 14,
            marginBottom: 'clamp(28px,4vh,44px)',
          }}>
            <span style={{ width: 28, height: 1, background: 'var(--copper)' }} />
            Lo que dicen quienes lo viven
          </span>
        </Reveal>

        <div className="grid-2col" style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 1.1fr) minmax(280px, 0.9fr)',
          gap: 'clamp(40px,6vw,96px)',
          alignItems: 'end',
          marginBottom: 'clamp(64px,9vh,120px)',
        }}>
          <Reveal dir="up">
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(42px,7.5vw,100px)',
              fontWeight: 400, lineHeight: 0.94, letterSpacing: '-0.035em',
              color: 'var(--text-primary)', maxWidth: '13ch',
            }}>
              10 empresas.{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--copper-soft)' }}>Una conclusión.</em>
            </h2>
          </Reveal>
          <Reveal dir="up" delay={120}>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(17px,1.5vw,20px)',
              fontWeight: 300, fontStyle: 'italic', lineHeight: 1.65,
              color: 'var(--text-secondary)', maxWidth: 460,
            }}>
              Sin seleccionar. Sin filtrar. Lo que los clientes escriben cuando nadie los mira.
            </p>
          </Reveal>
        </div>

        {/* Pull-quotes destacados — los 3 featured como bloque editorial */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'clamp(32px,4vw,64px)',
          marginBottom: 'clamp(80px,10vh,140px)',
        }}>
          {featuredReviews.map((r, i) => (
            <Reveal key={i} dir="up" delay={i * 120}>
              <figure style={{
                borderTop: '1px solid var(--copper-dim)',
                paddingTop: 28,
              }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontFamily: 'var(--font-caps)', fontSize: 7.5,
                  letterSpacing: 1.8, textTransform: 'uppercase',
                  color: 'var(--teal)', marginBottom: 22,
                }}>
                  <span style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 16, height: 16, borderRadius: '50%',
                    background: 'var(--teal-dim)', fontSize: 9, fontWeight: 700, color: 'var(--teal)',
                  }}>✓</span>
                  Cliente verificado
                </div>
                <blockquote style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(22px,2.4vw,30px)',
                  fontWeight: 400, fontStyle: 'italic',
                  lineHeight: 1.32, letterSpacing: '-0.015em',
                  color: 'var(--text-primary)',
                  marginBottom: 28,
                }}>
                  "{r.text}"
                </blockquote>
                <figcaption style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  paddingTop: 18, borderTop: '1px solid var(--border-subtle)',
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                    background: 'var(--copper-dim)', border: '1px solid var(--copper-dim)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-caps)', fontSize: 11, fontWeight: 600, color: 'var(--copper-soft)',
                  }}>{r.initials}</div>
                  <div>
                    <span style={{
                      fontFamily: 'var(--font-caps)', fontSize: 8, fontWeight: 600,
                      letterSpacing: 2.2, textTransform: 'uppercase',
                      color: 'var(--text-primary)', display: 'block', marginBottom: 2,
                    }}>{r.name}</span>
                    <span style={{
                      fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 300,
                      color: 'var(--text-muted)', display: 'block',
                    }}>{r.role}</span>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>

      {/* TICKER infinito — el resto de testimonios */}
      <div style={{
        position: 'relative',
        WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
        maskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
      }}>
        <div className="ticker-track" style={{
          display: 'flex', gap: 24, width: 'max-content',
          animation: 'ticker 70s linear infinite',
        }}>
          {tickerSet.map((r, i) => <TickerCard key={i} r={r} />)}
        </div>
      </div>

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track:hover { animation-play-state: paused; }
      `}</style>
    </section>
  )
}
