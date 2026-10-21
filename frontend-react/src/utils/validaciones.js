// Reglas de validación de los formularios (definidas en el ERS).
// Cada función devuelve un mensaje de error, o '' si el valor es válido.
import { fechaHoy } from './formato'

const DOMINIOS_PERMITIDOS = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com']

// Calcula el dígito verificador de un RUN con el algoritmo módulo 11
export function calcularDigitoVerificador(cuerpo) {
  let suma = 0
  let multiplicador = 2
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * multiplicador
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1
  }
  const resto = 11 - (suma % 11)
  if (resto === 11) return '0'
  if (resto === 10) return 'K'
  return String(resto)
}

export function validarRun(run) {
  const limpio = run.trim().toUpperCase()
  if (!limpio) return 'El RUN es obligatorio.'
  if (!/^[0-9]{6,8}[0-9K]$/.test(limpio)) {
    return 'Ingresa el RUN sin puntos ni guion, entre 7 y 9 caracteres.'
  }
  const cuerpo = limpio.slice(0, -1)
  const digito = limpio.slice(-1)
  if (calcularDigitoVerificador(cuerpo) !== digito) {
    return 'El RUN no es válido: revisa el dígito verificador.'
  }
  return ''
}

export function validarCorreo(correo) {
  const limpio = correo.trim().toLowerCase()
  if (!limpio) return 'El correo es obligatorio.'
  if (limpio.length > 100) return 'El correo puede tener máximo 100 caracteres.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(limpio)) return 'El formato del correo no es válido.'
  const dominio = limpio.split('@')[1]
  if (!DOMINIOS_PERMITIDOS.includes(dominio)) {
    return 'Solo se aceptan correos @duoc.cl, @profesor.duoc.cl y @gmail.com.'
  }
  return ''
}

export function validarClave(clave) {
  if (!clave) return 'La contraseña es obligatoria.'
  if (clave.length < 4 || clave.length > 10) return 'La contraseña debe tener entre 4 y 10 caracteres.'
  return ''
}

// Campo de texto obligatorio con largo máximo
export function validarTexto(valor, nombreCampo, maximo) {
  const limpio = valor.trim()
  if (!limpio) return `${nombreCampo} es obligatorio.`
  if (limpio.length > maximo) return `${nombreCampo} puede tener máximo ${maximo} caracteres.`
  return ''
}

export function validarFechasReserva(llegada, salida, hoy = fechaHoy()) {
  if (!llegada || !salida) return 'Selecciona la fecha de llegada y de salida.'
  if (llegada < hoy) return 'La fecha de llegada no puede ser anterior a hoy.'
  if (salida <= llegada) return 'La salida debe ser posterior a la llegada.'
  return ''
}
