//variables

let numeroSecreto = 0;
let intentos = 1;
let maximoIntentos = 4;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

//Se verifica el intento del usuario
function verificarIntento() {
  //se obtiene el valor que ingresa el usuario
  let numeroUsuario = parseInt(document.getElementById("valorUsuario").value);

  //verificación de los números
  if (numeroUsuario === numeroSecreto) {
    // Si la sentencia es verdadera ejecuta este bloque
    asignarTextoElemento(
      "p",
      `Acertaste el número en ${intentos} ${
        intentos == 1 ? "intento" : "intentos"
      }`
    );

    //Habilita el botón reiniciar juego
    document.getElementById("reiniciar").removeAttribute("disabled");
    // Deshabilita el botón intentar
    document.getElementById("no_intento").disabled = true;

    // Se verifica cuantos intentos lleva
  } else if (intentos === 4) {
    //Si ha superado el número de intentos se ejecuta este bloque
    asignarTextoElemento(
      "p",
      `supero el máximo número de intentos ${intentos} intentos tuviste`
    );
    //Se habilita el botón reiniciar
    document.getElementById("reiniciar").removeAttribute("disabled");
    //Se deshabilita el botón intentar
    document.getElementById("no_intento").disabled = true;

    //Se verifican los números
  } else if (numeroUsuario > numeroSecreto) {
    //Si se cumple la sentencia se ejecuta lo siguiente
    asignarTextoElemento("p", "El número secreto es menor");

    //Si las sentencias anteriores no se cumplen se ejecuta lo siguiente
  } else {
    asignarTextoElemento("p", "El número secreto es mayor");
  }

  //Se incrementa un intento
  

  //Se muestra un mensaje dependiendo de la condicción
 if(numeroUsuario !== numeroSecreto) {
    //Se decrementa un intento
    maximoIntentos--;
    // Se ejecuta la función para verificar si ya excedio el maximo de intentos
    intentosMaximo(maximoIntentos);
  } else {
    //Se muestra un mensaje diferente
    asignarTextoElemento("h2", "!GANASTE¡");
  }
  intentos++;
  //Se limpia la caja donde se infresa el número
  limpiarCaja();
  return;
}

//Función para asignar texto mas facilmente y evitar la repetición de código
function asignarTextoElemento(elemento, texto) {
  let elementoHtml = document.querySelector(elemento);
  elementoHtml.innerHTML = texto;
}

//Se genera un número aleatoriamente
function generarNumeroSecreto() {
  //Se asigna número a una variable
  let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

  //Si ya sortemaos todos los números
  if (listaNumerosSorteados.length == numeroMaximo) {
    asignarTextoElemento("p", "Ya se sortearon todos los números posibles");
  } else {
    //Si el número generado esta incluido en la lista
    if (listaNumerosSorteados.includes(numeroGenerado)) {
      //retorna un nuevo número
      return generarNumeroSecreto();

      // si lo anterior es falso
    } else {
      //inserta número generado a la lista
      listaNumerosSorteados.push(numeroGenerado);
      //retorna el número generado
      return numeroGenerado;
    }
  }
}

//Limpia el campo donde el usuario ingresa el número
function limpiarCaja() {
  document.querySelector("#valorUsuario").value = "";
}

//Muestra titulo, y condicciones del juego
function mensajesIniciales() {
  //titulo
  asignarTextoElemento("h1", "Juego del número secreto");
  //Condicciones del juego
  asignarTextoElemento("p", `Indica un número del 1 al ${numeroMaximo}`);
  //número secreto asignado
  numeroSecreto = generarNumeroSecreto();
  //Se inicia en el primer intento
  intentos = 1;
}

//Al oprimir botón reiniciar
function reiniciarJuego() {
  //se reinicia el maximo de intentos
  maximoIntentos = 4;
  intentosMaximo(maximoIntentos);
  //limpiar caja
  limpiarCaja();
  //Indicar mensaje de intervalo de números
  //Generar el número aleatorio
  //Inicializar el número de intentos
  mensajesIniciales();
  //Deshabilitar el botón de nuevo juego
  document.querySelector("#reiniciar").setAttribute("disabled", "true");
  //Habilitar el botón de intento
  document.querySelector("#no_intento").disabled = false;
}
// Se muestra titulo y condicciones del juego
mensajesIniciales();

//Mensaje con intentos disponibles
function intentosMaximo(num) {
  for (i = 0; i < 4; i++) {
    asignarTextoElemento(
      "h2",
      `Tienes ${num} ${
        num == 1 ? "intento" : "intentos"
      } para adivinar el número secreto`
    );
  }
}
