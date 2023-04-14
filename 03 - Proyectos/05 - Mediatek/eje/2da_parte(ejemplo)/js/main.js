//Creamos la clase alumno

class Alumno{
    constructor(nombre, email, password){
        this.nombre = nombre;
        this.email = email;
        this.password = password;
    }
}

// definimos todas las variables globales que necesito para trabajar con el DOM

let arrayAlumnos = [];
let miFormulario = document.querySelector("#formulario");
let inputNombre = document.querySelector("#iNombre");

let nombreI = formulario.children[1].value;
let emailI = formulario.children[3].value;
let passwordI = formulario.children[5].value;

let contenedor = document.querySelector("#alumnoIngreso");
let displayTodos = document.querySelector("#displayTodos");
let parrafos = displayTodos.getElementsByTagName("p");
let bandera = false;

//Definimos los Eventos de ambos botones
miFormulario.addEventListener("submit", agregarAlumnos);
btnMostrar.addEventListener('click', mostrarTodosAlumnos);

//Ponemos focus el primer elemento

inputNombre.focus();

//FUNCIONES

//Funciones para comprobar el ingreso de los datos

function validarForm(){
    // Codigo

}


//Funcion para agregar alumnos al ARRAY alumnos

function agregarAlumnos{
    // Codigo
}


//Funcion para mostrar en DOM el último alumno ingresado

function AgregarAlDom(){

}

//Funcion para mostrar todos

function mostrarTodosAlumnos(e){
    
}