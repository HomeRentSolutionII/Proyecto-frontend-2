import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import TarjetaArticulo from '../components/TarjetaArticulo'
import { eliminarArticulo, listarArticulos, obtenerArticulo } from '../data/articulos'
import { listarMensajes } from '../data/mensajes'
import Blog from '../pages/Blog'
import Contacto from '../pages/Contacto'
import DetalleBlog from '../pages/DetalleBlog'
import Nosotros from '../pages/Nosotros'

describe('Nosotros', () => {
  it('Muestra la presentación, los perfiles de la plataforma y al equipo', () => {
    render(<Nosotros />)
    expect(screen.getByRole('heading', { level: 1, name: 'Nosotros' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Anfitriones' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Jhohan Ramírez' })).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(6)
  })
})

describe('TarjetaArticulo', () => {
  it('Recibe el artículo por props y enlaza a su detalle', () => {
    render(<MemoryRouter><TarjetaArticulo articulo={obtenerArticulo(2)} /></MemoryRouter>)
    expect(screen.getByRole('heading', { name: 'Cómo elegir la propiedad ideal para tu estadía' })).toBeInTheDocument()
    expect(screen.getByText('21 de septiembre de 2026')).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Living amplio con grandes ventanales y comedor')
    expect(screen.getByRole('button', { name: 'Leer publicación' })).toHaveAttribute('href', '/blog/2')
  })
})

describe('Blog', () => {
  it('Lista una tarjeta por cada publicación', () => {
    render(<MemoryRouter><Blog /></MemoryRouter>)
    expect(screen.getAllByRole('button', { name: 'Leer publicación' })).toHaveLength(listarArticulos().length)
  })

  it('Avisa cuando no hay publicaciones', () => {
    eliminarArticulo(1)
    eliminarArticulo(2)
    render(<MemoryRouter><Blog /></MemoryRouter>)
    expect(screen.getByText('Todavía no hay publicaciones.')).toBeInTheDocument()
  })
})

describe('DetalleBlog', () => {
  // MemoryRouter con initialEntries simula haber entrado a esa URL
  function renderizarEn(ruta) {
    render(
      <MemoryRouter initialEntries={[ruta]}>
        <Routes>
          <Route path="/blog/:id" element={<DetalleBlog />} />
        </Routes>
      </MemoryRouter>,
    )
  }

  it('Lee el id de la URL y muestra esa publicación completa', () => {
    renderizarEn('/blog/1')
    expect(screen.getByRole('heading', { level: 1, name: 'Cómo preparar tu propiedad antes de recibir huéspedes' })).toBeInTheDocument()
    expect(screen.getByText(/28 de septiembre de 2026/)).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'Limpieza y orden' })).toBeInTheDocument()
    expect(screen.getByText('Wi-Fi funcionando, con la clave a la vista.')).toBeInTheDocument()
  })

  it('Ofrece volver al blog y leer la otra publicación', () => {
    renderizarEn('/blog/1')
    expect(screen.getByRole('button', { name: 'Volver al blog' })).toHaveAttribute('href', '/blog')
    expect(screen.getByRole('button', { name: 'Leer otra publicación' })).toHaveAttribute('href', '/blog/2')
  })

  it('Si el id no existe, muestra el mensaje de publicación no encontrada', () => {
    renderizarEn('/blog/999')
    expect(screen.getByText('Publicación no encontrada')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Volver al blog' })).toBeInTheDocument()
  })

  it('Si queda una sola publicación, no ofrece otra para leer', () => {
    eliminarArticulo(2)
    renderizarEn('/blog/1')
    expect(screen.queryByRole('button', { name: 'Leer otra publicación' })).not.toBeInTheDocument()
  })
})

describe('Contacto', () => {
  async function llenarFormularioValido(usuario) {
    await usuario.type(screen.getByLabelText(/Nombre/), 'María Soto')
    await usuario.type(screen.getByLabelText(/Correo electrónico/), 'maria@correo.cl')
    await usuario.selectOptions(screen.getByLabelText(/Motivo/), 'reserva')
    await usuario.type(screen.getByLabelText(/Mensaje/), 'Necesito ayuda con mi reserva')
  }

  it('Al enviar vacío muestra los errores y no guarda nada', async () => {
    const usuario = userEvent.setup()
    render(<Contacto />)

    await usuario.click(screen.getByRole('button', { name: 'Enviar mensaje' }))

    expect(screen.getByText('Ingresa tu nombre.')).toBeInTheDocument()
    expect(screen.getByText('Ingresa tu correo electrónico.')).toBeInTheDocument()
    expect(screen.getByText('Selecciona el motivo de tu mensaje.')).toBeInTheDocument()
    expect(screen.getByText('Escribe tu mensaje.')).toBeInTheDocument()
    expect(screen.getByLabelText(/Nombre/)).toHaveFocus()
    expect(listarMensajes()).toHaveLength(0)
  })

  it('Revisa un campo al salir de él y corrige el error mientras se escribe', async () => {
    const usuario = userEvent.setup()
    render(<Contacto />)

    await usuario.type(screen.getByLabelText(/Correo electrónico/), 'sin-arroba')
    await usuario.tab()
    expect(screen.getByText(/Ingresa un correo válido/)).toBeInTheDocument()

    await usuario.clear(screen.getByLabelText(/Correo electrónico/))
    await usuario.type(screen.getByLabelText(/Correo electrónico/), 'ana@correo.cl')
    expect(screen.queryByText(/Ingresa un correo válido/)).not.toBeInTheDocument()
  })

  it('El teléfono es opcional, pero si se escribe se valida', async () => {
    const usuario = userEvent.setup()
    render(<Contacto />)

    await usuario.type(screen.getByLabelText(/Teléfono/), '123')
    await usuario.click(screen.getByRole('button', { name: 'Enviar mensaje' }))
    expect(screen.getByText(/8 a 11 dígitos/)).toBeInTheDocument()
  })

  it('Cuenta los caracteres del mensaje', async () => {
    const usuario = userEvent.setup()
    render(<Contacto />)
    expect(screen.getByText('0 / 500')).toBeInTheDocument()
    await usuario.type(screen.getByLabelText(/Mensaje/), 'Hola')
    expect(screen.getByText('4 / 500')).toBeInTheDocument()
  })

  it('Con datos válidos guarda el mensaje, confirma y limpia el formulario', async () => {
    const usuario = userEvent.setup()
    render(<Contacto />)

    await llenarFormularioValido(usuario)
    await usuario.click(screen.getByRole('button', { name: 'Enviar mensaje' }))

    expect(screen.getByRole('status')).toHaveTextContent('Gracias, María Soto. Recibimos tu mensaje y te responderemos a maria@correo.cl.')
    expect(screen.getByLabelText(/Nombre/)).toHaveValue('')
    expect(screen.getByText('0 / 500')).toBeInTheDocument()

    const guardados = listarMensajes()
    expect(guardados).toHaveLength(1)
    expect(guardados[0]).toMatchObject({ nombre: 'María Soto', correo: 'maria@correo.cl', motivo: 'reserva' })
  })

  it('Muestra los datos de contacto de la empresa', () => {
    render(<Contacto />)
    const datos = screen.getByRole('heading', { name: 'Datos de contacto' }).closest('.card')
    expect(within(datos).getByText(/Av. Irarrázaval 2450/)).toBeInTheDocument()
    expect(within(datos).getByRole('link')).toHaveAttribute('href', 'mailto:contacto@homerentsolution.cl')
  })
})
