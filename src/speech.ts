/* ── Voz "humana" sin ElevenLabs ─────────────────────────────
   1º intento: Amazon Polly (voz Lucia, es-ES) servida por el
   endpoint público y gratuito de StreamElements — sin API key.
   2º intento: la mejor voz local del navegador (Natural/Neural
   de Edge, Mónica de Safari, Google español de Chrome).
   Cuando haya agente de ElevenLabs, esto queda de respaldo.  */

let currentAudio: HTMLAudioElement | null = null

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
  const url = 'https://api.streamelements.com/kappa/v2/speech?voice=Lucia&text=' + encodeURIComponent(text)
  const audio = new Audio(url)
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
