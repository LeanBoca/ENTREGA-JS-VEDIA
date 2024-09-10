                        //************ Cotizador de seguros LVedia*************//

//**Función para cotizar el seguro**//

// Primero defino la función cotizarSeguro y le doy dos parámetros: 'edad' y 'tipoSeguro'.
// Esta función calculará el costo del seguro según la edad que se ingresa y el tipo de seguro que precise.
function cotizarSeguro(edad, tipoSeguro) {
    // Ponemos un Array que contiene los precios iniciales para cada tipo de seguro (básico, completo y premium).//
    const preciosBase = [10000, 15000, 20000];
    let precioFinal; // este es la Variable donde se almacenará el precio final del seguro.//

    // Usamos un Algoritmo condicional que determina el precio inicial según el tipo de seguro seleccionado.//
    // Si el tipo de seguro es "básico", asigna el primer valor del array (10000).//
    if (tipoSeguro === "básico") {
        precioFinal = preciosBase[0];
        // Si el tipo de seguro es "completo", asigna el segundo valor del array (15000).//
    } else if (tipoSeguro === "completo") {
        precioFinal = preciosBase[1];
        // Si el tipo de seguro es "premium", asigna el tercer valor del array (20000).//
    } else if (tipoSeguro === "premium") {
        precioFinal = preciosBase[2];
    } else {
        // Si el tipo de seguro no es válido, muestra una alerta y termina la ejecución de la función.//
        alert("Tipo de seguro no válido.");
        return; // Y se sale de la función y no calcula nada más.//
    }

    //  Tambien usamos un Algoritmo con ciclo para ajustar el precio según la edad del usuario.//
    // El ciclo empieza desde los 18 años y se incrementa en 10 años hasta alcanzar la edad del usuario.//
    for (let i = 18; i < edad; i += 10) {
        // Por cada vez que se incrementan 10 años sobre los 18, se suman 1000 pesos más al precio final.//
        precioFinal += 1000;
    }

    // Y Return devuelve el precio final calculado.//
    return precioFinal;
}



// ** Que le pedimos al usuario??? **//

// Solicitamos la edad del usuario con un prompt. El valor ingresado se convierte en número con parseInt.//
const edad = parseInt(prompt("¿Cuantos años tenés? Recordá que tenés que ser mayor de edad"));

// Solicitamos al usuario que seleccione el tipo de seguro mediante un prompt (básico, completo o premium).//
const tipoSeguro = prompt("¿Qué tipo de seguro necesitás? (básico/completo/premium)");

// Validamos la edad ingresada.//
// Si el valor de 'edad' no es un número (isNaN) o es menor a 18, mostramos una alerta indicando que es inválida.//
if (isNaN(edad) || edad < 18) {
    alert("Tenés que ser mayor o igual a 18 años para contratar seguros.");
} else {
    // Si la edad es válida, llamamos a la función cotizarSeguro con los valores ingresados por el usuario.//
    const precio = cotizarSeguro(edad, tipoSeguro);

    // Si la función devuelve un valor válido (osea que el tipo de seguro no era inválido),// 
    // mostramos entonces el precio del seguro tanto en consola como en una alerta.//
    if (precio) {
        console.log(`El precio final de tu seguro es: $${precio}`);
        alert(`El precio final de tu seguro es: $${precio}`);
    }
}
