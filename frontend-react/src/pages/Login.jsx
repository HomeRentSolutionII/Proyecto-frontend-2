import { useState } from 'react'
import { Alert, Button, Card, Container, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import CampoFormulario from '../components/CampoFormulario'
import { ADMIN_PRUEBA, validarCredenciales } from '../data/usuarios'
import { validarClave, validarCorreo } from '../utils/validaciones'

// Recibe por props el usuario con sesión activa (o null) y las funciones
// de App.jsx para iniciar y cerrar sesión.
function Login({ usuario, onIniciarSesion, onCerrarSesion }) {
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
    const encontrado = validarCredenciales(correo, clave)
    if (!encontrado) {
      setErrorGeneral('Correo o contraseña incorrectos.')
      return
    }

    onIniciarSesion(encontrado)
    navegar(encontrado.tipo === 'Administrador' ? '/admin' : '/')
  }

  // Rellena el formulario con el administrador de prueba (igual hay que pulsar Ingresar)
  function usarAdminDePrueba() {
    setCorreo(ADMIN_PRUEBA.correo)
    setClave(ADMIN_PRUEBA.clave)
    setErrores({})
    setErrorGeneral('')
  }

  // ===== YA HAY UNA SESIÓN INICIADA =====
  if (usuario) {
    return (
      <Container as="section" className="py-5">
        <Card className="caja-formulario caja-angosta mx-auto shadow-sm">
          <Card.Body className="p-4 text-center">
            <h1 className="titulo">Sesión iniciada</h1>
            <p>Ya iniciaste sesión como <strong>{usuario.nombre}</strong>.</p>
            <div className="d-grid gap-2">
              {usuario.tipo === 'Administrador' && (
                <Button as={Link} to="/admin" variant="primary">Ir al panel de administración</Button>
              )}
              <Button as={Link} to="/" variant="outline-dark">Ir al inicio</Button>
              <Button variant="outline-danger" onClick={onCerrarSesion}>Cerrar sesión</Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    )
  }

  // ===== FORMULARIO DE INICIO DE SESIÓN =====
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

            <Button type="button" variant="outline-dark" size="sm" className="w-100 mt-2" onClick={usarAdminDePrueba}>
              Usar cuenta de administrador de prueba
            </Button>

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
