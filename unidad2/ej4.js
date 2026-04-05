/*  Dada la información de un producto (objeto), usar desestructuración para crear
    variables para nombre, precio y stock, y luego mostrarlas por consola
*/

const celular = {
    nombre: 'Samsung Galaxy S26',
    display: '6.9',
    camaraFrontal: '12mpx',
    red: [
        '2G',
        '3G',
        '4G',
        '5G'
    ],
    precio: 2700,
    stock: 10
}

const {nombre, precio, stock} = celular;

console.log(`El stock disponible para el producto '${nombre}' con precio ${precio}USD es de ${stock} unidades`)
