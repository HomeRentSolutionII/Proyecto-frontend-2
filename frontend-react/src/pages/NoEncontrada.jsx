import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function NoEncontrada() {
  return (
    <Container className="py-5 text-center">
      <h1 className="titulo">Página no encontrada</h1>
      <p className="text-muted">La dirección que escribiste no existe.</p>
      <Button as={Link} to="/" variant="primary">Volver al inicio</Button>
    </Container>
  )
}

export default NoEncontrada
