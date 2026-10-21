import { useState } from 'react'
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CampoFormulario from '../components/CampoFormulario'
import { obtenerComunas, REGIONES } from '../data/regiones'
import { registrarUsuario } from '../data/usuarios'
import { validarClave, validarCorreo, validarRun, validarTexto } from '../utils/validaciones'

const FORMULARIO_VACIO = {
  run: '',
  nacimiento: '',
  nombre: '',
  apellidos: '',
  correo: '',
  clave: '',
  region: '',
  comuna: '',
  direccion: '',
}

// Revisa todos los campos y devuelve un objeto solo con los que tienen error
function validarFormulario(datos) {
  const errores = {
    run: validarRun(datos.run),
    nombre: validarTexto(datos.nombre, 'El nombre', 50),
    apellidos: validarTexto(datos.apellidos, 'Los apellidos', 100),
    correo: validarCorreo(datos.correo),
    clave: validarClave(datos.clave),
    region: datos.region ? '' : 'Selecciona una región.',
    comuna: datos.comuna ? '' : 'Selecciona una comuna.',
    direccion: validarTexto(datos.direccion, 'La dirección', 300),
  }
  return Object.fromEntries(Object.entries(errores).filter(([, mensaje]) => mensaje))
}

function Registro() {
  const [datos, setDatos] = useState(FORMULARIO_VACIO)
  const [errores, setErrores] = useState({})
  const [registrado, setRegistrado] = useState(null)

  function manejarCambio(evento) {
    const { name, value } = evento.target
    // Al cambiar de región se borra la comuna, porque pertenece a otra región
    if (name === 'region') {
      setDatos({ ...datos, region: value, comuna: '' })
    } else {
      setDatos({ ...datos, [name]: value })
    }
  }

  function manejarEnvio(evento) {
    evento.preventDefault()
    const nuevosErrores = validarFormulario(datos)
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length > 0) return

    const usuario = registrarUsuario({ ...datos, run: datos.run.toUpperCase() })
    if (!usuario) {
      setErrores({ correo: 'Ya existe una cuenta con este correo.' })
      return
    }
    setRegistrado(usuario)
    setDatos(FORMULARIO_VACIO)
  }

  function limpiar() {
    setDatos(FORMULARIO_VACIO)
    setErrores({})
  }

  return (
    <Container as="section" className="py-5">
      <Card className="caja-formulario mx-auto shadow-sm">
        <Card.Body className="p-4">
          <h1 className="titulo">Crear una cuenta</h1>
          <p className="text-muted">
            Los campos marcados con <span className="text-danger">*</span> son obligatorios.
          </p>

          {registrado && (
            <Alert variant="success">
              ¡Bienvenido/a, {registrado.nombre}! Tu cuenta fue creada. Ya puedes{' '}
              <Link to="/login">iniciar sesión</Link>.
            </Alert>
          )}

          <Form onSubmit={manejarEnvio} noValidate>
            <Row>
              <Col md={6}>
                <CampoFormulario id="run" etiqueta="RUN" obligatorio error={errores.run}
                  ayuda="Sin puntos ni guion, entre 7 y 9 caracteres.">
                  <Form.Control name="run" maxLength={9} placeholder="21456789K"
                    value={datos.run} onChange={manejarCambio} isInvalid={!!errores.run} />
                </CampoFormulario>
              </Col>
              <Col md={6}>
                <CampoFormulario id="nacimiento" etiqueta="Fecha de nacimiento" ayuda="Campo opcional.">
                  <Form.Control type="date" name="nacimiento" value={datos.nacimiento} onChange={manejarCambio} />
                </CampoFormulario>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <CampoFormulario id="nombre" etiqueta="Nombre" obligatorio error={errores.nombre}
                  ayuda="Máximo 50 caracteres.">
                  <Form.Control name="nombre" maxLength={50} placeholder="Tu nombre"
                    value={datos.nombre} onChange={manejarCambio} isInvalid={!!errores.nombre} />
                </CampoFormulario>
              </Col>
              <Col md={6}>
                <CampoFormulario id="apellidos" etiqueta="Apellidos" obligatorio error={errores.apellidos}
                  ayuda="Máximo 100 caracteres.">
                  <Form.Control name="apellidos" maxLength={100} placeholder="Tus apellidos"
                    value={datos.apellidos} onChange={manejarCambio} isInvalid={!!errores.apellidos} />
                </CampoFormulario>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <CampoFormulario id="correo" etiqueta="Correo electrónico" obligatorio error={errores.correo}
                  ayuda="Solo @duoc.cl, @profesor.duoc.cl y @gmail.com">
                  <Form.Control type="email" name="correo" maxLength={100} placeholder="nombre@duoc.cl"
                    value={datos.correo} onChange={manejarCambio} isInvalid={!!errores.correo} />
                </CampoFormulario>
              </Col>
              <Col md={6}>
                <CampoFormulario id="clave" etiqueta="Contraseña" obligatorio error={errores.clave}
                  ayuda="Entre 4 y 10 caracteres.">
                  <Form.Control type="password" name="clave" maxLength={10}
                    value={datos.clave} onChange={manejarCambio} isInvalid={!!errores.clave} />
                </CampoFormulario>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <CampoFormulario id="region" etiqueta="Región" obligatorio error={errores.region}>
                  <Form.Select name="region" value={datos.region} onChange={manejarCambio} isInvalid={!!errores.region}>
                    <option value="">Seleccione una región</option>
                    {REGIONES.map((region) => (
                      <option key={region.nombre} value={region.nombre}>{region.nombre}</option>
                    ))}
                  </Form.Select>
                </CampoFormulario>
              </Col>
              <Col md={6}>
                <CampoFormulario id="comuna" etiqueta="Comuna" obligatorio error={errores.comuna}
                  ayuda="Depende de la región seleccionada.">
                  <Form.Select name="comuna" value={datos.comuna} onChange={manejarCambio}
                    disabled={!datos.region} isInvalid={!!errores.comuna}>
                    <option value="">Seleccione una comuna</option>
                    {obtenerComunas(datos.region).map((comuna) => (
                      <option key={comuna} value={comuna}>{comuna}</option>
                    ))}
                  </Form.Select>
                </CampoFormulario>
              </Col>
            </Row>

            <CampoFormulario id="direccion" etiqueta="Dirección" obligatorio error={errores.direccion}
              ayuda="Máximo 300 caracteres.">
              <Form.Control name="direccion" maxLength={300} placeholder="Calle, número, departamento"
                value={datos.direccion} onChange={manejarCambio} isInvalid={!!errores.direccion} />
            </CampoFormulario>

            <div className="d-flex flex-wrap gap-2">
              <Button type="submit" variant="primary">Crear cuenta</Button>
              <Button type="button" variant="outline-dark" onClick={limpiar}>Limpiar</Button>
            </div>

            <p className="small mt-3 mb-0">
              ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Registro
