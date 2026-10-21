import { Button, Col, Form, Row } from 'react-bootstrap'
import { TIPOS_PROPIEDAD } from '../data/propiedades'

// Formulario de filtros. No guarda estado propio: recibe los valores por
// props y avisa cada cambio al componente padre con onCambiar.
function FiltrosPropiedades({ filtros, onCambiar, onLimpiar }) {
  function manejarCambio(evento) {
    onCambiar(evento.target.name, evento.target.value)
  }

  return (
    <Form className="filtros p-3 mb-4" onSubmit={(evento) => evento.preventDefault()}>
      <Row className="g-3 align-items-end">
        <Col xs={12} md={6} lg={3}>
          <Form.Group controlId="filtro-texto">
            <Form.Label>Ubicación o nombre</Form.Label>
            <Form.Control
              type="search"
              name="texto"
              placeholder="Ej: Valparaíso"
              value={filtros.texto}
              onChange={manejarCambio}
            />
          </Form.Group>
        </Col>

        <Col xs={12} md={6} lg={3}>
          <Form.Group controlId="filtro-tipo">
            <Form.Label>Tipo de propiedad</Form.Label>
            <Form.Select name="tipo" value={filtros.tipo} onChange={manejarCambio}>
              <option value="">Todas</option>
              {TIPOS_PROPIEDAD.map((tipo) => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col xs={6} lg={2}>
          <Form.Group controlId="filtro-min">
            <Form.Label>Precio desde</Form.Label>
            <Form.Control
              type="number"
              name="precioMin"
              min="0"
              placeholder="0"
              value={filtros.precioMin}
              onChange={manejarCambio}
            />
          </Form.Group>
        </Col>

        <Col xs={6} lg={2}>
          <Form.Group controlId="filtro-max">
            <Form.Label>Precio hasta</Form.Label>
            <Form.Control
              type="number"
              name="precioMax"
              min="0"
              placeholder="200000"
              value={filtros.precioMax}
              onChange={manejarCambio}
            />
          </Form.Group>
        </Col>

        <Col xs={12} lg={2}>
          <Button variant="outline-secondary" className="w-100" onClick={onLimpiar}>
            Limpiar filtros
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default FiltrosPropiedades
