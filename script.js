const yourShip = document.querySelector('.player');
const playArea = document.querySelector('#main-play-area');

/**
 * função de movimento e tiro da nave
 * @param {*} event evento do teclado (objeto com detalhes da tecla precionada);
 */
function flyShip(event) {
  if (event.key === 'ArrowUp') {
    event.preventDefault();
    moveUp();
  } else if (event.key === 'ArrowDown') {
    event.preventDefault();
    moveDown();
  } else if (event.key === ' ') {
    event.preventDefault();
    fireLaser();
  }
}

/**
 * função move o jogador para cima
 */
function moveUp() {
  let topPosition = getComputedStyle(yourShip)
    .getPropertyValue('top');

  if (topPosition === '0px') {
    return;
  } else {
    let position = parseInt(topPosition);
    position -= 50;
    yourShip.style.top = `${position}px`;

  }
}

/**
 * função move o jogador para baixo
 */
function moveDown() {
  let topPosition = getComputedStyle(yourShip)
    .getPropertyValue('top');

  if (topPosition === '550px') {
    return;
  } else {
    let position = parseInt(topPosition);
    position += 50;
    yourShip.style.top = `${position}px`;

  }
}

window.addEventListener('keydown', flyShip);