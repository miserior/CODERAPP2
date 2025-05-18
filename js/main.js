let productos = [];

fetch("../db/data.json")
  .then(response => response.json())
  .then(data => {
    productos = data
    renderProductos(productos)
    agregarCarrito()
    eliminarCarrito()
  })
  .catch(error => {
    console.error("Error al cargar los productos:", error);
  });

let carrito = localStorage.getItem("carrito");
if (carrito) {
  carrito = JSON.parse(carrito);
} else {
  carrito = [];
}

function agregarCarrito() {
  addButton = document.querySelectorAll(".productoAgregar");
  addButton.forEach((button) => {
    button.onclick = (e) => {
      try {
        const productoId = e.currentTarget.id;
        const productoSeleccionado = productos.find(
          (producto) => producto.idProducto == productoId
        );
        const productoEnCarrito = carrito.find(
          (item) => item.idProducto == productoId
        );
        if (productoEnCarrito) {
          productoEnCarrito.cantidad++;
        } else {
          productoSeleccionado.cantidad = 1;
          carrito.push(productoSeleccionado);
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
        productsContainer.innerHTML = '';
        renderProductos(productos);
  
        // Agregamos la libreria para notificar
        Toastify({
          text: "Producto añadido al carrito",
          duration: 3000,
          close: true,
          gravity: "top", 
          position: "right", 
          style: {  
            background: "linear-gradient(to right, #000000,rgb(95, 93, 93))"
          },
          stopOnFocus: true, 
        }).showToast();
        
      }
      catch (error) {
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al agregar el producto al carrito. Por favor, intenta de nuevo.",
          icon: "error",
        });
      }

    };
  });
}

function eliminarCarrito() {
  addButton = document.querySelectorAll(".productoQuitar");
  addButton.forEach((button) => {
    button.onclick = (e) => {
      const productoIdAEliminar = e.currentTarget.id;
      const indiceProducto = carrito.findIndex(
        (item) => item.idProducto == productoIdAEliminar
      );
      if (indiceProducto !== -1) {
        carrito[indiceProducto].cantidad--
        if (carrito[indiceProducto].cantidad == 0) 
        {
          carrito.splice(indiceProducto, 1);
        }
        localStorage.setItem("carrito", JSON.stringify(carrito))
        productsContainer.innerHTML = ''
        renderProductos(productos)
      }
    };
  });
}

function renderProductos(productos) {
  productos.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add(
      "card",
      "sectionc-cards",
      "col-lg-3",
      "col-md-2",
      "col-sm-12"
    );
    const productoEnCarrito = carrito.find(item => item.idProducto === producto.idProducto)
    
    const cantidadEnCarrito = productoEnCarrito ? (productoEnCarrito.cantidad !== undefined ? productoEnCarrito.cantidad : '') : 0

    card.innerHTML = `
    <div class="card-body">
    <img src=${producto.enlace} alt=${producto.producto}>
    <h3 class="card-title">${producto.producto}</h3>
    <p class="card-text">${producto.valor
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} COP</p>
     <p class="card-text">Unidades añadidas: ${cantidadEnCarrito} </p>
    <button type="button" class="btn btn-dark productoAgregar" id=${
      producto.idProducto
    }>Añadir al carrito</button>
    <button type="button" class="btn btn-danger productoQuitar" id=${
      producto.idProducto
    }>Quitar del carrito</button>
    </div>`;
    productsContainer.appendChild(card);
  });
  agregarCarrito();
  eliminarCarrito();
}

// Inicio

let productsContainer = document.getElementById("productos-contenedor");
