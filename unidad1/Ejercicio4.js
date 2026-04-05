/* Recorrer un array de números para devolver el número mayor. */

const numeros =[5, 2, 8, 0, 90, -2];
let max = numeros[0]

for (let i = 0; i < numeros.length; i++) {
    if (numeros[i] >= max) {
        max = numeros[i]
    }
}

console.log(`El numero maximo es: ${max}`)