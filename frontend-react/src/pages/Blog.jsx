import { Col, Container, Row } from 'react-bootstrap'
import TarjetaArticulo from '../components/TarjetaArticulo'
import { listarArticulos } from '../data/articulos'
import '../contenido.css'

function Blog() {
  const articulos = listarArticulos()

  return (
    <Container as="section" className="py-5">
      <h1 className="titulo">Blog</h1>
      <p className="text-muted">Consejos para anfitriones e inquilinos.</p>

      {articulos.length === 0 ? (
        <p className="text-muted">Todavía no hay publicaciones.</p>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {articulos.map((articulo) => (
            <Col key={articulo.id}>
              <TarjetaArticulo articulo={articulo} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}

export default Blog
