const shopContent = document.getElementById("shopContent")
const verCarrito = document.getElementById("verCarrito")
const modalContainer = document.getElementById("modal-container")
const cantidadCarrito = document.getElementById("cantidadCarrito")

const categorias = ["novela", "ficcion", "romance", "juvenil", "policial", "aventura", "clasicos"]
const productos = [
    {
        id: 1,
        titulo: "El Gran Gatsby",
        autor: "F. Scott Fitzgerald",
        genero: "Novela, Ficción",
        descripcion: "La historia del millonario Jay Gatsby y su obsesión por el pasado.",
        rutaImagen: "https://m.media-amazon.com/images/I/61hR5wwWGuS._AC_UF1000,1000_QL80_.jpg",
        precio: 2000,
        unidades: 1
    },
    {
        id: 2,
        titulo: "Cien años de soledad",
        autor: "Gabriel Garcia Marquez",
        genero: "Novela",
        descripcion: "La saga de la familia Buendía a lo largo de siete generaciones en el pueblo de Macondo.",
        rutaImagen: "https://m.media-amazon.com/images/I/91TvVQS7loL._AC_UF1000,1000_QL80_.jpg",
        precio: 2000,
        unidades: 1
    },
    {
        id: 3,
        titulo: "Matar a un ruiseñor",
        autor: "Harper Lee",
        genero: "Novela, Ficción",
        descripcion: "La historia de Atticus Finch y sus hijos mientras luchan contra el racismo en el sur de los Estados Unidos.",
        rutaImagen: "https://m.media-amazon.com/images/I/51dxA6YXFzL._AC_UF1000,1000_QL80_.jpg",
        precio: 2000,
        unidades: 1
    },
    {
        id: 4,
        titulo: "1984",
        autor: "George Orwell",
        genero: "Novela, Ficción",
        descripcion: "Una novela distópica que describe un mundo totalitario y vigilante.",
        rutaImagen: "https://images.penguinrandomhouse.com/cover/9788418915093",
        precio: 2000,
        unidades: 1
    },
    {
        id: 5,
        titulo: "Orgullo y prejuicio",
        autor: "Jane Austen",
        genero: "Novela, Romance",
        descripcion: "La historia de Elizabeth Bennet y su relación con el señor Darcy en la Inglaterra del siglo XIX.",
        rutaImagen: "https://m.media-amazon.com/images/I/71wnBzT9WqL._AC_UF1000,1000_QL80_.jpg",
        precio: 3000,
        unidades: 1
    },
    {
        id: 6,
        titulo: "Don Quijote de la Mancha",
        autor: "Miguel de Cervantes",
        genero: "Clásico",
        descripcion: "Las aventuras del caballero Don Quijote y su fiel escudero Sancho Panza en una sátira literaria.",
        rutaImagen: "https://m.media-amazon.com/images/I/91zpNPYRFeL._AC_UF1000,1000_QL80_.jpg",
        precio: 3000,
        unidades: 1
    },
    {
        id: 7,
        titulo: "Los juegos del hambre",
        autor: "Suzanne Collins",
        genero: "Novela, Juvenil",
        descripcion: "La historia de Katniss Everdeen en un mundo distópico donde jóvenes son forzados a luchar por su supervivencia en un juego mortal.",
        rutaImagen: "https://m.media-amazon.com/images/I/51h3YpAz6rL._AC_UF1000,1000_QL80_.jpg",
        precio: 1000,
        unidades: 1
    },
    {
        id: 8,
        titulo: "Crónica de una muerte anunciada",
        autor: "Gabriel Garcia Marquez",
        genero: "Novela, Policial",
        descripcion: "La narración de un asesinato en una pequeña comunidad y la inevitabilidad del mismo.",
        rutaImagen: "https://images.cdn2.buscalibre.com/fit-in/360x360/13/97/1397a4f28df5ed21f99177884f3276bd.jpg",
        precio: 1000,
        unidades: 1
    },
    {
        id: 9,
        titulo: "Moby-Dick",
        autor: "Herman Melville",
        genero: "Novela, Ficción",
        descripcion: "La obsesión del capitán Ahab por cazar al gran cachalote blanco conocido como Moby-Dick.",
        rutaImagen: "https://m.media-amazon.com/images/I/81R91ODA9DL._AC_UF1000,1000_QL80_.jpg",
        precio: 2000,
        unidades: 1
    }

]



let carrito = JSON.parse(localStorage.getItem("carrito")) || [] // LS //

// Filtros //
document.addEventListener("keyup", (e) => {
    if (e.target.matches(".buscador")) {
        const filtro = e.target.value.toLowerCase();
        document.querySelectorAll(".card").forEach((libro) => {
            const textoLibro = libro.textContent.toLowerCase();
            if (
                textoLibro.includes(filtro) ||
                libro.querySelector(".autor").textContent.toLowerCase().includes(filtro) ||
                libro.querySelector(".genero").textContent.toLowerCase().includes(filtro)
            ) {
                libro.classList.remove("filtro");
            } else {
                libro.classList.add("filtro");
            }
        });
    }
});



// filtros

document.addEventListener("DOMContentLoaded", function () {
    const botonFiltros = document.querySelectorAll('.botonFiltro');
    const productos = document.querySelectorAll('.genero');

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
    document.querySelector('.botonFiltro[value="todos"]').classList.add('todos');
});

//A PARTIR DE ACA NO FUNCIONA -- REVISAR

// Funcion para ocultar productos 
/*    function hideProducts() {
        const cards = document.querySelectorAll(".card");
        cards.forEach(function(card) {
            card.style.transform = 'scale(0)';
            setTimeout(function() {
                card.style.display = 'none';
            }, 400);
        });
    }

    function showProducts(catProduct) {
        productos.forEach(function(producto) {
            const genero = producto.querySelector('.genero')

            if (producto.genero === catProduct || catProduct === "todos") {
                producto.style.display = 'block';
                setTimeout(function() {
                    producto.style.transform = 'scale(1)';
                }, 400);
            } else {
                producto.style.display = 'none';
            }
        });
    }
    
    // Agrega un evento 'click' a cada botón de filtro
    botonFiltros.forEach(function(boton) {
        boton.addEventListener('click', function() {
            const catProduct = this.getAttribute('value');
            console.log(catProduct);

            // Remueve la clase 'todos' de todos los botones de filtro
            botonFiltros.forEach(function(boton) {
                boton.classList.remove('todos');
            });

            this.classList.add('todos');

            // Oculta los productos y luego muestra los que coinciden con la categoría
            hideProducts();
            setTimeout(function() {
                showProducts(catProduct);
            }, 400);
        });
    });

*/







productos.forEach((product) => {
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

// set item //
const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

// get item //
const loadLocal = () => {
    const carritoString = localStorage.getItem("carrito");
    if (carritoString) {
        carrito = JSON.parse(carritoString);
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
    });

};




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