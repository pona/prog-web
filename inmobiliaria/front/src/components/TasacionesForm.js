  export default async function TasacionesForm() {
    return (
        <>
        <form action="/tasaciones" method="post" className="formulario">
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
                <label>Descripción de la propiedad</label>
                <textarea type="text" name="description" />
            </p>
            <p className="centrar">
                <input type="submit" value="Enviar"/>
            </p>
        </form>
        </>
    )
}