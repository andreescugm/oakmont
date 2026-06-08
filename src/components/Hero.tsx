const heroVideoUrl =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_154941_df1a96e1-a06f-450c-bd02-d863414cc1a0.mp4'

const proofItems = [
  { value: '90 días', label: 'Para medir resultado.' },
  { value: '1 métrica', label: 'Firmada antes de empezar.' },
  { value: '0€', label: 'Si no se cumple.' },
  { value: '1 sistema', label: 'Funcionando en producción.' },
]

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Hero() {
  return (
    <section className="ao-hero" aria-labelledby="hero-title">
      {/* TODO: replace with Andreescu Oakmont final hero video asset */}
      <video
        className="ao-hero-video"
        src={heroVideoUrl}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="ao-hero-overlay" aria-hidden="true" />

      <div className="ao-hero-inner">
        <div className="ao-hero-copy">
          <p className="ao-kicker animate-fade-up">IA APLICADA. RESULTADO FIRMADO.</p>

          <h1 id="hero-title" className="ao-hero-title animate-fade-up-delay-1">
            Tu empresa no necesita más horas.
            <span>Necesita menos fricción.</span>
          </h1>

          <p className="ao-hero-subtitle animate-fade-up-delay-2">
            Construimos sistemas de IA que cualifican leads, hacen seguimiento, ordenan procesos
            y recuperan tiempo operativo. Resultado medible en 90 días o devolución íntegra.
            Por contrato.
          </p>

          <div className="ao-hero-actions animate-fade-up-delay-3">
            <a
              className="ao-btn ao-btn-primary"
              href="#contacto"
              onClick={(event) => {
                event.preventDefault()
                scrollTo('contacto')
              }}
            >
              Reservar diagnóstico
            </a>
            <a
              className="ao-btn ao-btn-secondary"
              href="#proceso"
              onClick={(event) => {
                event.preventDefault()
                scrollTo('proceso')
              }}
            >
              Ver el proceso
            </a>
          </div>

          <p className="ao-hero-microcopy animate-fade-up-delay-3">
            60 minutos. Sin tarjeta. Sin compromiso.
          </p>
        </div>

        <div className="ao-proof-row animate-fade-up-delay-4" aria-label="Prueba de servicio">
          {proofItems.map((item) => (
            <div className="ao-proof-item" key={item.value}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
