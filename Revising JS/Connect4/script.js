const gameBoard = document.getElementById('game-board');
const statusText = document.getElementById('status');
const timerText = document.getElementById('timer');

const rows = 6;
const cols = 7;
let currentPlayer = 'player-one';
let gameActive = true;
let countdownTimer;
let timeLeft = 10;
const squares = [];

function createBoard() {
  for (let i = 0; i < rows * cols; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.id = i;

    const disc = document.createElement('div');
    disc.classList.add('disc');
    cell.appendChild(disc);

    gameBoard.appendChild(cell);
    squares.push(cell);
  }
}

function startTimer() {
  clearInterval(countdownTimer);
  timeLeft = 10;
  timerText.textContent = `Time Left: ${timeLeft}`;

  countdownTimer = setInterval(() => {
    timeLeft -= 1;
    timerText.textContent = `Time Left: ${timeLeft}`;

    if (timeLeft === 0) {
      clearInterval(countdownTimer);
      skipTurn();
    }
  }, 1000);
}

function skipTurn() {
  currentPlayer = currentPlayer === 'player-one' ? 'player-two' : 'player-one';
  statusText.textContent = `${currentPlayer}'s Turn`;
  if (currentPlayer === 'player-two') {
    aiMove();
  } else {
    startTimer();
  }
}

function checkBoard() {
  const winningArrays = [
    // Horizontal
    [0, 1, 2, 3], [1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6],
    [7, 8, 9, 10], [8, 9, 10, 11], [9, 10, 11, 12], [10, 11, 12, 13],
    [14, 15, 16, 17], [15, 16, 17, 18], [16, 17, 18, 19], [17, 18, 19, 20],
    [21, 22, 23, 24], [22, 23, 24, 25], [23, 24, 25, 26], [24, 25, 26, 27],
    [28, 29, 30, 31], [29, 30, 31, 32], [30, 31, 32, 33], [31, 32, 33, 34],
    [35, 36, 37, 38], [36, 37, 38, 39], [37, 38, 39, 40], [38, 39, 40, 41],

    // Vertical
    [0, 7, 14, 21], [7, 14, 21, 28], [14, 21, 28, 35],
    [1, 8, 15, 22], [8, 15, 22, 29], [15, 22, 29, 36],
    [2, 9, 16, 23], [9, 16, 23, 30], [16, 23, 30, 37],
    [3, 10, 17, 24], [10, 17, 24, 31], [17, 24, 31, 38],
    [4, 11, 18, 25], [11, 18, 25, 32], [18, 25, 32, 39],
    [5, 12, 19, 26], [12, 19, 26, 33], [19, 26, 33, 40],
    [6, 13, 20, 27], [13, 20, 27, 34], [20, 27, 34, 41],

    // Diagonal
    [3, 9, 15, 21], [4, 10, 16, 22], [5, 11, 17, 23], [6, 12, 18, 24],
    [2, 8, 14, 20], [1, 9, 17, 25], [0, 8, 16, 24],
    [18, 12, 6], [19, 13, 7], [20, 14, 8]
  ];

  for (let array of winningArrays) {
    const [a, b, c, d] = array;

    if (
      squares[a]?.classList.contains(currentPlayer) &&
      squares[b]?.classList.contains(currentPlayer) &&
      squares[c]?.classList.contains(currentPlayer) &&
      squares[d]?.classList.contains(currentPlayer)
    ) {
      statusText.textContent = `${currentPlayer.replace('-', ' ')} wins! 🎉`;
      gameActive = false;

      clearInterval(countdownTimer);
      return;
    }
  }
}

function aiMove() {
  if (!gameActive) return;

  let column;
  do {
    column = Math.floor(Math.random() * cols);
  } while (!isColumnAvailable(column));

  dropDisc(column);
}

function isColumnAvailable(column) {
  for (let row = 0; row < rows; row++) {
    if (!squares[row * cols + column].classList.contains('taken')) {
      return true;
    }
  }
  return false;
}

function dropDisc(column) {
  if (!gameActive) return;

  let dropIndex = -1;

  for (let row = rows - 1; row >= 0; row--) {
    const index = row * cols + column;
    if (!squares[index].classList.contains('taken')) {
      dropIndex = index;
      break;
    }
  }

  if (dropIndex !== -1) {
    const cell = squares[dropIndex];
    const disc = cell.querySelector('.disc');
    disc.style.top = '0';
    cell.classList.add('taken', currentPlayer);

    setTimeout(() => {
      checkBoard();
      if (gameActive) {
        currentPlayer = currentPlayer === 'player-one' ? 'player-two' : 'player-one';
        statusText.textContent = `${currentPlayer.replace('-', ' ')}'s Turn`;

        if (currentPlayer === 'player-two') {
          aiMove();
        } else {
          startTimer();
        }
      }
    }, 500);
  }
}

function handleClick(e) {
  if (!gameActive || currentPlayer === 'player-two') return;

  const cell = e.target.closest('.cell');
  const column = parseInt(cell.dataset.id) % cols;

  dropDisc(column);
}

function addListeners() {
  squares.forEach((cell) => {
    cell.addEventListener('click', handleClick);
  });
}

createBoard();
addListeners();
startTimer();
