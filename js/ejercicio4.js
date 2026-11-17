"use strict";

const CLAVE_CITAS = "peluditos_citas";

function obtenerCitas() {
  try {
    const citasGuardadas = localStorage.getItem(CLAVE_CITAS);
    return citasGuardadas ? JSON.parse(citasGuardadas) : [];
  } catch (error) {
    console.error("No se pudieron leer las citas guardadas:", error);
    return [];
  }
}

function guardarCitas(citas) {
  try {
    localStorage.setItem(CLAVE_CITAS, JSON.stringify(citas));
    return true;
  } catch (error) {
    console.error("No se pudieron guardar las citas:", error);
    return false;
  }
}

function mostrarMensaje(texto, esError = false) {
  const elemento = document.getElementById("mensaje");

  if (!elemento) return;

  elemento.textContent = texto;
  elemento.setAttribute("role", esError ? "alert" : "status");
}

function leerDatosFormulario() {
  return {
    fecha: document.getElementById("fechaCita").value,
    nombre: document.getElementById("nombreMascota").value.trim(),
    tipoMascota: document.getElementById("tipoMascota").value,
    raza: document.getElementById("razaMascota").value.trim(),
    edad: document.getElementById("edadMascota").value.trim(),
    tipoConsulta: document.getElementById("tipoConsulta").value
  };
}

function validarCita(cita) {
  if (
    !cita.fecha ||
    !cita.nombre ||
    !cita.tipoMascota ||
    !cita.raza ||
    !cita.edad ||
    !cita.tipoConsulta
  ) {
    return "Completa todos los campos antes de agendar la cita.";
  }

  // Comprueba que la fecha ingresada sea válida.
  const fechaIngresada = new Date(`${cita.fecha}T00:00:00`);

  if (Number.isNaN(fechaIngresada.getTime())) {
    return "Ingresa una fecha válida para la cita.";
  }

  return "";
}

function actualizarTabla() {
  const cuerpoTabla = document.getElementById("FilasCitas");
  const contador = document.getElementById("contador");

  if (!cuerpoTabla) {
    console.error('No se encontró el elemento con id="FilasCitas".');
    return;
  }

  const citas = obtenerCitas();
  cuerpoTabla.replaceChildren();

  if (citas.length === 0) {
    const fila = document.createElement("tr");
    const celda = document.createElement("td");

    celda.className = "vacio";
    celda.colSpan = 6;
    celda.textContent = "No hay citas registradas";

    fila.appendChild(celda);
    cuerpoTabla.appendChild(fila);
  } else {
    citas.forEach((cita) => {
      const fila = document.createElement("tr");

      [
        cita.fecha,
        cita.nombre,
        cita.tipoMascota,
        cita.raza,
        cita.edad,
        cita.tipoConsulta
      ].forEach((valor) => {
        const celda = document.createElement("td");
        celda.textContent = valor;
        fila.appendChild(celda);
      });

      cuerpoTabla.appendChild(fila);
    });
  }

  if (contador) {
    const cantidad = citas.length;
    contador.textContent = `Total: ${cantidad} ${cantidad === 1 ? "cita" : "citas"}`;
  }
}

function agendarCita(evento) {
  // Permite usar esta función tanto desde el formulario como desde onclick.
  if (evento && typeof evento.preventDefault === "function") {
    evento.preventDefault();
  }

  const cita = leerDatosFormulario();
  const error = validarCita(cita);

  if (error) {
    mostrarMensaje(error, true);
    return;
  }

  const citas = obtenerCitas();
  citas.push(cita);

  if (!guardarCitas(citas)) {
    mostrarMensaje(
      "La cita se agregó, pero no se pudo guardar en este navegador.",
      true
    );
    return;
  }

  actualizarTabla();
  document.getElementById("formularioCita")?.reset();
  mostrarMensaje("Cita guardada correctamente.");
}

function limpiarFormulario() {
  document.getElementById("formularioCita")?.reset();
  mostrarMensaje("Formulario limpio.");
}


window.agendarCita = agendarCita;
window.limpiarFormulario = limpiarFormulario;

document.getElementById("formularioCita")
  .addEventListener("submit", agendarCita);


actualizarTabla();
