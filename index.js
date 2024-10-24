/*Clase Cotizador para manejar la lógica de cotización*/
class Cotizador {
    constructor() {
        this.preciosBase = [];
    }

    /* Método para cargar los precios desde el archivo JSON */
    async cargarPrecios() {
        try {
            const response = await fetch('precios.json');
            const data = await response.json();
            this.preciosBase = data.preciosBase;
        } catch (error) {
            console.error("Error al cargar los precios:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudieron cargar los precios del seguro.'
            });
        }
    }

    /* Método para calcular el precio del seguro */
    calcularPrecio(edad, tipoSeguro) {
        let precioFinal;

        /* Algoritmo para determinar el precio inicial */
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
                return null;
        }

        /* Ajustar precio según la edad */
        for (let i = 18; i < edad; i += 10) {
            precioFinal += 1000;
        }

        return precioFinal;
    }
}

/* Función para mostrar el resultado en el DOM */
function mostrarResultado(precio) {
    const resultadoDiv = document.getElementById("resultadoCotizacion");
    resultadoDiv.innerHTML = `<p>El precio final de tu seguro es: $${precio}</p>`;
    document.getElementById("confirmacionCotizacion").style.display = 'block'; /* Mostrar la opción de confirmar */
}

/* Función para guardar la cotización en localStorage */
function guardarCotizacionEnStorage(cotizacion) {
    localStorage.setItem("ultimaCotizacion", JSON.stringify(cotizacion));
}

/* Función para obtener la cotización del localStorage */
function obtenerCotizacionDeStorage() {
    return JSON.parse(localStorage.getItem("ultimaCotizacion"));
}

/* Evento de formulario para capturar la cotización */
document.getElementById("formCotizacion").addEventListener("submit", async function (e) {
    e.preventDefault(); /* Evita que el formulario se envíe y recargue la página */

    const edad = parseInt(document.getElementById("edad").value);
    const tipoSeguro = document.getElementById("tipoSeguro").value;

    /* Validar la edad */
    if (isNaN(edad) || edad < 18) {
        Swal.fire({
            icon: 'warning',
            title: 'Edad inválida',
            text: 'Tenés que ser mayor o igual a 18 años para contratar seguros.'
        });
    } else {
        const cotizador = new Cotizador();
        await cotizador.cargarPrecios(); /* Cargar los precios desde el JSON */
        const precio = cotizador.calcularPrecio(edad, tipoSeguro);

        if (precio !== null) {
            const cotizacion = { edad, tipoSeguro, precio };
            mostrarResultado(precio);
            guardarCotizacionEnStorage(cotizacion);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El tipo de seguro seleccionado no es válido.'
            });
        }
    }
});

/* Confirmar la cotización */
document.getElementById("confirmarCotizacion").addEventListener("click", function () {
    const cotizacionGuardada = obtenerCotizacionDeStorage();
    if (cotizacionGuardada) {
        Swal.fire({
            icon: 'success',
            title: 'Cotización confirmada',
            text: `Cotización confirmada: $${cotizacionGuardada.precio}. ¡Gracias por elegirnos!`
        });
    }
});

/* Recuperar la última cotización al cargar la página */
window.onload = function () {
    const cotizacionGuardada = obtenerCotizacionDeStorage();
    if (cotizacionGuardada) {
        mostrarResultado(cotizacionGuardada.precio);
    }
};
