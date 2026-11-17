let listaProductos = [];

function agregarProducto() {
    const formulario = document.getElementById("formulario");

    if (!formulario.checkValidity()) {
        formulario.reportValidity();
        return;
    }

    const producto = document.getElementById("producto").value.trim();
    const precio = parseFloat(document.getElementById("precio").value);
    const cantidad = parseInt(document.getElementById("cantidad").value, 10);

    listaProductos.push({
        producto: producto,
        precio: precio,
        cantidad: cantidad
    });

    formulario.reset();
    mostrarProductos();
}

function mostrarProductos() {
    const tabla = document.getElementById("tabla");
    const total = document.getElementById("total");
    let totalNuevo = 0;

    tabla.innerHTML = "";

    for (let i = 0; i < listaProductos.length; i++) {
        const producto = listaProductos[i];
        const subtotal = producto.precio * producto.cantidad;

        tabla.innerHTML += `<tr>
            <td>${producto.producto}</td>
            <td>${producto.precio.toFixed(2)}</td>
            <td>${producto.cantidad}</td>
            <td>${subtotal.toFixed(2)}</td>
        </tr>`;

        totalNuevo += subtotal;
    }

    total.textContent = `Total: ${totalNuevo.toFixed(2)}`;
}
