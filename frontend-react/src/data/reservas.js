// "Carrito" de Home Rent Solution: las propiedades que el usuario agregó
// a Mis reservas, guardadas en localStorage.

const CLAVE = 'hrs_reservas'
export const COMISION = 0.05 // 5% de comisión de servicio

function guardar(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista))
}

export function obtenerReservas() {
  const guardadas = localStorage.getItem(CLAVE)
  return guardadas ? JSON.parse(guardadas) : []
}

// Recibe los datos de la reserva y devuelve la lista actualizada
export function agregarReserva(reserva) {
  const nueva = { ...reserva, id: Date.now() }
  const lista = [...obtenerReservas(), nueva]
  guardar(lista)
  return lista
}

export function quitarReserva(id) {
  const lista = obtenerReservas().filter((reserva) => reserva.id !== id)
  guardar(lista)
  return lista
}

export function vaciarReservas() {
  guardar([])
  return []
}

export function calcularComision(subtotal) {
  return Math.round(subtotal * COMISION)
}

// Subtotal de todas las reservas de la lista
export function calcularSubtotal(reservas) {
  return reservas.reduce((suma, reserva) => suma + reserva.precio * reserva.noches, 0)
}
