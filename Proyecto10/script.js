document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-suscripcion");
  const nombreInput = document.getElementById("nombre");
  


/*VALIDACIONES*/
  const campos = {
    nombre: {
      input: nombreInput,
      error: document.getElementById("error-nombre"),
      validar: (v) => v.length > 6 && v.includes(" "),
      mensaje: "Debe tener más de 6 letras y un espacio."
    },
    email: {
      input: document.getElementById("email"),
      error: document.getElementById("error-email"),
      validar: (v) => /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(v),
      mensaje: "Debe ser un email válido."
    },
    password: {
      input: document.getElementById("password"),
      error: document.getElementById("error-password"),
      validar: (v) => /^[a-zA-Z0-9]{8,}$/.test(v),
      mensaje: "Debe tener al menos 8 caracteres con letras y números."
    },
    repassword: {
      input: document.getElementById("repassword"),
      error: document.getElementById("error-repassword"),
      validar: (v) => v === document.getElementById("password").value,
      mensaje: "Las contraseñas no coinciden."
    },
    edad: {
      input: document.getElementById("edad"),
      error: document.getElementById("error-edad"),
      validar: (v) => Number.isInteger(+v) && +v >= 18,
      mensaje: "Debe ser mayor o igual a 18."
    },
    telefono: {
      input: document.getElementById("telefono"),
      error: document.getElementById("error-telefono"),
      validar: (v) => /^[0-9]{7,}$/.test(v),
      mensaje: "Solo números, al menos 7 dígitos."
    },
    direccion: {
      input: document.getElementById("direccion"),
      error: document.getElementById("error-direccion"),
      validar: (v) => v.length >= 5 && /\d/.test(v) && /[a-zA-Z]/.test(v) && v.includes(" "),
      mensaje: "Debe tener letras, números y un espacio."
    },
    ciudad: {
      input: document.getElementById("ciudad"),
      error: document.getElementById("error-ciudad"),
      validar: (v) => v.length >= 3,
      mensaje: "Debe tener al menos 3 caracteres."
    },
    cp: {
      input: document.getElementById("cp"),
      error: document.getElementById("error-cp"),
      validar: (v) => v.length >= 3,
      mensaje: "Debe tener al menos 3 caracteres."
    },
    dni: {
      input: document.getElementById("dni"),
      error: document.getElementById("error-dni"),
      validar: (v) => /^[0-9]{7,8}$/.test(v),
      mensaje: "Debe tener 7 u 8 dígitos."
    }
  };

  
  Object.values(campos).forEach(({ input, error, validar, mensaje }) => {
    input.addEventListener("blur", () => {
      if (!validar(input.value.trim())) {
        error.textContent = mensaje;
      }
    });
    input.addEventListener("focus", () => {
      error.textContent = "";
    });
  });

  /*ENVIAR FORMULARIO*/
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let errores = [];

    Object.entries(campos).forEach(([nombre, { input, error, validar, mensaje }]) => {
      const valor = input.value.trim();
      if (!validar(valor)) {
        error.textContent = mensaje;
        errores.push(`${nombre}: ${mensaje}`);
      }
    });
/* Simulamos llamada con GET  que devuelve un  objeto */
    if (errores.length === 0) {
      
      fetch("https://jsonplaceholder.typicode.com/posts/")
        .then((res) => {
          if (!res.ok) throw new Error("Código: " + res.status);
          return res.json();
        })
        .then(() => {
          const datosFinales = {};
          Object.entries(campos).forEach(([key, { input }]) => {
            datosFinales[key] = input.value.trim();
          });

          localStorage.setItem("datosSuscripcion", JSON.stringify(datosFinales));
          mostrarModal("¡Suscripción exitosa!", "Gracias por registrarte", JSON.stringify(datosFinales, null, 2));
        })
        .catch((err) => {
          mostrarModal("Error al enviar", "Ocurrió un error", err.message);
        });

    } else {
      alert("Errores encontrados:\n\n" + errores.join("\n"));
    }
  });

  /*CARGAR DATOS DEL LOCALSTORGA DE LA PAGINA */
  const datosGuardados = localStorage.getItem("datosSuscripcion");
  if (datosGuardados) {
    const data = JSON.parse(datosGuardados);
    Object.entries(data).forEach(([key, value]) => {
      if (campos[key]) campos[key].input.value = value;
    });
    tituloForm.textContent =  (data.nombre || "").toUpperCase();
  }
});

/*VENTANA EMERGENTE */
function mostrarModal(titulo, mensaje, datos = "") {
  const modal = document.getElementById("modal");
  document.getElementById("modal-titulo").textContent = titulo;
  document.getElementById("modal-mensaje").textContent = mensaje;
  document.getElementById("modal-datos").textContent = datos;
  modal.classList.remove("oculto");
}

function ocultarModal() {
  document.getElementById("modal").classList.add("oculto");
}

document.getElementById("modal-cerrar").addEventListener("click", ocultarModal);

window.addEventListener("click", function (e) {
  const modal = document.getElementById("modal");
  if (e.target === modal) {
    ocultarModal();
  }
});
