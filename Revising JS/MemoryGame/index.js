document.addEventListener("DOMContentLoaded", () => {
  const cardArray = [
    { name: "cheeseburger", img: "cheeseburger.png" },
    { name: "cheeseburger", img: "cheeseburger.png" },
    { name: "fries", img: "fries.png" },
    { name: "fries", img: "fries.png" },
    { name: "hotdog", img: "hotdog.png" },
    { name: "hotdog", img: "hotdog.png" },
    { name: "ice-cream", img: "ice-cream.png" },
    { name: "ice-cream", img: "ice-cream.png" },
    { name: "milkshake", img: "milkshake.png" },
    { name: "milkshake", img: "milkshake.png" },
    { name: "pizza", img: "pizza.png" },
    { name: "pizza", img: "pizza.png" },
  ];

  let grid = document.querySelector(".grid");
  const resultDisplay = document.querySelector("#result");
  const timerDisplay = document.querySelector("#timer");
  const bestTimeDisplay = document.querySelector("#best-time");
  const difficultySelect = document.querySelector("#difficulty");

  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];
  let timer;
  let elapsedTime = 0;
  let bestTime = localStorage.getItem("bestTime") || null;

  if (bestTime) {
    bestTimeDisplay.textContent = `Best Time: ${bestTime}s`;
  }

  function startGame(difficulty = "easy") {
    cardsChosen = [];
    cardsChosenId = [];
    cardsWon = [];
    elapsedTime = 0;
    clearInterval(timer);

    let cardsToUse = cardArray.slice();
    if (difficulty === "medium") {
      cardsToUse = cardArray.slice(0, 16);
    } else if (difficulty === "hard") {
      cardsToUse = cardArray.slice(0, 20);
    }

    cardsToUse.sort(() => 0.5 - Math.random());

    grid.innerHTML = "";
    cardsToUse.forEach((card, index) => {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.setAttribute("data-id", index);
      cardElement.innerHTML = `
        <div class="front"></div>
        <div class="back" style="background-image: url(${card.img});"></div>
      `;
      cardElement.addEventListener("click", flipCard);
      grid.appendChild(cardElement);
    });

    resultDisplay.textContent = "0";

    timer = setInterval(() => {
      elapsedTime++;
      timerDisplay.textContent = `Time: ${elapsedTime}s`;
    }, 1000);
  }

  function checkForMatch() {
    const cards = document.querySelectorAll(".card");
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    if (cardsChosen[0] === cardsChosen[1]) {
      cards[optionOneId].classList.add("matched");
      cards[optionTwoId].classList.add("matched");
      cards[optionOneId].removeEventListener("click", flipCard);
      cards[optionTwoId].removeEventListener("click", flipCard);
      cardsWon.push(cardsChosen);
    } else {
      setTimeout(() => {
        cards[optionOneId].classList.remove("flipped");
        cards[optionTwoId].classList.remove("flipped");
      }, 500);
    }

    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay.textContent = cardsWon.length;

    if (cardsWon.length === cardArray.length / 2) {
      clearInterval(timer);
      resultDisplay.textContent = "Congratulations! You found them all!";
      saveBestTime(elapsedTime);
    }
  }

  function flipCard() {
    const cardId = this.getAttribute("data-id");

    if (
      !cardsChosenId.includes(cardId) &&
      !this.classList.contains("flipped")
    ) {
      this.classList.add("flipped");
      cardsChosen.push(cardArray[cardId].name);
      cardsChosenId.push(cardId);

      if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500);
      }
    }
  }

  function saveBestTime(time) {
    if (!bestTime || time < bestTime) {
      localStorage.setItem("bestTime", time);
      bestTime = time;
      bestTimeDisplay.textContent = `Best Time: ${bestTime}s`;
    }
  }

  difficultySelect.addEventListener("change", (e) => {
    startGame(e.target.value);
  });

  startGame("easy");
});
