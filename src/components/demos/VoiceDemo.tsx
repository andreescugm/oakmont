import { useState, useRef, useEffect, useCallback } from 'react'
import Vapi from '@vapi-ai/web'
import { VAPI_PUBLIC_KEY, VAPI_ASSISTANT_ID, VAPI_DEMO_URL } from '../../config'
import { trackLead } from '../../leadScore'
import { speak as speakTTS, stopSpeech } from '../../speech'

type SpeechRecognitionCtor = new () => {
  lang: string
  continuous: boolean
  interimResults: boolean
  onresult: ((e: { results: { [i: number]: { [j: number]: { transcript: string } } } }) => void) | null
  onend: (() => void) | null
  onerror: (() => void) | null
  start: () => void
  stop: () => void
}

function getRecognition(): SpeechRecognitionCtor | null {
  const w = window as unknown as { SpeechRecognition?: SpeechRecognitionCtor; webkitSpeechRecognition?: SpeechRecognitionCtor }
  return w.SpeechRecognition || w.webkitSpeechRecognition || null
}

type VapiState = 'idle' | 'connecting' | 'live'

function VapiCall() {
  const [state, setState] = useState<VapiState>('idle')
  const [volume, setVolume] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [failed, setFailed] = useState(false)
  const vapiRef = useRef<Vapi | null>(null)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => () => {
    if (timer.current) clearInterval(timer.current)
    vapiRef.current?.stop()
  }, [])

  const getVapi = () => {
    if (!vapiRef.current) {
      const v = new Vapi(VAPI_PUBLIC_KEY)
      v.on('call-start', () => {
        setState('live')
        setSeconds(0)
        timer.current = setInterval(() => setSeconds(s => s + 1), 1000)
      })
      v.on('call-end', () => {
        setState('idle')
        if (timer.current) clearInterval(timer.current)
      })
      v.on('error', () => {
        setState('idle')
        setFailed(true)
        if (timer.current) clearInterval(timer.current)
      })
      v.on('volume-level', (lvl: number) => setVolume(lvl))
      vapiRef.current = v
    }
    return vapiRef.current
  }

  const toggle = () => {
    const v = getVapi()
    if (state !== 'idle') { v.stop(); return }
    trackLead('habló con la voz IA', 25)
    setFailed(false)
    setState('connecting')
    v.start(VAPI_ASSISTANT_ID)
  }

  const mmss = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`
  const glow = 1 + Math.min(volume, 1) * 0.35

  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border-soft)',
      maxWidth: 520, width: '100%', minHeight: 420,
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{
        padding: '14px 18px', borderBottom: '1px solid var(--border-subtle)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontFamily: 'var(--font-caps)', fontSize: 8, fontWeight: 600,
        letterSpacing: 2.5, textTransform: 'uppercase', color: 'var(--copper-soft)',
      }}>
        <span>📞 Habla con nuestra IA · Voz real · En directo</span>
        {state === 'live' && <span style={{ color: 'var(--teal)' }}>● {mmss}</span>}
      </div>

      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 22, padding: 32, textAlign: 'center',
      }}>
        <div style={{
          width: 96, height: 96, borderRadius: '50%',
          border: `1px solid ${state === 'live' ? 'var(--teal)' : 'var(--copper)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34,
          transform: `scale(${state === 'live' ? glow : 1})`,
          transition: 'transform 0.12s ease, border-color 0.3s',
          boxShadow: state === 'live' ? '0 0 34px rgba(60,170,160,0.35)' : 'none',
          animation: state === 'connecting' ? 'ringPulse 1.1s ease-in-out infinite' : 'none',
        }}>
          {state === 'live' ? '🎙️' : '📞'}
        </div>

        <p style={{
          fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 16,
          color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 340, margin: 0,
        }}>
          {state === 'idle' && 'Cuando un cliente llama a tu negocio a las 21:40, ¿quién contesta? Aquí contesta nuestra IA. Habla con ella.'}
          {state === 'connecting' && 'Conectando con la IA…'}
          {state === 'live' && 'En llamada. Pregúntale lo que quieras — precios, citas, o si es humana.'}
        </p>

        <button onClick={toggle} style={{
          fontFamily: 'var(--font-caps)', fontSize: 9, fontWeight: 600,
          letterSpacing: 2.5, textTransform: 'uppercase',
          background: state === 'live' ? '#7a2e2e' : 'var(--copper)', color: '#fff',
          padding: '16px 36px', transition: 'background 0.2s',
        }}>
          {state === 'idle' ? 'Llamar a la IA →' : state === 'connecting' ? 'Conectando…' : 'Colgar'}
        </button>

        {failed && (
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11.5, color: 'var(--text-muted)' }}>
            No se pudo conectar.{' '}
            <a href={VAPI_DEMO_URL} target="_blank" rel="noopener" style={{ color: 'var(--copper-soft)' }}>
              Prueba en pestaña nueva ↗
            </a>
          </span>
        )}
      </div>

      <div style={{
        padding: '10px 18px', borderTop: '1px solid var(--border-subtle)',
        fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--text-muted)', textAlign: 'center',
      }}>
        Conversación libre — micrófono necesario. Esta misma voz puede coger tu teléfono.
      </div>
    </div>
  )
}

