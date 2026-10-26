import { Card, Col, Container, Row } from 'react-bootstrap'
import '../contenido.css'

const PERFILES_DEL_SITIO = [
  { icono: '🔑', titulo: 'Inquilinos', texto: 'Buscan por ubicación, tipo y precio, revisan el detalle y reservan sabiendo el total antes de confirmar.' },
  { icono: '🏠', titulo: 'Anfitriones', texto: 'Publican sus propiedades con fotografías y precio por noche, y hacen seguimiento de sus reservas.' },
  { icono: '🛠', titulo: 'Administración', texto: 'Un panel interno para mantener el catálogo, los usuarios y las reservas de la plataforma.' },
]

const EQUIPO = [
  { iniciales: 'NP', nombre: 'Noemí Paillallao', rol: 'Panel de administración', texto: 'Desarrolla el panel interno: home, listados y formularios de propiedades y usuarios.' },
  { iniciales: 'JR', nombre: 'Jhohan Ramírez', rol: 'Contenido informativo', texto: 'Desarrolla las páginas Nosotros, Blog y Contacto del sitio público.' },
  { iniciales: 'VU', nombre: 'Víctor Urra', rol: 'Sitio público', texto: 'Desarrolla el home, el catálogo de propiedades, las reservas, el registro y el inicio de sesión.' },
]

function Nosotros() {
  return (
    <>
      {/* ===== PRESENTACIÓN ===== */}
      <Container as="section" className="py-5">
        <h1 className="titulo">Nosotros</h1>
        <p className="text-muted">Una plataforma chilena para arrendar y publicar propiedades por períodos determinados.</p>

        <div className="texto-lectura">
          <p>
            Home Rent Solution conecta a las personas que buscan dónde quedarse con quienes tienen una
            propiedad para ofrecer. Un inquilino puede revisar el catálogo, comparar opciones y reservar
            las noches que necesita; un anfitrión puede publicar su casa, departamento, cabaña, loft o
            parcela y seguir sus reservas desde un solo lugar.
          </p>
          <p>
            La plataforma incluye además un panel de administración desde el cual se mantiene el catálogo
            de propiedades, los usuarios y las reservas registradas.
          </p>
          <p>
            Este sitio es el frontend del proyecto. Más adelante se conectará con el backend de
            microservicios desarrollado en la asignatura Desarrollo Full Stack I: propiedades, anfitriones,
            inquilinos, reservas y pagos.
          </p>
        </div>
      </Container>

      {/* ===== QUÉ OFRECEMOS ===== */}
      <section className="bloque-claro py-5">
        <Container>
          <h2 className="titulo">Qué ofrecemos</h2>
          <p className="text-muted">Un espacio para cada perfil de la plataforma.</p>

          <Row xs={1} md={3} className="g-4 text-center">
            {PERFILES_DEL_SITIO.map((perfil) => (
              <Col key={perfil.titulo}>
                <p className="icono-grande mb-1" aria-hidden="true">{perfil.icono}</p>
                <h3 className="fs-6 fw-bold">{perfil.titulo}</h3>
                <p className="small text-muted mb-0">{perfil.texto}</p>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ===== EQUIPO DE DESARROLLO ===== */}
      <Container as="section" className="py-5">
        <h2 className="titulo">Quiénes somos</h2>
        <p className="text-muted">
          Estudiantes de Ingeniería en Informática de Duoc UC, cuarto semestre. Home Rent Solution es nuestro
          proyecto de la asignatura DSY1104 Desarrollo Full Stack II.
        </p>

        <Row xs={1} md={3} className="g-4">
          {EQUIPO.map((persona) => (
            <Col key={persona.iniciales}>
              <Card className="tarjeta perfil h-100 text-center">
                <Card.Body>
                  <p className="avatar" aria-hidden="true">{persona.iniciales}</p>
                  <Card.Title as="h3" className="fs-6 fw-bold">{persona.nombre}</Card.Title>
                  <p className="rol small mb-2">{persona.rol}</p>
                  <Card.Text className="small text-muted">{persona.texto}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  )
}

export default Nosotros
