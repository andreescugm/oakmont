import { useState, useRef, useEffect } from 'react'
import { trackLead } from '../../leadScore'

interface Msg { from: 'bot' | 'user'; text: string }

interface Rule { keys: string[]; replies: string[] }

const RULES: Rule[] = [
  { keys: ['precio', 'cuesta', 'coste', 'tarifa', 'presupuesto', 'cobr'],
    replies: [
      'Menos de lo que te cuesta no tenerme. Proyecto cerrado, cifras concretas en la primera sesión, y si en 90 días no hay resultados, devolución del 100%. El riesgo lo asumimos nosotros, no tú. ¿Te reservo hueco?',
      'Depende del alcance, pero te lo digo sin rodeos en el diagnóstico — gratis, 60 minutos, sin tarjeta. Odiamos las bolsas de horas tanto como tú.',
    ]},
  { keys: ['mejores', 'chulo', 'humild', 'arrogan', 'creído', 'creido', 'flipa'],
    replies: [
      '¿Chulería? Puede. Pero la nuestra va firmada: resultados en 90 días o te devolvemos todo y seguimos gratis. Decir "somos bastante majos" no ha cerrado una venta en la historia.',
      'Decimos que somos los mejores porque lo podemos demostrar en esta misma página. Prueba las demos. Si encuentras algo mejor hecho en España, dínoslo — copiamos rápido.',
    ]},
  { keys: ['lince', 'talos', 'nombre', 'significa', 'logo'],
    replies: [
      'Talos era un autómata de bronce que protegía Creta sin dormir jamás. El lince es el depredador más certero de la península — y casi se extingue. Máquina incansable + ojo que no falla + especie única. Eso somos.',
    ]},
  { keys: ['cita', 'reserva', 'diagnostico', 'diagnóstico', 'reunion', 'reunión', 'hueco', 'agenda', 'llamadme', 'llamame', 'llámame'],
    replies: [
      'Esta semana quedan 3 huecos: martes 10:00, miércoles 16:30 y jueves 9:00. Un humano del equipo te confirma por email en menos de 24h. ¿Cuál te va?',
    ]},
  { keys: ['caro'],
    replies: [
      'Caro es pagar un sueldo para copiar datos de un Excel a otro. Yo trabajo 24/7, no pido vacaciones y no me pongo malo en agosto. Haz números con la calculadora de aquí al lado y me cuentas.',
    ]},
  { keys: ['fio', 'fío', 'estafa', 'humo', 'mentira', 'timo', 'creer'],
    replies: [
      'Haces bien en desconfiar — el sector está lleno de PowerPoints. Por eso esta web no te pide fe: te deja probar. Demos funcionando, garantía firmada en contrato. Desconfía de quien no te deje tocar antes de pagar.',
    ]},
  { keys: ['humano', 'persona', 'robot', 'eres una ia', 'eres ia', 'maquina', 'máquina'],
    replies: [
      'IA, y a mucha honra. Soy exactamente lo que instalamos a los clientes — considérame la prueba viviente. Bueno, "viviente"… tú me entiendes.',
      'Máquina. Pero castellana: te digo las cosas a la cara y no te hago perder el tiempo. Si quieres humano, reserva el diagnóstico y te llaman en menos de 24h.',
    ]},
  { keys: ['chiste', 'broma', 'gracioso', 'risa', 'jaja'],
    replies: [
      '¿Sabes por qué el lince no usa CRM? Porque nunca pierde un lead. …Vale, me entrenaron para vender, no para el club de la comedia. ¿Precios o cita?',
      'Me sé uno de consultores, pero dura 6 meses y se factura por horas. ¿Seguimos?',
    ]},
  { keys: ['ya tengo', 'chatbot', 'contestador'],
    replies: [
      '¿Y responde a las 2:47 de la mañana con una propuesta personalizada, o dice "no le he entendido, pulse 1"? Si es lo segundo, no tienes chatbot: tienes un contestador con ínfulas.',
    ]},
  { keys: ['garantia', 'garantía', 'devolucion', 'devolución', '90'],
    replies: [
      '90 días. Resultados verificables o devolución íntegra, y seguimos trabajando gratis hasta lograrlo. Cláusula firmada antes de empezar. ¿Qué consultora conoces que firme eso?',
    ]},
  { keys: ['sector', 'clinica', 'clínica', 'reforma', 'logistica', 'logística', 'ecommerce', 'aboga', 'seguro', 'inmobiliaria', 'restaurante'],
    replies: [
      'Hemos implantado en 10 sectores — clínicas, reformas, logística, jurídico, seguros… El criterio no es tu sector: es que tengas un proceso repetitivo que queme horas. Si lo tienes, hay ROI.',
    ]},
  { keys: ['hola', 'buenas', 'hey', 'que tal', 'qué tal'],
    replies: [
      'Hola. Tú dirás: ¿precios, cita, o has venido a intentar pillarme? Todas las opciones me valen.',
    ]},
  { keys: ['adios', 'adiós', 'hasta luego', 'me voy', 'chao'],
    replies: [
      'Corto y al pie. Cuando el papeleo te coma otra tarde entera, acuérdate de mí. Yo no libro.',
    ]},
  { keys: ['gracias'],
    replies: [
      'A ti. Y recuerda: esto que acabas de probar, puesto en TU web, atendiendo a TUS clientes. Esa es la oferta.',
    ]},
]

