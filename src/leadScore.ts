// Puntuación de intención por comportamiento en la web.
// Cada interacción con una demo suma una vez por sesión.
// El total viaja oculto con el formulario de contacto:
// el equipo sabe QUÉ tocó el lead antes de escribir.

const SCORE_KEY = 'tl-lead-score'
const ACTIONS_KEY = 'tl-lead-actions'

export function trackLead(action: string, points: number): void {
  try {
    const raw = sessionStorage.getItem(ACTIONS_KEY)
    const seen: string[] = raw ? JSON.parse(raw) : []
    if (seen.includes(action)) return
    seen.push(action)
    sessionStorage.setItem(ACTIONS_KEY, JSON.stringify(seen))
    const score = Number(sessionStorage.getItem(SCORE_KEY) || 0) + points
    sessionStorage.setItem(SCORE_KEY, String(score))
  } catch { /* modo privado: sin scoring */ }
}

export function getLeadScore(): { score: number; actions: string[] } {
  try {
    return {
      score: Number(sessionStorage.getItem(SCORE_KEY) || 0),
      actions: JSON.parse(sessionStorage.getItem(ACTIONS_KEY) || '[]'),
    }
  } catch {
    return { score: 0, actions: [] }
  }
}

export function leadTemperature(score: number): string {
  if (score >= 50) return '🔥 Caliente'
  if (score >= 25) return '🟠 Templado'
  return '❄️ Frío'
}
