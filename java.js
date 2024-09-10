// Función para calcular el costo del seguro basado en la edad del usuario
function calcularSeguro(edad, tipoSeguro) {
    let base = 1000; // Base de costo de seguro
    let costoFinal = base;

    // Condicional para determinar el costo basado en la edad
    if (edad < 18) {
        alert("No puedes obtener un seguro si eres menor de edad.");
        return null;
    } else if (edad >= 18 && edad <= 30) {
        costoFinal += 200;
    } else if (edad > 30 && edad <= 50) {
        costoFinal += 100;
    } else {
        costoFinal += 300;
    }

    // Array para los tipos de seguros
    const tipos = ["Básico", "Intermedio", "Premium"];
    
    // Validación del tipo de seguro
    if (tipoSeguro === tipos[0]) {
        costoFinal *= 1;
    } else if (tipoSeguro === tipos[1]) {
        costoFinal *= 1.5;
    } else if (tipoSeguro === tipos[2]) {
        costoFinal *= 2;
    }

    return costoFinal;
}

// Evento para el botón de simulación
document.getElementById("simularBtn").addEventListener("click", function() {
    // Uso de prompt para obtener datos del usuario
    let edad = parseInt(prompt("Ingrese su edad:"));
    if (isNaN(edad)) {
        alert("Por favor, ingrese una edad válida.");
        return;
    }

    let tipoSeguro = prompt("Ingrese el tipo de seguro: Básico, Intermedio o Premium");

    // Cálculo del seguro
    let resultado = calcularSeguro(edad, tipoSeguro);

    // Output con alert o console.log
    if (resultado !== null) {
        alert(`El costo de tu seguro es: $${resultado}`);
    }
});
