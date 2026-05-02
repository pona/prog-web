/* Crear un bucle for que recorra un array de productos
e imprimir un mensaje de compra para cada elemento. */

const productos =["lapiz", "cuaderno", "lapicera", "regla", "tijeras"];

for (let i = 0; i < productos.length; i++) {
    let producto = productos[i]
    console.log(`Producto comprado = ${producto}`)
}
