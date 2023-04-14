/** Clase 11: Dom */
/*
console.log(document);
console.dir(document);


console.log(document.head);
console.dir(document.head);

console.log(document.body);
console.dir(document.body);

// Métodos para acceder a un nodo del dom desde JS---

let titulo = document.getElementById("titulo");//Obtener a partir del id

console.log(titulo);
console.log(titulo.innerHTML); //Veo el html con innerhtml

let nombre = "Gustavo";
titulo.innerHTML = "Hola " + nombre; //Modifico el HTML interno con INNERHTML 


let parrafos = document.getElementsByClassName("parrafos");
console.log(parrafos);


let parrafosTag = document.getElementsByTagName("p");
console.log(parrafosTag);



// -------------Ejemplo de modificación SELECT DINÁMICO----


const categorias = [];
//1. solicitar una entrada al usuario
let entrada = prompt ("Ingresar categoria \n (Escribir 'ESC' para salir)");

while (entrada.toUpperCase() != "ESC"){
    categorias.push(entrada.toUpperCase());
    entrada = prompt("Ingresar categoria \n (Escribir 'ESC' para salir)");
}

console.log(categorias);

let miSelect = document.getElementById("select");

//Recorrer el array para guardarlo en el nodo select

for (const categoria of categorias){
    miSelect.innerHTML += "<option>" + categoria + "</option>"; //modificar el valor
}



//---- Creación de un nuevo nodo

let titulo1 = document.createElement("h2"); //Crear el nodo

titulo1.innerHTML = "Hola desde js"; //Difinimos en contenido

document.body.appendChild(titulo1); // Le decimos al HTML que este nodo existe*/

// Creación dinámica de nodos

class Producto {
    constructor(id, nombre, precio) {
        this.id = parseInt(id);
        this.nombre = nombre;
        this.precio = parseFloat(precio);
    }
}

const productos = [];
productos.push(new Producto(1, "DONA", 60));
productos.push(new Producto(2, "PAN", 460));
productos.push(new Producto(3, "TORTA", 560));
productos.push(new Producto(4, "LECHE", 160));

// Recorremos el array para crear uh nodo por valor en el array

for (const producto of productos) {
    let divProducto = document.createElement("div");
    divProducto.innerHTML = `<h3> Nombre ${producto.nombre} </h3>
        <h4> Precio : ${producto.precio} </h4>`;
    document.body.appendChild(divProducto);
}
