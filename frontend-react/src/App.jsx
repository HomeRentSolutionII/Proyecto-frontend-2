import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import EnConstruccion from './components/EnConstruccion'
import Encabezado from './components/Encabezado'
import PiePagina from './components/PiePagina'
import { agregarReserva, obtenerReservas, quitarReserva, vaciarReservas } from './data/reservas'
import { cerrarSesion, guardarSesion, obtenerSesion } from './data/usuarios'
import DetallePropiedad from './pages/DetallePropiedad'
import Inicio from './pages/Inicio'
import Login from './pages/Login'
import NoEncontrada from './pages/NoEncontrada'
import Propiedades from './pages/Propiedades'
import Registro from './pages/Registro'
import Reservas from './pages/Reservas'

function App() {
  // Estado compartido por varias páginas. Vive aquí y baja por props.
  const [reservas, setReservas] = useState(() => obtenerReservas())
  const [usuario, setUsuario] = useState(() => obtenerSesion())

  function manejarAgregarReserva(reserva) {
    setReservas(agregarReserva(reserva))
  }

  function manejarQuitarReserva(id) {
    setReservas(quitarReserva(id))
  }

  function manejarConfirmarReservas() {
    setReservas(vaciarReservas())
  }

  function manejarIniciarSesion(datosUsuario) {
    setUsuario(guardarSesion(datosUsuario))
  }

  function manejarCerrarSesion() {
    cerrarSesion()
    setUsuario(null)
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Encabezado
        cantidadReservas={reservas.length}
        usuario={usuario}
        onCerrarSesion={manejarCerrarSesion}
      />

      <main className="flex-grow-1">
        <Routes>
          {/* ===== Víctor ===== */}
          <Route path="/" element={<Inicio />} />
          <Route path="/propiedades" element={<Propiedades />} />
          <Route
            path="/propiedades/:id"
            element={<DetallePropiedad onAgregarReserva={manejarAgregarReserva} />}
          />
          <Route
            path="/reservas"
            element={
              <Reservas
                reservas={reservas}
                usuario={usuario}
                onQuitar={manejarQuitarReserva}
                onConfirmar={manejarConfirmarReservas}
              />
            }
          />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login onIniciarSesion={manejarIniciarSesion} />} />

          {/* ===== Jhohan: reemplazar EnConstruccion por cada página ===== */}
          <Route path="/nosotros" element={<EnConstruccion titulo="Nosotros" responsable="Jhohan" />} />
          <Route path="/blog" element={<EnConstruccion titulo="Blog" responsable="Jhohan" />} />
          <Route path="/blog/:id" element={<EnConstruccion titulo="Detalle del blog" responsable="Jhohan" />} />
          <Route path="/contacto" element={<EnConstruccion titulo="Contacto" responsable="Jhohan" />} />

          {/* ===== Noemí: reemplazar EnConstruccion por el panel ===== */}
          <Route path="/admin/*" element={<EnConstruccion titulo="Panel de administración" responsable="Noemí" />} />

          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </main>

      <PiePagina />
    </div>
  )
}

export default App
