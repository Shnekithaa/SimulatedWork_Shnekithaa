const gameBoard = document.getElementById("game-board");
const scoreDisplay = document.getElementById("score");

const blockWidth = 50;
const blockHeight = 20;
const ballDiameter = 20;
const boardWidth = 400;
const boardHeight = 300;
const paddleWidth = 100;
const paddleHeight = 20;

let currentScore = 0;
let paddleX = 150;
let balls = [{ x: 190, y: 270, xDirection: 2, yDirection: -2 }];
let powerUpActive = false;
let paddleSpeed = 10;
let lives = 3;
let timerId;

class Block {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let blocks = [];
function createBlocks(rows = 5, cols = 8) {
  blocks = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      blocks.push(new Block(j * blockWidth, i * blockHeight));
    }
  }
}

function addBlocks() {
  gameBoard.innerHTML = ""; 
  blocks.forEach((block) => {
    const blockElement = document.createElement("div");
    blockElement.classList.add("block");
    blockElement.style.left = `${block.x}px`;
    blockElement.style.top = `${block.y}px`;
    gameBoard.appendChild(blockElement);
  });
}

createBlocks();
addBlocks();

const paddle = document.createElement("div");
paddle.classList.add("paddle");
paddle.style.left = `${paddleX}px`;
gameBoard.appendChild(paddle);

function renderBalls() {
  document.querySelectorAll(".ball").forEach((ball) => ball.remove());
  balls.forEach((ball) => {
    const ballElement = document.createElement("div");
    ballElement.classList.add("ball");
    ballElement.style.left = `${ball.x}px`;
    ballElement.style.top = `${ball.y}px`;
    gameBoard.appendChild(ballElement);
  });
}
renderBalls();

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && paddleX > 0) {
    paddleX -= paddleSpeed;
  } else if (e.key === "ArrowRight" && paddleX < boardWidth - paddleWidth) {
    paddleX += paddleSpeed;
  }
  paddle.style.left = `${paddleX}px`;
});

function activatePowerUp(type) {
  switch (type) {
    case "paddleSize":
      paddle.style.width = "150px";
      setTimeout(() => (paddle.style.width = `${paddleWidth}px`), 10000); 
      break;
    case "extraLife":
      lives++;
      alert("Extra Life!");
      break;
    case "ballSpeed":
      balls.forEach((ball) => {
        ball.xDirection *= 1.5;
        ball.yDirection *= 1.5;
      });
      setTimeout(() => {
        balls.forEach((ball) => {
          ball.xDirection /= 1.5;
          ball.yDirection /= 1.5;
        });
      }, 10000); 
      break;
  }
}

function randomPowerUp(x, y) {
  if (Math.random() < 0.3) {
    const powerUp = document.createElement("div");
    powerUp.classList.add("power-up");
    powerUp.style.left = `${x}px`;
    powerUp.style.top = `${y}px`;
    gameBoard.appendChild(powerUp);

    setTimeout(() => powerUp.remove(), 5000);

    powerUp.addEventListener("click", () => {
      const types = ["paddleSize", "extraLife", "ballSpeed"];
      const type = types[Math.floor(Math.random() * types.length)];
      activatePowerUp(type);
      powerUp.remove();
    });
  }
}

function moveBalls() {
  balls.forEach((ball, ballIndex) => {
    ball.x += ball.xDirection;
    ball.y += ball.yDirection;

    if (ball.x <= 0 || ball.x >= boardWidth - ballDiameter) ball.xDirection *= -1;
    if (ball.y <= 0) ball.yDirection *= -1;

    if (
      ball.y >= boardHeight - paddleHeight - ballDiameter &&
      ball.x >= paddleX &&
      ball.x <= paddleX + paddleWidth
    ) {
      ball.yDirection *= -1;
    }

    blocks.forEach((block, index) => {
      if (
        ball.x >= block.x &&
        ball.x <= block.x + blockWidth &&
        ball.y >= block.y &&
        ball.y <= block.y + blockHeight
      ) {
        blocks.splice(index, 1);
        ball.yDirection *= -1;
        currentScore++;
        scoreDisplay.textContent = currentScore;

        randomPowerUp(block.x, block.y);

        if (blocks.length === 0) {
          clearInterval(timerId);
          alert("Level Up!");
          createBlocks(); 
          addBlocks();
          balls.push({ x: 190, y: 270, xDirection: 2, yDirection: -2 }); 
        }
      }
    });

    if (ball.y > boardHeight) {
      balls.splice(ballIndex, 1);
      if (balls.length === 0) {
        lives--;
        if (lives > 0) {
          alert(`Lives left: ${lives}`);
          balls.push({ x: 190, y: 270, xDirection: 2, yDirection: -2 });
        } else {
          alert("Game Over!");
          clearInterval(timerId);
        }
      }
    }
  });

  renderBalls();
}

timerId = setInterval(moveBalls, 20);
