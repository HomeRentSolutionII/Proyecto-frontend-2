import { useState } from 'react'
import { Alert, Button, Card, Col, Container, Row, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ResumenReserva from '../components/ResumenReserva'
import { calcularSubtotal } from '../data/reservas'
import { formatearFecha, formatearPrecio } from '../utils/formato'

// Recibe las reservas y las acciones desde App.jsx por props
function Reservas({ reservas, usuario, onQuitar, onConfirmar }) {
  const [confirmada, setConfirmada] = useState(false)

  function confirmar() {
    onConfirmar()
    setConfirmada(true)
  }

  if (reservas.length === 0) {
    return (
      <Container className="py-5">
        <h1 className="titulo">Mis reservas</h1>
        {confirmada ? (
          <Alert variant="success">
            ¡Listo! Enviamos tu solicitud a los anfitriones. Te contactarán para coordinar la llegada.
          </Alert>
        ) : (
          <Alert variant="info">Todavía no agregas propiedades a tus reservas.</Alert>
        )}
        <Button as={Link} to="/propiedades" variant="primary">Ver propiedades</Button>
      </Container>
    )
  }

  const subtotal = calcularSubtotal(reservas)

  return (
    <Container as="section" className="py-5">
      <h1 className="titulo">Mis reservas</h1>
      <p className="text-muted">Revisa las propiedades y fechas que seleccionaste antes de confirmar.</p>

      <Row className="g-4">
        {/* ===== LISTADO DE LO SELECCIONADO ===== */}
        <Col lg={8}>
          <Table responsive hover className="align-middle">
            <thead>
              <tr>
                <th>Propiedad</th>
                <th>Fechas</th>
                <th className="text-center">Noches</th>
                <th className="text-end">Subtotal</th>
                <th className="text-center">Quitar</th>
              </tr>
            </thead>
            <tbody>
              {reservas.map((reserva) => (
                <tr key={reserva.id}>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <img className="miniatura" src={reserva.imagen} alt="" />
                      <div>
                        <strong>{reserva.nombre}</strong>
                        <div className="small text-muted">{reserva.ubicacion}</div>
                      </div>
                    </div>
                  </td>
                  <td className="small text-nowrap">
                    {formatearFecha(reserva.llegada)}<br />al {formatearFecha(reserva.salida)}
                  </td>
                  <td className="text-center">{reserva.noches}</td>
                  <td className="text-end fw-bold">{formatearPrecio(reserva.precio * reserva.noches)}</td>
                  <td className="text-center">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      aria-label={`Quitar ${reserva.nombre}`}
                      onClick={() => onQuitar(reserva.id)}
                    >
                      &times;
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Button as={Link} to="/propiedades" variant="outline-dark">Seguir buscando</Button>
        </Col>

        {/* ===== RESUMEN ===== */}
        <Col lg={4}>
          <Card className="panel-reserva shadow-sm">
            <Card.Body>
              <h2 className="fs-5 fw-bold">Resumen</h2>
              <ResumenReserva
                etiqueta={`Subtotal (${reservas.length} ${reservas.length === 1 ? 'propiedad' : 'propiedades'})`}
                subtotal={subtotal}
              />
              {usuario ? (
                <Button variant="primary" className="w-100" onClick={confirmar}>Confirmar reserva</Button>
              ) : (
                <>
                  <Button as={Link} to="/login" variant="primary" className="w-100">Confirmar reserva</Button>
                  <p className="small text-muted text-center mt-2 mb-0">
                    Necesitas iniciar sesión para confirmar.
                  </p>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Reservas
