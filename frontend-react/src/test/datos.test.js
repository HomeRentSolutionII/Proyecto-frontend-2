import { describe, expect, it } from 'vitest'
import {
  actualizarPropiedad,
  crearPropiedad,
  eliminarPropiedad,
  filtrarPropiedades,
  listarPropiedades,
  obtenerPropiedad,
} from '../data/propiedades'
import {
  agregarReserva,
  calcularComision,
  calcularSubtotal,
  obtenerReservas,
  quitarReserva,
} from '../data/reservas'
import { registrarUsuario, validarCredenciales } from '../data/usuarios'

// setup.js borra localStorage después de cada prueba,
// así que cada una parte con los 20 datos iniciales del JSON.

describe('CRUD de propiedades', () => {
  it('Lee las 20 propiedades iniciales y busca una por id', () => {
    expect(listarPropiedades()).toHaveLength(20)
    expect(obtenerPropiedad(3).nombre).toBe('Cabaña de montaña con tinaja')
    expect(obtenerPropiedad(99)).toBeNull()
  })

  it('Crea, actualiza y elimina una propiedad', () => {
    const nueva = crearPropiedad({ nombre: 'Casa de prueba', tipo: 'Casa', ubicacion: 'Talca, Maule', precio: 50000 })
    expect(nueva.id).toBe(21)
    expect(listarPropiedades()).toHaveLength(21)

    actualizarPropiedad(21, { precio: 55000 })
    expect(obtenerPropiedad(21).precio).toBe(55000)

    expect(eliminarPropiedad(21)).toBe(true)
    expect(obtenerPropiedad(21)).toBeNull()
  })

  it('Filtra por texto, tipo y rango de precio', () => {
    const todas = listarPropiedades()
    expect(filtrarPropiedades(todas, { tipo: 'Cabaña' })).toHaveLength(4)
    expect(filtrarPropiedades(todas, { texto: 'santiago' })).toHaveLength(3)
    expect(filtrarPropiedades(todas, { precioMin: '80000', precioMax: '100000' })).toHaveLength(5)
  })
})

describe('Reservas y usuarios', () => {
  it('Agrega y quita reservas, y calcula subtotal y comisión del 5%', () => {
    const lista = agregarReserva({ nombre: 'Loft', precio: 54000, noches: 2 })
    expect(obtenerReservas()).toHaveLength(1)
    expect(calcularSubtotal(lista)).toBe(108000)
    expect(calcularComision(108000)).toBe(5400)

    quitarReserva(lista[0].id)
    expect(obtenerReservas()).toHaveLength(0)
  })

  it('Registra un usuario, no permite correos repetidos y valida sus credenciales', () => {
    const usuario = registrarUsuario({ nombre: 'Ana', correo: 'Ana@gmail.com', clave: 'clave1' })
    expect(usuario.correo).toBe('ana@gmail.com')
    expect(usuario.tipo).toBe('Cliente')
    expect(registrarUsuario({ nombre: 'Otra', correo: 'ana@gmail.com', clave: 'x1234' })).toBeNull()

    expect(validarCredenciales('ana@gmail.com', 'clave1').nombre).toBe('Ana')
    expect(validarCredenciales('ana@gmail.com', 'incorrecta')).toBeNull()
  })
})
