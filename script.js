
// script.js
document.getElementById('nuevoShowBtn').addEventListener('click', function() {
    const showDate = prompt('Ingresa la fecha del nuevo show (formato: YYYY-MM-DD HH:MM:SS)');
  
    if (showDate) {
      const showCard = document.createElement('div');
      showCard.className = 'card bg-dark text-white mt-3';
      showCard.innerHTML = `
        <img class="card-img" src="gd.jpg" alt="Card image">
        <div class="card-img-overlay">
          <h5 class="card-title">Nuevo Show</h5>
          <p class="card-text" id="countdown-${showDate}">Falta para el show: <span id="countdownTimer-${showDate}"></span></p>
        </div>
      `;
      document.getElementById('showsContainer').appendChild(showCard);
  
      startCountdown(showDate);
    }
  });
  
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