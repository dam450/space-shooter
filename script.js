const yourShip = document.querySelector('.player');
const playArea = document.querySelector('#main-play-area');


/**
 * função de movimento e tiro da nave
 * @param {KeyboardEvent} event evento do teclado (objeto com detalhes da tecla precionada);
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
  } else {
    console.log(event);
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

/**
 * função cria o disparo de um laser no jogo
 */
function fireLaser() {
  if (document.querySelectorAll('.laser').length > 2) return;
  //canShoot = false;
  let laser = createLaserElement();
  playArea.appendChild(laser);
  moveLaser(laser);
}

/**
 * função cria um objeto laser (imagem) na tela do jogo
 * @returns {HTMLImageElement} Objeto laser criado (imagem)
 */
function createLaserElement() {
  let xPosition = parseInt(window
    .getComputedStyle(yourShip)
    .getPropertyValue('left'));

  let yPosition = parseInt(window
    .getComputedStyle(yourShip)
    .getPropertyValue('top'));

  let newLaser = document.createElement('img');

  newLaser.src = 'img/shoot.png';
  newLaser.classList.add('laser');
  newLaser.style.left = `${xPosition}px`;
  newLaser.style.top = `${yPosition - 10}px`;
  return newLaser;
}

/**
 * função move o laser após disparado pela area de jogo
 * @param {HTMLImageElement} laser objeto laser (imagem)
 */
function moveLaser(laser) {
  let laserInterval = setInterval(() => {
    let xPosition = parseInt(laser.style.left);
    if (xPosition >= 440) {
      laser.remove();
    } else {
      laser.style.left = `${xPosition + 8}px`;
    }
  }, 10);
}

window.addEventListener('keydown', flyShip);


