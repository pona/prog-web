import '@/styles/propiedades.css'

const propiedades = [
  {
    id: 1,
    title: 'Casa en Palermo',
    price: 'USD 320.000',
    address: 'Av. Santa Fe 1234, CABA',
    description: 'Excelente casa con jardín y piscina. Ideal para familia que busca confort y espacio al aire libre.',
    image: '/images/home/casa.jpg'
  },
  {
    id: 2,
    title: 'Departamento en Recoleta',
    price: 'USD 180.000',
    address: 'Julio A. Roca 5678, CABA',
    description: 'Luminoso 2 ambientes con balcón y excelente ubicación cerca de transporte y servicios.',
    image: '/images/home/dpto.jpg'
  },
  {
    id: 3,
    title: 'Piso en Nordelta',
    price: 'USD 450.000',
    address: 'Av. del Golf 1111, Tigre',
    description: 'Piso alto con vista al río y amenities de primer nivel, ideal para quien busca tranquilidad.',
    image: '/images/home/dpto2.jpg'
  }
]

export const metadata = {
  title: 'Inmobiliaria Final :: Propiedades',
  description: 'Listado de propiedades disponibles con fotografía, precio, dirección y descripción.'
};

export default function Propiedades() {
  return (
    <main className="holder propiedades">
      <section className="propiedades-intro">
        <h2>Propiedades</h2>
        <p>Encontrá tu próxima propiedad con fotos, precio, dirección y una descripción detallada.</p>
      </section>

      <section className="propiedades-list">
        {propiedades.map(propiedad => (
          <article key={propiedad.id} className="propiedad-card">
            <div className="propiedad-imagen">
              <img src={propiedad.image} alt={propiedad.title} />
            </div>
            <div className="propiedad-info">
              <h3>{propiedad.title}</h3>
              <span className="precio">{propiedad.price}</span>
              <p className="direccion">{propiedad.address}</p>
              <p className="descripcion">{propiedad.description}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
