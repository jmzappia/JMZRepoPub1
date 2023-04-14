/** Clase 13: Repaso*/

//Datos
/*
const personajesStarWars = {
team: "Star Wars Characters",
characters: [
{
	"name": "Leia Organa",
	"height": "150",
	"mass": "49",
	"hair_color": "brown",
	"skin_color": "light",
	"eye_color": "brown",
	"birth_year": "19BBY",
	"species": [],
		"starships": [],
}
]

}

console.log(personajesStarWars.team);
console.log(personajesStarWars.characters[0].name);

//  Accediendo a una API 

fetch ("https://hp-api.herokuapp.com/api/characters")
.then((response) => response.json())
.then((json) => console.log(json[8].name));


fetch ("https://ghibliapi.herokuapp.com/films")
.then((response) => response.json())
.then((json) =>{
    for (let i = 0; i < json.length; i ++){
        console.log("Titulo: "+ json[i].title);
    }
    })
*/

// Filtrar personaje de Gryffindor
fetch ("https://hp-api.herokuapp.com/api/characters")
.then((response) => response.json())
.then((json) =>{
    for (let i = 0; i < json.length; i ++){
        if(json[i].house == "Gryffindor"){
                    console.log(json[i].name, "es de Gryffindor");

        }
    }
    })