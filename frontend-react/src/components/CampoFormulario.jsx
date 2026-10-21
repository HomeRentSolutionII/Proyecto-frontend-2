import { Form } from 'react-bootstrap'

// Envoltorio para un campo de formulario: etiqueta asociada (controlId),
// asterisco si es obligatorio, y debajo el error o el texto de ayuda.
// El campo en sí (Form.Control o Form.Select) se pasa como children.
function CampoFormulario({ id, etiqueta, obligatorio, ayuda, error, children }) {
  return (
    <Form.Group className="mb-3" controlId={id}>
      <Form.Label>
        {etiqueta} {obligatorio && <span className="text-danger">*</span>}
      </Form.Label>

      {children}

      {error ? (
        <div className="invalid-feedback d-block">{error}</div>
      ) : (
        ayuda && <Form.Text muted>{ayuda}</Form.Text>
      )}
    </Form.Group>
  )
}

export default CampoFormulario
