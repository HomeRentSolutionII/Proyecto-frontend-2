import { useState } from 'react'
import { Alert, Col, Container, Row } from 'react-bootstrap'
import FiltrosPropiedades from '../components/FiltrosPropiedades'
import TarjetaPropiedad from '../components/TarjetaPropiedad'
import { filtrarPropiedades, listarPropiedades } from '../data/propiedades'

const FILTROS_VACIOS = { texto: '', tipo: '', precioMin: '', precioMax: '' }

function Propiedades() {
  const [propiedades] = useState(() => listarPropiedades())
  const [filtros, setFiltros] = useState(FILTROS_VACIOS)

  // Se recalcula en cada render: cuando cambia un filtro, cambia la lista
  const resultado = filtrarPropiedades(propiedades, filtros)

  function cambiarFiltro(campo, valor) {
    setFiltros({ ...filtros, [campo]: valor })
  }

  return (
    <Container as="section" className="py-5">
      <h1 className="titulo">Propiedades disponibles</h1>
      <p className="text-muted">
        {resultado.length} de {propiedades.length} propiedades publicadas en todo Chile.
      </p>

      <FiltrosPropiedades
        filtros={filtros}
        onCambiar={cambiarFiltro}
        onLimpiar={() => setFiltros(FILTROS_VACIOS)}
      />

      {resultado.length === 0 ? (
        <Alert variant="info">No hay propiedades que coincidan con los filtros.</Alert>
      ) : (
        <Row xs={1} sm={2} lg={3} className="g-4">
          {resultado.map((propiedad) => (
            <Col key={propiedad.id}>
              <TarjetaPropiedad propiedad={propiedad} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}

export default Propiedades
