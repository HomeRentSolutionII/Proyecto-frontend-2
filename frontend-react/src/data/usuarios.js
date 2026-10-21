// Usuarios registrados y sesión activa, guardados en localStorage.
// Es una simulación: en la Parcial 3 esto lo resuelve el backend.

const CLAVE_USUARIOS = 'hrs_usuarios'
const CLAVE_SESION = 'hrs_sesion'

// Usuario de prueba para entrar al panel de administración
const USUARIOS_INICIALES = [
  {
    id: 1,
    run: '111111111',
    nombre: 'Administrador',
    apellidos: 'Home Rent',
    correo: 'admin@duoc.cl',
    clave: 'admin123',
    tipo: 'Administrador',
  },
]

// Correo y contraseña del administrador de prueba (para el botón del login)
export const ADMIN_PRUEBA = {
  correo: USUARIOS_INICIALES[0].correo,
  clave: USUARIOS_INICIALES[0].clave,
}

function guardar(lista) {
  localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(lista))
}

// ===== CRUD =====
export function listarUsuarios() {
  const guardados = localStorage.getItem(CLAVE_USUARIOS)
  if (guardados) {
    return JSON.parse(guardados)
  }
  guardar(USUARIOS_INICIALES)
  return [...USUARIOS_INICIALES]
}

export function obtenerUsuarioPorCorreo(correo) {
  const buscado = correo.trim().toLowerCase()
  return listarUsuarios().find((usuario) => usuario.correo === buscado) || null
}

// Devuelve el usuario creado, o null si el correo ya estaba registrado
export function registrarUsuario(datos) {
  if (obtenerUsuarioPorCorreo(datos.correo)) {
    return null
  }
  const lista = listarUsuarios()
  const nuevo = {
    ...datos,
    correo: datos.correo.trim().toLowerCase(),
    tipo: datos.tipo || 'Cliente',
    id: Math.max(0, ...lista.map((usuario) => usuario.id)) + 1,
  }
  guardar([...lista, nuevo])
  return nuevo
}

export function actualizarUsuario(id, cambios) {
  let actualizado = null
  const lista = listarUsuarios().map((usuario) => {
    if (usuario.id !== Number(id)) return usuario
    actualizado = { ...usuario, ...cambios, id: usuario.id }
    return actualizado
  })
  guardar(lista)
  return actualizado
}

export function eliminarUsuario(id) {
  const lista = listarUsuarios()
  const restantes = lista.filter((usuario) => usuario.id !== Number(id))
  guardar(restantes)
  return restantes.length < lista.length
}

// ===== SESIÓN =====
// Devuelve el usuario si el correo y la contraseña coinciden, si no null
export function validarCredenciales(correo, clave) {
  const usuario = obtenerUsuarioPorCorreo(correo)
  return usuario && usuario.clave === clave ? usuario : null
}

export function obtenerSesion() {
  const sesion = localStorage.getItem(CLAVE_SESION)
  return sesion ? JSON.parse(sesion) : null
}

export function guardarSesion(usuario) {
  // La contraseña no se guarda en la sesión
  const datosPublicos = { ...usuario }
  delete datosPublicos.clave
  localStorage.setItem(CLAVE_SESION, JSON.stringify(datosPublicos))
  return datosPublicos
}

export function cerrarSesion() {
  localStorage.removeItem(CLAVE_SESION)
}
