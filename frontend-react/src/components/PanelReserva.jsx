import { useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { calcularNoches, fechaHoy, formatearPrecio } from '../utils/formato'
import { validarFechasReserva } from '../utils/validaciones'
import ResumenReserva from './ResumenReserva'

// Panel lateral del detalle: elige fechas y huéspedes, muestra el total
// y entrega la reserva al componente padre mediante la prop onAgregar.
function PanelReserva({ propiedad, onAgregar }) {
  const [llegada, setLlegada] = useState('')
  const [salida, setSalida] = useState('')
  const [huespedes, setHuespedes] = useState('1')
  const [error, setError] = useState('')

  const noches = calcularNoches(llegada, salida)

  function manejarEnvio(evento) {
    evento.preventDefault()
    const mensaje = validarFechasReserva(llegada, salida)
    setError(mensaje)
    if (mensaje) return

    onAgregar({
      propiedadId: propiedad.id,
      nombre: propiedad.nombre,
      ubicacion: propiedad.ubicacion,
      imagen: propiedad.imagen,
      precio: propiedad.precio,
      llegada,
      salida,
      noches,
      huespedes: Number(huespedes),
    })
  }

  // Opciones de 1 hasta la capacidad máxima de la propiedad
  const opcionesHuespedes = Array.from({ length: propiedad.capacidad }, (_, i) => i + 1)

  return (
    <Card className="panel-reserva shadow-sm">
      <Card.Body>
        <p className="precio fs-3 mb-0">{formatearPrecio(propiedad.precio)}</p>
        <p className="small text-muted">por noche</p>

        <Form onSubmit={manejarEnvio} noValidate>
          <Form.Group className="mb-3" controlId="llegada">
            <Form.Label>Llegada</Form.Label>
            <Form.Control
              type="date"
              min={fechaHoy()}
              value={llegada}
              onChange={(evento) => setLlegada(evento.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="salida">
            <Form.Label>Salida</Form.Label>
            <Form.Control
              type="date"
              min={llegada || fechaHoy()}
              value={salida}
              onChange={(evento) => setSalida(evento.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="huespedes">
            <Form.Label>Huéspedes</Form.Label>
            <Form.Select value={huespedes} onChange={(evento) => setHuespedes(evento.target.value)}>
              {opcionesHuespedes.map((numero) => (
                <option key={numero} value={numero}>
                  {numero} {numero === 1 ? 'persona' : 'personas'}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {noches > 0 && (
            <ResumenReserva
              etiqueta={`${formatearPrecio(propiedad.precio)} x ${noches} ${noches === 1 ? 'noche' : 'noches'}`}
              subtotal={propiedad.precio * noches}
            />
          )}

          {error && <Alert variant="danger" className="py-2">{error}</Alert>}

          <Button type="submit" variant="primary" className="w-100">
            Agregar a mis reservas
          </Button>
        </Form>

        <p className="small text-muted text-center mt-2 mb-0">No se te cobrará nada por ahora.</p>
      </Card.Body>
    </Card>
  )
}

export default PanelReserva
