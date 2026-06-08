type Theme = 'dark' | 'light'

interface Props {
  theme: Theme
  onToggle: (t: Theme) => void
  scrollY: number
}

export default function Nav({ theme, onToggle, scrollY }: Props) {
  const elevated = scrollY > 60
  // ann bar is ~34px
  const annH = 34
  const top = elevated ? 0 : annH

  return (
    <nav style={{
      position: 'fixed', top, left: 0, right: 0, zIndex: 1000,
      padding: elevated ? '12px 0' : '14px 0',
      background: 'var(--nav-bg)',
      backdropFilter: 'blur(20px) saturate(160%)',
      WebkitBackdropFilter: 'blur(20px) saturate(160%)',
      borderBottom: `1px solid ${elevated ? 'var(--border-soft)' : 'var(--border-subtle)'}`,
      boxShadow: elevated ? '0 1px 32px rgba(0,0,0,0.22)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <a href="#" style={{
          fontFamily: 'var(--font-caps)',
          fontSize: 17, fontWeight: 600, letterSpacing: 5,
          textTransform: 'uppercase', color: 'var(--text-primary)',
          transition: 'color 0.2s',
        }}>AO</a>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* theme toggle */}
          <div style={{
            display: 'flex', alignItems: 'center',
            background: 'var(--bg-raised)',
            border: '1px solid var(--border-soft)',
            borderRadius: 100, padding: 3,
          }}>
            {(['dark', 'light'] as Theme[]).map((t) => (
              <button
                key={t}
                onClick={() => onToggle(t)}
                title={t === 'dark' ? 'Modo oscuro' : 'Modo claro'}
                style={{
                  width: 30, height: 26, borderRadius: 100,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13,
                  background: theme === t ? 'var(--copper-dim)' : 'transparent',
                  color: theme === t ? 'var(--text-primary)' : 'var(--text-muted)',
                  transition: 'all 0.22s ease',
                }}
              >
                {t === 'dark' ? '🌙' : '☀️'}
              </button>
            ))}
          </div>

          <a href="#contacto" style={{
            fontFamily: 'var(--font-caps)',
            fontSize: 7.5, fontWeight: 600, letterSpacing: 2.2,
            textTransform: 'uppercase', color: 'var(--copper-soft)',
            padding: '10px 20px',
            border: '1px solid var(--copper-dim)',
            background: 'var(--copper-glow)',
            transition: 'all 0.22s ease',
          }}
          onClick={e => { e.preventDefault(); document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = 'var(--copper)'
            ;(e.currentTarget as HTMLElement).style.color = '#fff'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = 'var(--copper-glow)'
            ;(e.currentTarget as HTMLElement).style.color = 'var(--copper-soft)'
          }}>
            Diagnóstico gratuito
          </a>
        </div>
      </div>
    </nav>
  )
}
