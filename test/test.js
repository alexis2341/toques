let contador = 0;

// Función para agregar una nueva card
function agregarCard() {
    contador++;
    let idCard = 'card-' + contador;

    // Creación del div contenedor con la card
    let cardHTML = `
        <div id="${idCard}" class="card">
            <h3>Card ${contador}</h3>
            <p>Contenido de la card...</p>
            <button onclick="eliminarCard('${idCard}')">Eliminar</button>
        </div>
    `;

    // Agregar la card al contenedor principal
    document.getElementById('contenedorCards').innerHTML += cardHTML;
}

// Función para eliminar la card por su id
function eliminarCard(id) {
    let card = document.getElementById(id);
    if (card) {
        card.remove(); // Elimina el div del DOM
    }
}

// Asignar la función al evento click del botón
document.getElementById('agregarCard').addEventListener('click', agregarCard);
    