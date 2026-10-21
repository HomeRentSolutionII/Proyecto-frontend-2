import { Badge, Button, Container, Nav, Navbar } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'

// Menú principal. En pantallas chicas Bootstrap lo colapsa en un botón ☰.
function Encabezado({ cantidadReservas, usuario, onCerrarSesion }) {
  return (
    <Navbar expand="lg" variant="dark" sticky="top" className="encabezado">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          <span aria-hidden="true">🏡</span> Home Rent Solution
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="menu-principal" />

        <Navbar.Collapse id="menu-principal">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>Inicio</Nav.Link>
            <Nav.Link as={NavLink} to="/propiedades">Propiedades</Nav.Link>
            <Nav.Link as={NavLink} to="/blog">Blog</Nav.Link>
            <Nav.Link as={NavLink} to="/nosotros">Nosotros</Nav.Link>
            <Nav.Link as={NavLink} to="/contacto">Contacto</Nav.Link>
            {usuario?.tipo === 'Administrador' && (
              <Nav.Link as={NavLink} to="/admin">Panel admin</Nav.Link>
            )}
          </Nav>

          <div className="d-flex flex-wrap align-items-center gap-2 py-2 py-lg-0">
            <Button as={Link} to="/reservas" variant="outline-light">
              Mis reservas <Badge bg="warning" text="dark">{cantidadReservas}</Badge>
            </Button>

            {usuario ? (
              <>
                <span className="text-white small">Hola, {usuario.nombre}</span>
                <Button variant="primary" onClick={onCerrarSesion}>Salir</Button>
              </>
            ) : (
              <Button as={Link} to="/login" variant="primary">Ingresar</Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Encabezado
