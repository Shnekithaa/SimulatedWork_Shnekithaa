const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');

const blockWidth = 50;
const blockHeight = 20;
const ballDiameter = 20;
const boardWidth = 400;
const boardHeight = 300;
const paddleWidth = 100;
const paddleHeight = 20;

let currentScore = 0;
let paddleX = 150;
let ballX = 190;
let ballY = 270;
let xDirection = 2;
let yDirection = -2;
let timerId;

class Block {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

const blocks = [];
for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 8; j++) {
    blocks.push(new Block(j * blockWidth, i * blockHeight));
  }
}

function addBlocks() {
  blocks.forEach(block => {
    const blockElement = document.createElement('div');
    blockElement.classList.add('block');
    blockElement.style.left = `${block.x}px`;
    blockElement.style.top = `${block.y}px`;
    gameBoard.appendChild(blockElement);
  });
}
addBlocks();

const paddle = document.createElement('div');
paddle.classList.add('paddle');
paddle.style.left = `${paddleX}px`;
gameBoard.appendChild(paddle);

const ball = document.createElement('div');
ball.classList.add('ball');
ball.style.left = `${ballX}px`;
ball.style.top = `${ballY}px`;
gameBoard.appendChild(ball);

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' && paddleX > 0) {
    paddleX -= 10;
  } else if (e.key === 'ArrowRight' && paddleX < boardWidth - paddleWidth) {
    paddleX += 10;
  }
  paddle.style.left = `${paddleX}px`;
});

function moveBall() {
  ballX += xDirection;
  ballY += yDirection;

  if (ballX <= 0 || ballX >= boardWidth - ballDiameter) xDirection *= -1;
  if (ballY <= 0) yDirection *= -1;

  if (
    ballY >= boardHeight - paddleHeight - ballDiameter &&
    ballX >= paddleX &&
    ballX <= paddleX + paddleWidth
  ) {
    yDirection *= -1;
  }

  blocks.forEach((block, index) => {
    if (
      ballX >= block.x &&
      ballX <= block.x + blockWidth &&
      ballY >= block.y &&
      ballY <= block.y + blockHeight
    ) {
      blocks.splice(index, 1);
      document.querySelector('.block').remove();
      yDirection *= -1;
      currentScore++;
      scoreDisplay.textContent = currentScore;
    }
  });

  if (ballY > boardHeight) {
    clearInterval(timerId);
    alert('Game Over!');
  }

  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;
}

timerId = setInterval(moveBall, 20);
