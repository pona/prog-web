export default async function ContactForm() {
    return (
        <>
        <form action="/contacto" method="post" className="formulario">
            <p>
                <label>Nombre</label>
                <input type="text" name="nombre"></input>
            </p>
             <p>
                <label>Email</label>
                <input type="text" name="email"></input>
            </p>
             <p>
                <label>Telefono</label>
                <input type="text" name="telefono"></input>
            </p>
             <p>
                <label>Mensaje</label>
                <textarea type="text" name="mensaje" />
            </p>
            <p className="centrar">
                <input type="submit" value="Enviar"/>
            </p>
        </form>
        </>
    )
}