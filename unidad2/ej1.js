/* Crear una función para calcular el promedio de dos notas parciales
(ejemplo: materia Historia).
*/

const nota1 = 8;
const nota2 = 9; 

function promedio(nota1, nota2) {
    const nota = (nota1 + nota2)/2;
    console.log(`La nota promedio de Historia es: ${nota}`)
}

promedio(nota1, nota2)
