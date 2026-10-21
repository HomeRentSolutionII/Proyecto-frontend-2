import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import TarjetaPropiedad from '../components/TarjetaPropiedad'

const propiedadDePrueba = {
  id: 7,
  nombre: 'Casa de prueba',
  tipo: 'Casa',
  ubicacion: 'Talca, Maule',
  precio: 45000,
  imagen: '/img/img-tarjeta-1.avif',
  alt: 'Foto de la casa de prueba',
}

describe('TarjetaPropiedad', () => {
  it('Muestra los datos que recibe por props', () => {
    // MemoryRouter es necesario porque la tarjeta usa <Link>.
    // React Bootstrap le da role="button" al enlace con forma de botón.
    render(
      <MemoryRouter>
        <TarjetaPropiedad propiedad={propiedadDePrueba} />
      </MemoryRouter>,
    )

    expect(screen.getByText('Casa de prueba')).toBeInTheDocument()
    expect(screen.getByText('Talca, Maule')).toBeInTheDocument()
    expect(screen.getByText('$45.000')).toBeInTheDocument()
    expect(screen.getByAltText('Foto de la casa de prueba')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Ver detalle' })).toHaveAttribute('href', '/propiedades/7')
  })
})
