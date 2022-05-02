// variables
const yourShip = document.querySelector('.player');
const playArea = document.querySelector('#main-play-area');
const enemyImg = [
    'img/monster-1.png',
    'img/monster-2.png',
    'img/monster-3.png'];
const instructionsText = document.querySelector('.game-instructions');
const startButton = document.querySelector('.start-button');
let enemyInterval;
var shipSpeed = 50; // default 50

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
    }
}


/**
 * função move o jogador para cima
 */
function moveUp() {
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top');

    if (parseInt(topPosition) <= '0') {
        return;
    } else {
        let position = parseInt(topPosition);
        position -= shipSpeed;
        if (position <= 0) position = 0;
        yourShip.style.top = `${position}px`;
    }
}

/**
 * função move o jogador para baixo
 */
function moveDown() {
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top');

    if (parseInt(topPosition) >= '510') {
        return;
    } else {
        let position = parseInt(topPosition);
        position += shipSpeed;
        if (position >= 540) position = 540;
        yourShip.style.top = `${position}px`;
    }
}

/**
 * função cria o disparo de um laser no jogo
 */
function fireLaser() {
    let laser = createLaserElement();
    playArea.appendChild(laser);
    moveLaser(laser);
}

/**
 * função cria um objeto laser (imagem) na tela do jogo
 * @returns {HTMLImageElement} Objeto laser criado (imagem)
 */
function createLaserElement() {
    let xPosition = -15;//parseInt(window.getComputedStyle(yourShip).getPropertyValue('left'));

    let yPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('top'));

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
        let enemies = document.querySelectorAll('.enemy');

        enemies.forEach((enemy) => {
            if (checkLaserCollision(laser, enemy)) {
                enemy.src = 'img/explosion.png';
                enemy.classList.remove('enemy');
                enemy.classList.add('dead-enemy');
            }
        });

        if (xPosition >= 540) {
            laser.remove();
            clearInterval(laserInterval);
        } else {
            laser.style.left = `${xPosition + 8}px`;
        }
    }, 20);
}

/**
 * função cria Inimigos aleatórios na tela do jogo
 */
function createEnemy() {
    let newEnemy = document.createElement('img');
    let enemySprite = enemyImg[Math.floor(Math.random() * enemyImg.length)]; //sorteia imagem
    newEnemy.src = enemySprite;
    newEnemy.classList.add('enemy');
    newEnemy.classList.add('enemy-transition');
    newEnemy.style.left = '470px';
    newEnemy.style.top = `${Math.floor(Math.random() * 330) + 30}px`;
    playArea.appendChild(newEnemy);
    moveEnemy(newEnemy);
}

/**
 * função move o elemento (imagem) do inimigo pela tela do jogo
 * @param {HTMLImageElement} enemy elemento do inimigo
 */
function moveEnemy(enemy) {
    let moveEnemyInterval = setInterval(() => {
        let xPosition = parseInt(window.getComputedStyle(enemy).getPropertyValue('left'));
        if (xPosition <= 50) {
            if (Array.from(enemy.classList).includes('dead-enemy')) {
                enemy.remove();
            } else {
                gameOver();
                clearInterval(moveEnemyInterval);
            }
        } else {
            enemy.style.left = `${xPosition - 4}px`;
        }
    }, 30);
}

/**
 * função retorna se houve colisão do laser contra inimigo
 * @param {HTMLImageElement} laser 
 * @param {HTMLImageElement} enemy 
 * @returns {Boolean} true or false
 */
function checkLaserCollision(laser, enemy) {
    let laserTop = parseInt(laser.style.top);
    let laserLeft = parseInt(laser.style.left);
    let laserBottom = laserTop - 20;
    let enemyTop = parseInt(enemy.style.top);
    let enemyLeft = parseInt(enemy.style.left);
    let enemyBottom = enemyTop - 30;

    if (laserLeft <= 500 && laserLeft + 2 >= enemyLeft) {
        if (laserTop <= enemyTop && laserTop >= enemyBottom) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

/**
 * adiciona função de click ao botão de início do jogo (Start)
 */
startButton.addEventListener('click', (event) => {
    //console.log(event);
    playGame();
});



/**
 * função que inicializa o jogo
 */
function playGame() {
    startButton.style.display = 'none';
    instructionsText.style.display = 'none';
    playArea.classList.toggle('slide');
    window.addEventListener('keydown', flyShip);
    enemyInterval = setInterval(() => {
        createEnemy();
    }, 2000);
}


/**
 * função que finaliza o jogo
 */
function gameOver() {
    //console.log('game over');
    window.removeEventListener('keydown', flyShip);
    clearInterval(enemyInterval);
    playArea.classList.toggle('slide');

    gameOverMessage(3);

    setTimeout(() => {
        //alert('Game Over');
        yourShip.style.top = '250px';
        startButton.style.display = 'block';
        instructionsText.style.display = 'block';
    }, 3500);

    let enemies = document.querySelectorAll('.enemy');
    enemies.forEach((enemy) => enemy.remove());
    let lasers = document.querySelectorAll('.laser');
    lasers.forEach((laser) => { laser.remove() });
}

function gameOverMessage(time) {
    time *= 1000;
    let gameOver = document.createElement('h1');
    gameOver.innerText = 'Game Over!';
    //gameOver.style.left = '250px'
    //gameOver.style.backgroundColor = 'red';
    gameOver.style.padding = '200px'
    //gameOver.classList.add('game-instructions')
    playArea.appendChild(gameOver);
    setTimeout(() => {
        playArea.removeChild(playArea.lastElementChild);
    }, time);

}