function VapiNewTab() {
  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border-soft)',
      maxWidth: 520, width: '100%', minHeight: 420,
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{
        padding: '14px 18px', borderBottom: '1px solid var(--border-subtle)',
        fontFamily: 'var(--font-caps)', fontSize: 8, fontWeight: 600,
        letterSpacing: 2.5, textTransform: 'uppercase', color: 'var(--copper-soft)',
      }}>
        📞 Habla con nuestra IA · Voz real · En directo
      </div>
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 22, padding: 32, textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 16,
          color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 340, margin: 0,
        }}>
          Cuando un cliente llama a tu negocio a las 21:40, ¿quién contesta? Aquí contesta nuestra IA. Habla con ella.
        </p>
        <a href={VAPI_DEMO_URL} target="_blank" rel="noopener"
          onClick={() => trackLead('habló con la voz IA', 25)}
          style={{
            fontFamily: 'var(--font-caps)', fontSize: 9, fontWeight: 600,
            letterSpacing: 2.5, textTransform: 'uppercase',
            background: 'var(--copper)', color: '#fff', padding: '16px 36px',
          }}>
          Hablar con la IA ↗
        </a>
      </div>
      <div style={{
        padding: '10px 18px', borderTop: '1px solid var(--border-subtle)',
        fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--text-muted)', textAlign: 'center',
      }}>
        Conversación libre — micrófono necesario. Esta misma voz puede coger tu teléfono.
      </div>
    </div>
  )
}

type CallState = 'idle' | 'ringing' | 'live' | 'ended'

interface Line { from: 'ia' | 'you'; text: string }

const GREETING = 'Gracias por llamar a Talos Lynx. Soy Aria, la inteligencia artificial de la oficina. ¿En qué puedo ayudarte?'

const REPLIES: Record<string, string> = {
  cita: 'Por supuesto. Tengo disponibilidad el martes a las diez o el jueves a las nueve. Te envío la confirmación por email ahora mismo. ¿Algo más?',
  precio: 'Trabajamos por proyecto cerrado. El diagnóstico inicial de sesenta minutos es gratuito. ¿Quieres que te reserve una plaza?',
  humano: 'Soy una inteligencia artificial, aunque me digan que no se nota. Si prefieres hablar con el equipo, te paso con un humano en horario de oficina, o te llaman ellos en menos de veinticuatro horas.',
  horario: 'Yo atiendo veinticuatro horas, siete días a la semana. El equipo humano, de nueve a dieciocho. Pero para reservar o resolver dudas, no necesitas esperar a nadie.',
}

const OPTIONS: { label: string; key: keyof typeof REPLIES; youSay: string }[] = [
  { label: 'Pedir cita', key: 'cita', youSay: 'Hola, quería pedir una cita.' },
  { label: 'Preguntar precio', key: 'precio', youSay: '¿Cuánto cuestan vuestros servicios?' },
  { label: '¿Eres humana?', key: 'humano', youSay: 'Perdona… ¿eres una persona real?' },
  { label: 'Horarios', key: 'horario', youSay: '¿Qué horario tenéis?' },
]

export default function VoiceDemo() {
  if (VAPI_PUBLIC_KEY) return <VapiCall />
  if (VAPI_DEMO_URL) return <VapiNewTab />
  return <VoiceSim />
}

