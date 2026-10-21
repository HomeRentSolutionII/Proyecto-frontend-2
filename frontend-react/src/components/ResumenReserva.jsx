import { calcularComision } from '../data/reservas'
import { formatearPrecio } from '../utils/formato'

// Desglose de precio: subtotal, comisión de servicio y total.
// Se usa en el detalle de la propiedad y en Mis reservas.
function ResumenReserva({ etiqueta, subtotal }) {
  const comision = calcularComision(subtotal)

  return (
    <div className="resumen my-3">
      <p className="d-flex justify-content-between mb-1">
        <span>{etiqueta}</span> <span>{formatearPrecio(subtotal)}</span>
      </p>
      <p className="d-flex justify-content-between mb-1">
        <span>Comisión de servicio</span> <span>{formatearPrecio(comision)}</span>
      </p>
      <p className="d-flex justify-content-between fw-bold border-top pt-2 mb-0">
        <span>Total</span> <span>{formatearPrecio(subtotal + comision)}</span>
      </p>
    </div>
  )
}

export default ResumenReserva
