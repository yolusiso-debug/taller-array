let listaProductos = [
   { id: 1, nombre: "Teclado", categoria: "Accesorios", precio: 85000, stock: 15 },
   { id: 2, nombre: "Mouse", categoria: "Accesorios", precio: 45000, stock: 20 },
   { id: 3, nombre: "Monitor", categoria: "Tecnología", precio: 650000, stock: 4 }
];

function agregarProducto(evento) {
   evento.preventDefault();
   let id = Math.max(...listaProductos.map(producto => Number(producto.id))) + 1;
   let nombre = document.getElementById("nombre").value;
   let categoria = document.getElementById("categoria").value;
   let precio = parseFloat(document.getElementById("precio").value);
   let stock = parseInt(document.getElementById("stock").value);
   let nuevoProducto = { id, nombre, categoria, precio, stock };
   listaProductos.push(nuevoProducto);
   actualizarTabla();
   document.getElementById("formularioProducto").reset();
}

function actualizarTabla() {
   let tablaProductos = document.getElementById("tablaProductos");
   tablaProductos.innerHTML = ""; // Limpiar la tabla antes de actualizar
   let buscar = document.getElementById("buscar").value.trim().toLocaleLowerCase();
   let terminoBusqueda = buscar.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
   let filtroCategoria = document.getElementById("filtroCategoria").value;
   let productosFiltrados = listaProductos.filter(producto => {
       let nombreProducto = producto.nombre.toLocaleLowerCase()
           .normalize("NFD")
           .replace(/[\u0300-\u036f]/g, "");
       let coincideNombre = nombreProducto.includes(terminoBusqueda);
       let coincideCategoria = !filtroCategoria || producto.categoria === filtroCategoria;
       return coincideNombre && coincideCategoria;
   });

   productosFiltrados.forEach(producto => {
       const fila = tablaProductos.insertRow();
       [producto.id, producto.nombre, producto.categoria, producto.precio.toLocaleString('es-CO'), producto.stock]
           .forEach(valor => fila.insertCell().textContent = valor);
   });

   document.getElementById("mensaje").innerText = productosFiltrados.length
       ? ""
       : "No se encontraron productos.";

   let totalProductos = listaProductos.length;
   document.getElementById("totalProductos").innerText = totalProductos;

   let valorInventario = 0;
   let productoCaro = listaProductos[0];
   let productoPocoStock = "";

   listaProductos.forEach(producto => {
       valorInventario += producto.precio * producto.stock;

       if (producto.precio > productoCaro.precio) {
           productoCaro = producto;
       }

       if (producto.stock < 10) {
           productoPocoStock = producto;
       }
   });

   document.getElementById("valorInventario").innerText =
       valorInventario.toLocaleString('es-CO');
   document.getElementById("productoCostoso").innerText =
       `${productoCaro.nombre} - ${productoCaro.precio.toLocaleString('es-CO')}`;
   document.getElementById("pocoStock").innerText = productoPocoStock
       ? `${productoPocoStock.nombre} - ${productoPocoStock.stock} unidades`
       : "0";
}

document.getElementById("formularioProducto").addEventListener("submit", agregarProducto);
document.getElementById("buscar").addEventListener("input", actualizarTabla);
document.getElementById("filtroCategoria").addEventListener("change", actualizarTabla);
actualizarTabla();