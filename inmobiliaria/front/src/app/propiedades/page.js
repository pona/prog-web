import '@/styles/propiedades.css'

async function getPropiedades() {
  const response = await fetch(`${process.env.ADMIN_API_BASE_URL}/api/propiedades`, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('No se pudieron cargar las propiedades');
  }
  return response.json();
}

export const metadata = {
  title: 'Inmobiliaria Final :: Propiedades',
  description: 'Listado de propiedades disponibles con fotografía, precio, dirección y descripción.'
};

export default async function Propiedades() {
  let propiedades = [];
  try {
    propiedades = await getPropiedades();
  } catch (error) {
    console.error(error);
  }

  return (
    <main className="holder propiedades">
      <section className="propiedades-intro">
        <h2>Propiedades</h2>
        <p>Encontrá tu próxima propiedad con fotos, precio, dirección y una descripción detallada.</p>
      </section>

      <section className="propiedades-list">
        {propiedades.length > 0 ? (
          propiedades.map(propiedad => (
            <article key={propiedad.id} className="propiedad-card">
              <div className="propiedad-imagen">
                <img src={propiedad.image || '/images/home/img01.png'} alt={propiedad.title} />
              </div>
              <div className="propiedad-info">
                <h3>{propiedad.title}</h3>
                <span className="precio">{propiedad.price}</span>
                <p className="direccion">{propiedad.address}</p>
                <p className="descripcion">{propiedad.description}</p>
              </div>
            </article>
          ))
        ) : (
          <p>No hay propiedades disponibles en este momento.</p>
        )}
      </section>
    </main>
  );
}
