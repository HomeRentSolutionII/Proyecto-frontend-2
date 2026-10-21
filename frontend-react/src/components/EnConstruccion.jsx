import { Container } from 'react-bootstrap'

// Página provisoria para las vistas que aún no se migran a React.
// Cada integrante la reemplaza por su componente en App.jsx.
function EnConstruccion({ titulo, responsable }) {
  return (
    <Container className="py-5 text-center">
      <h1 className="titulo">{titulo}</h1>
      <p className="text-muted">Vista en migración a React · a cargo de {responsable}.</p>
    </Container>
  )
}

export default EnConstruccion
