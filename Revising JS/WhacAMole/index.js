const squares = document.querySelectorAll(".square");
const scoreDisplay = document.querySelector("#score");
const timeLeftDisplay = document.querySelector("#time-left");

let result = 0;
let hitPosition;
let currentTime = 60;
let timerId = null;
let moleInterval = 1000; 
let countdownTimerId = null;

function randomSquare() {
  squares.forEach((square) => {
    square.classList.remove("mole", "bonus-mole");
  });

  const randomSquare = squares[Math.floor(Math.random() * squares.length)];

  const isBonus = Math.random() < 0.2; 
  if (isBonus) {
    randomSquare.classList.add("bonus-mole");
    randomSquare.dataset.bonus = "true"; 
  } else {
    randomSquare.classList.add("mole");
    randomSquare.dataset.bonus = "false";
  }

  hitPosition = randomSquare.id;
}

squares.forEach((square) => {
  square.addEventListener("mousedown", () => {
    if (square.id === hitPosition) {
      const isBonus = square.dataset.bonus === "true";

      if (isBonus) {
        result += 5; 
      } else {
        result++;
      }

      scoreDisplay.textContent = result;
      hitPosition = null;
    }
  });
});

function moveMole() {
  clearInterval(timerId);
  timerId = setInterval(() => {
    randomSquare();

    if (result >= 10 && result < 20) {
      moleInterval = 800; 
    } else if (result >= 20 && result < 30) {
      moleInterval = 600;
    } else if (result >= 30) {
      moleInterval = 400; 
    }

    clearInterval(timerId);
    timerId = setInterval(randomSquare, moleInterval);
  }, moleInterval);
}

function countdown() {
  currentTime--;
  timeLeftDisplay.textContent = currentTime;

  if (currentTime === 0) {
    clearInterval(timerId);
    clearInterval(countdownTimerId);
    alert(`Game Over! Your final score is ${result}`);
  }
}

function startGame() {
  result = 0;
  scoreDisplay.textContent = result;
  currentTime = 60;
  timeLeftDisplay.textContent = currentTime;
  moleInterval = 1000;

  moveMole();
  countdownTimerId = setInterval(countdown, 1000);
}

startGame();
