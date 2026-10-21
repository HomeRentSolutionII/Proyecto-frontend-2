import { describe, expect, it } from 'vitest'
import { calcularNoches, formatearPrecio } from '../utils/formato'
import {
  calcularDigitoVerificador,
  validarClave,
  validarCorreo,
  validarFechasReserva,
  validarRun,
} from '../utils/validaciones'

describe('Validación del RUN', () => {
  it('Calcula el dígito verificador con módulo 11', () => {
    expect(calcularDigitoVerificador('21456789')).toBe('K')
    expect(calcularDigitoVerificador('11111111')).toBe('1')
  })

  it('Acepta un RUN válido, sin importar mayúsculas', () => {
    expect(validarRun('21456789K')).toBe('')
    expect(validarRun('21456789k')).toBe('')
  })

  it('Rechaza un RUN vacío, con formato incorrecto o con dígito verificador erróneo', () => {
    expect(validarRun('')).toBe('El RUN es obligatorio.')
    expect(validarRun('21.456.789-K')).toContain('sin puntos ni guion')
    expect(validarRun('214567891')).toContain('dígito verificador')
  })
})

describe('Validación de correo y contraseña', () => {
  it('Acepta solo los dominios permitidos', () => {
    expect(validarCorreo('ana@duoc.cl')).toBe('')
    expect(validarCorreo('profe@profesor.duoc.cl')).toBe('')
    expect(validarCorreo('ana@gmail.com')).toBe('')
    expect(validarCorreo('ana@hotmail.com')).toContain('Solo se aceptan')
    expect(validarCorreo('ana.gmail.com')).toBe('El formato del correo no es válido.')
  })

  it('Exige una contraseña de entre 4 y 10 caracteres', () => {
    expect(validarClave('')).toBe('La contraseña es obligatoria.')
    expect(validarClave('abc')).not.toBe('')
    expect(validarClave('abcd')).toBe('')
    expect(validarClave('12345678901')).not.toBe('')
  })
})

describe('Fechas y formato', () => {
  it('Valida que la salida sea posterior a la llegada', () => {
    const hoy = '2026-10-21'
    expect(validarFechasReserva('', '', hoy)).not.toBe('')
    expect(validarFechasReserva('2026-10-20', '2026-10-25', hoy)).toContain('anterior a hoy')
    expect(validarFechasReserva('2026-10-25', '2026-10-25', hoy)).toContain('posterior a la llegada')
    expect(validarFechasReserva('2026-10-25', '2026-10-28', hoy)).toBe('')
  })

  it('Calcula noches y da formato chileno a los precios', () => {
    expect(calcularNoches('2026-10-25', '2026-10-29')).toBe(4)
    expect(calcularNoches('2026-10-29', '2026-10-25')).toBe(0)
    expect(formatearPrecio(68000)).toBe('$68.000')
  })
})
