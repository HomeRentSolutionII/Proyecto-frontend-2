import { Badge, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { formatearPrecio } from '../utils/formato'

// Tarjeta de una propiedad. Recibe por props el objeto con sus datos.
function TarjetaPropiedad({ propiedad }) {
  return (
    <Card className="tarjeta h-100">
      <Card.Img variant="top" src={propiedad.imagen} alt={propiedad.alt} />
      <Card.Body className="d-flex flex-column">
        <Badge bg="secondary" className="align-self-start mb-2">{propiedad.tipo}</Badge>
        <Card.Title as="h3" className="fs-6 fw-bold">{propiedad.nombre}</Card.Title>
        <Card.Text className="text-muted small">{propiedad.ubicacion}</Card.Text>
        <p className="precio mt-auto">
          {formatearPrecio(propiedad.precio)} <span className="small text-muted fw-normal">por noche</span>
        </p>
        <Button as={Link} to={`/propiedades/${propiedad.id}`} variant="primary" className="w-100">
          Ver detalle
        </Button>
      </Card.Body>
    </Card>
  )
}

export default TarjetaPropiedad
