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
// así que cada una parte con los 9 datos iniciales del JSON.

describe('CRUD de propiedades', () => {
  it('Lee las 9 propiedades iniciales y busca una por id', () => {
    expect(listarPropiedades()).toHaveLength(9)
    expect(obtenerPropiedad(3).nombre).toBe('Cabaña de montaña con tinaja')
    expect(obtenerPropiedad(99)).toBeNull()
  })

  it('Crea, actualiza y elimina una propiedad', () => {
    const nueva = crearPropiedad({ nombre: 'Casa de prueba', tipo: 'Casa', ubicacion: 'Talca, Maule', precio: 50000 })
    expect(nueva.id).toBe(10)
    expect(listarPropiedades()).toHaveLength(10)

    actualizarPropiedad(10, { precio: 55000 })
    expect(obtenerPropiedad(10).precio).toBe(55000)

    expect(eliminarPropiedad(10)).toBe(true)
    expect(obtenerPropiedad(10)).toBeNull()
  })

  it('Filtra por texto, tipo y rango de precio', () => {
    const todas = listarPropiedades()
    expect(filtrarPropiedades(todas, { tipo: 'Cabaña' })).toHaveLength(2)
    expect(filtrarPropiedades(todas, { texto: 'santiago' })).toHaveLength(2)
    expect(filtrarPropiedades(todas, { precioMin: '80000', precioMax: '100000' })).toHaveLength(2)
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
