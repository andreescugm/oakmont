/* ── Voz "humana" sin ElevenLabs ─────────────────────────────
   Las frases fijas están pregeneradas con voz neuronal
   (es-ES-ElviraNeural) y servidas como MP3 estáticos en
   /voice/*.mp3 — calidad alta, instantánea, sin APIs vivas.
   Cualquier texto no mapeado cae a la mejor voz local.       */

let currentAudio: HTMLAudioElement | null = null

const norm = (t: string) => t.replace(/\s+/g, ' ').trim().toLowerCase().slice(0, 60)

// texto (normalizado, primeros 60 chars) → archivo estático
const LINES: Record<string, string> = {
  [norm('Gracias por llamar a Talos Lynx. Soy Aria, la inteligencia artificial de la oficina.')]: 'aria-saludo',
  [norm('Por supuesto. Tengo disponibilidad el martes a las diez o el jueves a las nueve.')]: 'aria-cita',
  [norm('Trabajamos por proyecto cerrado. El diagnóstico inicial de sesenta minutos es gratuito.')]: 'aria-precio',
  [norm('Soy una inteligencia artificial, aunque me digan que no se nota.')]: 'aria-humano',
  [norm('Yo atiendo veinticuatro horas, siete días a la semana.')]: 'aria-horario',
  [norm('Te he entendido. Puedo ayudarte con citas, precios y horarios.')]: 'aria-generico',
  [norm('Lechazo asado dieciocho horas a baja temperatura sobre brasa de encina.')]: 'plato-lechazo',
  [norm('Pulpo a la brasa con carbón de encina, aceite de oliva virgen y pimentón de la Vera.')]: 'plato-pulpo',
  [norm('Torrija de brioche caramelizada al momento, con helado de leche merengada.')]: 'plato-torrija',
  [norm('Magret de pato madurado veintiún días, trufa negra de Soria y reducción de Pedro Ximénez.')]: 'plato-pato',
  [norm('Ensalada César con pollo de corral a la brasa, parmesano de veinticuatro meses')]: 'plato-cesar',
}

function staticFileFor(text: string): string | null {
  const key = norm(text)
  for (const [k, file] of Object.entries(LINES)) {
    if (key.startsWith(k.slice(0, 40)) || k.startsWith(key.slice(0, 40))) return file
  }
  return null
}

export function stopSpeech(): void {
  if (currentAudio) {
    currentAudio.pause()
    currentAudio = null
  }
  try { window.speechSynthesis?.cancel() } catch { /* sin TTS local */ }
}

function bestLocalVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices().filter(v => v.lang.toLowerCase().startsWith('es'))
  return (
    voices.find(v => /natural|neural|online/i.test(v.name)) ||
    voices.find(v => /m[oó]nica|paulina|marisol|elvira|luciana/i.test(v.name)) ||
    voices.find(v => /google/i.test(v.name)) ||
    voices[0]
  )
}

function speakLocal(text: string, onStart?: () => void, onEnd?: () => void): void {
  if (!('speechSynthesis' in window)) { onEnd?.(); return }
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'es-ES'
  const v = bestLocalVoice()
  if (v) u.voice = v
  u.rate = 1.03
  u.pitch = 1.02
  u.onstart = () => onStart?.()
  u.onend = () => onEnd?.()
  u.onerror = () => onEnd?.()
  window.speechSynthesis.speak(u)
}

export function speak(text: string, onStart?: () => void, onEnd?: () => void): void {
  stopSpeech()
  const file = staticFileFor(text)
  if (!file) { speakLocal(text, onStart, onEnd); return }
  const audio = new Audio(`${import.meta.env.BASE_URL}voice/${file}.mp3`)
  currentAudio = audio
  let fellBack = false
  const fallback = () => {
    if (fellBack) return
    fellBack = true
    currentAudio = null
    speakLocal(text, onStart, onEnd)
  }
  audio.onplaying = () => onStart?.()
  audio.onended = () => { currentAudio = null; onEnd?.() }
  audio.onerror = fallback
  audio.play().catch(fallback)
}
