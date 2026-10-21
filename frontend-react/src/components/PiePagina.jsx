import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function PiePagina() {
  return (
    <footer className="pie pt-5 pb-3">
      <Container>
        <Row className="g-4">
          <Col md={5}>
            <h2 className="h6 text-white">Home Rent Solution</h2>
            <p className="small mb-0">
              Plataforma chilena de arriendo de propiedades por períodos determinados.
            </p>
          </Col>

          <Col xs={6} md={3}>
            <h2 className="h6 text-white">Navegación</h2>
            <ul className="list-unstyled small">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/propiedades">Propiedades</Link></li>
              <li><Link to="/nosotros">Nosotros</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </Col>

          <Col xs={6} md={4}>
            <h2 className="h6 text-white">Contacto</h2>
            <ul className="list-unstyled small">
              <li>Av. Irarrázaval 2450, Ñuñoa</li>
              <li>+56 2 2555 1000</li>
              <li><a href="mailto:contacto@homerentsolution.cl">contacto@homerentsolution.cl</a></li>
            </ul>
          </Col>
        </Row>

        <p className="creditos small text-center mt-4 pt-3 mb-0">
          &copy; 2026 Home Rent Solution &middot; DSY1104 Desarrollo Full Stack II
        </p>
      </Container>
    </footer>
  )
}

export default PiePagina
