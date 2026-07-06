import { useState, useRef, useEffect } from 'react'

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
  bg: string        // gradiente de fondo de página
  glow: string      // color del halo del plato
  tag: string
}

const DISHES: Dish[] = [
  {
    name: 'Pato trufado',
    desc: 'Magret madurado 21 días, trufa negra de Soria y reducción de Pedro Ximénez.',
    price: '28 €', emoji: '🦆', tag: 'La firma de la casa',
    bg: 'linear-gradient(160deg, #5d1b26 0%, #2e0d13 100%)', glow: 'rgba(220,90,110,0.35)',
  },
  {
    name: 'César de corral',
    desc: 'Pollo de corral a la brasa, parmesano de 24 meses y anchoa del Cantábrico.',
    price: '14 €', emoji: '🥗', tag: 'Fresca y canalla',
    bg: 'linear-gradient(160deg, #24462e 0%, #0f2416 100%)', glow: 'rgba(110,200,140,0.3)',
  },
  {
    name: 'Lechazo 18 horas',
    desc: 'Asado lento sobre brasa de encina. Se corta con cuchara, se recuerda años.',
    price: '24 €', emoji: '🍖', tag: 'El motivo del viaje',
    bg: 'linear-gradient(160deg, #6e4220 0%, #33200e 100%)', glow: 'rgba(212,147,90,0.4)',
  },
  {
    name: 'Pulpo a la brasa',
    desc: 'Carbón de encina, pimentón de la Vera y parmentier de patata asada.',
    price: '19 €', emoji: '🐙', tag: 'Fuera crujiente, dentro mantequilla',
    bg: 'linear-gradient(160deg, #123c46 0%, #081e24 100%)', glow: 'rgba(90,190,200,0.32)',
  },
  {
    name: 'Torrija de brioche',
    desc: 'Caramelizada al momento, helado de leche merengada. El final que pide la mesa.',
    price: '8 €', emoji: '🍮', tag: 'No se comparte (avisamos)',
    bg: 'linear-gradient(160deg, #7c5619 0%, #3a290c 100%)', glow: 'rgba(230,180,90,0.35)',
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

/* ── slide de platos con drag ── */

function Carta() {
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState<1 | -1>(1)
  const dragX = useRef<number | null>(null)
  const d = DISHES[idx]

  const go = (delta: 1 | -1) => {
    setDir(delta)
    setIdx(i => (i + delta + DISHES.length) % DISHES.length)
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
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <section
      id="carta-brasa"
      onPointerDown={onDown} onPointerUp={onUp}
      style={{
        minHeight: '100vh', background: d.bg,
        transition: 'background 0.9s cubic-bezier(0.4,0,0.2,1)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(90px,12vh,140px) clamp(24px,6vw,96px) clamp(60px,8vh,100px)',
        position: 'relative', overflow: 'hidden', cursor: 'grab', touchAction: 'pan-y',
        userSelect: 'none',
      }}>
      <div style={{
        fontFamily: 'var(--font-caps)', fontSize: 9, fontWeight: 600,
        letterSpacing: 4, textTransform: 'uppercase', color: 'rgba(237,232,223,0.5)',
        marginBottom: 'clamp(20px,3vh,36px)',
      }}>
        La carta · arrastra ⟷
      </div>

      {/* plato con giro carrusel — key fuerza la animación en cada cambio */}
      <div key={idx} style={{
        animation: `dishSpin${dir === 1 ? 'R' : 'L'} 0.65s cubic-bezier(0.16,1,0.3,1) both`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
        maxWidth: 640,
      }}>
        <div style={{
          width: 'clamp(180px,26vw,260px)', height: 'clamp(180px,26vw,260px)',
          borderRadius: '50%', position: 'relative', marginBottom: 'clamp(24px,4vh,40px)',
          background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.16), rgba(0,0,0,0.35) 70%)',
          border: '1px solid rgba(237,232,223,0.22)',
          boxShadow: `0 30px 80px rgba(0,0,0,0.5), 0 0 90px ${d.glow}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span aria-hidden style={{
            position: 'absolute', inset: 14, borderRadius: '50%',
            border: '1px solid rgba(237,232,223,0.14)',
          }} />
          <span style={{ fontSize: 'clamp(72px,10vw,104px)', filter: 'drop-shadow(0 10px 22px rgba(0,0,0,0.4))' }}>
            {d.emoji}
          </span>
        </div>

        <div style={{
          fontFamily: 'var(--font-caps)', fontSize: 8.5, fontWeight: 600,
          letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(237,232,223,0.55)',
          marginBottom: 12,
        }}>{d.tag}</div>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontWeight: 400,
          fontSize: 'clamp(40px,6.5vw,74px)', lineHeight: 1, letterSpacing: '-0.03em',
          color: '#ede8df', marginBottom: 16,
        }}>{d.name}</h3>
        <p style={{
          fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 300,
          fontSize: 'clamp(15px,1.8vw,19px)', lineHeight: 1.6,
          color: 'rgba(237,232,223,0.7)', maxWidth: 430, marginBottom: 20,
        }}>{d.desc}</p>
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,3.4vw,38px)',
          color: '#d4935a',
        }}>{d.price}</div>
      </div>

      {/* controles */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 22, marginTop: 'clamp(28px,4vh,44px)' }}>
        <button onClick={() => go(-1)} aria-label="Plato anterior" style={{
          width: 46, height: 46, borderRadius: '50%', fontSize: 17,
          border: '1px solid rgba(237,232,223,0.3)', color: '#ede8df', background: 'rgba(0,0,0,0.15)',
        }}>←</button>
        <div style={{ display: 'flex', gap: 7 }}>
          {DISHES.map((_, i) => (
            <button key={i} onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i) }} style={{
              width: i === idx ? 22 : 8, height: 4, padding: 0,
              background: i === idx ? '#d4935a' : 'rgba(237,232,223,0.3)',
              transition: 'all 0.3s',
            }} />
          ))}
        </div>
        <button onClick={() => go(1)} aria-label="Plato siguiente" style={{
          width: 46, height: 46, borderRadius: '50%', fontSize: 17,
          border: '1px solid rgba(237,232,223,0.3)', color: '#ede8df', background: 'rgba(0,0,0,0.15)',
        }}>→</button>
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
