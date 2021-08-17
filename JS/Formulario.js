/*Scrip vista formulario*/

var inputs = document.getElementsByClassName('formulario_input');
for (var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('keyup', function () {
    if (this.value.length >= 1) {
      this.nextElementSibling.classList.add('fijar');
    } else {
      this.nextElementSibling.classList.remove('fijar');
    }
  })
}

/*Scrip nivel de ducación academica*/
var elementoacademico = document.getElementById('academico')
var academicoElegidos = []
function elegirAcademico(element) {
  if (element.checked) {
    academicoElegidos.push(element.value)
  } else {
    academicoElegidos.splice(academicoElegidos.indexOf(element.value), 1)
  }
  elementoacademico.innerHTML = academicoElegidos.join(', ')
}

/*Scrip calcular edad*/
function getEdad() {
  const cadenaFecha = document.querySelector("#BornDate").value
  let hoy = new Date()
  let fechaNacimiento = new Date(cadenaFecha)
  let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
  let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
  if (
    diferenciaMeses < 0 ||
    (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
  ) {
    edad--
  }
  document.querySelector("#age").value = edad
}

/*Validación campos formulario */
var nombreValidado = false;
var correoValidado = false;
var edadValidada = false;
var mensajeValidado = false;

$('#name').blur(function () {
  try {
    console.log("Estoy activado")
    var nombreCompleto = document.querySelector("#name").value;
    nombreCompleto = nombreCompleto.replace(/\r?\n/g, " ");
    nombreCompleto = nombreCompleto.replace(/[ ]+/g, " ");
    nombreCompleto = nombreCompleto.replace(/^ /, "");
    nombreCompleto = nombreCompleto.replace(/ $/, "");
    var cantidadPalabras = nombreCompleto.split(" ");
    if (cantidadPalabras.length >= 3) {
      nombreValidado = true;
    } else {
      alert("Datos invalidos.\n\nSe requiere la inserción mínima del primer nombre y los dos apellidos.\n\Se recomienda verificar los espacios vacios entre palabras.")
      nombreValidado = false;
    }
  } catch (error) {
    alert(error);
  }
});

$('#mail').blur(function () {
  try {
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (regex.test(document.querySelector("#mail").value)) {
      correoValidado = true;
    } else {
      alert("Datos invalidos en correo.\n\nSe requiere una estructura de correo válida.\n\Se recomienda verificar espacios, signos especiales y datos del servicio.")
      correoValidado=false;
    }
  } catch (error) {
    alert(error);
  }
});

$('#BornDate').blur(function () {
  try {
    getEdad();
    if (document.querySelector("#age").value != 0) {
      edadValidada = true;
    } else {
      alert("Datos invalidos en fecha de nacimiento.\n\nSe requiere el registro de la fecha de nacimiento exacta.\n")
      edadValidada=false;
    }
  } catch (error) {
    alert(error);
  }
});

$('#message').blur(function () {
  try {
    if (document.querySelector("#message").value.length != 0) {
      mensajeValidado = true;
    } else {
      alert("Datos invalidos en mensaje.\n\nSe requiere que el contenido sea diferente de vacio.\n")
      mensajeValidado=false;
    }
  } catch (error) {
    alert(error);
  }
});

/*Scrip enviar correo */
function sendEmail() {
  try {
    if (nombreValidado == true && correoValidado == true && edadValidada == true && mensajeValidado == true) {
      var CuerpoMensaje;
      CuerpoMensaje = "Este mensaje fue enviado por: " + document.querySelector("#name").value + " \r\n";
      CuerpoMensaje += "Su e-mail es: " + document.querySelector("#mail").value + " \r\n";
      CuerpoMensaje += "Su género es " + document.querySelector("#gender").value + " \r\n";
      CuerpoMensaje += "Nació el: " + document.querySelector("#BornDate").value + "y tiene " + document.querySelector("#age").value + " años.\r\n";
      CuerpoMensaje += "Su formación academica incluye " + document.querySelector("#academico").innerHTML + ". \r\n";
      CuerpoMensaje += "Su rango de ingresos economicos es: " + document.querySelector("#range").value + " \r\n";
      CuerpoMensaje += "Mensaje: " + document.querySelector("#message").value + " \r\n";

      Email.send({
        Host: "smtp.gmail.com",
        Username: "proyectoutniiq2021.isw502@gmail.com",
        Password: "UTNIsw502*",
        To: 'proyectoutniiq2021.isw502@gmail.com',
        From: "proyectoutniiq2021.isw502@gmail.com",
        Subject: "Contacto desde página Biblioteca del Rock y Metal",
        Body: CuerpoMensaje,
      })
        .then(function (message) {
          alert("Correo enviado exitosamente")
          location.reload();
        });
      console.log(nombreValidado, edadValidada, correoValidado, mensajeValidado);
    } else {
      alert("Compruebe la integridad de los datos.")
      console.log(nombreValidado, edadValidada, correoValidado, mensajeValidado);
    }
  } catch (error) {
    alert(error);
  }

}

// function mostrarDatos() {
//   console.log(document.querySelector("#name").value)
//   console.log(document.querySelector("#mail").value)
//   console.log(document.querySelector("#BornDate").value)
//   console.log(document.querySelector("#age").value)
//   console.log(document.querySelector("#message").value)
//   console.log(document.querySelector("#gender").value)
//   console.log(document.querySelector("#academico").innerHTML)
//   console.log(document.querySelector("#range").value)

//   var CuerpoMensaje;
//   CuerpoMensaje = "Este mensaje fue enviado por: " + document.querySelector("#name").value + " \r\n";
//   CuerpoMensaje += "Su e-mail es: " + document.querySelector("#mail").value + " \r\n";
//   CuerpoMensaje += "Su género es " + document.querySelector("#gender").value + " \r\n";
//   CuerpoMensaje += "Nació el: " + document.querySelector("#BornDate").value + "y tiene " + document.querySelector("#age").value + " años.\r\n";
//   CuerpoMensaje += "Su formación academica incluye " + document.querySelector("#academico").innerHTML + ". \r\n";
//   CuerpoMensaje += "Su rango de ingresos economicos es: " + document.querySelector("#range").value + " \r\n";
//   CuerpoMensaje += "Mensaje: " + document.querySelector("#message").value + " \r\n";
//   // CuerpoMensaje += "Enviado el: " + date('d/m/Y', time());
//   console.log(CuerpoMensaje)

// }
