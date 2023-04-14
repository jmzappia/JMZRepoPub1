//Creamos la clase alumno

class Alumno {
    constructor(nombre, email, password) {
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
btnMostrar.addEventListener("click", mostrarTodosAlumnos);

//Ponemos focus el primer elemento

inputNombre.focus();

//FUNCIONES

//Funciones para comprobar el ingreso de los datos

function validarForm() {
    nombreI = formulario.children[1].value;
    emailI = formulario.children[3].value;
    passwordI = formulario.children[5].value;
    console.log(nombreI);
    console.log(emailI);
    console.log(passwordI);

    if (nombreI == "" || emailI == "" || passwordI == "") {
        alert("Error - Debe completar todos los campos para continuar");
        inputNombre.focus();
        bandera = false;
    } else {
        bandera = true;
    }
}

//Funcion para agregar alumnos al ARRAY alumnos

function agregarAlumnos(e) {
    e.preventDefault();
    validarForm();
    if (bandera == true) {
        let opcion = confirm("Esta seguro de agregar al alumno?");
        if (opcion == true) {
            let formulario = e.target
            arrayAlumnos.push(new Alumno(nombreI, emailI, passwordI))
        } else {
            alert("No se agregara el usuario")
        }

        formulario.children[1].value = '';
        formulario.children[3].value = '';
        formulario.children[5].value = '';
        contenedor.innerHTML = '';
        AgregarAlDom();
        inputNombre.focus();

    } else {
        inputNombre.focus();
    }
}


        //Funcion para mostrar en DOM el último alumno ingresado
function AgregarAlDom() { 
    contenedor.innerHTML = `<h3> Último alumno ingresado </h3>
    <p>Nombre ${nombreI} </p>
    <p>Email ${emailI} </p>
    <p>Password ${passwordI} </p>
    <hr>
    `

}

//Funcion para mostrar todos los alumnos en un div en DOM

function mostrarTodosAlumnos(e) { 
e.preventDefault();
let i = 0;
displayTodos.innerHTML = `<h3> Listado de todos los alumnos</h3>
<hr>
`
for (const alumno of arrayAlumnos){
    displayTodos.innerHTML += `
    <p><strong>Nombre: </strong> ${alumno.nombre} </p>
    <p> <strong>Email: </strong>${alumno.email} </p>
    <p> <strong>Password:</strong>${alumno.password} </p>
    <hr>
    `

}

}
