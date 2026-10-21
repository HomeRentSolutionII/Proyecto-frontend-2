import { Badge, Breadcrumb, Button, Col, Container, Row } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PanelReserva from '../components/PanelReserva'
import { obtenerPropiedad } from '../data/propiedades'

const NORMAS = [
  'Llegada desde las 15:00 horas',
  'Salida hasta las 12:00 horas',
  'No se permiten fiestas ni eventos',
  'No se admiten mascotas',
]

function DetallePropiedad({ onAgregarReserva }) {
  const { id } = useParams() // el id viene de la URL: /propiedades/3
  const navegar = useNavigate()
  const propiedad = obtenerPropiedad(id)

  if (!propiedad) {
    return (
      <Container className="py-5 text-center">
        <h1 className="titulo">Propiedad no encontrada</h1>
        <p className="text-muted">La propiedad que buscas no existe o fue eliminada.</p>
        <Button as={Link} to="/propiedades" variant="primary">Volver al listado</Button>
      </Container>
    )
  }

  function agregar(reserva) {
    onAgregarReserva(reserva)
    navegar('/reservas')
  }

  return (
    <Container as="section" className="py-4">
      {/* ===== RUTA DE NAVEGACIÓN ===== */}
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Inicio</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/propiedades' }}>Propiedades</Breadcrumb.Item>
        <Breadcrumb.Item active>{propiedad.nombre}</Breadcrumb.Item>
      </Breadcrumb>

      <Row className="g-4">
        {/* ===== COLUMNA PRINCIPAL ===== */}
        <Col lg={8}>
          <img className="detalle-imagen mb-3" src={propiedad.imagen} alt={propiedad.alt} />

          <Badge bg="secondary" className="mb-2">{propiedad.tipo}</Badge>
          <h1 className="titulo">{propiedad.nombre}</h1>
          <p className="text-muted">{propiedad.ubicacion}</p>
          <p>{propiedad.descripcion}</p>

          <Row xs={1} md={2} className="g-3">
            <Col>
              <h2 className="fs-5 fw-bold">Características</h2>
              <ul>
                <li><strong>Capacidad:</strong> hasta {propiedad.capacidad} personas</li>
                <li><strong>Habitaciones:</strong> {propiedad.habitaciones}</li>
                <li><strong>Baños:</strong> {propiedad.banos}</li>
                <li><strong>Superficie:</strong> {propiedad.superficie} m²</li>
              </ul>
            </Col>
            <Col>
              <h2 className="fs-5 fw-bold">Servicios incluidos</h2>
              <ul>
                {propiedad.servicios.map((servicio) => (
                  <li key={servicio}>{servicio}</li>
                ))}
              </ul>
            </Col>
          </Row>

          <h2 className="fs-5 fw-bold">Normas de la propiedad</h2>
          <ul>
            {NORMAS.map((norma) => (
              <li key={norma}>{norma}</li>
            ))}
          </ul>
        </Col>

        {/* ===== PANEL DE RESERVA ===== */}
        <Col lg={4}>
          <PanelReserva propiedad={propiedad} onAgregar={agregar} />
        </Col>
      </Row>
    </Container>
  )
}

export default DetallePropiedad
