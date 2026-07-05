import { useState, useRef, useEffect } from 'react'
import { trackLead } from '../../leadScore'

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
  menu?: Dish[]
}

function speakEs(text: string) {
  if (!('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'es-ES'
  const es = window.speechSynthesis.getVoices().find(v => v.lang.startsWith('es'))
  if (es) u.voice = es
  u.rate = 1
  window.speechSynthesis.speak(u)
}

function MenuSlider({ dishes, accent }: { dishes: Dish[]; accent: string }) {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % dishes.length), 4200)
    return () => { clearInterval(t); window.speechSynthesis?.cancel() }
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
      { from: 'ia', text: 'Lo siento — vamos a resolverlo ya. Tengo urgencia disponible mañana lunes a las 8:30 con la Dra. Vega. ¿Te la reservo?' },
      { from: 'client', text: 'Sí, por favor. ¿Cuánto costaría?' },
      { from: 'ia', text: 'La visita de urgencia son 35€, descontables del tratamiento. Reservado ✓ Te acabo de enviar la confirmación por SMS. Si el dolor sube esta noche, responde a este chat: estoy aquí.' },
    ],
    toast: '✓ Cita registrada · Domingo, 23:12 — sin intervención humana',
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
      { from: 'client', text: 'Unos 5m². Ducha en vez de bañera.' },
      { from: 'ia', text: 'Perfecto: cambio bañera→ducha en 5m², horquilla habitual 3.800–5.200€ según calidades. Te agendo visita técnica gratuita el jueves a las 17:00 para cerrar cifra exacta. ✓ Lead cualificado y enviado al jefe de obra.' },
    ],
    toast: '✓ Lead cualificado en 40 segundos · Presupuesto en camino',
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
  },
]

export default function DemoWebs() {
  const [active, setActive] = useState(0)
  const [shown, setShown] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [toast, setToast] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const site = SITES[active]

  const clear = () => { timers.current.forEach(clearTimeout); timers.current = [] }
  useEffect(() => clear, [])

  const switchSite = (i: number) => {
    clear()
    setActive(i)
    setShown(0)
    setPlaying(false)
    setToast(false)
  }

  const play = () => {
    trackLead('vio las webs demo', 10)
    clear()
    setShown(0)
    setToast(false)
    setPlaying(true)
    SITES[active].convo.forEach((_, i) => {
      timers.current.push(setTimeout(() => setShown(i + 1), 1100 * (i + 1)))
    })
    timers.current.push(setTimeout(() => { setToast(true); setPlaying(false) }, 1100 * (SITES[active].convo.length + 1)))
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
      <div style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
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
          {shown === 0 && !playing && (
            <div style={{
              fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 14,
              color: 'var(--text-muted)', textAlign: 'center', padding: '18px 0',
            }}>
              Pulsa play y mira a la IA atender a un cliente real ↓
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

      <button onClick={play} disabled={playing} style={{
        padding: '14px', borderTop: '1px solid var(--border-subtle)',
        fontFamily: 'var(--font-caps)', fontSize: 8.5, fontWeight: 600,
        letterSpacing: 2.5, textTransform: 'uppercase',
        background: playing ? 'var(--bg-raised)' : 'var(--copper)',
        color: playing ? 'var(--text-muted)' : '#fff',
        transition: 'all 0.2s', cursor: playing ? 'default' : 'pointer',
      }}>
        {playing ? 'La IA está atendiendo…' : shown > 0 ? '↻ Repetir demo' : '▶ Ver a la IA atender'}
      </button>
    </div>
  )
}
