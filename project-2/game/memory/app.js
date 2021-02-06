let sequence = [];
let playerSequence = [];
let level = 0;
let roundsCount;

const btnStart = document.querySelector(".btn-start");
const btnLvl1 = document.querySelector(".btn-lvl-1");
const btnLvl2 = document.querySelector(".btn-lvl-2");
const btnLvl3 = document.querySelector(".btn-lvl-3");
const info = document.querySelector(".info");
const header = document.querySelector(".header");
const tileContainer = document.querySelector(".js-container");

function resetGame(message) {
  alert(message);
  sequence = [];
  playerSequence = [];
  level = 0;
  btnStart.classList.remove("hidden");
  header.textContent = "Memory";
  info.classList.add("hidden");
  tileContainer.classList.add("unclickable");
}

function playerTurn(level) {
  tileContainer.classList.remove("unclickable");
  info.textContent = `Twoja kolej: Kliknij jeszcze ${level} ${
    level > 1 ? "razy" : "raz"
  }`;
}

function activateTile(number) {
  const tile = document.querySelector(`[data-tile='${number}']`);

  tile.classList.add("activated");

  setTimeout(() => {
    tile.classList.remove("activated");
  }, 800);
}

function playRound(nextSequence) {
  nextSequence.forEach((number, index) => {
    setTimeout(() => {
      activateTile(number);
    }, (index + 1) * 1000);
  });
}

function nextStep() {
  const tiles = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const random = tiles[Math.floor(Math.random() * tiles.length)];
  return random;
}

function nextRound() {
  level += 1;

  tileContainer.classList.add("unclickable");
  info.textContent = "Obserwuj uważnie!";
  header.textContent = `Poziom ${level} z ${roundsCount}`;

  const nextSequence = [...sequence];
  nextSequence.push(nextStep());
  playRound(nextSequence);

  sequence = [...nextSequence];
  setTimeout(() => {
    playerTurn(level);
  }, level * 1000 + 1000);
}

function handleClick(tile) {
  const index = playerSequence.push(tile) - 1;

  const remainingTaps = sequence.length - playerSequence.length;

  if (playerSequence[index] !== sequence[index]) {
    resetGame("❗️❗️ Niestety drogi Graczu ❗️❗️ Pomyliłeś kolejność 😢");
    return;
  }

  if (playerSequence.length === sequence.length) {
    if (playerSequence.length === roundsCount) {
      resetGame("✨ Gratulacje ✨ Masz niesamowitą pamięć");
      return;
    }

    playerSequence = [];
    info.textContent = "Bravo!";
    setTimeout(() => {
      nextRound();
    }, 1000);
    return;
  }

  info.textContent = `Twoja kolej: ${remainingTaps} Klik${
    remainingTaps > 1 ? "i" : ""
  }`;
}

function startGame() {
  btnLvl1.classList.add('hidden');
  btnLvl2.classList.add('hidden');
  btnLvl3.classList.add('hidden');
  info.classList.remove("hidden");
  nextRound();
}

btnStart.addEventListener("click", () => {
  btnStart.classList.add('hidden');
  btnLvl1.classList.remove('hidden');
  btnLvl2.classList.remove('hidden');
  btnLvl3.classList.remove('hidden');

});

btnLvl1.addEventListener("click", () => {
  roundsCount = 5
  startGame();
});

btnLvl2.addEventListener("click", () => {
  roundsCount = 10
  startGame();
});

btnLvl3.addEventListener("click", () => {
  roundsCount = 15
  startGame();
});

tileContainer.addEventListener("click", (event) => {
  const { tile } = event.target.dataset;
  if (tile) handleClick(tile);
});