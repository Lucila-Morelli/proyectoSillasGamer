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
        cantidad:"4"
    },
    {
        id: 2,
        nombre: "Silla Gamer Esports Pro The Game House",
        img: "./img/sillaazul2.png",
        precio: 55000,
        marca: "The Game House",
        color: "azul",
        cantidad:"20"
    },
    {
        id: 3,
        nombre: "Silla Gamer Daewoo Shooter Red",
        img: "./img/sillaroja1.png",
        precio: 58000,
        marca: "Daewoo",
        color: "rojo",
        cantidad:"34"
    },
    {
        id: 4,
        nombre: "Silla Gamer Daewoo Rifle Red",
        img: "./img/sillaroja2.png",
        precio: 48999,
        marca: "Daewoo",
        color: "rojo",
        cantidad:"46"
    },
    {
        id: 5,
        nombre: "Silla Gaming Xreike-Me",
        img: "./img/sillaroja3.png",
        precio: 69999,
        marca: "Xtreike",
        color: "rojo",
        cantidad:"50"
    },
    {
        id: 6,
        nombre: "Silla Gamer Daewoo Rifle Green",
        img: "./img/sillaverde1.png",
        precio: 58000,
        marca: "Daewoo",
        color: "verde",
        cantidad:"10"
    },
    {
        id: 7,
        nombre: "Silla Gamer Daewoo Shooter Green",
        img: "./img/sillaverde2.png",
        precio: 61400,
        marca: "Daewoo",
        color: "verde",
        cantidad:"14"
    },
    {
        id: 8,
        nombre: "Silla Gamer Esports Pro The Game House",
        img: "./img/sillanegra.png",
        precio: 58000,
        marca: "The Game House",
        color: "negra",
        cantidad:"22"
    },

]

const contenedorSillas = document.querySelector("#contenedorSillas");
const contenedorAgregadas = document.querySelector("#contenedorAgregadas");
/*const carrito = JSON.parse(localStorage.getItem("carrito"))|| [];*/
let carrito = [];
console.log(carrito);

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

    for (let silla of sillas) {
        const divSilla = document.createElement("div");
        divSilla.classList.add("estilo");


        const imagenSilla = document.createElement("img");
        imagenSilla.src = silla.img;
        imagenSilla.className = "imagenSilla";


        const tituloSilla = document.createElement("h2");
        tituloSilla.textContent = silla.nombre;
        const parrafoSilla = document.createElement("h3");
        parrafoSilla.textContent = silla.precio;

        const btnFavorito = document.createElement("button");
        btnFavorito.textContent = "Agregar al carrito";
        btnFavorito.classList.add("boton");

        /*
        Evento al boton
        */
        btnFavorito.onclick = function () {
            agregarCarrito(silla.id);
            let arreglo_JSON = JSON.stringify(carrito);
            localStorage.setItem("carrito", arreglo_JSON);
            JSON.parse(localStorage.getItem("carrito")) || [];
           
           /*Toastify cada vez que se agrega una silla */
            Toastify({

                text: "Se agrego correctamente",
                duration: 500,
                gravity: "left",
                style: {
                    fontSyze: "22px",
                    background: "linear-gradient(#296285, #7f858a) ",
                    color: "#f5f2f0",
                }

            }).showToast();
        }

        console.log(localStorage.length);

        /*
        Elementos al card 
        */
        divSilla.appendChild(imagenSilla);
        divSilla.appendChild(tituloSilla);
        divSilla.appendChild(parrafoSilla);
        divSilla.appendChild(btnFavorito);


        /*
        Dom
        */
        contenedorSillas.appendChild(divSilla);
    }



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
    contenedorAgregadas.innerHTML = "";
    agregadas.forEach(function (silla) {


            const divSilla = document.createElement("div");
            divSilla.classList.add("estilo");


            const imagenSilla = document.createElement("img");
            imagenSilla.src = silla.img;
            imagenSilla.className = "imagenSilla";


            const tituloSilla = document.createElement("h2");
            tituloSilla.textContent = silla.nombre;


            const parrafoSilla = document.createElement("h3");
            parrafoSilla.textContent = silla.precio;


            const btn_eliminar = document.createElement("button");
            btn_eliminar.textContent = "borrar";
            btn_eliminar.classList.add("borrar");


          

            suma_productos()

            divSilla.appendChild(imagenSilla);
            divSilla.appendChild(parrafoSilla);
            divSilla.appendChild(tituloSilla);
            divSilla.appendChild(btn_eliminar);

            contenedorAgregadas.appendChild(divSilla);
            /*boton borrar*/

            let botones_borrar = document.getElementsByClassName("borrar");
            for (let btn of botones_borrar) {
                btn.addEventListener("click", eliminar)
            }
        }

    )



}








