import { useState, useRef, useEffect } from 'react'
import { speak, stopSpeech } from '../speech'

/* ═══════════════════════════════════════════════════════
   BRASA NORTE — web demo completa dentro de la web.
   Carta en slides: arrastra (o flechas) y el plato gira,
   el fondo muta y el precio cambia contigo.
   ═══════════════════════════════════════════════════════ */

interface Dish {
  name: string
  desc: string
  price: string
  emoji: string
  img: string       // foto real (Unsplash)
  bg: string        // gradiente de fondo de página
  glow: string      // color del halo del plato
  tag: string
  speech: string    // narración (audio estático pregenerado)
}

const UNSPLASH = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`

const DISHES: Dish[] = [
  {
    name: 'Pato trufado',
    img: UNSPLASH('photo-1546833999-b9f581a1996d'),
    desc: 'Magret madurado 21 días, trufa negra de Soria y reducción de Pedro Ximénez.',
    price: '28 €', emoji: '🦆', tag: 'La firma de la casa',
    bg: 'linear-gradient(160deg, #5d1b26 0%, #2e0d13 100%)', glow: 'rgba(220,90,110,0.35)',
    speech: 'Magret de pato madurado veintiún días, trufa negra de Soria y reducción de Pedro Ximénez. La firma de la casa.',
  },
  {
    name: 'César de corral',
    img: UNSPLASH('photo-1512621776951-a57141f2eefd'),
    desc: 'Pollo de corral a la brasa, parmesano de 24 meses y anchoa del Cantábrico.',
    price: '14 €', emoji: '🥗', tag: 'Fresca y canalla',
    bg: 'linear-gradient(160deg, #24462e 0%, #0f2416 100%)', glow: 'rgba(110,200,140,0.3)',
    speech: 'Ensalada César con pollo de corral a la brasa, parmesano de veinticuatro meses y anchoa del Cantábrico.',
  },
  {
    name: 'Lechazo 18 horas',
    img: UNSPLASH('photo-1544025162-d76694265947'),
    desc: 'Asado lento sobre brasa de encina. Se corta con cuchara, se recuerda años.',
    price: '24 €', emoji: '🍖', tag: 'El motivo del viaje',
    bg: 'linear-gradient(160deg, #6e4220 0%, #33200e 100%)', glow: 'rgba(212,147,90,0.4)',
    speech: 'Lechazo asado dieciocho horas a baja temperatura sobre brasa de encina. Se corta con cuchara. El plato por el que se cruza media provincia.',
  },
  {
    name: 'Pulpo a la brasa',
    img: UNSPLASH('photo-1599487488170-d11ec9c172f0'),
    desc: 'Carbón de encina, pimentón de la Vera y parmentier de patata asada.',
    price: '19 €', emoji: '🐙', tag: 'Fuera crujiente, dentro mantequilla',
    bg: 'linear-gradient(160deg, #123c46 0%, #081e24 100%)', glow: 'rgba(90,190,200,0.32)',
    speech: 'Pulpo a la brasa con carbón de encina, aceite de oliva virgen y pimentón de la Vera. Fuera crujiente, dentro mantequilla.',
  },
  {
    name: 'Torrija de brioche',
    img: UNSPLASH('photo-1551024506-0bccd828d307'),
    desc: 'Caramelizada al momento, helado de leche merengada. El final que pide la mesa.',
    price: '8 €', emoji: '🍮', tag: 'No se comparte (avisamos)',
    bg: 'linear-gradient(160deg, #7c5619 0%, #3a290c 100%)', glow: 'rgba(230,180,90,0.35)',
    speech: 'Torrija de brioche caramelizada al momento, con helado de leche merengada. El final que pide la mesa entera.',
  },
]

/* ── mini camarero IA con arco de chistes ── */

interface Msg { from: 'bot' | 'user'; text: string }

const R_JOKES = [
  '¿Sabes por qué el lechazo tarda 18 horas? Porque la prisa es enemiga de lo importante. Como en las reservas: ¿te apunto una?',
  'Un cliente me preguntó si el pulpo era fresco. Le dije que esta mañana aún tenía cuenta de Instagram.',
  '¿Postre sin reserva? Eso aquí se considera vivir al límite.',
]

const R_REDIRECT = 'Oye, que yo no soy una app de chistes: soy el camarero digital de esta casa y me han configurado cutremente. Deja de jugar conmigo y reserva mesa, anda — ¿viernes o sábado?'

function waiterReply(text: string, jokes: { n: number }): string {
  const t = text.toLowerCase()
  if (/(chiste|broma|gracioso|jaja)/.test(t)) {
    jokes.n += 1
    if (jokes.n > 2) return R_REDIRECT
    return R_JOKES[(jokes.n - 1) % R_JOKES.length]
  }
  if (/(mesa|reserva|hueco|sitio)/.test(t)) return 'Hecho. ¿Cuántos sois y qué día? Tengo viernes 21:00 y sábado 21:30 con mesa buena. Confirmo por SMS al momento.'
  if (/(alerg|celiac|gluten|intoler)/.test(t)) return 'Aviso a cocina directamente: lechazo y pulpo son sin gluten, y hay pan sin gluten del bueno. Queda registrado en tu reserva. ✓'
  if (/(carta|recomien|plato|comer)/.test(t)) return 'Si es tu primera vez: lechazo. Si vienes con tiempo: pato trufado. Si vienes con hambre: los dos, y la torrija no se negocia.'
  if (/(horario|abr|cerr|hora)/.test(t)) return 'Cocina de 13:30 a 16:00 y de 20:30 a 23:30. Yo, en cambio, no cierro nunca: reserva a las 3 de la mañana si quieres.'
  if (/(precio|cuesta|menu|menú)/.test(t)) return 'Ticket medio unos 35–40 € con vino de la tierra. La torrija son 8 € de felicidad objetiva.'
  if (/(hola|buenas)/.test(t)) return '¡Buenas! Soy el camarero digital de Brasa Norte. Puedo reservarte mesa, cantarte la carta o avisar a cocina de alergias. Tú dirás.'
  return 'Eso mejor te lo confirma el equipo en sala — pero mesa, carta y alergias las resuelvo yo al instante. ¿Te reservo?'
}

function WaiterChat() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: 'bot', text: 'Bienvenido a Brasa Norte 🔥 ¿Mesa, carta o alergias? Respondo a las 15:00 y a las 3:00.' },
  ])
  const [input, setInput] = useState('')
  const jokes = useRef({ n: 0 })
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: 'smooth' })
  }, [msgs])

  const send = (raw?: string) => {
    const text = (raw ?? input).trim()
    if (!text) return
    setInput('')
    setMsgs(m => [...m, { from: 'user', text }])
    const reply = waiterReply(text, jokes.current)
    setTimeout(() => setMsgs(m => [...m, { from: 'bot', text: reply }]), 750)
  }

  return (
    <>
      <button onClick={() => setOpen(o => !o)} style={{
        position: 'fixed', bottom: 26, right: 26, zIndex: 300,
        width: 58, height: 58, borderRadius: '50%',
        background: '#c17b3a', color: '#fff', fontSize: 24,
        boxShadow: '0 10px 34px rgba(0,0,0,0.45)',
        transition: 'transform 0.2s',
      }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1.08)'}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'}>
        {open ? '✕' : '💬'}
      </button>
      {open && (
        <div style={{
          position: 'fixed', bottom: 96, right: 26, zIndex: 300,
          width: 'min(360px, calc(100vw - 52px))', height: 420,
          background: '#14100c', border: '1px solid rgba(237,232,223,0.14)',
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 24px 70px rgba(0,0,0,0.55)',
        }}>
          <div style={{
            padding: '13px 16px', borderBottom: '1px solid rgba(237,232,223,0.1)',
            fontFamily: 'var(--font-caps)', fontSize: 8, fontWeight: 600,
            letterSpacing: 2.5, textTransform: 'uppercase', color: '#d4935a',
            display: 'flex', alignItems: 'center', gap: 9,
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#57b26a', boxShadow: '0 0 8px #57b26a' }} />
            Camarero IA · Brasa Norte — por Talos Lynx
          </div>
          <div ref={boxRef} style={{ flex: 1, overflowY: 'auto', padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {msgs.map((m, i) => (
              <div key={i} style={{
                alignSelf: m.from === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%', padding: '10px 13px',
                fontFamily: 'var(--font-sans)', fontSize: 13, lineHeight: 1.5,
                background: m.from === 'user' ? 'rgba(193,123,58,0.22)' : 'rgba(237,232,223,0.06)',
                border: '1px solid rgba(237,232,223,0.08)', color: '#ede8df',
              }}>{m.text}</div>
            ))}
          </div>
          <div style={{ padding: '8px 12px 4px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['Quiero mesa', '¿Qué me recomiendas?', 'Cuéntame un chiste'].map(c => (
              <button key={c} onClick={() => send(c)} style={{
                fontFamily: 'var(--font-sans)', fontSize: 11,
                padding: '5px 10px', color: '#d4935a',
                border: '1px solid rgba(193,123,58,0.35)', background: 'rgba(193,123,58,0.08)',
              }}>{c}</button>
            ))}
          </div>
          <div style={{ display: 'flex', borderTop: '1px solid rgba(237,232,223,0.1)' }}>
            <input value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Escríbele al camarero…"
              style={{
                flex: 1, padding: '12px 14px', background: 'transparent', border: 'none',
                outline: 'none', fontFamily: 'var(--font-sans)', fontSize: 13, color: '#ede8df',
              }} />
            <button onClick={() => send()} style={{
              fontFamily: 'var(--font-caps)', fontSize: 8, fontWeight: 600, letterSpacing: 2,
              textTransform: 'uppercase', padding: '0 18px', background: '#c17b3a', color: '#fff',
            }}>Ir</button>
          </div>
        </div>
      )}
    </>
  )
}

/* ── slide de platos con drag (exportada: se usa también como
      slide embebido en la sección de pruebas de la web principal) ── */

function DishScene({ dish, number, compact, anim, exiting = false }: {
  dish: Dish; number: string; compact: boolean; anim: string; exiting?: boolean
}) {
  return (
    <div style={{
      ...(exiting
        ? { position: 'absolute' as const, inset: 0, pointerEvents: 'none' as const }
        : { position: 'relative' as const }),
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      textAlign: 'center', width: '100%',
      animation: `${anim} 0.62s cubic-bezier(0.16,1,0.3,1) both`,
    }}>
      {/* número fantasma editorial */}
      <span aria-hidden style={{
        position: 'absolute', top: '46%', left: '50%',
        transform: 'translate(-50%, -60%)',
        fontFamily: 'var(--font-display)',
        fontSize: compact ? 'clamp(130px,18vw,200px)' : 'clamp(180px,26vw,320px)',
        lineHeight: 1, color: '#ede8df', opacity: 0.055,
        pointerEvents: 'none', userSelect: 'none', letterSpacing: '-0.05em',
      }}>{number}</span>

      {/* plato — foto real */}
      <div style={{
        width: compact ? 'clamp(160px,22vw,230px)' : 'clamp(200px,27vw,290px)',
        height: compact ? 'clamp(160px,22vw,230px)' : 'clamp(200px,27vw,290px)',
        borderRadius: '50%', position: 'relative',
        marginBottom: compact ? 'clamp(16px,2.5vh,26px)' : 'clamp(22px,4vh,38px)',
        background: `url(${dish.img}) center/cover no-repeat`,
        border: '1px solid rgba(237,232,223,0.3)',
        boxShadow: `0 34px 90px rgba(0,0,0,0.55), 0 0 110px ${dish.glow}, inset 0 0 60px rgba(0,0,0,0.35)`,
        filter: 'saturate(0.92) contrast(1.06)',
      }}>
        <span aria-hidden style={{
          position: 'absolute', inset: '4%', borderRadius: '50%',
          border: '1px solid rgba(237,232,223,0.22)',
        }} />
        <span aria-hidden style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          background: 'radial-gradient(circle at 32% 26%, rgba(255,255,255,0.14), transparent 45%), radial-gradient(circle at 50% 50%, transparent 55%, rgba(0,0,0,0.4) 100%)',
        }} />
        {/* sombra elíptica bajo el plato */}
        <span aria-hidden style={{
          position: 'absolute', bottom: '-14%', left: '12%', right: '12%', height: '10%',
          borderRadius: '50%', background: 'rgba(0,0,0,0.45)', filter: 'blur(10px)',
        }} />
      </div>

      <div style={{
        fontFamily: 'var(--font-caps)', fontSize: compact ? 7.5 : 8.5, fontWeight: 600,
        letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(237,232,223,0.55)',
        marginBottom: 10,
      }}>{dish.tag}</div>
      <h3 style={{
        fontFamily: 'var(--font-display)', fontWeight: 400,
        fontSize: compact ? 'clamp(30px,4.6vw,52px)' : 'clamp(40px,6.5vw,74px)',
        lineHeight: 1, letterSpacing: '-0.03em', color: '#ede8df', marginBottom: 14,
      }}>{dish.name}</h3>
      <p style={{
        fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 300,
        fontSize: compact ? 'clamp(13.5px,1.4vw,16px)' : 'clamp(15px,1.8vw,19px)',
        lineHeight: 1.55, color: 'rgba(237,232,223,0.72)',
        maxWidth: 430, marginBottom: 16,
      }}>{dish.desc}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: compact ? 'clamp(22px,2.6vw,30px)' : 'clamp(26px,3.4vw,38px)',
          color: '#d4935a',
        }}>{dish.price}</span>
        <button
          onClick={e => { e.stopPropagation(); speak(dish.speech) }}
          onPointerDown={e => e.stopPropagation()}
          style={{
            fontFamily: 'var(--font-caps)', fontSize: 7.5, fontWeight: 600,
            letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(237,232,223,0.75)',
            border: '1px solid rgba(237,232,223,0.28)', background: 'rgba(0,0,0,0.18)',
            padding: '9px 16px', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#d4935a'; (e.currentTarget as HTMLElement).style.color = '#d4935a' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(237,232,223,0.28)'; (e.currentTarget as HTMLElement).style.color = 'rgba(237,232,223,0.75)' }}
        >
          🔊 Que te lo cuente la IA
        </button>
      </div>
    </div>
  )
}

export function Carta({ compact = false }: { compact?: boolean }) {
  const [idx, setIdx] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [dir, setDir] = useState<1 | -1>(1)
  const dragX = useRef<number | null>(null)
  const idxRef = useRef(0)
  const prevTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => { idxRef.current = idx }, [idx])
  const d = DISHES[idx]
  const len = DISHES.length

  const go = (delta: 1 | -1, target?: number) => {
    stopSpeech()
    setDir(delta)
    setPrev(idxRef.current)
    setIdx(target !== undefined ? target : (idxRef.current + delta + len) % len)
    if (prevTimer.current) clearTimeout(prevTimer.current)
    prevTimer.current = setTimeout(() => setPrev(null), 640)
  }

  const onDown = (e: React.PointerEvent) => { dragX.current = e.clientX }
  const onUp = (e: React.PointerEvent) => {
    if (dragX.current === null) return
    const delta = e.clientX - dragX.current
    dragX.current = null
    if (Math.abs(delta) > 55) go(delta < 0 ? 1 : -1)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      if (prevTimer.current) clearTimeout(prevTimer.current)
      stopSpeech()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section
      id={compact ? undefined : 'carta-brasa'}
      onPointerDown={onDown} onPointerUp={onUp}
      style={{
        minHeight: compact ? 'min(78vh, 680px)' : '100vh',
        width: '100%',
        background: d.bg,
        transition: 'background 0.9s cubic-bezier(0.4,0,0.2,1)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: compact
          ? 'clamp(36px,5vh,56px) clamp(20px,4vw,56px)'
          : 'clamp(90px,12vh,140px) clamp(24px,6vw,96px) clamp(60px,8vh,100px)',
        position: 'relative', overflow: 'hidden', cursor: 'grab', touchAction: 'pan-y',
        userSelect: 'none',
        border: compact ? '1px solid var(--border-soft)' : 'none',
        boxShadow: compact ? '0 30px 90px rgba(0,0,0,0.4)' : 'none',
      }}>
      {/* barra superior: título + contador editorial */}
      <div style={{
        width: '100%', maxWidth: 920,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: compact ? 'clamp(14px,2vh,22px)' : 'clamp(20px,3vh,36px)',
        fontFamily: 'var(--font-caps)', fontSize: 9, fontWeight: 600,
        letterSpacing: 4, textTransform: 'uppercase', color: 'rgba(237,232,223,0.5)',
      }}>
        <span>La carta · arrastra ⟷</span>
        <span style={{ color: '#d4935a', letterSpacing: 3 }}>
          {String(idx + 1).padStart(2, '0')} <span style={{ color: 'rgba(237,232,223,0.35)' }}>— {String(len).padStart(2, '0')}</span>
        </span>
      </div>

      {/* platos vecinos asomando por los bordes */}
      <button aria-label="Plato anterior" className="carta-peek" onClick={() => go(-1)}
        onPointerDown={e => e.stopPropagation()}
        style={{
          position: 'absolute', left: compact ? -18 : 'clamp(-30px,-2vw,-10px)', top: '50%',
          transform: 'translateY(-50%)',
          fontSize: compact ? 44 : 'clamp(48px,6vw,72px)', lineHeight: 1,
          opacity: 0.22, filter: 'blur(1.5px) saturate(0.7)',
          background: 'none', transition: 'opacity 0.25s, filter 0.25s',
          padding: 10, zIndex: 2,
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.6'; (e.currentTarget as HTMLElement).style.filter = 'blur(0px)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '0.25'; (e.currentTarget as HTMLElement).style.filter = 'blur(1.5px) saturate(0.7)' }}>
        <span aria-hidden style={{
          display: 'block', width: compact ? 48 : 62, height: compact ? 48 : 62,
          borderRadius: '50%', border: '1px solid rgba(237,232,223,0.3)',
          background: `url(${DISHES[(idx - 1 + len) % len].img}) center/cover no-repeat`,
        }} />
      </button>
      <button aria-label="Plato siguiente" className="carta-peek" onClick={() => go(1)}
        onPointerDown={e => e.stopPropagation()}
        style={{
          position: 'absolute', right: compact ? -18 : 'clamp(-30px,-2vw,-10px)', top: '50%',
          transform: 'translateY(-50%)',
          fontSize: compact ? 44 : 'clamp(48px,6vw,72px)', lineHeight: 1,
          opacity: 0.22, filter: 'blur(1.5px) saturate(0.7)',
          background: 'none', transition: 'opacity 0.25s, filter 0.25s',
          padding: 10, zIndex: 2,
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.6'; (e.currentTarget as HTMLElement).style.filter = 'blur(0px)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '0.25'; (e.currentTarget as HTMLElement).style.filter = 'blur(1.5px) saturate(0.7)' }}>
        <span aria-hidden style={{
          display: 'block', width: compact ? 48 : 62, height: compact ? 48 : 62,
          borderRadius: '50%', border: '1px solid rgba(237,232,223,0.3)',
          background: `url(${DISHES[(idx + 1) % len].img}) center/cover no-repeat`,
        }} />
      </button>

      {/* escena: capa saliente + capa entrante */}
      <div style={{ position: 'relative', width: '100%', maxWidth: 640 }}>
        {prev !== null && prev !== idx && (
          <DishScene
            dish={DISHES[prev]} number={String(prev + 1).padStart(2, '0')}
            compact={compact} exiting
            anim={dir === 1 ? 'dishOutL' : 'dishOutR'}
          />
        )}
        <DishScene
          key={idx}
          dish={d} number={String(idx + 1).padStart(2, '0')}
          compact={compact}
          anim={dir === 1 ? 'dishSpinR' : 'dishSpinL'}
        />
      </div>

      {/* progreso */}
      <div style={{ display: 'flex', gap: 8, marginTop: compact ? 'clamp(18px,2.5vh,28px)' : 'clamp(26px,4vh,42px)' }}>
        {DISHES.map((_, i) => (
          <button key={i} aria-label={`Plato ${i + 1}`}
            onClick={() => i !== idx && go(i > idx ? 1 : -1, i)}
            onPointerDown={e => e.stopPropagation()}
            style={{
              width: i === idx ? 26 : 9, height: 4, padding: 0,
              background: i === idx ? '#d4935a' : 'rgba(237,232,223,0.3)',
              transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
            }} />
        ))}
      </div>
    </section>
  )
}

/* ── página completa ── */

export default function RestaurantDemo() {
  const goCarta = (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById('carta-brasa')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{ background: '#14100c', color: '#ede8df' }}>
      {/* aviso demo */}
      <div style={{
        background: '#c17b3a', textAlign: 'center', padding: '8px 20px',
        fontFamily: 'var(--font-caps)', fontSize: 7.5, fontWeight: 600,
        letterSpacing: 2.5, textTransform: 'uppercase', color: '#fff',
      }}>
        Web de demostración construida por Talos Lynx — el restaurante es ficticio, la tecnología no
      </div>

      {/* nav propia del restaurante */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px clamp(24px,5vw,64px)', borderBottom: '1px solid rgba(237,232,223,0.1)',
      }}>
        <span style={{
          fontFamily: 'var(--font-caps)', fontSize: 14, fontWeight: 600,
          letterSpacing: 4, textTransform: 'uppercase',
        }}>Brasa<span style={{ color: '#d4935a' }}>Norte</span></span>
        <div style={{ display: 'flex', gap: 22, alignItems: 'center' }}>
          <a href="#carta-brasa" onClick={goCarta} style={{
            fontFamily: 'var(--font-caps)', fontSize: 8, fontWeight: 600,
            letterSpacing: 2.5, textTransform: 'uppercase', color: 'rgba(237,232,223,0.65)',
          }}>Carta</a>
          <span style={{
            fontFamily: 'var(--font-caps)', fontSize: 8, fontWeight: 600,
            letterSpacing: 2.5, textTransform: 'uppercase',
            background: '#c17b3a', color: '#fff', padding: '10px 20px',
          }}>Reservar</span>
        </div>
      </nav>

      {/* hero */}
      <header style={{
        minHeight: '86vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        padding: '60px clamp(24px,6vw,96px)', position: 'relative', overflow: 'hidden',
        background: 'radial-gradient(ellipse at 50% 110%, rgba(193,123,58,0.22) 0%, transparent 55%), #14100c',
      }}>
        <div style={{
          fontFamily: 'var(--font-caps)', fontSize: 9, fontWeight: 600,
          letterSpacing: 4, textTransform: 'uppercase', color: '#d4935a', marginBottom: 28,
        }}>Asador · Fuego lento · Producto de Castilla</div>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontWeight: 400,
          fontSize: 'clamp(52px,10vw,120px)', lineHeight: 0.95, letterSpacing: '-0.035em',
          marginBottom: 26,
        }}>
          El fuego hace
          <br />
          <em style={{ fontStyle: 'italic', color: '#d4935a' }}>el resto.</em>
        </h1>
        <p style={{
          fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 300,
          fontSize: 'clamp(16px,1.9vw,21px)', color: 'rgba(237,232,223,0.65)',
          maxWidth: 480, lineHeight: 1.6, marginBottom: 40,
        }}>
          Dieciocho horas de brasa de encina no se pueden contar. Se reservan.
        </p>
        <a href="#carta-brasa" onClick={goCarta} style={{
          fontFamily: 'var(--font-caps)', fontSize: 9, fontWeight: 600,
          letterSpacing: 2.5, textTransform: 'uppercase',
          background: '#c17b3a', color: '#fff', padding: '18px 44px',
        }}>Ver la carta ↓</a>
      </header>

      {/* carta en slides */}
      <Carta />

      {/* cierre Talos */}
      <footer style={{
        padding: 'clamp(70px,10vh,120px) clamp(24px,6vw,96px)',
        textAlign: 'center', borderTop: '1px solid rgba(237,232,223,0.1)',
      }}>
        <p style={{
          fontFamily: 'var(--font-display)', fontWeight: 400,
          fontSize: 'clamp(26px,4vw,44px)', lineHeight: 1.15, letterSpacing: '-0.02em',
          maxWidth: 700, margin: '0 auto 18px',
        }}>
          ¿Quieres una web así, con la IA dentro,{' '}
          <em style={{ color: '#d4935a' }}>en 30 días?</em>
        </p>
        <p style={{
          fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 300,
          fontSize: 16, color: 'rgba(237,232,223,0.6)', marginBottom: 32,
        }}>
          Esta demo entera — slides, chat, reservas — la construyó el equipo que puede construir la tuya.
        </p>
        <a href="#contacto" style={{
          fontFamily: 'var(--font-caps)', fontSize: 9, fontWeight: 600,
          letterSpacing: 2.5, textTransform: 'uppercase',
          background: '#c17b3a', color: '#fff', padding: '18px 44px', display: 'inline-block',
        }}>
          Hablar con Talos Lynx →
        </a>
      </footer>

      <WaiterChat />
    </div>
  )
}
