// Reglas de validación del formulario de Contacto (RF-06 y RF-07 del ERS).
// Cada función devuelve un mensaje de error, o '' si el valor es válido.

export const LIMITE_MENSAJE = 500

export const MOTIVOS = [
  { valor: 'consulta', texto: 'Consulta sobre una propiedad' },
  { valor: 'publicar', texto: 'Quiero publicar mi propiedad' },
  { valor: 'reserva', texto: 'Ayuda con una reserva' },
  { valor: 'sugerencia', texto: 'Sugerencias o comentarios' },
  { valor: 'otro', texto: 'Otro' },
]

export function validarNombre(valor) {
  const nombre = valor.trim()
  if (!nombre) return 'Ingresa tu nombre.'
  if (nombre.length < 3) return 'El nombre debe tener al menos 3 caracteres.'
  if (!/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]+$/.test(nombre)) return 'El nombre solo puede tener letras y espacios.'
  return ''
}

// En Contacto escribe cualquier visitante, por eso aquí no se restringe el dominio.
export function validarCorreoContacto(valor) {
  const correo = valor.trim()
  if (!correo) return 'Ingresa tu correo electrónico.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo)) {
    return 'Ingresa un correo válido, por ejemplo nombre@correo.cl.'
  }
  return ''
}

// El teléfono es opcional: solo se valida si la persona lo escribe.
export function validarTelefono(valor) {
  const telefono = valor.trim()
  if (!telefono) return ''
  const digitos = telefono.replace(/[\s()+-]/g, '')
  if (!/^\d{8,11}$/.test(digitos)) {
    return 'Ingresa un teléfono de 8 a 11 dígitos, por ejemplo +56 9 1234 5678.'
  }
  return ''
}

export function validarMotivo(valor) {
  return valor ? '' : 'Selecciona el motivo de tu mensaje.'
}

export function validarMensaje(valor) {
  const mensaje = valor.trim()
  if (!mensaje) return 'Escribe tu mensaje.'
  if (mensaje.length < 10) return 'El mensaje debe tener al menos 10 caracteres.'
  return ''
}

// Revisa todos los campos y devuelve un objeto solo con los que tienen error
export function validarContacto(datos) {
  const errores = {
    nombre: validarNombre(datos.nombre),
    correo: validarCorreoContacto(datos.correo),
    telefono: validarTelefono(datos.telefono),
    motivo: validarMotivo(datos.motivo),
    mensaje: validarMensaje(datos.mensaje),
  }
  return Object.fromEntries(Object.entries(errores).filter(([, texto]) => texto))
}
