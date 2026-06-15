import TasacionesForm from "@/components/TasacionesForm";
import "@/styles/contacto.css"

export const metadata = {
    title: "Inmobiliaria Final :: Tasaciones",
    description: "Para que podamos tasar correctamente su propiedad, por favor complete el siguiente formulario y nos comunicaremos con usted."
};

export default function Tasaciones() {
    return (
        <main className="holder tasaciones">
            <img src="/images/home/img02.png" alt="tasaciones" width="100%" height="15%"/>
            <div className="columna">
                <p>Para que podamos tasar correctamente su propiedad, por favor complete el siguiente formulario y nos comunicaremos con usted.</p>
                <TasacionesForm/>
            </div>
        </main>
    )
}