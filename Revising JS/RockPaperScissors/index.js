const rockBtn = document.getElementById("rock");
const paperBtn = document.getElementById("paper");
const scissorsBtn = document.getElementById("scissors");
const resultDisplay = document.getElementById("result");
const playerScoreDisplay = document.getElementById("player-score");
const computerScoreDisplay = document.getElementById("computer-score");
const resetBtn = document.getElementById("reset");

const winSound = new Audio("win.mp3");
const loseSound = new Audio("lose.mp3");
const tieSound = new Audio("tie.mp3");

let playerScore = 0;
let computerScore = 0;

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * choices.length)];
}

function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) return "tie";
  if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "scissors" && computerChoice === "paper") ||
    (playerChoice === "paper" && computerChoice === "rock")
  ) {
    return "player";
  }
  return "computer";
}

function playGame(playerChoice) {
  const computerChoice = getComputerChoice();
  const winner = determineWinner(playerChoice, computerChoice);

  if (winner === "tie") {
    resultDisplay.textContent = `It's a tie! You both chose ${playerChoice}.`;
    tieSound.play();
  } else if (winner === "player") {
    resultDisplay.textContent = `You win! Your Choice: ${playerChoice}, Computer Choice: ${computerChoice}.`;
    playerScore++;
    winSound.play();
  } else {
    resultDisplay.textContent = `You lose! Your Choice: ${playerChoice}, Computer Choice: ${computerChoice}.`;
    computerScore++;
    loseSound.play();
  }

  playerScoreDisplay.textContent = playerScore;
  computerScoreDisplay.textContent = computerScore;

  const playerButton = document.getElementById(playerChoice);
  playerButton.classList.add("bounce");
  setTimeout(() => playerButton.classList.remove("bounce"), 500);
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  playerScoreDisplay.textContent = playerScore;
  computerScoreDisplay.textContent = computerScore;
  resultDisplay.textContent = "Make your choice!";
}

rockBtn.addEventListener("click", () => playGame("rock"));
paperBtn.addEventListener("click", () => playGame("paper"));
scissorsBtn.addEventListener("click", () => playGame("scissors"));
resetBtn.addEventListener("click", resetGame);
