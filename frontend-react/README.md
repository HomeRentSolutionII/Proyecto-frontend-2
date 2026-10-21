# Home Rent Solution — Frontend en React

Proyecto de DSY1104 Desarrollo Full Stack II, Evaluación Parcial 2.
Stack: **React + Vite**, **React Router**, **React Bootstrap** y pruebas con **Vitest**.

## Comandos

Requiere Node.js 22.13 o superior.

| Comando | Qué hace |
|---|---|
| `npm install` | Instala las dependencias (solo la primera vez o si cambia `package.json`) |
| `npm run dev` | Levanta la app en `http://localhost:5173` |
| `npm test` | Corre las pruebas y las vuelve a correr al guardar cambios |
| `npm run coverage` | Corre las pruebas una vez y genera el informe de cobertura en `coverage/index.html` |
| `npm run lint` | Revisa errores de código con ESLint |

## Estructura

```
src/
├── main.jsx               Punto de entrada: carga Bootstrap, estilos y el router
├── App.jsx                Rutas de todas las páginas y estado compartido (reservas, sesión)
├── index.css              Colores y estilos propios (la grilla la pone Bootstrap)
├── assets/js/
│   └── propiedades.json   Datos iniciales de las propiedades
├── data/                  "Base de datos" simulada con CRUD sobre localStorage
│   ├── propiedades.js     listar, obtener, crear, actualizar, eliminar, filtrar
│   ├── usuarios.js        CRUD de usuarios + inicio y cierre de sesión
│   ├── reservas.js        agregar, quitar, vaciar, subtotal y comisión
│   └── regiones.js        Regiones y comunas de Chile
├── utils/
│   ├── validaciones.js    RUN, correo, contraseña, fechas...
│   └── formato.js         Precios ($68.000), fechas y noches
├── components/            Piezas reutilizables (encabezado, pie, tarjeta, campos...)
├── pages/                 Una página por archivo
└── test/                  Pruebas con Vitest (setup.js se ejecuta antes de cada archivo)

public/img/                Imágenes de las propiedades y del banner
```

## Quién hace qué

| Integrante | Páginas | Ruta |
|---|---|---|
| Víctor | Inicio, Propiedades, Detalle, Mis reservas, Registro, Login | `/`, `/propiedades`, `/propiedades/:id`, `/reservas`, `/registro`, `/login` |
| Jhohan | Nosotros, Blog, Detalle blog, Contacto | `/nosotros`, `/blog`, `/blog/:id`, `/contacto` |
| Noemí | Panel de administración | `/admin` |

## Cómo agregar tu página

1. Crea el archivo en `src/pages/`, por ejemplo `src/pages/Nosotros.jsx`:

   ```jsx
   import { Container } from 'react-bootstrap'

   function Nosotros() {
     return (
       <Container as="section" className="py-5">
         <h1 className="titulo">Nosotros</h1>
         ...
       </Container>
     )
   }

   export default Nosotros
   ```

2. En `App.jsx`, impórtala y reemplaza el `EnConstruccion` de tu ruta:

   ```jsx
   import Nosotros from './pages/Nosotros'
   ...
   <Route path="/nosotros" element={<Nosotros />} />
   ```

3. Para los datos usa las funciones de `src/data/`, por ejemplo en el panel:

   ```jsx
   import { listarPropiedades, eliminarPropiedad } from '../data/propiedades'
   ```

4. Escribe las pruebas de tu página en `src/test/`, con el nombre `TuPagina.test.jsx`.

## Guía visual

Para que todas las páginas se vean iguales, **partan copiando una página existente** y cambien solo el contenido:
formularios → `Login.jsx` / `Registro.jsx`, tablas → `Reservas.jsx`, listados con tarjetas → `Propiedades.jsx`.

| Elemento | Cómo se hace |
|---|---|
| Página | `<Container as="section" className="py-5">` |
| Título de la página | `<h1 className="titulo">` (lleva la línea verde) |
| Botón principal | `<Button variant="primary">` (sale verde) |
| Botón secundario | `<Button variant="outline-dark">` |
| Botón eliminar | `<Button variant="outline-danger">` |
| Formulario | Dentro de `<Card className="caja-formulario mx-auto shadow-sm">`, con `CampoFormulario` por campo |
| Tabla | `<Table responsive hover>` |
| Mensajes | `<Alert variant="success">`, `"danger"` o `"info"` |
| Columnas | `<Row>` y `<Col md={6}>`, `<Col lg={4}>`... para que sea responsivo |

**Qué evitar:**
- Las clases de la Parcial 1 (`boton`, `tarjeta-cuerpo`, `contenedor`...): ya no existen y quedan sin estilo.
- Otros colores de Bootstrap en botones (`success`, `warning`, `info`) o colores escritos a mano. Si hace falta un color, usar `var(--azul)` o `var(--verde)`.
- `getElementById` para leer formularios: en React los valores van en `useState`.

## Reglas del equipo

- **El menú y el pie no se copian en cada página**: ya están en `App.jsx` y se muestran en todas.
- **Para maquetar usa Bootstrap** (`Container`, `Row`, `Col`, `Card`, `Form`, `Table`, `Button`) así el sitio queda responsivo y parejo. Solo agrega CSS en `index.css` si Bootstrap no lo resuelve, y avisa al equipo.
- **Los enlaces internos van con `<Link to="/ruta">`** de React Router, no con `<a href>`; así la página no se recarga.
- **No edites archivos de otro integrante** sin avisarle. Lo compartido (`App.jsx`, `data/`, `index.css`) se conversa antes.
- **Antes de subir cambios**, corre `npm test` y `npm run lint` y revisa que no haya errores.

## Usuario de prueba

El administrador de prueba está definido en `src/data/usuarios.js` (`USUARIOS_INICIALES`).
Al iniciar sesión con él, la app redirige a `/admin`.

Los datos se guardan en el `localStorage` del navegador. Para volver a los datos iniciales:
F12 → Application → Local Storage → borrar las claves que empiezan con `hrs_`.
