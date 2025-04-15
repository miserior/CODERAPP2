// Declaro variables, objetos funciones
function eliminarCarrito() {
  addButton = document.querySelectorAll(".productoQuitar");
  addButton.forEach((button) => {
    button.onclick = (e) => {
      const productoIdAEliminar = e.currentTarget.id;
      const indiceProducto = carrito.findIndex(
        (item) => item.idProducto == productoIdAEliminar
      );
      if (indiceProducto !== -1) {
        carrito.splice(indiceProducto, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderCarrito(carrito);
      }
    };
  });
}

function renderCarrito(productosCarrito) {
  carritoContainer.innerHTML = "";
  const botonComprar = document.getElementById("boton-comprar");


  if (!productosCarrito || productosCarrito.length === 0) {
    if (botonComprar) {
      botonComprar.style.display = "none";
    }
    return;
  }
  productosCarrito.forEach((productoCarrito) => {
    const card = document.createElement("div");
    card.classList.add(
      "card",
      "sectionc-cards",
      "col-lg-3",
      "col-md-2",
      "col-sm-12"
    );
    card.innerHTML = `
      <div class="card-body">
      <img src=${productoCarrito.enlace} alt=${productoCarrito.producto}>
      <h3 class="card-title">${productoCarrito.producto}</h3>
      <p class="card-text">${productoCarrito.valor
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} COP</p>
        <p class="card-text">Unidades añadidas: ${productoCarrito.cantidad} </p>
     <button type="button" class="btn btn-danger productoQuitar" id=${
       productoCarrito.idProducto
     }>Eliminar del carrito</button>
      </div>`;
    carritoContainer.appendChild(card);
  });
  eliminarCarrito();

  const total = productosCarrito.reduce((acumulador, producto) => {
    return acumulador + producto.valor * producto.cantidad;
  }, 0);


    totalCarritoContainer.innerHTML = `
    <h4>Total carrito:</h4>
    <p>$ ${total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} COP</p>
    `;
    carritoContainer.appendChild(totalCarritoContainer);

}

let totalCarritoContainer = document.getElementById("total-carrito-container")

let carrito = localStorage.getItem("carrito");
carrito = JSON.parse(carrito);

let carritoContainer = document.getElementById("carrito-contenedor");
renderCarrito(carrito);
