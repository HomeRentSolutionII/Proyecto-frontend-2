// Regiones de Chile con algunas de sus comunas, para el formulario de registro
export const REGIONES = [
  { nombre: 'Arica y Parinacota', comunas: ['Arica', 'Camarones', 'Putre'] },
  { nombre: 'Tarapacá', comunas: ['Iquique', 'Alto Hospicio', 'Pozo Almonte'] },
  { nombre: 'Antofagasta', comunas: ['Antofagasta', 'Calama', 'Tocopilla'] },
  { nombre: 'Atacama', comunas: ['Copiapó', 'Vallenar', 'Caldera'] },
  { nombre: 'Coquimbo', comunas: ['La Serena', 'Coquimbo', 'Ovalle'] },
  { nombre: 'Valparaíso', comunas: ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Algarrobo'] },
  { nombre: 'Metropolitana de Santiago', comunas: ['Santiago', 'Ñuñoa', 'Providencia', 'Maipú', 'Puente Alto'] },
  { nombre: "Libertador General Bernardo O'Higgins", comunas: ['Rancagua', 'San Fernando', 'Santa Cruz'] },
  { nombre: 'Maule', comunas: ['Talca', 'Curicó', 'Linares'] },
  { nombre: 'Ñuble', comunas: ['Chillán', 'San Carlos', 'Bulnes'] },
  { nombre: 'Biobío', comunas: ['Concepción', 'Talcahuano', 'Los Ángeles'] },
  { nombre: 'La Araucanía', comunas: ['Temuco', 'Villarrica', 'Pucón'] },
  { nombre: 'Los Ríos', comunas: ['Valdivia', 'La Unión', 'Panguipulli'] },
  { nombre: 'Los Lagos', comunas: ['Puerto Montt', 'Osorno', 'Puerto Varas'] },
  { nombre: 'Aysén', comunas: ['Coyhaique', 'Puerto Aysén', 'Chile Chico'] },
  { nombre: 'Magallanes', comunas: ['Punta Arenas', 'Puerto Natales', 'Porvenir'] },
]

export function obtenerComunas(nombreRegion) {
  const region = REGIONES.find((r) => r.nombre === nombreRegion)
  return region ? region.comunas : []
}
