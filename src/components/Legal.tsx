import Reveal from './Reveal'

export type LegalPage = 'privacidad' | 'cookies' | 'terminos' | 'aviso-legal'

const TITLES: Record<LegalPage, string> = {
  privacidad: 'Política de privacidad',
  cookies: 'Política de cookies',
  terminos: 'Términos de uso',
  'aviso-legal': 'Aviso legal',
}

const UPDATED = 'Última actualización: agosto de 2026.'

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

const UL = ({ children }: { children: React.ReactNode }) => (
  <ul style={{ marginBottom: 20, paddingLeft: 22, listStyle: 'disc' }}>{children}</ul>
)

const LI = ({ children }: { children: React.ReactNode }) => (
  <li style={{ marginBottom: 10 }}>{children}</li>
)

const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} style={{ color: 'var(--copper-soft)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
    {children}
  </a>
)

const Stamp = () => (
  <p style={{ marginTop: 34, fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic' }}>{UPDATED}</p>
)

/* ────────────────────────── Otras páginas legales ────────────────────────── */

const OTHER: Record<LegalPage, { label: string; href: string }[]> = {
  privacidad: [
    { label: 'Política de cookies', href: '#cookies' },
    { label: 'Términos de uso', href: '#terminos' },
    { label: 'Aviso legal', href: '#aviso-legal' },
  ],
  cookies: [
    { label: 'Política de privacidad', href: '#privacidad' },
    { label: 'Términos de uso', href: '#terminos' },
    { label: 'Aviso legal', href: '#aviso-legal' },
  ],
  terminos: [
    { label: 'Política de privacidad', href: '#privacidad' },
    { label: 'Política de cookies', href: '#cookies' },
    { label: 'Aviso legal', href: '#aviso-legal' },
  ],
  'aviso-legal': [
    { label: 'Política de privacidad', href: '#privacidad' },
    { label: 'Política de cookies', href: '#cookies' },
    { label: 'Términos de uso', href: '#terminos' },
  ],
}

function OtherPages({ page }: { page: LegalPage }) {
  return (
    <div style={{
      maxWidth: 860, margin: '0 auto', padding: '0 48px 80px',
      display: 'flex', flexWrap: 'wrap', gap: 24,
      fontFamily: 'var(--font-caps)', fontSize: 7, fontWeight: 600,
      letterSpacing: 2.2, textTransform: 'uppercase',
    }}>
      {OTHER[page].map(l => (
        <a key={l.href} href={l.href} style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--copper-soft)'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}>
          {l.label} →
        </a>
      ))}
    </div>
  )
}

/* ────────────────────────── Política de privacidad ────────────────────────── */

function Privacidad() {
  return (
    <>
      <P>
        En cumplimiento del Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo
        (RGPD) y de la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos
        Personales y garantía de los derechos digitales (LOPDGDD), le informamos sobre
        el tratamiento de sus datos personales al utilizar este sitio web.
      </P>

      <H3>Responsable del tratamiento</H3>
      <P>
        Andreescu Oakmont S.L. · CIF: B26996421 · Talavera de la Reina (Toledo), España
        · Email de contacto: privacidad@andreescuoakmont.com
      </P>

      <H3>Datos que tratamos</H3>
      <UL>
        <LI>
          <strong>Datos facilitados por el usuario</strong> en el formulario de contacto:
          nombre, empresa, email, teléfono y el contenido del mensaje.
        </LI>
        <LI>
          <strong>Datos de interacción con la web</strong> generados durante la visita
          (secciones consultadas, demostraciones abiertas) que se almacenan únicamente
          en el navegador del usuario y se adjuntan al formulario, si éste se envía, para
          priorizar y contextualizar la solicitud. Se detallan en la{' '}
          <A href="#cookies">política de cookies</A>.
        </LI>
        <LI>
          <strong>Audio de la demostración de voz</strong>, exclusivamente si el usuario
          inicia voluntariamente la llamada con el agente de demostración y autoriza el
          acceso a su micrófono. La grabación se procesa en el proveedor de la
          tecnología de voz para generar la respuesta; Andreescu Oakmont S.L. no conserva
          copia de ese audio.
        </LI>
      </UL>

      <H3>Finalidad del tratamiento</H3>
      <P>
        Los datos personales recogidos a través del formulario de contacto se utilizan
        exclusivamente para: (a) gestionar la solicitud de diagnóstico gratuito y contactar
        al solicitante en un plazo máximo de 24 horas; (b) enviar información sobre
        nuestros servicios cuando el usuario ha otorgado su consentimiento expreso;
        (c) cumplir con obligaciones legales aplicables. No se realizan decisiones
        automatizadas con efectos jurídicos ni elaboración de perfiles con esa finalidad.
      </P>

      <H3>Legitimación</H3>
      <P>
        La base legal para el tratamiento es el consentimiento del interesado (Art. 6.1.a RGPD)
        y el interés legítimo del responsable en la gestión de relaciones comerciales
        (Art. 6.1.f RGPD). El usuario puede retirar su consentimiento en cualquier momento,
        sin que ello afecte a la licitud del tratamiento previo.
      </P>

      <H3>Destinatarios y encargados del tratamiento</H3>
      <P>
        No se ceden datos a terceros, salvo obligación legal. Para prestar el servicio nos
        apoyamos en los siguientes proveedores, que actúan como encargados del tratamiento:
      </P>
      <UL>
        <LI><strong>Proveedor de envío de formularios</strong> — entrega del mensaje del formulario al correo de la empresa.</LI>
        <LI><strong>Proveedor de la tecnología de voz</strong> — procesamiento del audio de la demostración, únicamente cuando el usuario la inicia.</LI>
        <LI><strong>Proveedor de alojamiento web</strong> — publicación y entrega de las páginas del Sitio.</LI>
      </UL>
      <P>
        Algunos de estos proveedores están ubicados fuera del Espacio Económico Europeo.
        En tales casos, las transferencias internacionales se amparan en las garantías
        previstas en el Capítulo V del RGPD (decisiones de adecuación o cláusulas
        contractuales tipo de la Comisión Europea).
      </P>

      <H3>Plazo de conservación</H3>
      <P>
        Los datos se conservarán durante el tiempo necesario para cumplir con la finalidad
        para la que fueron recogidos y, en todo caso, durante los plazos legalmente
        establecidos. En ausencia de relación contractual, los datos de contacto se
        eliminarán a los 12 meses desde la última comunicación.
      </P>

      <H3>Medidas de seguridad</H3>
      <P>
        Andreescu Oakmont S.L. aplica las medidas técnicas y organizativas apropiadas para
        garantizar un nivel de seguridad adecuado al riesgo (Art. 32 RGPD), incluyendo el
        cifrado de las comunicaciones mediante HTTPS y el control de acceso a los buzones
        y sistemas donde se reciben las solicitudes.
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

      <H3>Menores de edad</H3>
      <P>
        Este Sitio se dirige a profesionales y empresas. No está destinado a menores de
        14 años ni se recaban intencionadamente datos de menores a través del formulario.
      </P>

      <H3>Cookies</H3>
      <P>
        El uso de cookies y de otras tecnologías de almacenamiento en el dispositivo del
        usuario se describe de forma separada en la{' '}
        <A href="#cookies">política de cookies</A>.
      </P>

      <Stamp />
    </>
  )
}

/* ────────────────────────── Política de cookies ────────────────────────── */

const STORAGE_ROWS: { key: string; tipo: string; duracion: string; finalidad: string }[] = [
  {
    key: 'ao-theme',
    tipo: 'localStorage · propia · técnica',
    duracion: 'Hasta que el usuario borre los datos del navegador',
    finalidad: 'Recordar la preferencia de tema visual (modo claro u oscuro) elegida por el usuario.',
  },
  {
    key: 'tl-exit-seen',
    tipo: 'sessionStorage · propia · técnica',
    duracion: 'Se elimina al cerrar la pestaña',
    finalidad: 'Evitar que el aviso de salida se muestre más de una vez en la misma visita.',
  },
  {
    key: 'tl-lead-score · tl-lead-actions',
    tipo: 'sessionStorage · propia · funcional',
    duracion: 'Se elimina al cerrar la pestaña',
    finalidad: 'Registrar qué secciones y demostraciones ha consultado el usuario durante la visita, para priorizar y contextualizar su solicitud si decide enviar el formulario de contacto.',
  },
]

function StorageTable() {
  return (
    <div style={{ marginBottom: 24 }}>
      {STORAGE_ROWS.map(r => (
        <div key={r.key} style={{
          borderTop: '1px solid var(--border-mid)',
          padding: '20px 0',
        }}>
          <div style={{
            fontFamily: 'var(--font-caps)', fontSize: 8, fontWeight: 600,
            letterSpacing: 1.6, textTransform: 'uppercase',
            color: 'var(--text-primary)', marginBottom: 14, wordBreak: 'break-word',
          }}>{r.key}</div>
          {[['Tipo', r.tipo], ['Duración', r.duracion], ['Finalidad', r.finalidad]].map(([label, value]) => (
            <div key={label} style={{
              display: 'flex', flexWrap: 'wrap', gap: '4px 16px',
              marginBottom: 8, fontSize: 14,
            }}>
              <span style={{
                fontFamily: 'var(--font-caps)', fontSize: 6.5, fontWeight: 600,
                letterSpacing: 1.8, textTransform: 'uppercase',
                color: 'var(--copper-soft)', flex: '0 0 88px', paddingTop: 5,
              }}>{label}</span>
              <span style={{ flex: '1 1 240px', lineHeight: 1.7 }}>{value}</span>
            </div>
          ))}
        </div>
      ))}
      <div style={{ borderTop: '1px solid var(--border-mid)' }} />
    </div>
  )
}

function Cookies() {
  return (
    <>
      <P>
        Esta política explica qué cookies y qué otras tecnologías de almacenamiento
        utiliza andreescuoakmont.com, con qué finalidad y cómo puede gestionarlas el
        usuario, en cumplimiento del artículo 22.2 de la Ley 34/2002, de Servicios de la
        Sociedad de la Información y del Comercio Electrónico (LSSI-CE) y del RGPD.
      </P>

      <H3>¿Qué es una cookie?</H3>
      <P>
        Una cookie es un pequeño fichero que un sitio web almacena en el dispositivo del
        usuario para recordar información sobre su visita. Junto a las cookies existen
        otras tecnologías equivalentes —como el <em>localStorage</em> y el{' '}
        <em>sessionStorage</em> del navegador— que guardan información en el mismo
        dispositivo y a las que se aplica el mismo régimen legal.
      </P>

      <H3>Qué utiliza este sitio</H3>
      <P>
        Este Sitio <strong>no instala cookies</strong>. No se emplean cookies de
        seguimiento, analítica de terceros, publicidad comportamental ni redes sociales.
        Sí se utilizan tres almacenamientos propios en el navegador, estrictamente
        necesarios para prestar el servicio solicitado por el usuario:
      </P>

      <StorageTable />

      <P>
        Al tratarse exclusivamente de almacenamiento propio y necesario para prestar un
        servicio expresamente solicitado por el usuario, está exento del deber de
        consentimiento previo conforme al artículo 22.2 LSSI-CE. Por ese motivo el Sitio
        no muestra banner de consentimiento.
      </P>

      <H3>Servicios de terceros</H3>
      <P>
        La demostración del agente de voz solo se activa cuando el usuario pulsa
        expresamente el botón correspondiente. En ese momento el proveedor de la
        tecnología de voz puede establecer su propio almacenamiento técnico para
        mantener la sesión de la llamada. Del mismo modo, los enlaces a demostraciones
        externas y a WhatsApp llevan al usuario a sitios de terceros con sus propias
        políticas, ajenas al control de Andreescu Oakmont S.L.
      </P>

      <H3>Cómo eliminar o bloquear este almacenamiento</H3>
      <P>
        El usuario puede borrar en cualquier momento los datos almacenados por este Sitio
        desde la configuración de su navegador, en la sección de privacidad o datos de
        sitios web. Cerrar la pestaña elimina automáticamente todos los datos de sesión.
        El bloqueo del almacenamiento local no impide navegar por el Sitio: únicamente
        hará que no se recuerde la preferencia de tema visual entre visitas.
      </P>
      <UL>
        <LI>Chrome: Configuración → Privacidad y seguridad → Datos de sitios</LI>
        <LI>Safari: Ajustes → Privacidad → Gestionar datos de sitios web</LI>
        <LI>Firefox: Ajustes → Privacidad y seguridad → Cookies y datos del sitio</LI>
        <LI>Edge: Configuración → Cookies y permisos del sitio</LI>
      </UL>

      <H3>Cambios en esta política</H3>
      <P>
        Si en el futuro se incorporan cookies analíticas o de terceros, esta política se
        actualizará y se solicitará el consentimiento previo del usuario mediante el
        mecanismo que corresponda antes de instalarlas. Para cualquier duda:
        privacidad@andreescuoakmont.com.
      </P>

      <Stamp />
    </>
  )
}

/* ────────────────────────── Términos de uso ────────────────────────── */

function Terminos() {
  return (
    <>
      <P>
        Los presentes Términos de Uso (en adelante, los "Términos") regulan el acceso y
        la utilización del sitio web andreescuoakmont.com y de la marca Talos Lynx (en
        adelante, "el Sitio"), titularidad de Andreescu Oakmont S.L., CIF B26996421,
        con domicilio en Talavera de la Reina (Toledo), España.
      </P>

      <H3>Aceptación</H3>
      <P>
        El acceso al Sitio atribuye la condición de usuario e implica la aceptación plena
        y sin reservas de estos Términos en la versión publicada en el momento del acceso.
        Si el usuario no está de acuerdo con ellos, debe abstenerse de utilizar el Sitio.
      </P>

      <H3>Objeto del Sitio</H3>
      <P>
        El Sitio tiene una finalidad informativa y comercial: presentar los servicios de
        implantación de inteligencia artificial y automatización comercial de Andreescu
        Oakmont S.L., mostrar demostraciones de dichos servicios y permitir al usuario
        solicitar un diagnóstico inicial. El Sitio no comercializa productos ni permite
        la contratación en línea de servicios.
      </P>

      <H3>Uso permitido</H3>
      <P>El usuario se compromete a utilizar el Sitio conforme a la ley, la buena fe y estos Términos, y en particular a:</P>
      <UL>
        <LI>No introducir datos falsos, de terceros sin autorización o que induzcan a error en el formulario de contacto.</LI>
        <LI>No utilizar el Sitio con fines ilícitos, lesivos de derechos de terceros o que puedan dañar, sobrecargar o impedir su normal funcionamiento.</LI>
        <LI>No introducir ni difundir virus, código malicioso o cualquier otro sistema susceptible de causar daños en los sistemas del titular o de terceros.</LI>
        <LI>No emplear medios automatizados de extracción masiva de contenidos (<em>scraping</em>) sin autorización escrita previa.</LI>
        <LI>No utilizar las demostraciones interactivas —incluido el agente de voz— con fines distintos a la evaluación de los servicios ofrecidos.</LI>
      </UL>

      <H3>Formulario de contacto y demostraciones</H3>
      <P>
        El envío del formulario constituye únicamente una solicitud de información y no
        genera obligación contractual alguna para ninguna de las partes. Las
        demostraciones publicadas en el Sitio son ejemplos ilustrativos con datos
        ficticios o de clientes que han autorizado expresamente su uso, y no garantizan
        un resultado idéntico en un proyecto concreto. El tratamiento de los datos
        facilitados se detalla en la <A href="#privacidad">política de privacidad</A>.
      </P>

      <H3>Contratación de servicios</H3>
      <P>
        La prestación efectiva de servicios se rige exclusivamente por el contrato,
        propuesta o pliego de condiciones firmado entre Andreescu Oakmont S.L. y el
        cliente, que prevalece sobre cualquier información publicada en el Sitio. Los
        precios, plazos, alcances y garantías indicados en el Sitio tienen carácter
        orientativo y no constituyen oferta vinculante.
      </P>

      <H3>Propiedad intelectual e industrial</H3>
      <P>
        Los contenidos del Sitio están protegidos por la normativa de propiedad
        intelectual e industrial en los términos detallados en el{' '}
        <A href="#aviso-legal">aviso legal</A>. Se autoriza la visualización, impresión
        y descarga de contenidos para uso personal y privado del usuario; cualquier otro
        uso requiere autorización escrita del titular.
      </P>

      <H3>Disponibilidad y exclusión de garantías</H3>
      <P>
        Andreescu Oakmont S.L. procura mantener el Sitio operativo y su información
        actualizada, pero no garantiza la disponibilidad ininterrumpida ni la ausencia de
        errores. Podrá suspender, interrumpir o modificar el acceso al Sitio o a
        cualquiera de sus contenidos y demostraciones, temporal o definitivamente, sin
        necesidad de preaviso.
      </P>

      <H3>Limitación de responsabilidad</H3>
      <P>
        Andreescu Oakmont S.L. no será responsable de los daños y perjuicios de cualquier
        naturaleza derivados del acceso o uso del Sitio, de la imposibilidad de acceder a
        él, de decisiones adoptadas sobre la base de su contenido informativo, ni de los
        contenidos y políticas de los sitios de terceros a los que se enlace. Nada en
        estos Términos excluye la responsabilidad que legalmente no pueda excluirse.
      </P>

      <H3>Enlaces</H3>
      <P>
        El Sitio puede contener enlaces a páginas de terceros (demostraciones alojadas
        externamente, WhatsApp, redes sociales). Su inclusión no implica aprobación,
        patrocinio ni recomendación de sus contenidos, sobre los que Andreescu Oakmont
        S.L. no ejerce control alguno.
      </P>

      <H3>Modificación de los Términos</H3>
      <P>
        Andreescu Oakmont S.L. se reserva el derecho a modificar en cualquier momento
        estos Términos, así como la presentación, configuración y contenidos del Sitio.
        La versión aplicable será la publicada en el Sitio en el momento del acceso.
      </P>

      <H3>Nulidad parcial</H3>
      <P>
        Si alguna cláusula de estos Términos fuera declarada nula o inaplicable, dicha
        declaración no afectará a la validez del resto, que continuará siendo plenamente
        vinculante.
      </P>

      <H3>Legislación aplicable y jurisdicción</H3>
      <P>
        Estos Términos se rigen por la legislación española. Para la resolución de
        cualquier controversia derivada del acceso o uso del Sitio, las partes se someten
        a los Juzgados y Tribunales de Toledo (España), con renuncia expresa a cualquier
        otro fuero, salvo que la normativa aplicable establezca un fuero imperativo
        distinto.
      </P>

      <Stamp />
    </>
  )
}

/* ────────────────────────── Aviso legal ────────────────────────── */

function AvisoLegal() {
  return (
    <>
      <H3>Datos identificativos</H3>
      <P>
        En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios
        de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), se informa:
        Denominación social: Andreescu Oakmont S.L. · CIF: B26996421 · Domicilio social:
        Talavera de la Reina (Toledo), España · Email: ceo@andreescuoakmont.com ·
        Talos Lynx es una marca comercial de Andreescu Oakmont S.L.
      </P>

      <H3>Objeto y ámbito de aplicación</H3>
      <P>
        El presente Aviso Legal regula el acceso y uso del sitio web andreescuoakmont.com
        (en adelante, "el Sitio"), propiedad de Andreescu Oakmont S.L. El acceso al Sitio
        y la utilización de los contenidos publicados en el mismo implica la aceptación
        plena y sin reservas de las condiciones establecidas en este Aviso Legal y en los{' '}
        <A href="#terminos">términos de uso</A>.
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

      <H3>Protección de datos y cookies</H3>
      <P>
        El tratamiento de los datos personales de los usuarios se describe en la{' '}
        <A href="#privacidad">política de privacidad</A> y el uso de almacenamiento en el
        dispositivo del usuario en la <A href="#cookies">política de cookies</A>.
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

      <Stamp />
    </>
  )
}

/* ────────────────────────── Router de páginas legales ────────────────────────── */

export default function Legal({ page }: { page: LegalPage }) {
  return (
    <>
      <LegalSection id={page} title={TITLES[page]}>
        {page === 'privacidad' && <Privacidad />}
        {page === 'cookies' && <Cookies />}
        {page === 'terminos' && <Terminos />}
        {page === 'aviso-legal' && <AvisoLegal />}
      </LegalSection>
      <OtherPages page={page} />
    </>
  )
}
