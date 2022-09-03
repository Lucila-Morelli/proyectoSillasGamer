/*
Variables
*/
const sillas = [{
        id: 1,
        nombre: "Silla Gamer Daewoo Shooter Blue",
        img: "./img/sillaazul1.png",
        precio: 55000,
        marca: "Daewoo",
        color: "azul",
    },
    {
        id: 2,
        nombre: "Silla Gamer Esports Pro The Game House",
        img: "./img/sillaazul2.png",
        precio: 55000,
        marca: "The Game House",
        color: "azul",
    },
    {
        id: 3,
        nombre: "Silla Gamer Daewoo Shooter Red",
        img: "./img/sillaroja1.png",
        precio: 58000,
        marca: "Daewoo",
        color: "rojo",
    },
    {
        id: 4,
        nombre: "Silla Gamer Daewoo Rifle Red",
        img: "./img/sillaroja2.png",
        precio: 48999,
        marca: "Daewoo",
        color: "rojo",
    },
    {
        id: 5,
        nombre: "Silla Gaming Xreike-Me",
        img: "./img/sillaroja3.png",
        precio: 69999,
        marca: "Xtreike",
        color: "rojo",
    },
    {
        id: 6,
        nombre: "Silla Gamer Daewoo Rifle Green",
        img: "./img/sillaverde1.png",
        precio: 58000,
        marca: "Daewoo",
        color: "verde",
    },
    {
        id: 7,
        nombre: "Silla Gamer Daewoo Shooter Green",
        img: "./img/sillaverde2.png",
        precio: 614000,
        marca: "Daewoo",
        color: "verde",
    },
    {
        id: 8,
        nombre: "Silla Gamer Esports Pro The Game House",
        img: "./img/sillanegra.png",
        precio: 58000,
        marca: "The Game House",
        color: "negra",
    },

]

const contenedorSillas = document.querySelector("#contenedorSillas");
const contenedorAgregadas = document.querySelector(".contenedorAgregadas");
const carrito = [];

/*

Eventos
*/
document.addEventListener("DOMContentLoaded", function () {

    mostrarSillas();
})



/*
Funciones
*/
function mostrarSillas() {

    sillas.forEach(function (silla) {
            const divSilla = document.createElement("div");
            divSilla.classList.add("estilo");


            const imagenSilla = document.createElement("img");
            imagenSilla.src = silla.img;
            imagenSilla.className = "imagenSilla";


            const tituloSilla = document.createElement("h2");
            tituloSilla.textContent = silla.nombre;

            const btnFavorito = document.createElement("button");
            btnFavorito.textContent = "Agregar al carrito";
            btnFavorito.classList.add("boton");

            /*
            Evento al boton
            */
            btnFavorito.onclick = function () {
                agregarCarrito(silla.id);

            }

            /*
            Elementos al card 
            */
            divSilla.appendChild(imagenSilla);
            divSilla.appendChild(tituloSilla);
            divSilla.appendChild(btnFavorito);

            /*
            Dom
            */
            contenedorSillas.appendChild(divSilla);
        }

    )
}
/*Find para agregar al carrito
 */
function agregarCarrito(id) {
    const sillaAgregada = sillas.find(function (silla) {
        return silla.id === id;

    });

    carrito.push(sillaAgregada);
    mostrarSillasAgregadas(carrito);
}

function mostrarSillasAgregadas(agregadas) {

    agregadas.forEach(function (silla) {
            contenedorAgregadas.innerHTML = "";
        
        const divSilla = document.createElement("div");
            divSilla.classList.add("estilo");


            const imagenSilla = document.createElement("img");
            imagenSilla.src = silla.img;
            imagenSilla.className = "imagenSilla";


            const tituloSilla = document.createElement("h2");
            tituloSilla.textContent = silla.nombre;

        
            divSilla.appendChild(imagenSilla);
            divSilla.appendChild(tituloSilla);
       

            contenedorAgregadas.appendChild(divSilla);
        }

    )
}


/* FILTER */

const sillasFiltradas = sillas.filter(function(silla){
    return silla.precio < 56000;
})

console.log(sillasFiltradas);



let ingresar = prompt("ingresar la marca");

const resultado = sillas.filter((el) => el.marca.includes(ingresar));
console.log("las sillas que tenemos de esa marca son : " , resultado);


let ingresar1 = prompt("ingresa el color");

const resultado1 = sillas.filter((el) => el.color.includes(ingresar1));
console.log("De ese color nos quedan : " , resultado1);