// Declaro variables, objetos funciones

const productos = [
  {
    idProducto: 1,
    producto: "DJI Neo",
    valor: 1049900,
    enlace:
      "../assets/img/producto-neo.png",
  },
  {
    idProducto: 2,
    producto: "DJI Mini 4 Pro",
    valor: 4449900,
    enlace:
      "../assets/img/producto-mini-4-pro.jpeg",
  },
  {
    idProducto: 3,
    producto: "DJI Avata 2",
    valor: 5619900,
    enlace:
      "../assets/img/producto-avata2.png",
  },
  {
    idProducto: 4,
    producto: "DJI Matrice 4",
    valor: 24999900,
    enlace:
      "../assets/img/producto-matrice-350.png",
  },
  {
    idProducto: 5,
    producto: "DJI Air 3",
    valor: 5869900,
    enlace:
      "../assets/img/producto-air-3.png",
  },
];

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
renderProductos(productos);
