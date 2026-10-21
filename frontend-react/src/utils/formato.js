// Funciones de apoyo para mostrar datos en pantalla

// 68000 -> "$68.000"
export function formatearPrecio(valor) {
  return '$' + valor.toLocaleString('es-CL')
}

// Noches entre dos fechas en formato "AAAA-MM-DD"
export function calcularNoches(llegada, salida) {
  if (!llegada || !salida) return 0
  const milisegundosPorDia = 24 * 60 * 60 * 1000
  const noches = (new Date(salida) - new Date(llegada)) / milisegundosPorDia
  return noches > 0 ? Math.round(noches) : 0
}

// Fecha de hoy en formato "AAAA-MM-DD", según la hora local del computador
export function fechaHoy() {
  const hoy = new Date()
  const mes = String(hoy.getMonth() + 1).padStart(2, '0')
  const dia = String(hoy.getDate()).padStart(2, '0')
  return `${hoy.getFullYear()}-${mes}-${dia}`
}

// "2026-10-30" -> "30-10-2026"
export function formatearFecha(fecha) {
  return fecha.split('-').reverse().join('-')
}
