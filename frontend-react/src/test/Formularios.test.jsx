import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import Login from '../pages/Login'
import Registro from '../pages/Registro'

describe('Formulario de inicio de sesión', () => {
  it('Muestra un error si las credenciales no corresponden a ningún usuario', async () => {
    const usuario = userEvent.setup()
    const onIniciarSesion = vi.fn()
    render(<MemoryRouter><Login onIniciarSesion={onIniciarSesion} /></MemoryRouter>)

    await usuario.type(screen.getByLabelText(/Correo electrónico/), 'nadie@gmail.com')
    await usuario.type(screen.getByLabelText(/Contraseña/), 'clave1')
    await usuario.click(screen.getByRole('button', { name: 'Ingresar' }))

    expect(screen.getByText('Correo o contraseña incorrectos.')).toBeInTheDocument()
    expect(onIniciarSesion).not.toHaveBeenCalled()
  })

  it('Con credenciales válidas llama a onIniciarSesion con el usuario', async () => {
    const usuario = userEvent.setup()
    const onIniciarSesion = vi.fn()
    render(<MemoryRouter><Login onIniciarSesion={onIniciarSesion} /></MemoryRouter>)

    // Usuario administrador de prueba definido en data/usuarios.js
    await usuario.type(screen.getByLabelText(/Correo electrónico/), 'admin@duoc.cl')
    await usuario.type(screen.getByLabelText(/Contraseña/), 'admin123')
    await usuario.click(screen.getByRole('button', { name: 'Ingresar' }))

    expect(onIniciarSesion).toHaveBeenCalledWith(expect.objectContaining({ tipo: 'Administrador' }))
  })
})

describe('Formulario de registro', () => {
  it('Actualiza el estado del campo cuando el usuario escribe', async () => {
    const usuario = userEvent.setup()
    render(<MemoryRouter><Registro /></MemoryRouter>)

    const campoNombre = screen.getByLabelText(/^Nombre/)
    await usuario.type(campoNombre, 'Víctor')

    expect(campoNombre).toHaveValue('Víctor')
  })

  it('Al enviar vacío muestra los errores de los campos obligatorios', async () => {
    const usuario = userEvent.setup()
    render(<MemoryRouter><Registro /></MemoryRouter>)

    expect(screen.queryByText('El RUN es obligatorio.')).not.toBeInTheDocument()

    await usuario.click(screen.getByRole('button', { name: 'Crear cuenta' }))

    expect(screen.getByText('El RUN es obligatorio.')).toBeInTheDocument()
    expect(screen.getByText('El correo es obligatorio.')).toBeInTheDocument()
    expect(screen.getByText('Selecciona una región.')).toBeInTheDocument()
  })

  it('Las comunas dependen de la región seleccionada', async () => {
    const usuario = userEvent.setup()
    render(<MemoryRouter><Registro /></MemoryRouter>)

    const comunas = screen.getByLabelText(/^Comuna/)
    expect(comunas).toBeDisabled()

    await usuario.selectOptions(screen.getByLabelText(/^Región/), 'Biobío')

    expect(comunas).toBeEnabled()
    expect(screen.getByRole('option', { name: 'Concepción' })).toBeInTheDocument()
    expect(screen.queryByRole('option', { name: 'Ñuñoa' })).not.toBeInTheDocument()
  })
})
