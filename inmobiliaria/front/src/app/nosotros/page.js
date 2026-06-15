import '@/styles/nosotros.css'

export const metadata = {
    title: "Inmobiliaria Final :: Nosotros",
    description: "destacados"
};

export default function Nosotros() {
    return (
        <section className="holder">
            <div className="historia">
                <h2>Historia</h2>
                <div className="row">
                    <p> <span>NAPonce Propiedades</span></p>
                    <p> <span>Hacemos que cada proyecto inmobiliario cobre vida acompañando a nuestros clientes en cada paso del camino, brindando asesoramiento profesional y un servicio eficiente.
                   </span> </p>
                    <p> <span>Trabajamos con honestidad y un enfoque colaborativo, porque creemos que los mejores resultados se logran cuando el equipo y el cliente avanzan juntos.
                   </span></p>
                    <p> <span>Con nosotros, no solo gestionás un inmueble, sino que recibís acompañamiento integral, pensado para que cada proyecto se transforme en una experiencia positiva y exitosa.
                    </span></p>
                    <p><span>NAPonce Propiedades: tu confianza, nuestro compromiso.
                   </span></p>
                </div>
            </div>
            <h2>Staff</h2>
            <div className="personas">
                <div className="persona">
                    <img src="/images/nosotros/nosotros1.png" width="75" alt="nosotros1" />
                    <h5>Juana Gomez</h5>
                    <h6>Agente Inmobiliario</h6>
                    <p>Tu visión, mi compromiso. Encuentra el lugar donde empieza tu historia.</p>
                </div>
            </div>
        </section>
    )
}