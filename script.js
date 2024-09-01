const contenedorDeShows = document.getElementById("contenedorDeShows");
let contador = 0;

// Función que cuenta los días
function startCountdown(showDate) {
    const showTime = new Date(showDate).getTime();
    const countdown = setInterval(function() {
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

// Función que agrega los shows
function agregarShow() {
    contador++;
    console.log(contador);

    const nuevoShowModal = document.getElementById("nuevoShowModal");
    const nombreShow = document.getElementById("showName").value;
    const fechaShow = document.getElementById("showDate").value;
    const imgShow = document.getElementById("showImage").value;
    let idShow = contador.toString(); 

    if (nombreShow === "" || fechaShow === "" || imgShow === "") {
        alert("faltan completar datos");
    } else {
        let agregar = `
            <div id="${idShow}" class="card bg-dark text-white mt-3">
                <img class="card-img" src="${imgShow}" alt="Card image">
                <div  class="card-img-overlay">
                    <h5 class="card-title">${nombreShow}</h5>
                    <button onclick="sacarShow(${idShow})">Borrar show</button>
                    <p class="card-text"><small>Falta para el show: </small><span id="countdownTimer-${fechaShow}"></span></p>
                    <p class="card-text"><small>Fecha del show: ${fechaShow}</small></p>
                </div>
            </div>
        `;

        startCountdown(fechaShow);
        contenedorDeShows.innerHTML += agregar;

        const modal = bootstrap.Modal.getInstance(nuevoShowModal);
        modal.hide();
    }
}


function sacarShow(id){
  let card = document.getElementById(id);
  if (card) {
      card.remove(); // Elimina el div del DOM
  }
}


// Evento para agregar el show
document.getElementById("guardarShowBtn").addEventListener('click', agregarShow);
