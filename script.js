const playerScore = document.getElementById("playerScore");
const playerSign = document.getElementById("playerSign");

const rockBtn = document.getElementById("rockBtn");
const paperBtn = document.getElementById("paperBtn");
const scissorsBtn = document.getElementById("scissorsBtn");

rockBtn.addEventListener("click", () => handleClick("ROCK"));
paperBtn.addEventListener("click", () => handleClick("PAPER"));
scissorsBtn.addEventListener("click", () => handleClick("SCISSORS"));

function handleClick(playerChoice) {
  updateChoices(playerChoice, null);
}

function updateChoices(playerChoice, computerSelection) {
  switch (playerChoice) {
    case "ROCK":
      playerSign.textContent = "✊";
      break;
    case "PAPER":
      playerSign.textContent = "✋";
      break;
    case "SCISSORS":
      playerSign.textContent = "✌";
      break;
  }
}
