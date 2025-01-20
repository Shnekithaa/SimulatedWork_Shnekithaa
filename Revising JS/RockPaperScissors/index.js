const rockBtn = document.getElementById("rock");
const paperBtn = document.getElementById("paper");
const scissorsBtn = document.getElementById("scissors");
const resultDisplay = document.getElementById("result");
const playerScoreDisplay = document.getElementById("player-score");
const computerScoreDisplay = document.getElementById("computer-score");
const resetBtn = document.getElementById("reset");

let playerScore = 0;
let computerScore = 0;

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "tie";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "scissors" && computerChoice === "paper") ||
    (playerChoice === "paper" && computerChoice === "rock")
  ) {
    return "player";
  } else {
    return "computer";
  }
}

function playGame(playerChoice) {
  const computerChoice = getComputerChoice();
  const winner = determineWinner(playerChoice, computerChoice);

  if (winner === "tie") {
    resultDisplay.textContent = `It's a tie! You both chose ${playerChoice}.`;
  } else if (winner === "player") {
    resultDisplay.textContent = `You win! Your Choice: ${playerChoice} Computer Choice: ${computerChoice}.`;
    playerScore++;
  } else {
    resultDisplay.textContent = `You lose! Your Choice: ${playerChoice} Computer Choice: ${computerChoice}.`;
    computerScore++;
  }

  playerScoreDisplay.textContent = playerScore;
  computerScoreDisplay.textContent = computerScore;

  if (winner === "player") {
    resultDisplay.classList.add("highlight");
  } else {
    resultDisplay.classList.remove("highlight");
  }
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  playerScoreDisplay.textContent = playerScore;
  computerScoreDisplay.textContent = computerScore;
  resultDisplay.textContent = "Make your choice!";
  resultDisplay.classList.remove("highlight");
}

rockBtn.addEventListener("click", () => playGame("rock"));
paperBtn.addEventListener("click", () => playGame("paper"));
scissorsBtn.addEventListener("click", () => playGame("scissors"));
resetBtn.addEventListener("click", resetGame);
