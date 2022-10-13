/*
Variables
*/
const sillas = [
  {
    id: 1,
    nombre: "Silla Gamer Daewoo Shooter Blue",
    img: "./img/sillaazul1.png",
    precio: 55000,
    marca: "Daewoo",
    color: "azul",
    stock: "4",
  },
  {
    id: 2,
    nombre: "Silla Gamer Esports Pro The Game House",
    img: "./img/sillaazul2.png",
    precio: 55000,
    marca: "The Game House",
    color: "azul",
    stock: "20",
  },
  {
    id: 3,
    nombre: "Silla Gamer Daewoo Shooter Red",
    img: "./img/sillaroja1.png",
    precio: 58000,
    marca: "Daewoo",
    color: "rojo",
    stock: "34",
  },
  {
    id: 4,
    nombre: "Silla Gamer Daewoo Rifle Red",
    img: "./img/sillaroja2.png",
    precio: 48999,
    marca: "Daewoo",
    color: "rojo",
    stock: "46",
  },
  {
    id: 5,
    nombre: "Silla Gaming Xreike-Me",
    img: "./img/sillaroja3.png",
    precio: 69999,
    marca: "Xtreike",
    color: "rojo",
    stock: "50",
  },
  {
    id: 6,
    nombre: "Silla Gamer Daewoo Rifle Green",
    img: "./img/sillaverde1.png",
    precio: 58000,
    marca: "Daewoo",
    color: "verde",
    stock: "10",
  },
  {
    id: 7,
    nombre: "Silla Gamer Daewoo Shooter Green",
    img: "./img/sillaverde2.png",
    precio: 61400,
    marca: "Daewoo",
    color: "verde",
    stock: "14",
  },
  {
    id: 8,
    nombre: "Silla Gamer Esports Pro The Game House",
    img: "./img/sillanegra.png",
    precio: 58000,
    marca: "The Game House",
    color: "negra",
    stock: "22",
  },
];

const contenedorSillas = document.querySelector("#contenedorSillas");
const contenedorAgregadas = document.querySelector("#contenedorAgregadas");
let carrito;

let carritoLocal = JSON.parse(localStorage.getItem("carrito"));

if (!carritoLocal) {
  carrito = [];
  localStorage.setItem("carrito", JSON.stringify(carrito));
}
/*
Eventos
*/
document.addEventListener("DOMContentLoaded", function () {
  mostrarSillas();
});

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

    btnFavorito.addEventListener("click", agregarCarrito);
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
function agregarCarrito(e) {
  carrito = JSON.parse(localStorage.getItem("carrito"));

  let hijo = e.target;
  let padre = hijo.parentNode;

  let nombre_silla = padre.querySelector("h2").textContent;
  let precio_silla = padre.querySelector("h3").textContent;
  let imagen_sila = padre.querySelector("img").src;

  let silla_carrito = {
    img: imagen_sila,
    nombre: nombre_silla,
    cantidad: 1,
    precio: precio_silla,
  };

  let mismo_producto = carrito.some((p) => p.nombre === silla_carrito.nombre);

  if (mismo_producto) {
    let producto_carrito_ = carrito.map((p) => {
      //variable privada con guion bajo al final
      if (p.nombre === silla_carrito.nombre) {
        p.cantidad++;
        return p;
      } else {
        return p;
      }
    });

    //CADA VEZ QUE SE CREE UN OBJETO DE ESTOS LO VOY A AGREGAR A MI CARRITO VACIO PUSHEANDOLO A UN ARREGLO//
    carrito = [...producto_carrito_];
  } else {
    carrito = [...carrito, silla_carrito];
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));

  contenedorAgregadas.innerHTML = "";

  mostrarSillasAgregadas(carrito);

  Toastify({
    text: "Se agrego correctamente",
    duration: 500,
    gravity: "left",
    style: {
      fontSize: "22px",
      background: "linear-gradient(#296285, #7f858a) ",
      color: "#f5f2f0",
    },
  }).showToast();
}

