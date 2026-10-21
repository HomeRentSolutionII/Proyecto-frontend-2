import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import Propiedades from '../pages/Propiedades'

function renderizar() {
  render(
    <MemoryRouter>
      <Propiedades />
    </MemoryRouter>,
  )
}

describe('Página Propiedades', () => {
  it('Renderiza una tarjeta por cada propiedad del archivo de datos', () => {
    renderizar()
    expect(screen.getAllByRole('button', { name: 'Ver detalle' })).toHaveLength(20)
  })

  it('Al elegir un tipo, muestra solo las propiedades de ese tipo', async () => {
    const usuario = userEvent.setup()
    renderizar()

    await usuario.selectOptions(screen.getByLabelText('Tipo de propiedad'), 'Cabaña')

    expect(screen.getAllByRole('button', { name: 'Ver detalle' })).toHaveLength(4)
    expect(screen.getByText('Cabaña frente al lago')).toBeInTheDocument()
    expect(screen.queryByText('Loft céntrico para profesionales')).not.toBeInTheDocument()
  })

  it('Muestra un aviso cuando ninguna propiedad coincide, y Limpiar filtros las recupera', async () => {
    const usuario = userEvent.setup()
    renderizar()

    expect(screen.queryByText(/No hay propiedades/)).not.toBeInTheDocument()

    await usuario.type(screen.getByLabelText('Ubicación o nombre'), 'Antártica')
    expect(screen.getByText(/No hay propiedades/)).toBeInTheDocument()

    await usuario.click(screen.getByRole('button', { name: 'Limpiar filtros' }))
    expect(screen.getAllByRole('button', { name: 'Ver detalle' })).toHaveLength(20)
  })
})
