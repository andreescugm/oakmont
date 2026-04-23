const services: { label: string; href: string }[] = [
  { label: 'Diagnóstico Estratégico', href: '#diagnostico-estrategico' },
  { label: 'Diseño del Sistema',       href: '#diseno-sistema' },
  { label: 'Implementación IA',        href: '#implementacion-ia' },
  { label: 'Automatización Comercial', href: '#automatizacion-comercial' },
  { label: 'Cualificación de Leads',   href: '#cualificacion-leads' },
]

const company: { label: string; href: string }[] = [
  { label: 'Sobre nosotros', href: '#sobre-nosotros' },
  { label: 'Metodología',    href: '#metodologia' },
  { label: 'Garantía',       href: '#garantia' },
  { label: 'Casos de éxito', href: '#casos-exito' },
  { label: 'Contacto',       href: '#contacto' },
]

const legal: { label: string; href: string }[] = [
  { label: 'Privacidad',  href: '#privacidad' },
  { label: 'Aviso legal', href: '#aviso-legal' },
]

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--bg-surface)',
      borderTop: '1px solid var(--border-subtle)',
      padding: '72px 0 0',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 48px',
        display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr',
        gap: 48, marginBottom: 52,
      }}>
        <div>
          <span style={{
            fontFamily: 'var(--font-caps)', fontSize: 15, fontWeight: 600,
            letterSpacing: 4, textTransform: 'uppercase',
            color: 'var(--copper-soft)', display: 'block', marginBottom: 5,
          }}>Andreescu Oakmont</span>
          <span style={{
            fontFamily: 'var(--font-caps)', fontSize: 6.5, letterSpacing: 2.2,
            textTransform: 'uppercase', color: 'var(--text-muted)',
            display: 'block', marginBottom: 18,
          }}>Consultoría Estratégica · Automatización IA · Est. 2026</span>
          <p style={{
            fontFamily: 'var(--font-serif)', fontSize: 14, fontWeight: 300,
            fontStyle: 'italic', lineHeight: 1.78, color: 'var(--text-muted)',
            maxWidth: 250, marginBottom: 22,
          }}>
            Talavera de la Reina · Metodología norteamericana de alto rendimiento aplicada al mercado español.
          </p>
          <a href="#contacto" style={{
            fontFamily: 'var(--font-caps)', fontSize: 7.5, fontWeight: 600,
            letterSpacing: 2.3, textTransform: 'uppercase',
            background: 'var(--copper)', color: '#fff',
            padding: '11px 22px', display: 'inline-block', transition: 'background 0.2s',
          }}
          onClick={e => { e.preventDefault(); document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#a86830'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'var(--copper)'}>
            Diagnóstico gratuito →
          </a>
        </div>

        {[{ title: 'Servicios', links: services }, { title: 'Empresa', links: company }].map(col => (
          <div key={col.title}>
            <h4 style={{
              fontFamily: 'var(--font-caps)', fontSize: 7, fontWeight: 600,
              letterSpacing: 2.8, textTransform: 'uppercase',
              color: 'var(--copper-soft)', opacity: 0.7, marginBottom: 20,
            }}>{col.title}</h4>
            <ul style={{ listStyle: 'none' }}>
              {col.links.map(l => (
                <li key={l.label} style={{ marginBottom: 12 }}>
                  <a href={l.href} style={{
                    fontFamily: 'var(--font-serif)', fontSize: 14, fontWeight: 300,
                    fontStyle: 'italic', color: 'var(--text-muted)', transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--copper-soft)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{
        borderTop: '1px solid var(--border-subtle)',
        padding: '22px 48px',
        maxWidth: 1200, margin: '0 auto',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontFamily: 'var(--font-caps)', fontSize: 6.5,
        letterSpacing: 1.8, textTransform: 'uppercase', color: 'var(--text-muted)',
      }}>
        <span>© 2026 Andreescu Oakmont. Todos los derechos reservados.</span>
        <div style={{ display: 'flex', gap: 20 }}>
          {legal.map(l => (
            <a key={l.label} href={l.href} style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--copper-soft)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
