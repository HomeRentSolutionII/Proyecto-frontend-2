import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import Reservas from '../pages/Reservas'

const reservasDePrueba = [
  { id: 1, nombre: 'Loft céntrico', ubicacion: 'Providencia, Santiago', imagen: '', precio: 54000,
    llegada: '2026-11-02', salida: '2026-11-04', noches: 2 },
  { id: 2, nombre: 'Cabaña frente al lago', ubicacion: 'Puerto Varas, Los Lagos', imagen: '', precio: 79000,
    llegada: '2026-11-10', salida: '2026-11-13', noches: 3 },
]

function renderizar(props) {
  render(
    <MemoryRouter>
      <Reservas reservas={[]} usuario={null} onQuitar={vi.fn()} onConfirmar={vi.fn()} {...props} />
    </MemoryRouter>,
  )
}

describe('Página Mis reservas', () => {
  it('Sin reservas muestra un aviso en lugar de la tabla', () => {
    renderizar()
    expect(screen.getByText('Todavía no agregas propiedades a tus reservas.')).toBeInTheDocument()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })

  it('Lista las reservas recibidas y calcula el total con comisión', () => {
    renderizar({ reservas: reservasDePrueba })

    expect(screen.getAllByRole('row')).toHaveLength(3) // encabezado + 2 reservas
    expect(screen.getByText('Subtotal (2 propiedades)')).toBeInTheDocument()
    expect(screen.getByText('$345.000')).toBeInTheDocument() // 108.000 + 237.000
    expect(screen.getByText('$362.250')).toBeInTheDocument() // + 5% de comisión
  })

  it('Al pulsar Quitar llama a onQuitar con el id de esa reserva', async () => {
    const usuario = userEvent.setup()
    const onQuitar = vi.fn()
    renderizar({ reservas: reservasDePrueba, onQuitar })

    await usuario.click(screen.getByRole('button', { name: 'Quitar Cabaña frente al lago' }))

    expect(onQuitar).toHaveBeenCalledWith(2)
  })

  it('Sin sesión, el botón Confirmar lleva a iniciar sesión', () => {
    renderizar({ reservas: reservasDePrueba })

    expect(screen.getByText('Necesitas iniciar sesión para confirmar.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Confirmar reserva' })).toHaveAttribute('href', '/login')
  })

  it('Con sesión, Confirmar llama a onConfirmar', async () => {
    const usuario = userEvent.setup()
    const onConfirmar = vi.fn()
    renderizar({ reservas: reservasDePrueba, usuario: { nombre: 'Ana' }, onConfirmar })

    await usuario.click(screen.getByRole('button', { name: 'Confirmar reserva' }))

    expect(onConfirmar).toHaveBeenCalledTimes(1)
  })
})
