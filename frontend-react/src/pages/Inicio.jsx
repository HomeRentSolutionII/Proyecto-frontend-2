import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import TarjetaPropiedad from '../components/TarjetaPropiedad'
import { listarPropiedades } from '../data/propiedades'

const PASOS = [
  { numero: 1, titulo: 'Busca', texto: 'Filtra por ubicación, tipo de propiedad y precio.' },
  { numero: 2, titulo: 'Elige tus fechas', texto: 'Agrega la propiedad a tus reservas y revisa el total.' },
  { numero: 3, titulo: 'Confirma', texto: 'Coordina directamente con el anfitrión de la propiedad.' },
]

function Inicio() {
  const destacadas = listarPropiedades().filter((propiedad) => propiedad.destacada)

  return (
    <>
      {/* ===== BANNER PRINCIPAL ===== */}
      <section className="banner text-center text-white">
        <Container>
          <h1 className="display-6 fw-bold mb-3">Encuentra dónde quedarte en cualquier rincón de Chile</h1>
          <p className="lead mb-4">
            Casas, departamentos y cabañas publicadas directamente por sus anfitriones.
          </p>
          <Button as={Link} to="/propiedades" variant="primary" size="lg">Ver propiedades</Button>
        </Container>
      </section>

      {/* ===== PROPIEDADES DESTACADAS ===== */}
      <Container as="section" className="py-5">
        <h2 className="titulo">Propiedades destacadas</h2>
        <p className="text-muted">Algunas de las más reservadas esta temporada.</p>

        <Row xs={1} sm={2} lg={3} className="g-4">
          {destacadas.map((propiedad) => (
            <Col key={propiedad.id}>
              <TarjetaPropiedad propiedad={propiedad} />
            </Col>
          ))}
        </Row>

        <div className="text-center mt-4">
          <Button as={Link} to="/propiedades" variant="outline-dark">Ver todas las propiedades</Button>
        </div>
      </Container>

      {/* ===== CÓMO FUNCIONA ===== */}
      <section className="bloque-claro py-5">
        <Container>
          <h2 className="titulo">Cómo funciona</h2>
          <p className="text-muted">Tres pasos entre buscar y llegar.</p>

          <Row xs={1} md={3} className="g-4 text-center">
            {PASOS.map((paso) => (
              <Col key={paso.numero}>
                <p className="numero-paso">{paso.numero}</p>
                <h3 className="fs-6 fw-bold">{paso.titulo}</h3>
                <p className="small text-muted mb-0">{paso.texto}</p>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Inicio
