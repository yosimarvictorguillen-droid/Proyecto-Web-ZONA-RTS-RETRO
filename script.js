// ── 1. EVENTO LOAD: mensaje en consola al cargar la página ───
window.onload = function() {
  console.log("Zona RTS Retro — Página cargada correctamente.");

  // ── 2. VARIABLES ───────────────────────────────────────────
  var btnHamburguesa = document.getElementById("btn-hamburguesa");
  var navMenu        = document.getElementById("nav-menu");
  var formulario     = document.getElementById("form-comunidad");
  var mensajeExito   = document.getElementById("mensaje-exito");

  // ── 3. MENÚ DINÁMICO ───────────────────────────────────────
  btnHamburguesa.onclick = function() {
    if (navMenu.className === "nav-abierto") {
      navMenu.className = "";
      btnHamburguesa.innerHTML = "&#9776;";
    } else {
      navMenu.className = "nav-abierto";
      btnHamburguesa.innerHTML = "&#10005;";
    }
  };

  var enlaces = navMenu.getElementsByTagName("a");
  for (var i = 0; i < enlaces.length; i++) {
    enlaces[i].onclick = function() {
      navMenu.className = "";
      btnHamburguesa.innerHTML = "&#9776;";
    };
  }

  // ── 4. VALIDACIÓN DE FORMULARIO ────────────────────────────
  formulario.onsubmit = function(evento) {
    evento.preventDefault();

    var nombre     = document.getElementById("nombre").value.trim();
    var correo     = document.getElementById("correo").value.trim();
    var juego      = document.getElementById("juego").value;
    var plataforma = document.getElementById("plataforma").value;
    var modo       = document.querySelector('input[name="modo"]:checked');
    var intereses = document.querySelectorAll('input[name="interes[]"]:checked');
    limpiarErrores();
    var esValido = true;

    if (nombre === "" || nombre.length < 3) {
      mostrarError("error-nombre", "Ingrese su nombre completo (mínimo 3 caracteres).");
      esValido = false;
    }

    if (correo === "") {
      mostrarError("error-correo", "Ingrese su correo electrónico.");
      esValido = false;
    } else if (!correo.includes("@") || !correo.includes(".")) {
      mostrarError("error-correo", "Ingrese un correo válido (ejemplo: usuario@correo.com).");
      esValido = false;
    }

    if (juego === "") {
      mostrarError("error-juego", "Seleccione su juego favorito.");
      esValido = false;
    }

    if (plataforma === "") {
      mostrarError("error-plataforma", "Seleccione una plataforma.");
      esValido = false;
    }

    if (modo === null) {
      mostrarError("error-modo", "Seleccione el modo que más disfruta.");
      esValido = false;
    }
    // ── 4.1 VALIDAR CHECKBOX "INTERESES" (opcional, agregar dentro del onsubmit)
    if (intereses.length === 0) {
      mostrarError("error-interes", "Seleccione al menos un interés.");
      esValido = false;
    }
    if (esValido) {
      formulario.reset();

      // Mensaje arriba del formulario
      mensajeExito.style.display = "block";
      mensajeExito.innerHTML = "✔ ¡Gracias " + nombre + "! Tu registro fue enviado correctamente.";

      // Mensaje abajo de los botones
      var mensajeAbajo = document.getElementById("mensaje-exito-abajo");
      mensajeAbajo.style.display = "block";
      mensajeAbajo.innerHTML = "✔ ¡Gracias " + nombre + "! Tu registro fue enviado correctamente.";

      setTimeout(function () {
        mensajeExito.style.display = "none";
        mensajeAbajo.style.display = "none";
      }, 8000);
    }
  };
  // ── 6. FILTRO DINÁMICO DE TABLA ────────────────────────────
  var inputBuscar = document.getElementById("buscar-tabla");
  if (inputBuscar) {
    inputBuscar.oninput = function() {
      var texto = inputBuscar.value.toLowerCase();
      var filas = document.querySelectorAll("#tabla tbody tr");

      for (var i = 0; i < filas.length; i++) {
        var textoFila = filas[i].textContent.toLowerCase();
        if (textoFila.indexOf(texto) !== -1) {
          filas[i].style.display = "";
        } else {
          filas[i].style.display = "none";
        }
      }
    };
  }
  // ── 5. FUNCIONES AUXILIARES ────────────────────────────────
  function mostrarError(idElemento, textoError) {
    var span = document.getElementById(idElemento);
    if (span) {
      span.innerHTML = textoError;
      span.style.display = "block";
    }
  }

  function limpiarErrores() {
    var errores = document.getElementsByClassName("error-campo");
    for (var i = 0; i < errores.length; i++) {
      errores[i].innerHTML = "";
      errores[i].style.display = "none";
    }
  }

};