function mostrarSillasAgregadas(carrito) {
  carrito.forEach((silla) => {
    const divSilla = document.createElement("div");
    divSilla.classList.add("estilo");

    const imagenSilla = document.createElement("img");
    imagenSilla.src = silla.img;
    imagenSilla.className = "imagenSilla";

    const cantidadSilla = document.createElement("p");
    cantidadSilla.textContent = silla.cantidad;
    cantidadSilla.className = "cantidadSilla";

    const tituloSilla = document.createElement("h2");
    tituloSilla.textContent = silla.nombre;

    const parrafoSilla = document.createElement("h3");
    parrafoSilla.textContent = silla.precio;

    const btn_eliminar = document.createElement("button");
    btn_eliminar.textContent = "borrar";
    btn_eliminar.classList.add("borrar");

    suma_productos();

    divSilla.appendChild(imagenSilla);
    divSilla.appendChild(parrafoSilla);
    divSilla.appendChild(cantidadSilla);
    divSilla.appendChild(tituloSilla);
    divSilla.appendChild(btn_eliminar);

    contenedorAgregadas.appendChild(divSilla);
    /*boton borrar*/

    let botones_borrar = document.getElementsByClassName("borrar");
    for (let btn of botones_borrar) {
      btn.addEventListener("click", eliminar);
    }
  });
}

function eliminar(e) {
  let target = e.target.parentNode;
  let nombres = e.target.parentNode.getElementsByTagName("h2");

  carrito = JSON.parse(localStorage.getItem("carrito"));

  for (let p of carrito) {
    for (let nombre of nombres) {
      if (p.cantidad > 1 && p.nombre === nombre.innerText) {
        p.cantidad--;
        localStorage.setItem("carrito", JSON.stringify(carrito));
        contenedorAgregadas.innerHTML = "";
        mostrarSillasAgregadas(carrito);
      } else if (p.cantidad === 1 && p.nombre === nombre.innerText) {
        target.remove();
        carrito = JSON.parse(localStorage.getItem("carrito"));
        carrito = carrito.filter((e) => e.nombre !== nombre.innerText);
        suma_productos();
        localStorage.setItem("carrito", JSON.stringify(carrito));
        contenedorAgregadas.innerHTML = "";
        mostrarSillasAgregadas(carrito);
        return carrito;
      }
    }
  }
}

function suma_productos() {
  let venta_total = carrito.reduce(calcular_total, 0);
  let total = document.getElementById("totalCarrito");
  total.innerHTML = `El total a pagar es : ${venta_total}`;
}

function calcular_total(acu, producto) {
  acu = acu += parseInt(producto.precio * producto.cantidad);

  return acu;
}


/* evento de teclado*/
window.addEventListener("keydown", function (e) {
  if (e.key == "ArrowUp") {
    this.document.body.style.background = "dimgrey";
  } else if (e.key == "ArrowDown") {
    this.document.body.style.background = "rgb(151, 150, 148)";
  }
});


/*storage  y Sweet alert para*/
function cargarStorage() {
  carrito = JSON.parse(localStorage.getItem("carrito"));
  if (carrito.length !== 0) {
    Swal.fire({
      text: "Tu carrito te esta esperando",
      title: "Terminar compra",
      icon: "warning",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  }
  mostrarSillasAgregadas(carrito);
}

if (carritoLocal !== 0) {
  cargarStorage();
}

const comprar = document.querySelector(".comprar");
function finalizar() {
  Swal.fire({
    text: "El envio se realiza dentro de las 48hs.",
    title: "finalizaste la compra",

    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
  });
  carrito = [];
  contenedorAgregadas.innerHTML = "";
  let total = document.getElementById("totalCarrito");
  total.innerHTML = `El total a pagar es : 0`;
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarSillasAgregadas(carrito);
}

/*Fetch y api del clima */
let contenedor = document.getElementById("clima");
let ciudad = "Buenos Aires";

fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=" +
    ciudad +
    "&units=metric&appid=e78b917eef6d58e69081cc66b32771ea"
)
  .then((response) => response.json())
  .then((data) => {
    contenedor.innerHTML = ` <span> Ciudad: ${data.name}</span>
                                 <span> Temp: ${data.main.temp}  </span>  `;
  });