function eliminar(e) {
    let target = e.target.parentNode;
    let nombres = e.target.parentNode.getElementsByTagName("h2");
    target.remove()
    for (let nombre of nombres) {
        carrito = carrito.filter((e) => e.nombre !== nombre.innerText)
        suma_productos();
        return carrito;

    }
    mostrarSillasAgregadas(carrito);
}


function suma_productos() {
    let venta_total = carrito.reduce(calcular_total, 0);
    let total = document.getElementById("totalCarrito");
    console.log(total);
    total.innerHTML = `El total a pagar es : ${venta_total}`;


}

function calcular_total(acu, producto) {

    acu = acu += parseInt(producto.precio);

    return acu

}




/* FILTER 

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

*/
/* evento de teclado*/
window.addEventListener("keydown", function (e) {


    if (e.key == "ArrowUp") {
        this.document.body.style.background = "dimgrey";
    } else if (e.key == "ArrowDown") {
        this.document.body.style.background = "rgb(151, 150, 148)";
    }
});





let form = document.getElementById("form");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let nombre = document.getElementById("nombre");
    let telefono = document.getElementById("telefono");

    console.log("El nombre del usuario es ", nombre.value);
    console.log("El telefono del usuario es ", telefono.value);
})



/*storage  y Sweet alert para*/
function cargarStorage() {
    let storage = JSON.parse(localStorage.getItem("carrito"));
    if (storage) {
        Swal.fire({
            text: "Tu carrito te esta esperando",
            title: "Terminar compra",
            icon: "warning",
            showClass: {
                popup: "animate__animated animate__fadeInDown"
            },
            hideClass: {
                popup: "animate__animated animate__fadeOutUp"
            }
        });
        carrito = storage;
        mostrarSillasAgregadas(carrito);
        localStorage.clear();
    }
}
cargarStorage()







const comprar = document.querySelector(".comprar");

function finalizar(){
    Swal.fire({
        text: "El envio se realiza dentro de las 48hs.",
        title:"finalizaste la compra",
      
        showClass: {
            popup: "animate__animated animate__fadeInDown"
        },
        hideClass: {
            popup: "animate__animated animate__fadeOutUp"
        }
    });


}




/*AIUDAAA, Quiero que cuando cargo en el carrito dos sillas iguales sume la cantidadx2 o tres y asi...pero no logre hacerlo

contenedorAgregadas = (Id) => {
    const sillaAgregada= sillaAgregada.find((silla) => silla.id === Id)

    if (sillaAgregada) {
        sillaAgregada.cantidad++
        console.log("+1 cantidad")
    } else {
        const prod = sillas.find((silla) => silla.id === Id)

        sillaAgregada.push({
            id: silla.id,
            nombre: silla.nombre,
            img: silla.img,
            cantidad: 1
        })
    
    }
 contenedorAgregadas(sillaAgregada)
}
*/



let contenedor = document.getElementById("clima")
let ciudad = "Buenos Aires"


fetch("https://api.openweathermap.org/data/2.5/weather?q=" + ciudad +"&units=metric&appid=e78b917eef6d58e69081cc66b32771ea")
.then(response=> response.json())
.then(data => 
    {
        contenedor.innerHTML = ` <span> Ciudad: ${data.name}</span>
                                 <span> Temp: ${data.main.temp}  </span>  `  
    })