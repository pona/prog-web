/*  Usando el array de objetos alumnos (con nombre y nota),
    generar un nuevo array con solo los alumnos aprobados
*/

const alumnos = [
    { nombre: 'Jose', nota: 9},
    { nombre: 'Irma', nota: 4},
    { nombre: 'Horacio', nota: 6},
    { nombre: 'Lucrecia', nota: 7}
]

function aprobados(alumnos) {
    const aprobados = alumnos.filter(alumno => alumno.nota >= 7);  
    console.log(aprobados)
}

aprobados(alumnos)
