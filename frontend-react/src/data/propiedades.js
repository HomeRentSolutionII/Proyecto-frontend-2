// Fuente de datos simulada de propiedades (reemplaza a la base de datos).
// La primera vez carga el JSON inicial y desde ahí todo se guarda en
// localStorage, así los cambios se mantienen al recargar la página.
import datosIniciales from '../assets/js/propiedades.json'

const CLAVE = 'hrs_propiedades'

function guardar(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista))
}

// ===== LEER =====
export function listarPropiedades() {
  const guardadas = localStorage.getItem(CLAVE)
  if (guardadas) {
    return JSON.parse(guardadas)
  }
  guardar(datosIniciales)
  return [...datosIniciales]
}

export function obtenerPropiedad(id) {
  return listarPropiedades().find((propiedad) => propiedad.id === Number(id)) || null
}

// ===== CREAR =====
export function crearPropiedad(datos) {
  const lista = listarPropiedades()
  const ids = lista.map((propiedad) => propiedad.id)
  const nueva = { ...datos, id: Math.max(0, ...ids) + 1 }
  guardar([...lista, nueva])
  return nueva
}

// ===== ACTUALIZAR =====
export function actualizarPropiedad(id, cambios) {
  let actualizada = null
  const lista = listarPropiedades().map((propiedad) => {
    if (propiedad.id !== Number(id)) return propiedad
    actualizada = { ...propiedad, ...cambios, id: propiedad.id }
    return actualizada
  })
  guardar(lista)
  return actualizada
}

// ===== ELIMINAR =====
export function eliminarPropiedad(id) {
  const lista = listarPropiedades()
  const restantes = lista.filter((propiedad) => propiedad.id !== Number(id))
  guardar(restantes)
  return restantes.length < lista.length
}

// Vuelve a los datos del JSON (útil para el panel de administración y las pruebas)
export function restablecerPropiedades() {
  guardar(datosIniciales)
}

// ===== FILTROS =====
// No modifica los datos: recibe una lista y devuelve solo las que cumplen.
export function filtrarPropiedades(lista, filtros) {
  const texto = (filtros.texto || '').trim().toLowerCase()
  const minimo = Number(filtros.precioMin) || 0
  const maximo = Number(filtros.precioMax) || Infinity

  return lista.filter((propiedad) => {
    const coincideTexto =
      propiedad.nombre.toLowerCase().includes(texto) ||
      propiedad.ubicacion.toLowerCase().includes(texto)
    const coincideTipo = !filtros.tipo || propiedad.tipo === filtros.tipo
    const coincidePrecio = propiedad.precio >= minimo && propiedad.precio <= maximo
    return coincideTexto && coincideTipo && coincidePrecio
  })
}

export const TIPOS_PROPIEDAD = ['Departamento', 'Casa', 'Cabaña', 'Loft', 'Parcela']
