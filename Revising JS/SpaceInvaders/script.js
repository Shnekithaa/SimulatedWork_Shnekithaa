const grid = document.querySelector("#grid");
const resultDisplay = document.querySelector("#result");
const width = 15;
let currentShooterIndex = 217;
let results = 0;
let alienInvaders = [0, 1, 2, 3, 4, 15, 16, 17, 18, 19, 30, 31, 32, 33, 34];
let direction = 1;
let invaderId;
const aliensRemoved = [];

for (let i = 0; i < width * width; i++) {
  const square = document.createElement("div");
  grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll("#grid div"));

squares[currentShooterIndex].classList.add("shooter");

function drawInvaders() {
  alienInvaders.forEach((index) => {
    if (!aliensRemoved.includes(index)) {
      squares[index].classList.add("invader");
    }
  });
}

function removeInvaders() {
  alienInvaders.forEach((index) => squares[index].classList.remove("invader"));
}

drawInvaders();

document.addEventListener("keydown", (e) => {
  squares[currentShooterIndex].classList.remove("shooter");
  if (e.key === "ArrowLeft" && currentShooterIndex % width !== 0) {
    currentShooterIndex -= 1; // Move left
  } else if (
    e.key === "ArrowRight" &&
    currentShooterIndex % width < width - 1
  ) {
    currentShooterIndex += 1; // Move right
  }
  squares[currentShooterIndex].classList.add("shooter");
});

function shoot(e) {
  let laserId;
  let currentLaserIndex = currentShooterIndex;

  function moveLaser() {
    squares[currentLaserIndex].classList.remove("laser");
    currentLaserIndex -= width;
    if (currentLaserIndex < 0) {
      clearInterval(laserId);
      return;
    }
    squares[currentLaserIndex].classList.add("laser");

    if (squares[currentLaserIndex].classList.contains("invader")) {
      squares[currentLaserIndex].classList.remove("laser", "invader");
      squares[currentLaserIndex].classList.add("boom");

      setTimeout(
        () => squares[currentLaserIndex].classList.remove("boom"),
        300
      );
      clearInterval(laserId);

      const alienRemoved = alienInvaders.indexOf(currentLaserIndex);
      aliensRemoved.push(alienRemoved);
      results++;
      resultDisplay.textContent = results;

      alienInvaders.splice(alienRemoved, 1);
    }
  }

  if (e.key === "ArrowUp") {
    laserId = setInterval(moveLaser, 100);
  }
}

document.addEventListener("keydown", shoot);

function moveInvaders() {
  const leftEdge = alienInvaders[0] % width === 0;
  const rightEdge =
    alienInvaders[alienInvaders.length - 1] % width === width - 1;

  removeInvaders();

  if (rightEdge && direction === 1) {
    direction = -1;
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width; // Move down
    }
  } else if (leftEdge && direction === -1) {
    direction = 1;
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width; // Move down
    }
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    alienInvaders[i] += direction;
  }

  drawInvaders();

  if (
    alienInvaders.some((index) => squares[index].classList.contains("shooter"))
  ) {
    resultDisplay.textContent = "Game Over!";
    clearInterval(invaderId);
    document.removeEventListener("keydown", shoot);
    return;
  }

  if (alienInvaders.some((index) => index >= squares.length - width)) {
    resultDisplay.textContent = "Game Over!";
    clearInterval(invaderId);
    document.removeEventListener("keydown", shoot);
    return;
  }

  if (alienInvaders.length === 0) {
    resultDisplay.textContent = "You Win!";
    clearInterval(invaderId);
  }
}

invaderId = setInterval(moveInvaders, 500);
