const shopContent = document.getElementById("shopContent")
const verCarrito = document.getElementById("verCarrito")
const modalContainer = document.getElementById("modal-container")
const cantidadCarrito = document.getElementById("cantidadCarrito")

let carrito = JSON.parse(localStorage.getItem("carrito")) || [] 

// Filtros - buscador //
document.addEventListener("keyup", (e) => {
    if (e.target.matches(".buscador")) {
        const filtro = e.target.value.toLowerCase()
        document.querySelectorAll(".card").forEach((libro) => {
            const textoLibro = libro.textContent.toLowerCase()
            if (
                textoLibro.includes(filtro) ||
                libro.querySelector(".autor").textContent.toLowerCase().includes(filtro) ||
                libro.querySelector(".genero").textContent.toLowerCase().includes(filtro)
            ) {
                libro.classList.remove("filtro")
            } else {
                libro.classList.add("filtro")
            }
        });
    }
});



// filtros-botones

document.addEventListener("DOMContentLoaded", function () {
    const botonFiltros = document.querySelectorAll('.botonFiltro')
    const productos = document.querySelectorAll('.genero')

    const categoriasAGeneros = {
        "todos": "todos",
        "novela": "Novela",
        "ficcion": "Ficción",
        "romance": "Romance",
        "juvenil": "Juvenil",
        "policial": "Policial",
        "aventura": "Aventura",
        "clasico": "Clásico"
    };

    // Agrega la clase 'todos' al botón de filtro "Todos"
    document.querySelector('.botonFiltro[value="todos"]').classList.add('todos')
});

//A PARTIR DE ACA NO FUNCIONA -- REVISAR

// Funcion para ocultar productos 
  /*  function hideProducts() {
        const cards = document.querySelectorAll(".card");
        cards.forEach(function(card) {
            card.style.transform = 'scale(0)';
            setTimeout(function() {
                card.style.display = 'none';
            }, 400);
        });
    } 
   
  
    botonFiltros.forEach(function (boton) {
        boton.addEventListener("click", function () {
            const catProduct = this.getAttribute("value");

            // Remueve la clase 'todos' de todos los botones de filtro
            botonFiltros.forEach(function (boton) {
                boton.classList.remove("todos");
            });

            this.classList.add("todos");

            // Muestra los libros que coinciden con la categoría seleccionada
            showProducts(catProduct);
        });
    });

      function showProducts(catProduct) {
        productos.forEach(function (producto) {
            const genero = producto.genero.toLowerCase();

            // Comprueba si el género del libro coincide con la categoría seleccionada o si es "todos"
            if (catProduct === "todos" || genero.includes(catProduct)) {
                producto.style.display = "block";
                // Puedes aplicar aquí cualquier animación o estilo adicional si lo deseas
            } else {
                producto.style.display = "none";
            }
        });
    }
*/
    

const getProducts = async ()=> {
const response = await fetch("data.json")
const data = await response.json()

data.forEach((product) => {
    let content = document.createElement("div") // creo cards de cada producto //
    content.className = "card" //nombre de clase para css//
    content.innerHTML = `
    <img src="${product.rutaImagen}">
    <h1>${product.titulo}</h1>
    <p class="price">$${product.precio}</p> 
    <div class="hidden-details"> 
        <p class="autor">${product.autor}</p>
        <p class="genero">${product.genero}</p>
    </div>
    `
    shopContent.append(content)

    let comprar = document.createElement("button")
    comprar.innerText = "Agregar al carrito"
    comprar.className = "comprar" // nombre de clase para css //

    content.append(comprar) // agrego boton de "agregar al carrito" en cada card //

    // Agrego funcionalidad del boton "agregar al carrito" --- eventos //
    comprar.addEventListener("click", () => { // lo que pasa al escuchar el click: //

        const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id) // busca productos repetidos dentro del carrito //
        if (repeat) {
            carrito.map((prod) => {
                if (prod.id === product.id) {
                    prod.unidades++
                }
            })
        } else {

            carrito.push({ //lo que quiero que pushee dentro del carrito //
                id: product.id,
                rutaImagen: product.rutaImagen,
                titulo: product.titulo,
                autor: product.autor,
                genero: product.genero,
                descripcion: product.descripcion,
                precio: product.precio,
                unidades: product.unidades,

            })

            console.log(carrito)
            console.log(carrito.length)
            carritoCounter()
            saveLocal()
        }

        // agrego toastify //
        Toastify({
            text: 'Libro agregado al carrito',
            duration: 2000,
            gravity: 'bottom',
            position: 'right',
            backgroundColor: '#fcac14',
        }).showToast();
    })
})
}

