const contenedorDeShows = document.getElementById("contenedorDeShows");

// Función para obtener los shows del backend
async function cargarShows() {
    try {
        const response = await fetch('http://localhost:3000/shows');
        const shows = await response.json();

        // Recorre los shows y agrégalos al DOM
        shows.forEach(show => {
            let agregar = `
                <div id="${show.id}" class="card bg-dark text-white mt-3">
                    <img class="card-img" src="${show.image_url}" alt="Card image">
                    <div class="card-img-overlay">
                        <h5 class="card-title">${show.name}</h5>
                        <button onclick="sacarShow(${show.id})">Borrar show</button>
                        <p class="card-text"><small>Falta para el show: </small><span id="countdownTimer-${show.date}"></span></p>
                        <p class="card-text"><small>Fecha del show: ${show.date}</small></p>
                    </div>
                </div>
            `;
            contenedorDeShows.innerHTML += agregar;
            startCountdown(show.date);
        });
    } catch (error) {
        console.error('Error al cargar los shows:', error);
    }
}

// Función que cuenta los días
function startCountdown(showDate) {
    const showTime = new Date(showDate).getTime();
    const countdown = setInterval(function () {
        const now = new Date().getTime();
        const distance = showTime - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const countdownId = `countdownTimer-${showDate}`;
        document.getElementById(countdownId).innerHTML = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';

        if (distance < 0) {
            clearInterval(countdown);
            document.getElementById(countdownId).innerHTML = '¡El show ha comenzado!';
        }
    }, 1000);
}

// Función para agregar shows
async function agregarShow() {
    const nombreShow = document.getElementById("showName").value;
    const fechaShow = document.getElementById("showDate").value;
    const imgShow = document.getElementById("showImage").value;

    if (nombreShow === "" || fechaShow === "" || imgShow === "") {
        alert("Faltan completar datos");
        return;
    }

    const nuevoShow = {
        name: nombreShow,
        date: fechaShow,
        image_url: imgShow
    };

    // Enviar los datos al backend
    try {
        const response = await fetch('http://localhost:3000/shows', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoShow)
        });

        const showAgregado = await response.json();

        // Agregar el nuevo show al DOM
        let agregar = `
            <div id="${showAgregado.id}" class="card bg-dark text-white mt-3">
                <img class="card-img" src="${showAgregado.image_url}" alt="Card image">
                <div class="card-img-overlay">
                    <h5 class="card-title">${showAgregado.name}</h5>
                    <button onclick="sacarShow(${showAgregado.id})">Borrar show</button>
                    <p class="card-text"><small>Falta para el show: </small><span id="countdownTimer-${showAgregado.date}"></span></p>
                    <p class="card-text"><small>Fecha del show: ${showAgregado.date}</small></p>
                </div>
            </div>
        `;

        startCountdown(showAgregado.date);
        contenedorDeShows.innerHTML += agregar;

        // Cerrar el modal
        const modal = bootstrap.Modal.getInstance(document.getElementById("nuevoShowModal"));
        modal.hide();

    } catch (error) {
        console.error('Error al agregar el show:', error);
    }
}

// Función para eliminar shows
async function sacarShow(id) {
    // Eliminar el show del backend
    try {
        await fetch(`http://localhost:3000/shows/${id}`, {
            method: 'DELETE'
        });

        // Eliminar el show del DOM
        let card = document.getElementById(id);
        if (card) {
            card.remove();
        }
    } catch (error) {
        console.error('Error al eliminar el show:', error);
    }
}

// Cargar los shows al cargar la página
document.addEventListener('DOMContentLoaded', cargarShows);

// Evento para agregar un nuevo show
document.getElementById("guardarShowBtn").addEventListener('click', agregarShow);
