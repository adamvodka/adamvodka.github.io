// function startGame() {
  const words = [
    "kometa",
    "antyk",
    "talerz",
    "szczyt",
    "gobelin",
    "zatoka",
    "garncarstwo",
    "szmaragd",
    "siedzenie",
    "parkometr",
    "plecak",
    "dowcip",
    "kaktus",
    "egzamin",
    "wazon",
    "traktor",
  ];

  let word = words[Math.floor(Math.random() * words.length)];
  console.log(word);
  const answers = [];
  for (let i = 0; i < word.length; i++) {
    answers[i] = "__ ";
  }

  let otherLetters = word.length;

  // window.confirm("Czy chcesz zagrać w grę?");
  function myGame() {
    if (confirm("Czy chcesz zagrać w grę?")) {
      game();
    }
  }

  function game() {
    while (otherLetters > 0) {
      alert(answers.join(""));
      let userShot = prompt("Podaj literę lub zakończ grę.");
      if (userShot === null) {
        alert("Szkoda, że się poddajesz");
        myGame();
        break;
      } else if (userShot.length !== 1) {
        alert("Podaj TYLKO 1 literę!");
      } else {
        for (let j = 0; j < word.length; j++) {
          if (word[j] === userShot) {
            answers[j] = userShot;
            otherLetters--;
          }
        }
      }
    }
  }
  myGame();
  alert(answers.join());
  alert("Szukane słowo to : " + word);
// }

// document.addEventListener("DOMContentLoaded", startGame);
