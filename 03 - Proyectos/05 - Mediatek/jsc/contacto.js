function guardarForm() {
    let txttmp1 = document.getElementById('nombre').value;
    let txttmp2 = document.getElementById('email').value;
    let txttmp3 = document.getElementById('telefono').value;
    let txttmp4 = document.getElementById('website').value;
    let txttmp5 = document.getElementById('asunto').value;
    let txttmp6 = document.getElementById('mensaje').value;
    let texto   = txttmp1 + ", " + txttmp2 + ", " + txttmp3 + ", " + txttmp4 + ", " + txttmp5 + ", " + txttmp6
    let archivo = txttmp1 + "-" + txttmp5 + ".txt";

    let textoABlob                 = new Blob([texto], { type: 'text/plain' });
    let archivoABlob               = new Blob([archivo], { type: 'text/plain' });
    let archivoAGuardar            = archivoABlob;
    let descargaLink               = document.createElement("a");
        descargaLink.download      = archivoAGuardar;
        descargaLink.innerHTML     = "../com/";
        window.URL                 = window.URL || window.webkitURL;
        descargaLink.href          = window.URL.createObjectURL(textoABlob);
        descargaLink.onclick       = destroyClickedElement;
        descargaLink.style.display = "none";

    document.body.appendChild(descargaLink);
    descargaLink.click();

}


function destroyClickedElement(event) {
   document.body.removeChild(event.target);

}


function validar() {
    let cNombre          = document.getElementById('nombre').value;
    let cEmail           = document.getElementById('email').value;
    let cAsunto          = document.getElementById('asunto').value;
    let cMensaje         = document.getElementById('mensaje').value;

    let cValor           = false;

    var estadoBoton      = document.getElementById('enviar');
    estadoBoton.disabled = true;

    if (length(cNombre) === 0) {
        cValor = false;
    }
    else {
        cValor = true;

    }

    if (length(cEmail) === 0) {
        cValor = false;
    }
    else {
        cValor = true;

    }

    if (length(cAsunto) === 0) {
        cValor = false;
    }
    else {
        cValor = true;

    }

    if (length(cMensaje) === 0) {
        cValor = false;
    }
    else {
        cValor = true;

    }

    if (!this.cValor) {
        estadoBoton = document.getElementById('enviar');
        estadoBoton.disabled = true;

    }

}