import { useState } from 'react'
import { Alert, Button, Card, Container, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import CampoFormulario from '../components/CampoFormulario'
import { validarCredenciales } from '../data/usuarios'
import { validarClave, validarCorreo } from '../utils/validaciones'

// Recibe por props la función que guarda la sesión en App.jsx
function Login({ onIniciarSesion }) {
  const [correo, setCorreo] = useState('')
  const [clave, setClave] = useState('')
  const [errores, setErrores] = useState({})
  const [errorGeneral, setErrorGeneral] = useState('')
  const navegar = useNavigate()

  function manejarEnvio(evento) {
    evento.preventDefault()
    setErrorGeneral('')

    // 1) Formato de los campos
    const nuevosErrores = { correo: validarCorreo(correo), clave: validarClave(clave) }
    setErrores(nuevosErrores)
    if (nuevosErrores.correo || nuevosErrores.clave) return

    // 2) Que el usuario exista y la contraseña coincida
    const usuario = validarCredenciales(correo, clave)
    if (!usuario) {
      setErrorGeneral('Correo o contraseña incorrectos.')
      return
    }

    onIniciarSesion(usuario)
    navegar(usuario.tipo === 'Administrador' ? '/admin' : '/')
  }

  return (
    <Container as="section" className="py-5">
      <Card className="caja-formulario caja-angosta mx-auto shadow-sm">
        <Card.Body className="p-4">
          <p className="fs-1 text-center mb-0" aria-hidden="true">🏠</p>
          <h1 className="titulo text-center d-block">Iniciar sesión</h1>
          <p className="text-muted text-center">Ingresa con tu cuenta para continuar.</p>

          {errorGeneral && <Alert variant="danger">{errorGeneral}</Alert>}

          <Form onSubmit={manejarEnvio} noValidate>
            <CampoFormulario id="correo" etiqueta="Correo electrónico" obligatorio error={errores.correo}
              ayuda="Solo @duoc.cl, @profesor.duoc.cl y @gmail.com">
              <Form.Control type="email" maxLength={100} placeholder="nombre@duoc.cl"
                value={correo} onChange={(evento) => setCorreo(evento.target.value)} isInvalid={!!errores.correo} />
            </CampoFormulario>

            <CampoFormulario id="clave" etiqueta="Contraseña" obligatorio error={errores.clave}
              ayuda="Entre 4 y 10 caracteres.">
              <Form.Control type="password" maxLength={10}
                value={clave} onChange={(evento) => setClave(evento.target.value)} isInvalid={!!errores.clave} />
            </CampoFormulario>

            <Button type="submit" variant="primary" className="w-100">Ingresar</Button>

            <p className="small text-center mt-3 mb-0">
              ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Login
