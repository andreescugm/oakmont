import { useState, useRef, useEffect } from 'react'
import { trackLead } from '../../leadScore'
import { speak as speakEs, stopSpeech } from '../../speech'

interface Turn { from: 'client' | 'ia'; text: string }

interface Dish { name: string; price: string; desc: string; speech: string }

interface SiteConfig {
  id: string
  tab: string
  url: string
  accent: string
  name: string
  tagline: string
  items: string[]
  convo: Turn[]
  toast: string
  explain: string[]
  menu?: Dish[]
}


function MenuSlider({ dishes, accent }: { dishes: Dish[]; accent: string }) {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % dishes.length), 4200)
    return () => { clearInterval(t); stopSpeech() }
  }, [dishes.length])
  const d = dishes[idx]
  return (
    <div style={{
      margin: '0 24px 14px', border: `1px solid ${accent}44`, background: 'var(--bg-base)',
      padding: '16px 18px', position: 'relative', overflow: 'hidden',
    }}>
      <div key={idx} style={{ animation: 'menuSlideIn 0.6s cubic-bezier(0.16,1,0.3,1) both' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 5 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 17, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
            {d.name}
          </span>
          <span style={{ fontFamily: 'var(--font-caps)', fontSize: 11, color: accent, letterSpacing: 1 }}>{d.price}</span>
        </div>
        <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 13, color: 'var(--text-secondary)' }}>
          {d.desc}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
        <div style={{ display: 'flex', gap: 5 }}>
          {dishes.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} style={{
              width: i === idx ? 18 : 7, height: 3, background: i === idx ? accent : 'var(--border-mid)',
              transition: 'all 0.3s', padding: 0,
            }} />
          ))}
        </div>
        <button onClick={() => speakEs(d.speech)} style={{
          fontFamily: 'var(--font-caps)', fontSize: 7, fontWeight: 600, letterSpacing: 1.5,
          textTransform: 'uppercase', color: accent, border: `1px solid ${accent}55`,
          padding: '5px 10px', background: 'transparent',
        }}>
          🔊 Que te lo cuente la IA
        </button>
      </div>
    </div>
  )
}

const SITES: SiteConfig[] = [
  {
    id: 'clinica',
    tab: 'Clínica dental',
    url: 'clinica-ordesa.es',
    accent: '#4a9080',
    name: 'Clínica Ordesa',
    tagline: 'Tu sonrisa, sin esperas.',
    items: ['Implantes', 'Ortodoncia', 'Urgencias 24h'],
    convo: [
      { from: 'client', text: 'Hola, me duele una muela y es domingo…' },
      { from: 'ia', text: 'Lo siento — vamos a resolverlo ya. Tengo urgencia mañana lunes 8:30 con la Dra. Vega. ¿Te la reservo?' },
      { from: 'client', text: 'Sí, por favor. ¿Eres una persona real?' },
      { from: 'ia', text: 'Soy la IA de la clínica — pero el dolor que te voy a quitar es muy real. Reservado ✓ SMS enviado. Si sube esta noche, escríbeme: yo no duermo, y menos un domingo.' },
    ],
    toast: '✓ Cita registrada · Domingo, 23:12 — sin intervención humana',
    explain: [
      'Atendió a un paciente con dolor un domingo por la noche',
      'Le dio hueco real de agenda y precio, sin hacerle esperar',
      'Registró la cita y envió el SMS — cero humanos implicados',
    ],
  },
  {
    id: 'reformas',
    tab: 'Reformas',
    url: 'reformasduero.com',
    accent: '#c17b3a',
    name: 'Reformas Duero',
    tagline: 'Obras sin sustos. Precios sin letra pequeña.',
    items: ['Baños', 'Cocinas', 'Integrales'],
    convo: [
      { from: 'client', text: 'Quiero reformar el baño, ¿me pasáis presupuesto?' },
      { from: 'ia', text: 'Claro. Tres preguntas rápidas: ¿metros aproximados del baño?' },
      { from: 'client', text: 'Unos 5m². Ducha en vez de bañera. ¿Y no me tendréis 3 meses esperando?' },
      { from: 'ia', text: 'Horquilla para 5m² con cambio a ducha: 3.800–5.200€ según calidades. Visita técnica gratuita el jueves 17:00 — y si llegamos tarde, el café corre de nuestra cuenta. ✓ Enviado al jefe de obra.' },
    ],
    toast: '✓ Lead cualificado en 40 segundos · Presupuesto en camino',
    explain: [
      'Cualificó el lead: metros, tipo de obra, urgencia',
      'Dio horquilla de precio al instante — sin marear al cliente',
      'Agendó la visita técnica y avisó al jefe de obra',
    ],
  },
  {
    id: 'restaurante',
    tab: 'Restaurante',
    url: 'brasanorte.es',
    accent: '#d4935a',
    name: 'Brasa Norte',
    tagline: 'Fuego lento. Producto de Castilla.',
    items: ['Brasa', 'Terraza', 'Grupos'],
    menu: [
      { name: 'Lechazo 18 horas', price: '24 €', desc: 'Asado lento sobre encina. Se deshace solo.',
        speech: 'Lechazo asado dieciocho horas a baja temperatura sobre brasa de encina. Se corta con cuchara. El plato por el que se cruza media provincia.' },
      { name: 'Pulpo a la brasa', price: '19 €', desc: 'Carbón de encina y pimentón de la Vera.',
        speech: 'Pulpo a la brasa con carbón de encina, aceite de oliva virgen y pimentón de la Vera. Fuera crujiente, dentro mantequilla.' },
      { name: 'Torrija de brioche', price: '8 €', desc: 'Caramelizada al momento. Helado de leche merengada.',
        speech: 'Torrija de brioche caramelizada al momento, con helado de leche merengada. El final que pide la mesa entera.' },
    ],
    convo: [
      { from: 'client', text: 'Hola, ¿tenéis mesa para 8 el viernes sobre las 21:30? Hay un celíaco.' },
      { from: 'ia', text: 'Viernes 21:30 para 8 — hecho, os guardo la mesa larga de la terraza. Aviso a cocina de la intolerancia al gluten: el lechazo y el pulpo son seguros, y hay pan sin gluten. ¿Confirmo? ✓' },
    ],
    toast: '✓ Mesa de 8 reservada + alergia registrada en cocina · 23:58',
    explain: [
      'Reservó una mesa de 8 un viernes a las 23:58',
      'Registró una intolerancia directamente en cocina',
      'Confirmó al cliente al momento — el restaurante estaba cerrado',
    ],
  },
]

