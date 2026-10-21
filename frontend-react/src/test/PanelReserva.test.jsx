import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import PanelReserva from '../components/PanelReserva'
import { fechaHoy } from '../utils/formato'

const propiedad = {
  id: 1,
  nombre: 'Departamento con vista al mar',
  ubicacion: 'Viña del Mar, Valparaíso',
  imagen: '/img/img-tarjeta-1.avif',
  precio: 68000,
  capacidad: 4,
}

// Fecha "AAAA-MM-DD" a cierta cantidad de días desde hoy
function enDias(dias) {
  const fecha = new Date(fechaHoy() + 'T12:00:00')
  fecha.setDate(fecha.getDate() + dias)
  return fecha.toISOString().slice(0, 10)
}

describe('PanelReserva', () => {
  it('Muestra el error solo cuando se envía sin fechas, y no llama a onAgregar', async () => {
    const usuario = userEvent.setup()
    const onAgregar = vi.fn() // función simulada (mock) que reemplaza a la real
    render(<PanelReserva propiedad={propiedad} onAgregar={onAgregar} />)

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()

    await usuario.click(screen.getByRole('button', { name: 'Agregar a mis reservas' }))

    expect(screen.getByRole('alert')).toHaveTextContent('Selecciona la fecha de llegada y de salida.')
    expect(onAgregar).not.toHaveBeenCalled()
  })

  it('Calcula el total y entrega la reserva al padre mediante onAgregar', async () => {
    const usuario = userEvent.setup()
    const onAgregar = vi.fn()
    render(<PanelReserva propiedad={propiedad} onAgregar={onAgregar} />)

    fireEvent.change(screen.getByLabelText('Llegada'), { target: { value: enDias(1) } })
    fireEvent.change(screen.getByLabelText('Salida'), { target: { value: enDias(5) } })
    await usuario.selectOptions(screen.getByLabelText('Huéspedes'), '2')

    expect(screen.getByText('$68.000 x 4 noches')).toBeInTheDocument()
    expect(screen.getByText('$285.600')).toBeInTheDocument() // 272.000 + 5% de comisión

    await usuario.click(screen.getByRole('button', { name: 'Agregar a mis reservas' }))

    expect(onAgregar).toHaveBeenCalledTimes(1)
    expect(onAgregar).toHaveBeenCalledWith(
      expect.objectContaining({ propiedadId: 1, noches: 4, huespedes: 2, precio: 68000 }),
    )
  })
})
