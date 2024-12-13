window.onload = function () {
  const audio = document.getElementById("background-sound");
  audio.play();
};

let gridContainer = document.querySelector(".grid-container");
let score = 0;
let firstCard, secondCard;
let lockBoard = false;
let cards = [
  { name: "vanilla", image: "images/nekopara-vanilla.png" },
  { name: "boo", image: "images/other-boo.png" },
  { name: "saber", image: "images/saber.gif" },
  { name: "zerotwo", image: "images/darling-in-the-franxx-zero-two.png" },
];

let cardArray = [...cards, ...cards];
shuffleCards();

function shuffleCards() {
  cardArray.sort(() => Math.random() - 0.5);
  generateCards();
}

function generateCards() {
  gridContainer.innerHTML = "";
  for (let card of cardArray) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.dataset.name = card.name;

    // Add the image to the front side of the card
    cardElement.innerHTML = `
      <div class="front">
        <img src="${card.image}" alt="${card.name}" class="front-image">
      </div>
      <div class="back"></div>
    `;

    gridContainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
  }
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  updateScore(10);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function updateScore(points) {
  score += points;
  document.getElementById("score").textContent = score;
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function restart() {
  score = 0;
  document.getElementById("score").textContent = score;
  shuffleCards();
}