export default function DemoWebs() {
  const [active, setActive] = useState(0)
  const [shown, setShown] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [toast, setToast] = useState(false)
  const [typing, setTyping] = useState(false)
  const [explain, setExplain] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)
  const site = SITES[active]

  const clear = () => { timers.current.forEach(clearTimeout); timers.current = [] }
  useEffect(() => clear, [])
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [shown, typing, toast, explain])

  const reset = () => {
    clear()
    setShown(0)
    setPlaying(false)
    setToast(false)
    setTyping(false)
    setExplain(false)
  }

  const switchSite = (i: number) => {
    reset()
    setActive(i)
  }

  const play = () => {
    trackLead('vio las webs demo', 10)
    reset()
    setPlaying(true)
    // ritmo pausado: la IA "escribe" antes de responder,
    // para que el dueño de negocio pueda leer y entender cada paso
    let t = 500
    SITES[active].convo.forEach((turn, i) => {
      if (turn.from === 'ia') {
        timers.current.push(setTimeout(() => setTyping(true), t))
        t += 1400
      }
      timers.current.push(setTimeout(() => { setTyping(false); setShown(i + 1) }, t))
      t += turn.from === 'ia' ? 2600 : 1600
    })
    timers.current.push(setTimeout(() => setToast(true), t))
    t += 1400
    timers.current.push(setTimeout(() => { setExplain(true); setPlaying(false) }, t))
  }

  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border-soft)',
      maxWidth: 560, width: '100%', height: 500,
      display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden',
    }}>
      {/* barra navegador */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '10px 14px', borderBottom: '1px solid var(--border-subtle)',
        background: 'var(--bg-raised)',
      }}>
        <div style={{ display: 'flex', gap: 5 }}>
          {['#e0604f', '#e0b34f', '#57b26a'].map(c => (
            <span key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c, opacity: 0.75 }} />
          ))}
        </div>
        <div style={{
          flex: 1, textAlign: 'center', padding: '5px 12px',
          background: 'var(--bg-base)', border: '1px solid var(--border-subtle)',
          fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--text-muted)',
        }}>
          🔒 {site.url} <span style={{ opacity: 0.6 }}>· web ficticia, IA real</span>
        </div>
      </div>

      {/* tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-subtle)' }}>
        {SITES.map((s, i) => (
          <button key={s.id} onClick={() => switchSite(i)} style={{
            flex: 1, padding: '10px',
            fontFamily: 'var(--font-caps)', fontSize: 7.5, fontWeight: 600,
            letterSpacing: 2, textTransform: 'uppercase',
            color: i === active ? s.accent : 'var(--text-muted)',
            borderBottom: `2px solid ${i === active ? s.accent : 'transparent'}`,
            background: 'transparent', transition: 'all 0.2s',
          }}>
            {s.tab}
          </button>
        ))}
      </div>

      {/* mini web */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
        <div style={{ padding: '22px 24px 14px' }}>
          <div style={{
            fontFamily: 'var(--font-caps)', fontSize: 11, fontWeight: 600,
            letterSpacing: 3, textTransform: 'uppercase', color: site.accent, marginBottom: 6,
          }}>{site.name}</div>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--text-primary)',
            marginBottom: 10, letterSpacing: '-0.02em',
          }}>{site.tagline}</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {site.items.map(it => (
              <span key={it} style={{
                fontFamily: 'var(--font-sans)', fontSize: 10.5,
                padding: '4px 10px', color: 'var(--text-secondary)',
                border: '1px solid var(--border-soft)',
              }}>{it}</span>
            ))}
          </div>
        </div>

        {/* menú en slides (solo restaurante) */}
        {site.menu && <MenuSlider dishes={site.menu} accent={site.accent} />}

        {/* chat de la mini-web */}
        <div style={{ padding: '4px 24px 70px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{
            fontFamily: 'var(--font-caps)', fontSize: 7, letterSpacing: 2,
            textTransform: 'uppercase', color: 'var(--text-muted)',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: site.accent, boxShadow: `0 0 7px ${site.accent}` }} />
            Asistente IA de {site.name} — por Talos Lynx
          </div>
          {site.convo.slice(0, shown).map((t, i) => (
            <div key={i} style={{
              alignSelf: t.from === 'client' ? 'flex-end' : 'flex-start',
              maxWidth: '85%', padding: '9px 13px',
              fontFamily: 'var(--font-sans)', fontSize: 12.5, lineHeight: 1.5,
              background: t.from === 'client' ? 'var(--bg-hover)' : 'var(--bg-raised)',
              border: `1px solid ${t.from === 'client' ? 'var(--border-soft)' : site.accent + '44'}`,
              color: 'var(--text-primary)',
            }}>{t.text}</div>
          ))}
          {typing && (
            <div style={{
              alignSelf: 'flex-start', padding: '9px 13px', display: 'flex', gap: 4,
              background: 'var(--bg-raised)', border: `1px solid ${site.accent}44`,
            }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  width: 5, height: 5, borderRadius: '50%', background: site.accent,
                  animation: `typingDot 1.2s ${i * 0.2}s infinite`,
                }} />
              ))}
            </div>
          )}
          {shown === 0 && !playing && (
            <div style={{
              fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 14,
              color: 'var(--text-muted)', textAlign: 'center', padding: '18px 0',
            }}>
              Pulsa play y mira a la IA atender a un cliente real ↓
            </div>
          )}
          {explain && (
            <div style={{
              marginTop: 8, padding: '14px 16px',
              border: `1px solid ${site.accent}55`, background: 'var(--bg-raised)',
              animation: 'menuSlideIn 0.5s ease both',
            }}>
              <div style={{
                fontFamily: 'var(--font-caps)', fontSize: 7.5, fontWeight: 600,
                letterSpacing: 2, textTransform: 'uppercase', color: site.accent, marginBottom: 10,
              }}>
                Lo que acaba de pasar
              </div>
              {site.explain.map((e, i) => (
                <div key={i} style={{
                  fontFamily: 'var(--font-sans)', fontSize: 12, lineHeight: 1.5,
                  color: 'var(--text-secondary)', marginBottom: 6,
                  display: 'flex', gap: 8,
                }}>
                  <span style={{ color: site.accent }}>{i + 1}.</span> {e}
                </div>
              ))}
              <div style={{
                fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 13,
                color: 'var(--text-primary)', marginTop: 10, paddingTop: 10,
                borderTop: '1px solid var(--border-subtle)',
              }}>
                Esto mismo lo instalamos en tu negocio. Da igual el sector: si entran clientes, funciona.
              </div>
            </div>
          )}
        </div>

        {toast && (
          <div style={{
            position: 'absolute', bottom: 62, left: 24, right: 24,
            padding: '11px 16px', background: 'var(--bg-raised)',
            border: `1px solid ${site.accent}`,
            fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-primary)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
          }}>
            {site.toast}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', borderTop: '1px solid var(--border-subtle)' }}>
        <button onClick={play} disabled={playing} style={{
          flex: 1, padding: '14px',
          fontFamily: 'var(--font-caps)', fontSize: 8.5, fontWeight: 600,
          letterSpacing: 2.5, textTransform: 'uppercase',
          background: playing ? 'var(--bg-raised)' : 'var(--copper)',
          color: playing ? 'var(--text-muted)' : '#fff',
          transition: 'all 0.2s', cursor: playing ? 'default' : 'pointer',
        }}>
          {playing ? 'La IA está atendiendo…' : shown > 0 ? '↻ Repetir demo' : '▶ Ver a la IA atender'}
        </button>
      </div>
    </div>
  )
}
