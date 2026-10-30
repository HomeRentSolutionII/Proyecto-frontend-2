import { useState } from 'react';
import '../estilos-adm.css';

export function AdminPanel() {
  // Estado para controlar qué sección/página se muestra
  const [currentPage, setCurrentPage] = useState('home');

  // Función para cambiar de vista y actualizar el título
  const handlePageChange = (pageId) => {
    setCurrentPage(pageId);
  };

  // Mapeo de títulos según la vista activa
  const titles = {
    home: 'Home Admin',
    propiedades: 'Gestión de Propiedades',
    'propiedad-form': 'Crear / Editar Propiedad',
    usuarios: 'Gestión de Usuarios',
    'usuario-form': 'Crear / Editar Usuario',
  };

  return (
    <div className="admin-container">
      {/* SIDEBAR */}
      <div className="sidebar">
        <div className="logo">Panel Admin</div>
        <ul className="nav-menu">
          <li className={`nav-item ${currentPage === 'home' ? 'active' : ''}`}>
            <a onClick={() => handlePageChange('home')}>
              <span>📊</span>
              <span>Home Admin</span>
            </a>
          </li>
          <li className={`nav-item ${currentPage === 'propiedades' ? 'active' : ''}`}>
            <a onClick={() => handlePageChange('propiedades')}>
              <span>🏠</span>
              <span>Propiedades</span>
            </a>
          </li>
          <li className={`nav-item ${currentPage === 'propiedad-form' ? 'active' : ''}`}>
            <a onClick={() => handlePageChange('propiedad-form')}>
              <span>➕</span>
              <span>Nueva Propiedad</span>
            </a>
          </li>
          <li className={`nav-item ${currentPage === 'usuarios' ? 'active' : ''}`}>
            <a onClick={() => handlePageChange('usuarios')}>
              <span>👥</span>
              <span>Usuarios</span>
            </a>
          </li>
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">
        <div className="header">
          <h1 id="page-title">{titles[currentPage]}</h1>
          <div className="user-info">
            <span>Noemi</span>
            <div className="avatar">N</div>
          </div>
        </div>

        <div className="content">
          {/* PAGE 1: HOME ADMIN */}
          {currentPage === 'home' && (
            <div className="page active">
              <div className="stats-grid">
                <div className="stat-card blue">
                  <div className="stat-number">24</div>
                  <div className="stat-label">Propiedades Activas</div>
                </div>
                <div className="stat-card green">
                  <div className="stat-number">156</div>
                  <div className="stat-label">Reservas Totales</div>
                </div>
                <div className="stat-card orange">
                  <div className="stat-number">42</div>
                  <div className="stat-label">Usuarios Registrados</div>
                </div>
                <div className="stat-card red">
                  <div className="stat-number">8</div>
                  <div className="stat-label">Contactos sin Responder</div>
                </div>
              </div>

              <div className="card">
                <div className="section-title">Actividad Reciente</div>
                <table>
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Usuario</th>
                      <th>Acción</th>
                      <th>Propiedad</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>25/09/2026</td>
                      <td>Carlos M.</td>
                      <td><span className="badge active">Nueva Reserva</span></td>
                      <td>Departamento Centro</td>
                    </tr>
                    <tr>
                      <td>24/09/2026</td>
                      <td>María L.</td>
                      <td><span className="badge active">Registro</span></td>
                      <td>—</td>
                    </tr>
                    <tr>
                      <td>23/09/2026</td>
                      <td>Admin</td>
                      <td><span className="badge active">Nueva Propiedad</span></td>
                      <td>Casa Vista al Mar</td>
                    </tr>
                    <tr>
                      <td>22/09/2026</td>
                      <td>Roberto S.</td>
                      <td><span className="badge inactive">Reserva Cancelada</span></td>
                      <td>Departamento Norte</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* PAGE 2: LISTADO PROPIEDADES */}
          {currentPage === 'propiedades' && (
            <div className="page active">
              <div className="card">
                <div className="section-title">Gestión de Propiedades</div>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Ubicación</th>
                      <th>Precio</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#001</td>
                      <td>Departamento Centro</td>
                      <td>Centro, Santiago</td>
                      <td>$150.000</td>
                      <td><span className="badge active">Disponible</span></td>
                      <td>
                        <div className="actions">
                          <button className="btn-small btn-edit" onClick={() => handlePageChange('propiedad-form')}>Editar</button>
                          <button className="btn-small btn-delete">Eliminar</button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>#002</td>
                      <td>Casa Vista al Mar</td>
                      <td>Viña del Mar</td>
                      <td>$350.000</td>
                      <td><span className="badge active">Disponible</span></td>
                      <td>
                        <div className="actions">
                          <button className="btn-small btn-edit" onClick={() => handlePageChange('propiedad-form')}>Editar</button>
                          <button className="btn-small btn-delete">Eliminar</button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>#003</td>
                      <td>Departamento Norte</td>
                      <td>Las Condes</td>
                      <td>$200.000</td>
                      <td><span className="badge inactive">Ocupada</span></td>
                      <td>
                        <div className="actions">
                          <button className="btn-small btn-edit" onClick={() => handlePageChange('propiedad-form')}>Editar</button>
                          <button className="btn-small btn-delete">Eliminar</button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>#004</td>
                      <td>Cabaña Cordillera</td>
                      <td>San Martín de los Andes</td>
                      <td>$180.000</td>
                      <td><span className="badge active">Disponible</span></td>
                      <td>
                        <div className="actions">
                          <button className="btn-small btn-edit" onClick={() => handlePageChange('propiedad-form')}>Editar</button>
                          <button className="btn-small btn-delete">Eliminar</button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* PAGE 3: FORMULARIO PROPIEDAD */}
          {currentPage === 'propiedad-form' && (
            <div className="page active">
              <div className="card">
                <div className="section-title">Crear / Editar Propiedad</div>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Nombre de la Propiedad *</label>
                      <input type="text" placeholder="Ej: Departamento Centro" required />
                    </div>
                    <div className="form-group">
                      <label>Tipo de Propiedad *</label>
                      <select required defaultValue="">
                        <option value="" disabled>Seleccionar tipo...</option>
                        <option value="depto">Departamento</option>
                        <option value="casa">Casa</option>
                        <option value="cabania">Cabaña</option>
                        <option value="villa">Villa</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Ubicación *</label>
                      <input type="text" placeholder="Ej: Centro, Santiago" required />
                    </div>
                    <div className="form-group">
                      <label>Precio por Noche *</label>
                      <input type="number" placeholder="Ej: 150000" required />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Cantidad de Habitaciones</label>
                      <input type="number" placeholder="Ej: 2" min="1" />
                    </div>
                    <div className="form-group">
                      <label>Cantidad de Baños</label>
                      <input type="number" placeholder="Ej: 1" min="1" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Descripción</label>
                    <textarea placeholder="Descripción detallada de la propiedad..."></textarea>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>URL Imagen Principal</label>
                      <input type="text" placeholder="https://..." />
                    </div>
                    <div className="form-group">
                      <label>Estado *</label>
                      <select required defaultValue="disponible">
                        <option value="disponible">Disponible</option>
                        <option value="ocupada">Ocupada</option>
                        <option value="mantenimiento">En Mantenimiento</option>
                      </select>
                    </div>
                  </div>

                  <div className="button-group">
                    <button type="submit" className="btn-primary">Guardar Propiedad</button>
                    <button type="reset" className="btn-secondary">Limpiar Formulario</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* PAGE 4: LISTADO USUARIOS */}
          {currentPage === 'usuarios' && (
            <div className="page active">
              <div className="card">
                <div className="section-title">Gestión de Usuarios</div>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Email</th>
                      <th>Teléfono</th>
                      <th>Fecha Registro</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#U001</td>
                      <td>Carlos Martínez</td>
                      <td>carlos@example.com</td>
                      <td>+56 9 1234 5678</td>
                      <td>15/08/2026</td>
                      <td>
                        <div className="actions">
                          <button className="btn-small btn-edit" onClick={() => handlePageChange('usuario-form')}>Editar</button>
                          <button className="btn-small btn-delete">Eliminar</button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>#U002</td>
                      <td>María López</td>
                      <td>maria@example.com</td>
                      <td>+56 9 8765 4321</td>
                      <td>22/08/2026</td>
                      <td>
                        <div className="actions">
                          <button className="btn-small btn-edit" onClick={() => handlePageChange('usuario-form')}>Editar</button>
                          <button className="btn-small btn-delete">Eliminar</button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>#U003</td>
                      <td>Roberto Silva</td>
                      <td>roberto@example.com</td>
                      <td>+56 9 5555 2222</td>
                      <td>30/08/2026</td>
                      <td>
                        <div className="actions">
                          <button className="btn-small btn-edit" onClick={() => handlePageChange('usuario-form')}>Editar</button>
                          <button className="btn-small btn-delete">Eliminar</button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>#U004</td>
                      <td>Andreina González</td>
                      <td>andreina@example.com</td>
                      <td>+56 9 3333 7777</td>
                      <td>05/09/2026</td>
                      <td>
                        <div className="actions">
                          <button className="btn-small btn-edit" onClick={() => handlePageChange('usuario-form')}>Editar</button>
                          <button className="btn-small btn-delete">Eliminar</button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
export default AdminPanel;