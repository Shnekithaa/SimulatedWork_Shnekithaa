document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".grid");
    const startPauseBtn = document.querySelector("#start-pause-btn");
    const width = 9;
    let currentIndex = 76; 
    let timerId;
    let gameInProgress = false;
    let lives = 3;
    let score = 0;
  
    const jumpSound = new Audio("jump.mp3");
    const collisionSound = new Audio("collision.mp3");
    const winSound = new Audio("win.mp3");
    const backgroundMusic = new Audio("background.mp3");
    backgroundMusic.loop = true;
  
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      grid.appendChild(square);
    }
  
    const squares = Array.from(document.querySelectorAll(".grid div"));
  
    squares[currentIndex].classList.add("frog");
    squares[4].classList.add("ending-block");
    squares[76].classList.add("starting-block");
  
    for (let i = 18; i < 27; i++) squares[i].classList.add("road");
    for (let i = 36; i < 54; i++) squares[i].classList.add("river");
  
    const cars = [19, 21, 23]; 
    cars.forEach((pos) => squares[pos].classList.add("car"));
  
    const logs = [37, 39, 41]; 
    logs.forEach((pos) => squares[pos].classList.add("log"));
  
    let powerUpIndex = null;
  
    const livesDisplay = document.createElement("div");
    livesDisplay.textContent = `Lives: ${lives}`;
    document.body.insertBefore(livesDisplay, grid);
  
    const scoreDisplay = document.createElement("div");
    scoreDisplay.textContent = `Score: ${score}`;
    document.body.insertBefore(scoreDisplay, grid);
  
    function moveFrog(e) {
      squares[currentIndex].classList.remove("frog");
  
      if (e.key === "ArrowLeft" && currentIndex % width !== 0) currentIndex -= 1;
      if (e.key === "ArrowRight" && currentIndex % width < width - 1)
        currentIndex += 1;
      if (e.key === "ArrowUp" && currentIndex - width >= 0)
        currentIndex -= width;
      if (e.key === "ArrowDown" && currentIndex + width < width * width)
        currentIndex += width;
  
      squares[currentIndex].classList.add("frog");
      jumpSound.play();
      checkWin();
      checkLoss();
      checkPowerUp();
    }
  
    startPauseBtn.addEventListener("click", () => {
      if (!gameInProgress) {
        timerId = setInterval(gameLogic, 1000);
        document.addEventListener("keydown", moveFrog);
        backgroundMusic.play();
        gameInProgress = true;
      } else {
        clearInterval(timerId);
        document.removeEventListener("keydown", moveFrog);
        backgroundMusic.pause();
        gameInProgress = false;
      }
    });
  
    function checkWin() {
      if (squares[currentIndex].classList.contains("ending-block")) {
        winSound.play();
        score += 100;
        scoreDisplay.textContent = `Score: ${score}`;
        resetGame();
      }
    }
  
    function checkLoss() {
      if (
        squares[currentIndex].classList.contains("car") ||
        (squares[currentIndex].classList.contains("river") &&
          !squares[currentIndex].classList.contains("log"))
      ) {
        collisionSound.play();
        lives--;
        livesDisplay.textContent = `Lives: ${lives}`;
        if (lives === 0) {
          alert("Game Over!");
          resetGame(true);
        } else {
          resetFrog();
        }
      }
    }
  
    function checkPowerUp() {
      if (powerUpIndex !== null && currentIndex === powerUpIndex) {
        const powerType = Math.random() > 0.5 ? "invincibility" : "speedBoost";
        activatePowerUp(powerType);
        squares[powerUpIndex].classList.remove("power-up");
        powerUpIndex = null;
      }
    }
  
    function activatePowerUp(type) {
      if (type === "invincibility") {
        alert("Invincibility activated!");
        squares[currentIndex].classList.add("invincible");
        setTimeout(() => squares[currentIndex].classList.remove("invincible"), 5000);
      } else if (type === "speedBoost") {
        alert("Speed Boost activated!");
        paddleSpeed = 2;
        setTimeout(() => paddleSpeed = 10);
      }
    }
  
    function gameLogic() {
      moveCars();
      moveLogs();
      generatePowerUp();
    }
  
    function moveCars() {
      cars.forEach((car, i) => {
        squares[car].classList.remove("car");
        cars[i] = car + 1 >= 27 ? 18 : car + 1;
        squares[cars[i]].classList.add("car");
      });
    }
  
    function moveLogs() {
      logs.forEach((log, i) => {
        squares[log].classList.remove("log");
        logs[i] = log + 1 >= 54 ? 36 : log + 1;
        squares[logs[i]].classList.add("log");
      });
    }
  
    function generatePowerUp() {
      if (powerUpIndex === null && Math.random() < 0.1) {
        powerUpIndex = Math.floor(Math.random() * 81);
        squares[powerUpIndex].classList.add("power-up");
      }
    }
  
    function resetFrog() {
      squares[currentIndex].classList.remove("frog");
      currentIndex = 76;
      squares[currentIndex].classList.add("frog");
    }
  
    function resetGame(gameOver = false) {
      clearInterval(timerId);
      document.removeEventListener("keydown", moveFrog);
      backgroundMusic.pause();
      gameInProgress = false;
  
      if (gameOver) {
        lives = 3;
        score = 0;
        livesDisplay.textContent = `Lives: ${lives}`;
        scoreDisplay.textContent = `Score: ${score}`;
      }
  
      resetFrog();
    }
  });
  