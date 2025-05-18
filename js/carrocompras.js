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
    <button type="button" class="btn btn-success" id="boton-checkout">Comprar</button>
    <button type="button" class="btn btn-danger" id="boton-limpiar-carrito">Vaciar carrito</button>
    `;
  carritoContainer.appendChild(totalCarritoContainer);

  const botonCheckout = document.getElementById("boton-checkout");
  if (botonCheckout) {
    botonCheckout.addEventListener("click", () => {
      Swal.fire({
        title: "Gestión de pago",
        html: `
          Por favor, ingresa los siguientes datos:
          <div id="form-inputs">
            <div class="swal2-input-container">
              <input type="text" id="nombre" class="swal2-input" placeholder="Nombre Completo">
            </div>
            <div class="swal2-input-container">
              <input type="text" id="tarjeta" class="swal2-input" placeholder="Número de Tarjeta">
            </div>
             <div class="swal2-input-container">
              <input type="text" id="tarjetacvv" class="swal2-input" placeholder="CVV">
            </div>
            <div class="swal2-input-container">
              <input type="text" id="direccion" class="swal2-input" placeholder="Dirección de Entrega">
            </div>
          </div>
          <br>
          <b>Total:</b>
          <p>$ ${total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} COP</p>
        `,
        showCancelButton: true,
        confirmButtonText: "Pagar",
        cancelButtonText: "Cancelar",
        preConfirm: () => {
          const nombre = document.getElementById("nombre").value;
          const tarjeta = document.getElementById("tarjeta").value;
          const tarjetacvv = document.getElementById("tarjetacvv").value;
          const direccion = document.getElementById("direccion").value;

          let errores = [];

          // validacion de las entradas adicional

          if (!nombre || !tarjeta || !direccion || !tarjetacvv) {
            errores.push("Por favor, completa todos los campos.");
          }
          if (tarjeta.length !== 16) {
            errores.push("El número de tarjeta debe tener 16 dígitos.");
          }
          if (tarjetacvv.length !== 4) {
            errores.push(
              "El Código de seguridad de tarjeta debe tener 4 dígitos."
            );
          }

          if (errores.length > 0) {
            Swal.showValidationMessage(errores.join("<br>"));
            return false; // Evita que SweetAlert se cierre
          }

          return {
            nombre: nombre,
            tarjeta: tarjeta,
            tarjetacvv: tarjetacvv,
            direccion: direccion,
          };
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: `Gracias, ${result.value.nombre}!`,
            text: `Tu compra se ha realizado con éxito.  Enviaremos tu pedido a: ${result.value.direccion}`,
            icon: "success",
          });
          localStorage.clear();
          carrito = [];
          renderCarrito(carrito);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          localStorage.clear();
          carrito = [];
          renderCarrito(carrito);
        }
      });
    });
  }
  // Agregar evento para limpiar el carrito de compras 
  const botonVaciar = document.getElementById("boton-limpiar-carrito");
  if (botonVaciar) {
    botonVaciar.addEventListener("click", () => {
      localStorage.clear();
      carrito = [];
      renderCarrito(carrito);
    });
  }
}

let totalCarritoContainer = document.getElementById("total-carrito-container");

let carrito = localStorage.getItem("carrito");
carrito = JSON.parse(carrito);

let carritoContainer = document.getElementById("carrito-contenedor");
renderCarrito(carrito);
