import Reveal from './Reveal'

function LegalSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ background: 'var(--bg-base)', padding: '80px 0', borderTop: '1px solid var(--border-subtle)' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 48px' }}>
        <Reveal dir="left">
          <span style={{
            fontFamily: 'var(--font-caps)', fontSize: 7.5, fontWeight: 600,
            letterSpacing: 3, textTransform: 'uppercase', color: 'var(--copper-soft)',
            display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 24,
          }}>
            <span style={{ width: 26, height: 1, background: 'var(--copper)', flexShrink: 0 }} />
            {title}
          </span>
        </Reveal>
        <Reveal dir="up" delay={80}>
          <div style={{
            fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 300,
            lineHeight: 1.85, color: 'var(--text-secondary)',
          }}>
            {children}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ marginBottom: 20 }}>{children}</p>
)

const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{
    fontFamily: 'var(--font-caps)', fontSize: 8, fontWeight: 600,
    letterSpacing: 2.3, textTransform: 'uppercase', color: 'var(--text-primary)',
    marginBottom: 12, marginTop: 32,
  }}>{children}</h3>
)

export default function Legal() {
  return (
    <>
      {/* ── Privacidad ── */}
      <LegalSection id="privacidad" title="Política de privacidad">
        <P>
          En cumplimiento del Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo
          (RGPD) y de la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos
          Personales y garantía de los derechos digitales (LOPDGDD), le informamos sobre
          el tratamiento de sus datos personales.
        </P>

        <H3>Responsable del tratamiento</H3>
        <P>
          Andreescu Oakmont S.L. · CIF: B-XXXXXXXX · Talavera de la Reina (Toledo), España
          · Email de contacto: privacidad@andreescuoakmont.com
        </P>

        <H3>Finalidad del tratamiento</H3>
        <P>
          Los datos personales recogidos a través del formulario de contacto se utilizan
          exclusivamente para: (a) gestionar la solicitud de diagnóstico gratuito y contactar
          al solicitante en un plazo máximo de 24 horas; (b) enviar información sobre
          nuestros servicios cuando el usuario ha otorgado su consentimiento expreso;
          (c) cumplir con obligaciones legales aplicables.
        </P>

        <H3>Legitimación</H3>
        <P>
          La base legal para el tratamiento es el consentimiento del interesado (Art. 6.1.a RGPD)
          y el interés legítimo del responsable en la gestión de relaciones comerciales
          (Art. 6.1.f RGPD). El usuario puede retirar su consentimiento en cualquier momento.
        </P>

        <H3>Plazo de conservación</H3>
        <P>
          Los datos se conservarán durante el tiempo necesario para cumplir con la finalidad
          para la que fueron recogidos y, en todo caso, durante los plazos legalmente
          establecidos. En ausencia de relación contractual, los datos de contacto se
          eliminarán a los 12 meses desde la última comunicación.
        </P>

        <H3>Derechos del usuario</H3>
        <P>
          El usuario puede ejercer en cualquier momento sus derechos de acceso, rectificación,
          supresión, limitación del tratamiento, portabilidad y oposición mediante escrito
          dirigido a privacidad@andreescuoakmont.com, adjuntando copia de su DNI o documento
          identificativo equivalente. Si considera que el tratamiento no es conforme a la
          normativa vigente, puede presentar reclamación ante la Agencia Española de
          Protección de Datos (www.aepd.es).
        </P>

        <H3>Cookies</H3>
        <P>
          Este sitio web utiliza únicamente cookies técnicas estrictamente necesarias para
          el funcionamiento de la página. No se utilizan cookies de seguimiento, analíticas
          de terceros ni publicidad comportamental. El almacenamiento de preferencias de
          tema (modo claro/oscuro) se realiza exclusivamente en el localStorage del navegador
          del usuario, sin transmisión a servidores externos.
        </P>
      </LegalSection>

      {/* ── Aviso legal ── */}
      <LegalSection id="aviso-legal" title="Aviso legal">
        <H3>Datos identificativos</H3>
        <P>
          En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios
          de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), se informa:
          Denominación social: Andreescu Oakmont S.L. · CIF: B-XXXXXXXX · Domicilio social:
          Talavera de la Reina (Toledo), España · Email: ceo@andreescuoakmont.com
        </P>

        <H3>Objeto y ámbito de aplicación</H3>
        <P>
          El presente Aviso Legal regula el acceso y uso del sitio web andreescuoakmont.com
          (en adelante, "el Sitio"), propiedad de Andreescu Oakmont S.L. El acceso al Sitio
          y la utilización de los contenidos publicados en el mismo implica la aceptación
          plena y sin reservas de las condiciones establecidas en este Aviso Legal.
        </P>

        <H3>Propiedad intelectual e industrial</H3>
        <P>
          Todos los contenidos del Sitio —incluyendo, a título enunciativo y no limitativo:
          textos, imágenes, logotipos, marcas, diseño gráfico, código fuente y estructura
          de navegación— son propiedad de Andreescu Oakmont S.L. o de terceros que han
          autorizado expresamente su uso, y están protegidos por la normativa española e
          internacional de propiedad intelectual e industrial. Queda expresamente prohibida
          su reproducción total o parcial, distribución, comunicación pública o transformación
          sin autorización escrita del titular.
        </P>

        <H3>Responsabilidad</H3>
        <P>
          Andreescu Oakmont S.L. no se hace responsable de los daños y perjuicios de
          cualquier naturaleza que pudieran derivarse del acceso o uso del Sitio, ni de
          la información contenida en el mismo, en la medida en que dicha información
          pudiera contener inexactitudes o estar desactualizada. El Sitio puede contener
          enlaces a sitios web de terceros cuyo contenido y políticas de privacidad son
          ajenos al control de Andreescu Oakmont S.L.
        </P>

        <H3>Legislación aplicable y jurisdicción</H3>
        <P>
          Las relaciones establecidas entre Andreescu Oakmont S.L. y los usuarios del
          Sitio se rigen por la legislación española vigente. Para la resolución de
          cualquier controversia o conflicto que pudiera derivarse del acceso o uso
          del Sitio, las partes se someten a los Juzgados y Tribunales de la ciudad
          de Toledo (España), con renuncia expresa a cualquier otro fuero que pudiera
          corresponderles.
        </P>

        <P>
          Última actualización: abril de 2026.
        </P>
      </LegalSection>
    </>
  )
}
