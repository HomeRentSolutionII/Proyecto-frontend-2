import { describe, expect, it } from 'vitest'
import {
  actualizarArticulo,
  crearArticulo,
  eliminarArticulo,
  listarArticulos,
  obtenerArticulo,
  obtenerOtroArticulo,
  restablecerArticulos,
} from '../data/articulos'
import { eliminarMensaje, guardarMensaje, listarMensajes } from '../data/mensajes'
import { formatearFechaLarga } from '../utils/fechaLarga'
import {
  validarContacto,
  validarCorreoContacto,
  validarMensaje,
  validarMotivo,
  validarNombre,
  validarTelefono,
} from '../utils/validacionesContacto'

// setup.js borra localStorage después de cada prueba,
// así que cada una parte con los 2 artículos iniciales del JSON.

describe('CRUD de artículos del blog', () => {
  it('Lee los artículos iniciales y busca uno por id', () => {
    expect(listarArticulos()).toHaveLength(2)
    expect(obtenerArticulo(1).categoria).toBe('Para anfitriones')
    expect(obtenerArticulo('2').categoria).toBe('Para inquilinos')
    expect(obtenerArticulo(99)).toBeNull()
  })

  it('Crea, actualiza y elimina un artículo', () => {
    const nuevo = crearArticulo({ titulo: 'Prueba', categoria: 'Para anfitriones', fecha: '2026-10-01', contenido: [] })
    expect(nuevo.id).toBe(3)
    expect(listarArticulos()).toHaveLength(3)

    actualizarArticulo(3, { titulo: 'Título nuevo' })
    expect(obtenerArticulo(3).titulo).toBe('Título nuevo')
    expect(actualizarArticulo(99, { titulo: 'x' })).toBeNull()

    expect(eliminarArticulo(3)).toBe(true)
    expect(eliminarArticulo(3)).toBe(false)
    expect(obtenerArticulo(3)).toBeNull()
  })

  it('Los cambios se mantienen guardados y se pueden restablecer', () => {
    eliminarArticulo(1)
    expect(listarArticulos()).toHaveLength(1)
    restablecerArticulos()
    expect(listarArticulos()).toHaveLength(2)
  })

  it('Sugiere el otro artículo, o ninguno si queda uno solo', () => {
    expect(obtenerOtroArticulo(1).id).toBe(2)
    expect(obtenerOtroArticulo(2).id).toBe(1)
    eliminarArticulo(2)
    expect(obtenerOtroArticulo(1)).toBeNull()
  })

  it('Escribe la fecha larga sin correr el día por la zona horaria', () => {
    expect(formatearFechaLarga('2026-09-28')).toBe('28 de septiembre de 2026')
    expect(formatearFechaLarga('2026-01-01')).toBe('1 de enero de 2026')
  })
})

describe('Mensajes de contacto', () => {
  const datos = { nombre: 'María Soto', correo: 'maria@correo.cl', telefono: '', motivo: 'consulta', mensaje: 'Hola, tengo una duda.' }

  it('Guarda un mensaje con id y fecha, y lo lista', () => {
    expect(listarMensajes()).toEqual([])
    const guardado = guardarMensaje(datos)
    expect(guardado.id).toBe(1)
    expect(guardado.fecha).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(guardarMensaje(datos).id).toBe(2)
    expect(listarMensajes()).toHaveLength(2)
  })

  it('Elimina un mensaje por id', () => {
    guardarMensaje(datos)
    expect(eliminarMensaje(1)).toBe(true)
    expect(eliminarMensaje(1)).toBe(false)
    expect(listarMensajes()).toEqual([])
  })
})

describe('Validación del formulario de contacto', () => {
  it('Nombre: obligatorio, mínimo 3 caracteres y solo letras', () => {
    expect(validarNombre('')).toBe('Ingresa tu nombre.')
    expect(validarNombre('Al')).toContain('al menos 3')
    expect(validarNombre('Ana123')).toContain('solo puede tener letras')
    expect(validarNombre('María José Núñez')).toBe('')
  })

  it('Correo: obligatorio y con formato válido, de cualquier dominio', () => {
    expect(validarCorreoContacto('')).toBe('Ingresa tu correo electrónico.')
    expect(validarCorreoContacto('ana.correo.cl')).toContain('correo válido')
    expect(validarCorreoContacto('ana@hotmail.com')).toBe('')
  })

  it('Teléfono: opcional, pero si se escribe debe tener de 8 a 11 dígitos', () => {
    expect(validarTelefono('')).toBe('')
    expect(validarTelefono('+56 9 1234 5678')).toBe('')
    expect(validarTelefono('1234')).toContain('8 a 11 dígitos')
    expect(validarTelefono('abc')).toContain('8 a 11 dígitos')
  })

  it('Motivo y mensaje: obligatorios, y el mensaje con al menos 10 caracteres', () => {
    expect(validarMotivo('')).toBe('Selecciona el motivo de tu mensaje.')
    expect(validarMotivo('otro')).toBe('')
    expect(validarMensaje('   ')).toBe('Escribe tu mensaje.')
    expect(validarMensaje('Hola')).toContain('al menos 10')
    expect(validarMensaje('Necesito ayuda con mi reserva')).toBe('')
  })

  it('validarContacto devuelve solo los campos con error', () => {
    const errores = validarContacto({ nombre: '', correo: 'ana@correo.cl', telefono: '', motivo: '', mensaje: 'corto' })
    expect(Object.keys(errores).sort()).toEqual(['mensaje', 'motivo', 'nombre'])
    expect(validarContacto({ nombre: 'Ana Pérez', correo: 'ana@correo.cl', telefono: '', motivo: 'otro', mensaje: 'Mensaje suficientemente largo' })).toEqual({})
  })
})
