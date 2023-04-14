/** Clase 12: Eventos */
/* 
//Opcion 1
let boton = document.getElementById("btnPrincipal");

boton.addEventListener("click", respuestaClick)



function respuestaClick(){
    console.log("respuesta Evento");
}


// Opcion 2

let boton_2 = document.getElementById("btnPrincipal_2");
boton_2.onclick = () => (console.log( "respuesta 2"));


//Opcion 3
// Esta definido en el mismo HTML

// Eventos Mouse
let boton = document.getElementById("btnMain");

boton.onclick = () =>
(console.log("Click"));
boton.onmousemove = () => (console.log("Move"));


*/

let miFormulario = document.getElementById("formulario");
miFormulario.addEventListener("submit", validarFormulario);

function validarFormulario(e) {
    //Cancelamos el comportamiento del evento
    e.preventDefault();
    // Obtenemos el elemento desde el cual se disparó el evento
    let formulario = e.target
    //Obtener el valor del primer hijo
    console.log(formulario.children[0].value);
    //Obtenemos el valor del segundo hijo
    console.log(formulario.children[1].value);
    }