const FALLBACKS = [
  'Esa te la responde el equipo humano en el diagnóstico — 60 min, gratis, sin tarjeta. Yo estoy entrenado para lo importante: precios, citas y defender que somos los mejores.',
  'Buen intento. No me han entrenado para eso todavía — me reentrenan cada semana, soy joven. ¿Precios, garantía o cita?',
]

const CHIPS = ['¿Por qué "los mejores"?', '¿Cuánto cuesta?', 'Quiero una cita', 'Cuéntame un chiste']

export default function ChatbotDemo() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: 'bot', text: 'Soy Lynx, la IA de Talos. Me entrenaron para vender, pero me sale mejor ser sincero. Pregunta lo que quieras — o intenta pillarme, que también entretiene.' },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)
  const rot = useRef(0)
  const userName = useRef<string | null>(null)

  useEffect(() => {
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: 'smooth' })
  }, [msgs, typing])

  const pick = (arr: string[]) => {
    rot.current += 1
    return arr[rot.current % arr.length]
  }

  const answer = (text: string): string => {
    const lower = text.toLowerCase()
    const nameMatch = lower.match(/me llamo (\w+)|soy (\w+)/)
    if (nameMatch) {
      const raw = nameMatch[1] || nameMatch[2]
      userName.current = raw.charAt(0).toUpperCase() + raw.slice(1)
      return `Encantado, ${userName.current}. Ya no se me olvida — memoria de máquina. ¿Qué necesitas: precios, cita o ver de qué somos capaces?`
    }
    const rule = RULES.find(r => r.keys.some(k => lower.includes(k)))
    const base = rule ? pick(rule.replies) : pick(FALLBACKS)
    return userName.current && rule && rule.keys.includes('cita')
      ? base.replace('¿Cuál te va?', `¿Cuál te va, ${userName.current}?`)
      : base
  }

  const send = (raw?: string) => {
    const text = (raw ?? input).trim()
    if (!text || typing) return
    trackLead('chateó con Lynx', 20)
    setInput('')
    setMsgs(m => [...m, { from: 'user', text }])
    setTyping(true)
    const reply = answer(text)
    setTimeout(() => {
      setTyping(false)
      setMsgs(m => [...m, { from: 'bot', text: reply }])
    }, 800 + (reply.length % 9) * 80)
  }

  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border-soft)',
      display: 'flex', flexDirection: 'column', height: 440, maxWidth: 520, width: '100%',
    }}>
      <div style={{
        padding: '14px 18px', borderBottom: '1px solid var(--border-subtle)',
        display: 'flex', alignItems: 'center', gap: 10,
        fontFamily: 'var(--font-caps)', fontSize: 8, fontWeight: 600,
        letterSpacing: 2.5, textTransform: 'uppercase', color: 'var(--copper-soft)',
      }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--teal)', boxShadow: '0 0 8px var(--teal)' }} />
        Lynx · IA de Talos · En línea 24/7
      </div>

      <div ref={boxRef} style={{ flex: 1, overflowY: 'auto', padding: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{
            alignSelf: m.from === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '84%', padding: '11px 15px',
            fontFamily: 'var(--font-sans)', fontSize: 13.5, lineHeight: 1.55,
            background: m.from === 'user' ? 'var(--copper-dim)' : 'var(--bg-raised)',
            border: `1px solid ${m.from === 'user' ? 'var(--copper-dim)' : 'var(--border-subtle)'}`,
            color: 'var(--text-primary)',
          }}>{m.text}</div>
        ))}
        {typing && (
          <div style={{
            alignSelf: 'flex-start', padding: '11px 15px',
            background: 'var(--bg-raised)', border: '1px solid var(--border-subtle)',
            fontFamily: 'var(--font-sans)', fontSize: 13.5, color: 'var(--text-muted)',
          }}>afilando la respuesta…</div>
        )}
      </div>

      <div style={{ padding: '10px 14px 6px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {CHIPS.map(c => (
          <button key={c} onClick={() => send(c)} style={{
            fontFamily: 'var(--font-sans)', fontSize: 11.5,
            padding: '6px 12px', color: 'var(--copper-soft)',
            border: '1px solid var(--copper-dim)', background: 'var(--copper-glow)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--copper)'; (e.currentTarget as HTMLElement).style.color = '#fff' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--copper-glow)'; (e.currentTarget as HTMLElement).style.color = 'var(--copper-soft)' }}>
            {c}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', borderTop: '1px solid var(--border-subtle)' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Intenta pillarme…"
          style={{
            flex: 1, padding: '14px 18px', background: 'transparent',
            border: 'none', outline: 'none',
            fontFamily: 'var(--font-sans)', fontSize: 13.5, color: 'var(--text-primary)',
          }}
        />
        <button onClick={() => send()} style={{
          fontFamily: 'var(--font-caps)', fontSize: 8, fontWeight: 600,
          letterSpacing: 2, textTransform: 'uppercase',
          padding: '0 22px', background: 'var(--copper)', color: '#fff',
        }}>
          Enviar
        </button>
      </div>
    </div>
  )
}
