import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import Encabezado from '../components/Encabezado'
import DetallePropiedad from '../pages/DetallePropiedad'

describe('Encabezado', () => {
  it('Muestra la cantidad de reservas y el botón Ingresar si no hay sesión', () => {
    render(<MemoryRouter><Encabezado cantidadReservas={3} usuario={null} onCerrarSesion={vi.fn()} /></MemoryRouter>)

    expect(screen.getByRole('button', { name: 'Mis reservas 3' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Ingresar' })).toBeInTheDocument()
    expect(screen.queryByText('Panel admin')).not.toBeInTheDocument()
  })

  it('Con un administrador muestra su nombre, el panel y cierra sesión con Salir', async () => {
    const usuario = userEvent.setup()
    const onCerrarSesion = vi.fn()
    const admin = { nombre: 'Administrador', tipo: 'Administrador' }
    render(<MemoryRouter><Encabezado cantidadReservas={0} usuario={admin} onCerrarSesion={onCerrarSesion} /></MemoryRouter>)

    expect(screen.getByText('Hola, Administrador')).toBeInTheDocument()
    expect(screen.getByText('Panel admin')).toBeInTheDocument()

    await usuario.click(screen.getByRole('button', { name: 'Salir' }))
    expect(onCerrarSesion).toHaveBeenCalledTimes(1)
  })
})

describe('DetallePropiedad', () => {
  // MemoryRouter con initialEntries simula haber entrado a esa URL
  function renderizarEn(ruta) {
    render(
      <MemoryRouter initialEntries={[ruta]}>
        <Routes>
          <Route path="/propiedades/:id" element={<DetallePropiedad onAgregarReserva={vi.fn()} />} />
        </Routes>
      </MemoryRouter>,
    )
  }

  it('Lee el id de la URL y muestra esa propiedad', () => {
    renderizarEn('/propiedades/3')
    expect(screen.getByRole('heading', { level: 1, name: 'Cabaña de montaña con tinaja' })).toBeInTheDocument()
    expect(screen.getByText('Tinaja')).toBeInTheDocument()
  })

  it('Si el id no existe, muestra el mensaje de propiedad no encontrada', () => {
    renderizarEn('/propiedades/999')
    expect(screen.getByText('Propiedad no encontrada')).toBeInTheDocument()
  })
})
