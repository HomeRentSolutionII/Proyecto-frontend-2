import { Badge, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { formatearFechaLarga } from '../utils/fechaLarga'

// Tarjeta de una publicación del blog. Recibe por props el objeto con sus datos.
function TarjetaArticulo({ articulo }) {
  return (
    <Card className="tarjeta h-100">
      <Card.Img variant="top" src={articulo.imagen} alt={articulo.alt} />
      <Card.Body className="d-flex flex-column">
        <Badge bg="secondary" className="align-self-start mb-2">{articulo.categoria}</Badge>
        <Card.Title as="h2" className="fs-6 fw-bold">{articulo.titulo}</Card.Title>
        <p className="meta-articulo mb-2">{formatearFechaLarga(articulo.fecha)}</p>
        <Card.Text className="small text-muted">{articulo.extracto}</Card.Text>
        <Button as={Link} to={`/blog/${articulo.id}`} variant="primary" className="w-100 mt-auto">
          Leer publicación
        </Button>
      </Card.Body>
    </Card>
  )
}

export default TarjetaArticulo
