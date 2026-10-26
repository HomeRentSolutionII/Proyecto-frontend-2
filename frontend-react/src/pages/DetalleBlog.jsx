import { Badge, Button, Container } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { obtenerArticulo, obtenerOtroArticulo } from '../data/articulos'
import { formatearFechaLarga } from '../utils/fechaLarga'
import '../contenido.css'

// Dibuja un bloque del contenido del artículo según su tipo (párrafo, subtítulo o lista)
function Bloque({ bloque }) {
  if (bloque.tipo === 'h2') return <h2>{bloque.texto}</h2>
  if (bloque.tipo === 'ul') {
    return (
      <ul>
        {bloque.items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    )
  }
  return <p>{bloque.texto}</p>
}

// El id del artículo viene en la URL: /blog/:id
function DetalleBlog() {
  const { id } = useParams()
  const articulo = obtenerArticulo(id)

  if (!articulo) {
    return (
      <Container className="py-5 text-center">
        <h1 className="titulo">Publicación no encontrada</h1>
        <p className="text-muted">La publicación que buscas no existe o fue retirada.</p>
        <Button as={Link} to="/blog" variant="primary">Volver al blog</Button>
      </Container>
    )
  }

  const otro = obtenerOtroArticulo(articulo.id)

  return (
    <Container as="section" className="py-5">
      <article className="articulo">
        <Badge bg="secondary" className="mb-2">{articulo.categoria}</Badge>
        <h1 className="titulo d-block">{articulo.titulo}</h1>
        <p className="meta-articulo">{formatearFechaLarga(articulo.fecha)} &middot; {articulo.autor}</p>

        <img className="articulo-imagen" src={articulo.imagen} alt={articulo.alt} />

        {articulo.contenido.map((bloque, posicion) => (
          <Bloque key={posicion} bloque={bloque} />
        ))}

        <div className="d-flex flex-wrap gap-2 mt-4">
          <Button as={Link} to="/blog" variant="dark">Volver al blog</Button>
          {otro && (
            <Button as={Link} to={`/blog/${otro.id}`} variant="primary">Leer otra publicación</Button>
          )}
        </div>
      </article>
    </Container>
  )
}

export default DetalleBlog
