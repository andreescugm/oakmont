import { useRef } from 'react'
import Reveal from './Reveal'
import MobileCarousel from './MobileCarousel'
import CarouselArrows from './CarouselArrows'

interface Review {
  featured?: boolean
  size: 'sm' | 'md' | 'lg' | 'xl'
  verified?: boolean
  text: string
  initials: string
  name: string
  role: string
}

const reviews: Review[] = [
  { featured: true, size: 'xl', verified: true, text: 'Les escribí a las 3 de la mañana porque no podía dormir pensando en un cuello de botella que llevaba meses sin resolver. Me respondieron al instante. Al día siguiente, a las 8 am, escuché a mi equipo hablar con ellos como si nada. No tiene precedentes. Cuidado con el café, anda.', initials: 'MR', name: 'M. Rodríguez', role: 'Director General · Clínica Dental, Madrid' },
  { size: 'md', text: 'Lo que más me flipó es que supieran dónde perdíamos pasta antes que yo. Vinieron a la reunión con los deberes hechos. Identificaron las fugas de tiempo en logística en 20 minutos. El sistema es bueno, pero el ojo que tienen para los negocios es mejor.', initials: 'CP', name: 'C. Palacios', role: 'Dir. Comercial · Logística, Bilbao' },
  { size: 'sm', text: 'He visto muchos PowerPoints de consultores y ya no me fío de nadie. Pero aquí no hubo diapositivas, hubo soluciones. Me equivoqué al juzgarles antes de tiempo. Se nota cuando alguien sabe de lo que habla.', initials: 'AT', name: 'A. Tamarit', role: 'Fundadora · E-commerce, Barcelona' },
  { size: 'lg', text: 'Tres semanas. Ni un día más. Llevaba dos años dando vueltas con empresas que solo me daban largas y presupuestos vagos. Estos señores se sentaron, me dieron un plan con fechas y lo cumplieron. Formalidad de la que ya no queda.', initials: 'JL', name: 'J. Llorente', role: 'CEO · Servicios jurídicos, Valencia' },
  { featured: true, size: 'xl', verified: true, text: 'Llevamos 6 meses. Hemos cerrado un 40% más de obras sin contratar a nadie más en oficina. El bot de seguimiento hace el trabajo de dos personas y, lo mejor de todo, no pide vacaciones ni se olvida de llamar a nadie.', initials: 'SG', name: 'S. García', role: 'CEO · Reformas y construcción, Sevilla' },
  { size: 'md', text: 'Me dijeron que NO automatizara un proceso que yo quería. Me explicaron que el ROI sería negativo. ¿Qué empresa te dice que no le pagues por algo? Ahí me ganaron. Honestidad bruta.', initials: 'FN', name: 'F. Navarro', role: 'Director Operaciones · Seguros, Zaragoza' },
  { featured: true, size: 'xl', verified: true, text: '60 minutos de diagnóstico gratuito. En esa hora aprendí más de mi propia empresa que en los últimos dos años. Tienen un método que te saca los colores, pero es lo que necesitas para espabilar.', initials: 'IC', name: 'I. Cabrera', role: 'CEO · Consultoría RRHH, Madrid' },
  { size: 'md', text: 'El sistema respondió a un cliente a las 2:47 am con una propuesta personalizada según lo que pedía. Cerramos el contrato al despertarnos. Si esperamos a que alguien abra la oficina a las 9, ese cliente ya se habría ido a la competencia.', initials: 'EF', name: 'E. Fuentes', role: 'Dir. Desarrollo de negocio · IT, Madrid' },
  { size: 'lg', text: 'Teníamos el pipeline que parecía un cementerio de leads. Un 60% se perdía porque no dábamos abasto. Ahora el sistema los calienta y me los sirve en bandeja para la reunión. Mi tasa de cierre ha subido 28 puntos. Los números no mienten.', initials: 'NA', name: 'N. Arredondo', role: 'Dir. Comercial · Formación, Madrid' },
  { size: 'xl', text: 'Empecé asustada porque no sé ni usar el Excel bien. Me hablaron en idioma "negocio", no en idioma "programador". Lo entendí todo a la primera y funciona exactamente como me prometieron.', initials: 'TP', name: 'T. Paredes', role: 'Propietaria · Clínica veterinaria, Burgos' },
]

const fontSize: Record<Review['size'], number> = { sm: 13.5, md: 15, lg: 16.5, xl: 17.5 }

function Stars() {
  return (
    <div style={{ display: 'flex', gap: 3, marginBottom: 12 }}>
      {[...Array(5)].map((_, i) => <span key={i} className="star-shape" />)}
    </div>
  )
}

