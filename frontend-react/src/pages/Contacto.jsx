import { useState } from 'react'
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import CampoFormulario from '../components/CampoFormulario'
import { guardarMensaje } from '../data/mensajes'
import {
  LIMITE_MENSAJE,
  MOTIVOS,
  validarContacto,
  validarCorreoContacto,
  validarMensaje,
  validarMotivo,
  validarNombre,
  validarTelefono,
} from '../utils/validacionesContacto'
import '../contenido.css'

const FORMULARIO_VACIO = { nombre: '', correo: '', telefono: '', motivo: '', mensaje: '' }

// Regla de cada campo, para revisarlo por separado mientras la persona escribe
const REGLAS = {
  nombre: validarNombre,
  correo: validarCorreoContacto,
  telefono: validarTelefono,
  motivo: validarMotivo,
  mensaje: validarMensaje,
}

function Contacto() {
  const [datos, setDatos] = useState(FORMULARIO_VACIO)
  const [errores, setErrores] = useState({})
  const [tocados, setTocados] = useState({}) // campos que la persona ya revisó
  const [confirmacion, setConfirmacion] = useState('')

  // Revisa un solo campo y deja su error (o lo borra) en el estado
  function revisarCampo(nombre, valor) {
    setErrores((anteriores) => ({ ...anteriores, [nombre]: REGLAS[nombre](valor) }))
  }

  // Al escribir, el error se actualiza solo si el campo ya se había revisado
  function manejarCambio(evento) {
    const { name, value } = evento.target
    setDatos({ ...datos, [name]: value })
    if (tocados[name]) revisarCampo(name, value)
  }

  // Al salir del campo se revisa por primera vez
  function manejarSalida(evento) {
    const { name, value } = evento.target
    setTocados({ ...tocados, [name]: true })
    revisarCampo(name, value)
  }

  function manejarEnvio(evento) {
    evento.preventDefault()
    setConfirmacion('')

    const nuevosErrores = validarContacto(datos)
    setErrores(nuevosErrores)
    setTocados({ nombre: true, correo: true, telefono: true, motivo: true, mensaje: true })

    // Si hay errores, el cursor va al primer campo con problemas
    const primerInvalido = Object.keys(REGLAS).find((campo) => nuevosErrores[campo])
    if (primerInvalido) {
      document.getElementById(primerInvalido)?.focus()
      return
    }

    guardarMensaje({
      nombre: datos.nombre.trim(),
      correo: datos.correo.trim(),
      telefono: datos.telefono.trim(),
      motivo: datos.motivo,
      mensaje: datos.mensaje.trim(),
    })
    setConfirmacion(
      `Gracias, ${datos.nombre.trim()}. Recibimos tu mensaje y te responderemos a ${datos.correo.trim()}.`,
    )
    setDatos(FORMULARIO_VACIO)
    setErrores({})
    setTocados({})
  }

  return (
    <Container as="section" className="py-5">
      <h1 className="titulo">Contacto</h1>
      <p className="text-muted">Escríbenos y te responderemos a la brevedad.</p>

      <Row className="g-4">
        {/* ===== FORMULARIO ===== */}
        <Col lg={8}>
          <Form onSubmit={manejarEnvio} noValidate aria-label="Formulario de contacto">
            <Row>
              <Col md={6}>
                <CampoFormulario id="nombre" etiqueta="Nombre" obligatorio error={errores.nombre}>
                  <Form.Control name="nombre" type="text" placeholder="Ej: María Soto" autoComplete="name"
                    value={datos.nombre} onChange={manejarCambio} onBlur={manejarSalida} isInvalid={!!errores.nombre} />
                </CampoFormulario>
              </Col>
              <Col md={6}>
                <CampoFormulario id="correo" etiqueta="Correo electrónico" obligatorio error={errores.correo}>
                  <Form.Control name="correo" type="email" placeholder="nombre@correo.cl" autoComplete="email"
                    value={datos.correo} onChange={manejarCambio} onBlur={manejarSalida} isInvalid={!!errores.correo} />
                </CampoFormulario>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <CampoFormulario id="telefono" etiqueta="Teléfono (opcional)" error={errores.telefono}>
                  <Form.Control name="telefono" type="tel" placeholder="+56 9 1234 5678" autoComplete="tel"
                    value={datos.telefono} onChange={manejarCambio} onBlur={manejarSalida} isInvalid={!!errores.telefono} />
                </CampoFormulario>
              </Col>
              <Col md={6}>
                <CampoFormulario id="motivo" etiqueta="Motivo" obligatorio error={errores.motivo}>
                  <Form.Select name="motivo" value={datos.motivo}
                    onChange={manejarCambio} onBlur={manejarSalida} isInvalid={!!errores.motivo}>
                    <option value="">Selecciona una opción</option>
                    {MOTIVOS.map((motivo) => (
                      <option key={motivo.valor} value={motivo.valor}>{motivo.texto}</option>
                    ))}
                  </Form.Select>
                </CampoFormulario>
              </Col>
            </Row>

            <CampoFormulario id="mensaje" etiqueta="Mensaje" obligatorio error={errores.mensaje}>
              <Form.Control as="textarea" name="mensaje" rows={5} maxLength={LIMITE_MENSAJE}
                placeholder="Cuéntanos en qué podemos ayudarte"
                value={datos.mensaje} onChange={manejarCambio} onBlur={manejarSalida} isInvalid={!!errores.mensaje} />
              <span className="contador">{datos.mensaje.length} / {LIMITE_MENSAJE}</span>
            </CampoFormulario>

            {confirmacion && <Alert variant="success" role="status">{confirmacion}</Alert>}

            <Button type="submit" variant="primary">Enviar mensaje</Button>
          </Form>
        </Col>

        {/* ===== DATOS DE CONTACTO ===== */}
        <Col lg={4}>
          <Card>
            <Card.Body>
              <Card.Title as="h2" className="fs-5 fw-bold">Datos de contacto</Card.Title>
              <ul className="list-unstyled small mb-0">
                <li className="mb-2"><strong>Dirección</strong><br />Av. Irarrázaval 2450, Ñuñoa</li>
                <li className="mb-2"><strong>Teléfono</strong><br />+56 2 2555 1000</li>
                <li className="mb-2"><strong>Correo</strong><br /><a href="mailto:contacto@homerentsolution.cl">contacto@homerentsolution.cl</a></li>
                <li><strong>Horario de atención</strong><br />Lunes a viernes, de 9:00 a 18:00</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Contacto
