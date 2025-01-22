const gameBoard = document.getElementById('game-board');
const statusText = document.getElementById('status');

const rows = 6;
const cols = 7;
let currentPlayer = 'player-one';
let gameActive = true;
const squares = [];

function createBoard() {
  for (let i = 0; i < rows * cols; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.id = i;
    gameBoard.appendChild(cell);
    squares.push(cell);
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
      statusText.textContent = `${currentPlayer} wins!`;
      gameActive = false;
      return;
    }
  }
}

function handleClick(e) {
  if (!gameActive) return;

  const cell = e.target;
  const cellIndex = parseInt(cell.dataset.id);

  const columnIndex = cellIndex % cols;
  let dropIndex = -1;

  for (let row = rows - 1; row >= 0; row--) {
    const index = row * cols + columnIndex;
    if (!squares[index].classList.contains('taken')) {
      dropIndex = index;
      break;
    }
  }

  if (dropIndex !== -1) {
    squares[dropIndex].classList.add('taken', currentPlayer);

    checkBoard();

    currentPlayer = currentPlayer === 'player-one' ? 'player-two' : 'player-one';
    if (gameActive) {
      statusText.textContent = `${currentPlayer}'s Turn`;
    }
  } else {
    alert('Invalid move! Try another column.');
  }
}

function addListeners() {
  squares.forEach((cell) => {
    cell.addEventListener('click', handleClick);
  });
}

createBoard();
addListeners();
