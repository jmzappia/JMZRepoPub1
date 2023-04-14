/** Clase 10: Funciones y dom */

/* 
function saludar(){
    let nombre = prompt("Ingresa tu nombre");
    alert("Hola "+ nombre);
}

saludar();



function saludar(nombre, apellido, edad){
    alert("Hola "+ nombre + " " + apellido + " y tengo " +edad+ " años ");
}

saludar("Ana", "Cleta", 5);
saludar("Conejo", "Pepito", 15);
saludar("Cosme", "Fulanito", 20);

// -------- Valores de retorno-----

function multiplicar (num1, num2){
    let num3 = 10;
    return (num1 + num2) * num3;
}

let resultado = multiplicar(2, 5);
console.log("El resultado es " + resultado);

// Consigna 2

function largoNombre(nombre){
    return nombre.length;
}

let nombreLength = largoNombre("Harry");
console.log("La cantidad de caracteres es " +nombreLength);



let num = 1;

function sumarEdad(edad) {
    console.log(edad + num);
}

console.log(num);

sumarEdad(12);




// -----DOM

console.log(document.body)


let encabezado = document.querySelector("h1");
console.log(encabezado);
let encabezado2 = document.querySelector("h1");
console.log(encabezado.innerText);


let texto = document.querySelector(".texto");
console.log(texto);
let texto2 = document.querySelector(".texto");
console.log(texto2.innerText);

*/
// Metodos

let div = document.getElementById("contenedor");
let parrafo = document.getElementById("parrafo1");
console.log(div.innerHTML);
console.log(parrafo.innerHTML);

let titulo = document.getElementById("titulo");
console.log(titulo);
console.log(titulo.innerHTML);


let nombre = "Cosme";

titulo.innerHTML = " Hola " + nombre;