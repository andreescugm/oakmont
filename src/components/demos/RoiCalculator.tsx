import { useState } from 'react'
import { trackLead } from '../../leadScore'

function fmt(n: number): string {
  return n.toLocaleString('es-ES', { maximumFractionDigits: 0 })
}

export default function RoiCalculator() {
  const [empleados, setEmpleados] = useState(8)
  const [horasDia, setHorasDia] = useState(2)
  const [costeHora, setCosteHora] = useState(22)

  const horasAnio = empleados * horasDia * 220
  const dineroAnio = horasAnio * costeHora
  const recuperable = Math.round(dineroAnio * 0.7)

  const slider = (label: string, value: number, set: (n: number) => void, min: number, max: number, step: number, unit: string) => (
    <div style={{ marginBottom: 26 }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', marginBottom: 10,
        fontFamily: 'var(--font-caps)', fontSize: 8, fontWeight: 600,
        letterSpacing: 2.2, textTransform: 'uppercase',
      }}>
        <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
        <span style={{ color: 'var(--copper-soft)' }}>{value}{unit}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => { trackLead('usó la calculadora ROI', 15); set(Number(e.target.value)) }}
        style={{ width: '100%', accentColor: '#c17b3a', cursor: 'pointer' }}
      />
    </div>
  )

  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border-soft)',
      maxWidth: 520, width: '100%', height: 420, padding: '26px 30px',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{
        fontFamily: 'var(--font-caps)', fontSize: 8, fontWeight: 600,
        letterSpacing: 2.5, textTransform: 'uppercase', color: 'var(--copper-soft)',
        marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span className="star-shape" aria-hidden />
        Calculadora · Lo que te cuesta no automatizar
      </div>

      {slider('Empleados en tareas repetitivas', empleados, setEmpleados, 1, 50, 1, '')}
      {slider('Horas al día en ese ruido', horasDia, setHorasDia, 0.5, 5, 0.5, ' h')}
      {slider('Coste medio por hora', costeHora, setCosteHora, 12, 60, 1, ' €')}

      <div style={{
        marginTop: 'auto', paddingTop: 20, borderTop: '1px solid var(--border-subtle)',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'end',
      }}>
        <div>
          <span style={{
            display: 'block', fontFamily: 'var(--font-caps)', fontSize: 7,
            letterSpacing: 2, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6,
          }}>Tirado a la basura / año</span>
          <span style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,3vw,36px)',
            color: 'var(--text-primary)', lineHeight: 1,
          }}>{fmt(dineroAnio)} €</span>
          <span style={{
            display: 'block', fontFamily: 'var(--font-serif)', fontStyle: 'italic',
            fontSize: 12.5, color: 'var(--text-muted)', marginTop: 6,
          }}>{fmt(horasAnio)} horas de tu equipo</span>
        </div>
        <div>
          <span style={{
            display: 'block', fontFamily: 'var(--font-caps)', fontSize: 7,
            letterSpacing: 2, textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 6,
          }}>Recuperable automatizando</span>
          <span style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,3vw,36px)',
            color: 'var(--copper-soft)', lineHeight: 1,
          }}>≈ {fmt(recuperable)} €</span>
        </div>
      </div>

      <a
        href="#contacto"
        onClick={e => { e.preventDefault(); document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}
        style={{
          marginTop: 20, textAlign: 'center',
          fontFamily: 'var(--font-caps)', fontSize: 8.5, fontWeight: 600,
          letterSpacing: 2.5, textTransform: 'uppercase',
          background: 'var(--copper)', color: '#fff', padding: '15px 20px',
          transition: 'background 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#a86830'}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'var(--copper)'}
      >
        Quiero recuperar ese dinero — diagnóstico gratis →
      </a>
    </div>
  )
}
