import ContactForm from "@/components/ContactForm";
import "@/styles/contacto.css"

export const metadata = {
    title: "Inmobiliaria Final :: Contacto",
    description: "destacados"
};

export default function Contacto() {
    return (
        <main className="holder contacto">
            <div className="columna">
                <p>Lo invitamos a dejarnos sus datos y nos contactaremos con usted a la brevedad.</p>
                <ContactForm postUrl={`${process.env.API_BASE_URL}/api/contacto`} />
            </div>
            <div className="columna datos">
                <h2>Otras vias de comunicacion</h2>
                
                <ul>
                    <li>Telefono: 123456789</li>
                    <li>Email: info@nappropiedades.com.ar</li>
                    <li>Facebook</li>
                    <li>Twitter</li>
                    <li>Instagram</li>
                </ul>
            </div>
        </main>
    )
}