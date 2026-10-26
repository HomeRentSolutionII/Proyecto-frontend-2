// Fuente de datos simulada del blog (reemplaza a la base de datos).
// La primera vez carga el JSON inicial y desde ahí todo se guarda en
// localStorage, igual que data/propiedades.js.
import datosIniciales from '../assets/js/articulos.json'

// Si se cambian los datos iniciales del JSON, subir el número de versión.
const CLAVE = 'hrs_articulos_v1'

function guardar(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista))
}

// ===== LEER =====
export function listarArticulos() {
  const guardados = localStorage.getItem(CLAVE)
  if (guardados) {
    return JSON.parse(guardados)
  }
  guardar(datosIniciales)
  return [...datosIniciales]
}

export function obtenerArticulo(id) {
  return listarArticulos().find((articulo) => articulo.id === Number(id)) || null
}

// El "otro" artículo que se sugiere al final de uno (el siguiente, y vuelve al primero)
export function obtenerOtroArticulo(id) {
  const lista = listarArticulos()
  if (lista.length < 2) return null
  const posicion = lista.findIndex((articulo) => articulo.id === Number(id))
  return lista[(posicion + 1) % lista.length]
}

// ===== CREAR =====
export function crearArticulo(datos) {
  const lista = listarArticulos()
  const ids = lista.map((articulo) => articulo.id)
  const nuevo = { ...datos, id: Math.max(0, ...ids) + 1 }
  guardar([...lista, nuevo])
  return nuevo
}

// ===== ACTUALIZAR =====
export function actualizarArticulo(id, cambios) {
  let actualizado = null
  const lista = listarArticulos().map((articulo) => {
    if (articulo.id !== Number(id)) return articulo
    actualizado = { ...articulo, ...cambios, id: articulo.id }
    return actualizado
  })
  guardar(lista)
  return actualizado
}

// ===== ELIMINAR =====
export function eliminarArticulo(id) {
  const lista = listarArticulos()
  const restantes = lista.filter((articulo) => articulo.id !== Number(id))
  guardar(restantes)
  return restantes.length < lista.length
}

// Vuelve a los datos del JSON (útil para las pruebas)
export function restablecerArticulos() {
  guardar(datosIniciales)
}
