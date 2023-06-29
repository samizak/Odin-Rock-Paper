let playerScore = 0;
let computerScore = 0;
let roundWinner = "";

const weapons = {
  ROCK: { loseAgainst: "PAPER", winAgainst: "SCISSORS" },
  PAPER: { loseAgainst: "SCISSORS", winAgainst: "ROCK" },
  SCISSORS: { loseAgainst: "ROCK", winAgainst: "PAPER" },
};

const scoreInfo = document.getElementById("scoreInfo");
const scoreMessage = document.getElementById("scoreMessage");

const playerScoreEl = document.getElementById("playerScore");
const playerSignEl = document.getElementById("playerSign");

const computerScoreEl = document.getElementById("computerScore");
const computerSignEl = document.getElementById("computerSign");

const rockBtn = document.getElementById("rockBtn");
const paperBtn = document.getElementById("paperBtn");
const scissorsBtn = document.getElementById("scissorsBtn");

const overlay = document.getElementById("overlay");
const endgameModal = document.getElementById("endgameModal");
const endgameMsg = document.getElementById("endgameMsg");
const restartBtn = document.getElementById("restartBtn");

rockBtn.addEventListener("click", () => HandleClick("ROCK"));
paperBtn.addEventListener("click", () => HandleClick("PAPER"));
scissorsBtn.addEventListener("click", () => HandleClick("SCISSORS"));
restartBtn.addEventListener("click", RestartGame);

function GetRandomChoice() {
  let randomNumber = Math.floor(Math.random() * 3);
  switch (randomNumber) {
    case 0:
      return "ROCK";
    case 1:
      return "PAPER";
    case 2:
      return "SCISSORS";
  }
}

function isGameOver() {
  return playerScore === 5 || computerScore === 5;
}

function ShowGameOver() {
  endgameModal.classList.add("active");
  overlay.classList.add("active");
}

function HandleClick(playerChoice) {
  if (isGameOver()) {
    ShowGameOver();
    return;
  }

  const computerChoice = GetRandomChoice();
  CalculateWinner(playerChoice, computerChoice);
  UpdateChoices(playerChoice, computerChoice);
  UpdateScore();

  if (isGameOver()) {
    ShowGameOver();
    SetGameOverMessage();
    return;
  }
}

function UpdateChoices(playerChoice, computerChoice) {
  switch (playerChoice) {
    case "ROCK":
      playerSignEl.textContent = "✊";
      break;
    case "PAPER":
      playerSignEl.textContent = "✋";
      break;
    case "SCISSORS":
      playerSignEl.textContent = "✌";
      break;
  }

  switch (computerChoice) {
    case "ROCK":
      computerSignEl.textContent = "✊";
      break;
    case "PAPER":
      computerSignEl.textContent = "✋";
      break;
    case "SCISSORS":
      computerSignEl.textContent = "✌";
      break;
  }
}

function UpdateScore() {
  if (roundWinner === "tie") scoreInfo.textContent = "It's a tie!";
  else if (roundWinner === "player") scoreInfo.textContent = "You won!";
  else if (roundWinner === "computer") scoreInfo.textContent = "You lost!";

  playerScoreEl.textContent = `Player: ${playerScore}`;
  computerScoreEl.textContent = `Computer: ${computerScore}`;
}

function CalculateWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) roundWinner = "tie";
  else if (weapons[playerChoice].winAgainst === computerChoice) {
    playerScore++;
    roundWinner = "player";
  } else if (weapons[playerChoice].loseAgainst === computerChoice) {
    computerScore++;
    roundWinner = "computer";
  }

  UpdateScoreMessage(roundWinner, playerChoice, computerChoice);
}

function UpdateScoreMessage(roundWinner, playerChoice, computerChoice) {
  const _playerChoice = playerChoice.toLowerCase();
  const _computerChoice = computerChoice.toLowerCase();

  if (roundWinner === "player") scoreMessage.textContent = `${_playerChoice} beats ${_computerChoice}`;
  else if (roundWinner === "computer") scoreMessage.textContent = `${_playerChoice} is beaten by ${_computerChoice}`;
  else scoreMessage.textContent = `${_playerChoice} ties with ${_computerChoice}`;
}

function SetGameOverMessage() {
  console.log(endgameModal);
  return playerScore > computerScore ? (endgameMsg.textContent = "You won!") : (endgameMsg.textContent = "You lost...");
}

function RestartGame() {
  playerScore = 0;
  computerScore = 0;
  scoreInfo.textContent = "Choose your weapon";
  scoreMessage.textContent = "First to score 5 points wins the game";
  playerScoreEl.textContent = "Player: 0";
  computerScoreEl.textContent = "Computer: 0";
  playerSignEl.textContent = "❔";
  computerSignEl.textContent = "❔";
  endgameModal.classList.remove("active");
  overlay.classList.remove("active");
}
