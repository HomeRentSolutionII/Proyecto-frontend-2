// Mensajes enviados desde el formulario de Contacto, guardados en localStorage.
// Así el envío "persiste" aunque todavía no exista un backend; más adelante
// esta capa se reemplaza por una llamada al microservicio.
import { fechaHoy } from '../utils/formato'

const CLAVE = 'hrs_mensajes'

function guardar(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista))
}

// ===== LEER =====
export function listarMensajes() {
  const guardados = localStorage.getItem(CLAVE)
  return guardados ? JSON.parse(guardados) : []
}

// ===== CREAR =====
// Recibe { nombre, correo, telefono, motivo, mensaje } y devuelve el mensaje guardado.
export function guardarMensaje(datos) {
  const lista = listarMensajes()
  const ids = lista.map((mensaje) => mensaje.id)
  const nuevo = { ...datos, id: Math.max(0, ...ids) + 1, fecha: fechaHoy() }
  guardar([...lista, nuevo])
  return nuevo
}

// ===== ELIMINAR =====
export function eliminarMensaje(id) {
  const lista = listarMensajes()
  const restantes = lista.filter((mensaje) => mensaje.id !== Number(id))
  guardar(restantes)
  return restantes.length < lista.length
}
