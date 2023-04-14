/** Ejericio*/



const main = document.querySelector('main');

fetch ("https://hp-api.herokuapp.com/api/characters")
.then((response) => response.json())
.then(
    personajes => {
        personajes.forEach(personaje => {
            let infoPersonaje = document.createElement('article');
            infoPersonaje.innerHTML = htmlPersonajes(personaje.name, personaje.image, personaje.house);
            main.appendChild(infoPersonaje)
            
        });
    });





function htmlPersonajes(personaje, foto, casa){
    let html = ` <h2 class="nombre"> ${personaje}</h2>
    <h3 class="casa"> ${casa}</h3>
    <div class="imagen"> <img src = "${foto}" alt="foto ${personaje}" </div>  
    `
    return html;

}