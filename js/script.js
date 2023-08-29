const ul = document.querySelector("ul");
const guessButton = document.querySelector(".guess");
const inputLetter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const span = document.querySelector("span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
let word = "";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
  const request = await fetch(
    "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
  );
  const words = await request.text();
  const wordArray = words.split("\n");
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
  makeDots(word);
};

getWord();

const makeDots = function (word) {
  const hiddenWord = [];
  for (const letter of word) {
    hiddenWord.push("●");
  }

  wordInProgress.innerText = hiddenWord.join("");
};

makeDots(word);

guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  const inputValue = inputLetter.value;
  inputLetter.value = "";
  message.innerText = "";
  const result = checkInput(inputValue);
  if (result) {
    makeGuess(result);
  }
});

const checkInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    message.innerText = "You gotta enter something to play big dog.";
  } else if (input.length !== 1) {
    message.innerText = "One letter at a time, pal!";
  } else if (!input.match(acceptedLetter)) {
    message.innerText = "That's not a letter and you know it!";
  } else {
    return input;
  }
};

const makeGuess = function (letter) {
  const uppercaseLetter = letter.toUpperCase();
  if (guessedLetters.includes(uppercaseLetter)) {
    message.innerText = "You already guessed that letter, go again.";
  } else {
    guessedLetters.push(uppercaseLetter);
    console.log(guessedLetters);
    pageUpdate();
    guessesRemaining(uppercaseLetter);
    updateWordInProgress(guessedLetters);
  }
};

const pageUpdate = function () {
  ul.innerHTML = "";
  guessedLetters.forEach(function (letter) {
    let li = document.createElement("li");
    li.innerText = letter;
    ul.append(li);
  });
};

const guessesRemaining = function (guess) {
  const upperWord = word.toUpperCase();

  if (upperWord.includes(guess)) {
    message.innerText = "You are correct!";
  } else {
    message.innerText = "Incorrect, try again!";
    remainingGuesses -= 1;
  }
  if (remainingGuesses === 0) {
    message.innerHTML = `Game over! The word was: <span class="highlight">${word}</span>.`;
    startOver();
  } else if (remainingGuesses === 1) {
    span.innerText = "1 guess";
  } else {
    span.innerText = `${remainingGuesses} guesses`;
  }
};

const updateWordInProgress = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const updatedArray = [];
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      updatedArray.push(letter);
    } else {
      updatedArray.push("●");
    }
  }
  wordInProgress.innerText = updatedArray.join("");
  winner();
};

const winner = function () {
  if (wordInProgress.innerText === word.toUpperCase()) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the correct word! You rock!</p>`;
    startOver();
  }
};

const startOver = function () {
  guessButton.classList.add("hide");
  remaining.classList.add("hide");
  ul.classList.add("hide");
  playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
  message.classList.remove("win");
  message.innerText = "";
  ul.innerHTML = "";
  remainingGuesses = 8;
  guessedLetters = [];
  span.innerText = "8 guesses";
  guessButton.classList.remove("hide");
  remaining.classList.remove("hide");
  ul.classList.remove("hide");
  playAgainButton.classList.add("hide");
  getWord();
});
