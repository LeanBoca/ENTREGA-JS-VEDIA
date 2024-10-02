/*Clase Cotizador para manejar la lógica de cotización*/
class Cotizador {
    constructor() {
        this.preciosBase = [10000, 15000, 20000];
    }

/*Método para calcular el precio del seguro*/
    calcularPrecio(edad, tipoSeguro) {
        let precioFinal;

/*Algoritmo para determinar el precio inicial*/
        switch (tipoSeguro) {
            case "básico":
                precioFinal = this.preciosBase[0];
                break;
            case "completo":
                precioFinal = this.preciosBase[1];
                break;
            case "premium":
                precioFinal = this.preciosBase[2];
                break;
            default:
                return null; // Retorna null si el tipo de seguro no es válido
        }

/*Ajustar precio según la edad*/
        for (let i = 18; i < edad; i += 10) {
            precioFinal += 1000;
        }

        return precioFinal;
    }
}

/*Función para mostrar el resultado en el DOM*/
function mostrarResultado(precio) {
    const resultadoDiv = document.getElementById("resultadoCotizacion");
    resultadoDiv.innerHTML = `<p>El precio final de tu seguro es: $${precio}</p>`;
    document.getElementById("confirmacionCotizacion").style.display = 'block'; /* Mostrar la opción de confirmar*/
}

/*Función para guardar la cotización en localStorage*/
function guardarCotizacionEnStorage(cotizacion) {
    localStorage.setItem("ultimaCotizacion", JSON.stringify(cotizacion));
}

/*Función para obtener la cotización del localStorage*/
function obtenerCotizacionDeStorage() {
    return JSON.parse(localStorage.getItem("ultimaCotizacion"));
}

/*Evento de formulario para capturar la cotización*/
document.getElementById("formCotizacion").addEventListener("submit", function (e) {
    e.preventDefault(); /*Evita que el formulario se envíe y recargue la página*/

    const edad = parseInt(document.getElementById("edad").value);
    const tipoSeguro = document.getElementById("tipoSeguro").value;

/*Validar la edad*/
    if (isNaN(edad) || edad < 18) {
        const resultadoDiv = document.getElementById("resultadoCotizacion");
        resultadoDiv.innerHTML = `<p>Tenés que ser mayor o igual a 18 años para contratar seguros.</p>`;
    } else {
        const cotizador = new Cotizador();
        const precio = cotizador.calcularPrecio(edad, tipoSeguro);

        if (precio !== null) {
            const cotizacion = { edad, tipoSeguro, precio };
            mostrarResultado(precio);
            guardarCotizacionEnStorage(cotizacion);
        } else {
            const resultadoDiv = document.getElementById("resultadoCotizacion");
            resultadoDiv.innerHTML = `<p>El tipo de seguro seleccionado no es válido.</p>`;
        }
    }
});

/*Confirmar la cotización*/
document.getElementById("confirmarCotizacion").addEventListener("click", function () {
    const cotizacionGuardada = obtenerCotizacionDeStorage();
    if (cotizacionGuardada) {
        const confirmacionDiv = document.getElementById("resultadoCotizacion");
        confirmacionDiv.innerHTML += `<p>Cotización confirmada: $${cotizacionGuardada.precio}. ¡Gracias por elegirnos!</p>`;
    }
});

/*Recuperar la última cotización al cargar la página*/
window.onload = function () {
    const cotizacionGuardada = obtenerCotizacionDeStorage();
    if (cotizacionGuardada) {
        mostrarResultado(cotizacionGuardada.precio);
    }
};