function Card({ r, delay }: { r: Review; delay: number }) {
  return (
    <Reveal dir="up" delay={delay}>
      <div style={{
        breakInside: 'avoid', marginBottom: 18,
        background: r.featured ? 'var(--bg-raised)' : 'var(--bg-card)',
        border: r.featured ? '1px solid var(--copper-dim)' : '1px solid var(--border-subtle)',
        borderTop: r.featured ? '2px solid var(--copper)' : '2px solid transparent',
        padding: '24px 24px 20px',
        position: 'relative',
        transition: 'border-top-color 0.3s, transform 0.3s ease, box-shadow 0.3s ease, background 0.25s',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderTopColor = 'var(--copper)'
        el.style.transform = 'translateY(-3px)'
        el.style.boxShadow = '0 10px 36px rgba(0,0,0,0.2)'
        el.style.background = 'var(--bg-raised)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderTopColor = r.featured ? 'var(--copper)' : 'transparent'
        el.style.transform = 'none'
        el.style.boxShadow = 'none'
        el.style.background = r.featured ? 'var(--bg-raised)' : 'var(--bg-card)'
      }}>
        {r.verified && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            fontFamily: 'var(--font-caps)', fontSize: 6.5,
            letterSpacing: 1.5, textTransform: 'uppercase',
            color: 'var(--teal)', marginBottom: 8,
          }}>
            <span style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 14, height: 14, borderRadius: '50%',
              background: 'var(--teal-dim)', fontSize: 8, fontWeight: 700, color: 'var(--teal)',
            }}>✓</span>
            Cliente verificado
          </div>
        )}
        <Stars />
        <p style={{
          fontFamily: 'var(--font-serif)', fontWeight: 300, lineHeight: 1.75,
          color: 'var(--text-secondary)', marginBottom: 16,
          fontSize: fontSize[r.size],
          fontStyle: r.size === 'xl' ? 'italic' : 'normal',
          position: 'relative', paddingLeft: 2,
        }}>
          <span style={{
            fontFamily: 'var(--font-display)', fontSize: 48, lineHeight: 0,
            color: 'var(--copper)', opacity: 0.18,
            position: 'absolute', top: 14, left: -4, pointerEvents: 'none',
          }}>"</span>
          {r.text}
        </p>
        <div style={{
          borderTop: '1px solid var(--border-subtle)', paddingTop: 12,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
            background: 'var(--copper-dim)', border: '1px solid var(--copper-dim)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-caps)', fontSize: 9.5, fontWeight: 600, color: 'var(--copper-soft)',
          }}>{r.initials}</div>
          <div>
            <span style={{
              fontFamily: 'var(--font-caps)', fontSize: 7, fontWeight: 600,
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
    </Reveal>
  )
}

export default function Testimonials() {
  const carouselRef = useRef<HTMLDivElement>(null)
  return (
    <section style={{ background: 'var(--bg-surface)', padding: '88px 0', position: 'relative', overflow: 'hidden' }}>
      <CarouselArrows scrollRef={carouselRef} />
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 1, height: 70, background: 'linear-gradient(180deg, var(--copper), transparent)',
      }} />
      <div style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: 720, height: 360,
        background: 'radial-gradient(ellipse, rgba(193,123,58,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px', textAlign: 'center', marginBottom: 60, position: 'relative', zIndex: 1 }}>
        <Reveal dir="left">
          <span style={{
            fontFamily: 'var(--font-caps)', fontSize: 7.5, fontWeight: 600,
            letterSpacing: 3, textTransform: 'uppercase', color: 'var(--copper-soft)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 36,
          }}>
            <span style={{ width: 26, height: 1, background: 'var(--copper)', flexShrink: 0 }} />
            Lo que dicen quienes lo viven
          </span>
        </Reveal>
        <Reveal dir="up">
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(34px,5.5vw,68px)',
            fontWeight: 400, lineHeight: 0.94, letterSpacing: '-0.03em',
            color: 'var(--text-primary)', marginBottom: 14,
          }}>
            10 empresas.<br />
            <em style={{ fontStyle: 'italic', color: 'var(--copper-soft)' }}>Una sola conclusión.</em>
          </h2>
        </Reveal>
        <Reveal dir="up" delay={80}>
          <p style={{
            fontFamily: 'var(--font-serif)', fontSize: 17, fontStyle: 'italic', fontWeight: 300,
            color: 'var(--text-secondary)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7,
          }}>Sin seleccionar. Sin filtrar. Lo que los clientes escriben cuando nadie los mira.</p>
        </Reveal>
      </div>

      <MobileCarousel count={reviews.length} scrollRef={carouselRef} style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 48px',
        columnCount: 3, columnGap: 18, position: 'relative', zIndex: 1,
      }}>
        {reviews.map((r, i) => <Card key={i} r={r} delay={i * 40} />)}
      </MobileCarousel>
    </section>
  )
}
