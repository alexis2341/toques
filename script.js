
  
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







  function agregarShow(){
    const agregarAlDiv = document.getElementById("contenedorDeShows")
    const nuevoShowModal = document.getElementById("nuevoShowModal")
    const nombreShow = document.getElementById("showName").value
    const fechaShow = document.getElementById("showDate").value
    const imgShow = document.getElementById("showImage").value
    let agregar = ""
    if (nombreShow === "" || fechaShow === ""  || imgShow === ""){
      alert("faltan completar datos")
    }else{

    agregar += `<div class ="card bg-dark text-white mt-3">
        <img class="card-img" src="` +imgShow+`" alt="Card image">
        <div class="card-img-overlay">
          <h5 class="card-title">${nombreShow}</h5>
          <p class="card-text" id="countdown-${fechaShow}"><small>Falta para el show: </small><span id="countdownTimer-${fechaShow}"></span></p>
          <p class="card-text" id="countdown-${fechaShow}"><small>Fecha del show: ${fechaShow} </small><span id="countdownTimer-${fechaShow}"></span></p>
        </div>
                </div>
      `;


      startCountdown(fechaShow)
    agregarAlDiv.innerHTML += agregar
    const modal = bootstrap.Modal.getInstance(nuevoShowModal);
    modal.hide();
    }
  }