getProducts()


// set item //
const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

// get item //
const loadLocal = () => {
    const carritoString = localStorage.getItem("carrito")
    if (carritoString) {
        carrito = JSON.parse(carritoString)
    }
}


// eventos boton carrito - mostrar contenido del carrito //
const pintarCarrito = () => {
    modalContainer.innerHTML = "" // para limpiar el carrito cuando se cierre y se vuelva a abrir// es para que no se repita el carrito */
    modalContainer.style.display = "flex"
    const modalHeader = document.createElement("div")
    modalHeader.className = "modalHeader" // para los estilos //
    modalHeader.innerHTML = `
                 <h1 class= "modal-header-title">Tu Carrito</h1>
                 `
    modalContainer.append(modalHeader)

    const modalButton = document.createElement("h1")
    modalButton.innerText = "x"
    modalButton.className = "modal-header-button"

    modalButton.addEventListener("click", () => {
        modalContainer.style.display = "none"
    })

    modalHeader.append(modalButton)


    carrito.forEach((product) => { // productos que elija el ususario //
        let carritoContent = document.createElement("div")
        carritoContent.className = "modal-content"
        carritoContent.innerHTML = `
                <img src="${product.rutaImagen}">
                <div class="product-details"> 
                <h1>${product.titulo}</h1>
                <h2>${product.autor}</h2>
                <p>${product.descripcion}</p>
                <p>$${product.precio}</p>
                </div>
                <div class="quantity-control">
                <span class="restar"> - </span>
                <p class="unidades">${product.unidades}
                <span class="sumar"> + </span>
                </div> 
                <p>Total: $${product.unidades * product.precio}</p>        
                `


        modalContainer.append(carritoContent)

        let restar = carritoContent.querySelector(".restar")
        restar.addEventListener("click", () => {
            if (product.unidades !== 1) {
                product.unidades--
            }
            saveLocal()
            pintarCarrito()
        })

        let sumar = carritoContent.querySelector(".sumar")
        sumar.addEventListener("click", () => {
            product.unidades++
            saveLocal()
            pintarCarrito()
        })

        // eliminar productos del carrito //
        let eliminar = document.createElement("span")
        eliminar.innerText = "❌"
        eliminar.className = "delete-product"
        carritoContent.append(eliminar)

        eliminar.addEventListener("click", eliminarProducto)
        eliminar.setAttribute("data-id", product.id) /* local storage */


    })


    // calcular total del carrito //
    const total = carrito.reduce((acc, libro) => acc + libro.precio * libro.unidades, 0)

    const totalCompra = document.createElement("div")
    totalCompra.className = "total-content"
    totalCompra.innerHTML = `Total a pagar: $${total}`
    modalContainer.append(totalCompra)

    // Botón "Finalizar Compra" //


    const finalizarCompraButton = document.createElement("button")
    finalizarCompraButton.textContent = "Finalizar Compra"
    finalizarCompraButton.className = "finalizar-compra-button"
    modalContainer.appendChild(finalizarCompraButton)

    const modalPago = document.getElementById("modalPago")

    finalizarCompraButton.addEventListener("click", function () {
        modalPago.style.display = "block"
    });

    const modalCloseButton = document.querySelector(".modalPago-close-button")
    modalCloseButton.addEventListener("click", function () {
        modalPago.style.display = "none"
    })


    finalizarCompraButton.addEventListener("click", function () {
        modalContainer.style.display = "none"
        modalPago.style.display = "block"
    })

}

verCarrito.addEventListener("click", pintarCarrito)

const eliminarProducto = (event) => {
    const productId = parseInt(event.target.dataset.id)

    carrito = carrito.filter((product) => product.id !== productId)

    carritoCounter()
    saveLocal()
    pintarCarrito()
}

/* local storage */
const carritoCounter = () => {
    cantidadCarrito.style.display = "block"

    const carritoLength = carrito.length

    localStorage.setItem("carritoLength", JSON.stringify(carritoLength))


    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"))
}

carritoCounter()



/* falta agregar filtros
asincronia y promesas
ajax y fetch
mejorar estilos */