// Declaro funciones que se utilizaran 


/** Genera una lista de productos disponibles recibe un array de objetos y retorna un string que formateado */
function mostrarProductos(productos) {
  let listaProductos =
    "Seleccione el 'ID' del producto que desea agregar al carrito: \n\n";
  for (const producto of productos) {
    const valorFormateado = producto.valor
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    listaProductos += `${producto.idProducto} - ${producto.producto}: $ ${valorFormateado}\n`;
  }
  listaProductos += "o ingrese 'finalizar' para terminar la compra.";
  return listaProductos;
}

// Declaro variables u objetos 

const productos = [
  { idProducto: 1, producto: "DJI Neo", valor: 1049900 },
  { idProducto: 2, producto: "DJI Mini 4 Pro", valor: 4449900 },
  { idProducto: 3, producto: "DJI Avata 2", valor: 5619900 },
  { idProducto: 4, producto: "DJI Matrice 4", valor: 24999900 },
  { idProducto: 5, producto: "DJI Air 3", valor: 5869900 },
];

let totalCompra = 0;
let estadoCompra = "comprando";

// Inicio programación

alert("Bienvenido a la tienda de drones");

// El usuario debera digitar id validos o escribir finalizar para salir del ciclo 

while (estadoCompra !== "finalizar") {
  const seleccion = prompt(mostrarProductos(productos));
 // se contempla cuando da cancelar en prompt 
  if (seleccion === "finalizar" || seleccion === null) {
    estadoCompra = "finalizar";
  } else {
    const idSeleccionado = parseInt(seleccion);
    const productoSeleccionado = productos.find(
      (producto) => producto.idProducto === idSeleccionado
    );

    if (productoSeleccionado) {
      totalCompra += productoSeleccionado.valor;
      alert(`${productoSeleccionado.producto} añadido al carrito.`);
    } else {
      alert(
        "Producto no válido. Por favor, seleccione un 'ID' de producto válido."
      );
    }
  }
}

// si la compra es 0 porque finalizo repentinamente

if (totalCompra > 0) {
  const confirmarCompra = confirm(
    `¿Desea confirmar la compra por un total de: $ ${totalCompra
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}?`
  );

  if (confirmarCompra) {
    alert(
      `Compra confirmada. Total: $ ${totalCompra
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
    );
  } else {
    alert("Compra cancelada.");
  }
} else {
  alert("No se agregaron productos al carrito.");
}
