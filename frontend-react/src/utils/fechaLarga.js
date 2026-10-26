// "2026-09-28" -> "28 de septiembre de 2026"
// Se arma a mano (sin new Date) para que la zona horaria no corra el día.
const MESES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
]

export function formatearFechaLarga(fecha) {
  const [anio, mes, dia] = fecha.split('-').map(Number)
  return `${dia} de ${MESES[mes - 1]} de ${anio}`
}
