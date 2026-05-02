/* Utilizar estructura de control para determinar el medio de transporte
más adecuado dada una distancia en metros
(reglas: pie, bicicleta, colectivo, auto, avión). */

const distancias =[100, 600, 2000, 4500, 500000];

for (let i = 0; i < distancias.length; i++) {
    let distancia = distancias[i]
    console.log(`Determinar transporte para la distancia = ${distancia}`)

    if (distancia > 0 && distancia <= 500) {
        console.log("====> ir a pie")
    } else if (distancia > 500 && distancia <= 1000) {
        console.log("====> ir en bici")
    } else if (distancia > 1000 && distancia <= 3000) {
        console.log("====> ir en colectivo")
    } else if (distancia > 3000 && distancia <= 10000) {
        console.log("====> ir en auto")
    } else {
        console.log("====> ir en avion")
    }
}