function VoiceSim() {
  const [state, setState] = useState<CallState>('idle')
  const [lines, setLines] = useState<Line[]>([])
  const [speaking, setSpeaking] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const audioCtx = useRef<AudioContext | null>(null)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)
  const [listening, setListening] = useState(false)
  const canListen = typeof window !== 'undefined' && !!getRecognition()

  useEffect(() => () => {
    if (timer.current) clearInterval(timer.current)
    stopSpeech()
    audioCtx.current?.close().catch(() => {})
  }, [])

  const speak = useCallback((text: string) => {
    speakTTS(text, () => setSpeaking(true), () => setSpeaking(false))
  }, [])

  const heardReply = (transcript: string): string => {
    const t = transcript.toLowerCase()
    if (/cita|reserva|hueco|agenda/.test(t)) return REPLIES.cita
    if (/precio|cuesta|coste|tarifa/.test(t)) return REPLIES.precio
    if (/humano|robot|persona|real|máquina|maquina/.test(t)) return REPLIES.humano
    if (/horario|hora|abr|cerr/.test(t)) return REPLIES.horario
    return 'Te he entendido. Puedo ayudarte con citas, precios y horarios. ¿Cuál te interesa?'
  }

  const listen = () => {
    const Rec = getRecognition()
    if (!Rec || state !== 'live') return
    stopSpeech()
    setSpeaking(false)
    const rec = new Rec()
    rec.lang = 'es-ES'
    rec.continuous = false
    rec.interimResults = false
    setListening(true)
    rec.onresult = (e) => {
      const transcript = e.results[0][0].transcript
      setLines(l => [...l, { from: 'you', text: transcript }])
      const reply = heardReply(transcript)
      setTimeout(() => {
        setLines(l => [...l, { from: 'ia', text: reply }])
        speak(reply)
      }, 500)
    }
    rec.onend = () => setListening(false)
    rec.onerror = () => setListening(false)
    rec.start()
  }

  const ringTone = useCallback(async (): Promise<void> => {
    try {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      audioCtx.current = audioCtx.current || new Ctx()
      const ctx = audioCtx.current
      if (ctx.state === 'suspended') await ctx.resume()
      const ring = (t0: number) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.frequency.value = 425
        gain.gain.setValueAtTime(0.06, t0)
        osc.connect(gain).connect(ctx.destination)
        osc.start(t0)
        osc.stop(t0 + 1.2)
      }
      ring(ctx.currentTime)
      ring(ctx.currentTime + 2)
    } catch { /* sin audio, seguimos con la simulación visual */ }
  }, [])

  const startCall = async () => {
    trackLead('simuló la llamada', 15)
    setLines([])
    setSeconds(0)
    setState('ringing')
    await ringTone()
    setTimeout(() => {
      setState('live')
      setLines([{ from: 'ia', text: GREETING }])
      speak(GREETING)
      timer.current = setInterval(() => setSeconds(s => s + 1), 1000)
    }, 3400)
  }

  const respond = (opt: typeof OPTIONS[number]) => {
    if (state !== 'live') return
    setLines(l => [...l, { from: 'you', text: opt.youSay }])
    setTimeout(() => {
      const reply = REPLIES[opt.key]
      setLines(l => [...l, { from: 'ia', text: reply }])
      speak(reply)
    }, 600)
  }

  const endCall = () => {
    if (timer.current) clearInterval(timer.current)
    stopSpeech()
    setSpeaking(false)
    setState('ended')
  }

  const mmss = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`

  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border-soft)',
      maxWidth: 520, width: '100%', height: 420,
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{
        padding: '14px 18px', borderBottom: '1px solid var(--border-subtle)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontFamily: 'var(--font-caps)', fontSize: 8, fontWeight: 600,
        letterSpacing: 2.5, textTransform: 'uppercase', color: 'var(--copper-soft)',
      }}>
        <span>📞 Centralita Talos Lynx · Aria</span>
        {state === 'live' && <span style={{ color: 'var(--teal)' }}>● {mmss}</span>}
      </div>

      {state === 'idle' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: 32, textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 340 }}>
            Cuando un cliente llama a tu oficina a las 21:40, ¿quién contesta? En las nuestras, contesta Aria. Escúchala tú mismo.
          </p>
          <button onClick={startCall} style={{
            fontFamily: 'var(--font-caps)', fontSize: 9, fontWeight: 600,
            letterSpacing: 2.5, textTransform: 'uppercase',
            background: 'var(--copper)', color: '#fff', padding: '16px 36px',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#a86830'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'var(--copper)'}>
            Simular llamada →
          </button>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--text-muted)' }}>
            Con sonido — y si tu navegador lo permite, puedes hablarle con el micrófono
          </span>
        </div>
      )}

      {state === 'ringing' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <div style={{
            width: 74, height: 74, borderRadius: '50%',
            border: '1px solid var(--copper)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, animation: 'ringPulse 1.1s ease-in-out infinite',
          }}>📞</div>
          <span style={{ fontFamily: 'var(--font-caps)', fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
            Llamando a la oficina…
          </span>
        </div>
      )}

      {(state === 'live' || state === 'ended') && (
        <>
          <div style={{ flex: 1, overflowY: 'auto', padding: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {lines.map((l, i) => (
              <div key={i} style={{
                alignSelf: l.from === 'you' ? 'flex-end' : 'flex-start',
                maxWidth: '85%', padding: '10px 14px',
                fontFamily: 'var(--font-sans)', fontSize: 13, lineHeight: 1.55,
                background: l.from === 'you' ? 'var(--copper-dim)' : 'var(--bg-raised)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
              }}>
                <span style={{
                  display: 'block', fontFamily: 'var(--font-caps)', fontSize: 6.5,
                  letterSpacing: 2, textTransform: 'uppercase',
                  color: l.from === 'you' ? 'var(--copper-soft)' : 'var(--teal)', marginBottom: 4,
                }}>{l.from === 'you' ? 'Tú' : `Aria · IA${speaking && i === lines.length - 1 ? ' · hablando…' : ''}`}</span>
                {l.text}
              </div>
            ))}
            {state === 'ended' && (
              <div style={{ textAlign: 'center', fontFamily: 'var(--font-caps)', fontSize: 8, letterSpacing: 2.5, textTransform: 'uppercase', color: 'var(--text-muted)', paddingTop: 12 }}>
                — Llamada finalizada · Esto mismo, en tu número, en menos de 30 días —
              </div>
            )}
          </div>

          {state === 'live' && (
            <div style={{ padding: '10px 14px', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
              {canListen && (
                <button onClick={listen} disabled={listening} style={{
                  fontFamily: 'var(--font-caps)', fontSize: 8, fontWeight: 600,
                  letterSpacing: 1.8, textTransform: 'uppercase',
                  padding: '8px 14px',
                  background: listening ? 'var(--teal)' : 'var(--copper)',
                  color: '#fff',
                  animation: listening ? 'pulseGlow 1s ease-in-out infinite' : 'none',
                }}>
                  {listening ? '🎤 Te escucho…' : '🎤 Hablar'}
                </button>
              )}
              {OPTIONS.map(o => (
                <button key={o.key} onClick={() => respond(o)} style={{
                  fontFamily: 'var(--font-sans)', fontSize: 11.5,
                  padding: '6px 12px', color: 'var(--copper-soft)',
                  border: '1px solid var(--copper-dim)', background: 'var(--copper-glow)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--copper)'; (e.currentTarget as HTMLElement).style.color = '#fff' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--copper-glow)'; (e.currentTarget as HTMLElement).style.color = 'var(--copper-soft)' }}>
                  {o.label}
                </button>
              ))}
              <button onClick={endCall} style={{
                marginLeft: 'auto', fontFamily: 'var(--font-caps)', fontSize: 7.5, fontWeight: 600,
                letterSpacing: 2, textTransform: 'uppercase',
                padding: '8px 14px', background: '#7a2e2e', color: '#fff',
              }}>
                Colgar
              </button>
            </div>
          )}
          {state === 'ended' && (
            <button onClick={startCall} style={{
              fontFamily: 'var(--font-caps)', fontSize: 8, fontWeight: 600,
              letterSpacing: 2.5, textTransform: 'uppercase',
              padding: '14px', background: 'var(--copper-glow)', color: 'var(--copper-soft)',
              borderTop: '1px solid var(--border-subtle)',
            }}>
              Volver a llamar ↻
            </button>
          )}
        </>
      )}
    </div>
  )
}
