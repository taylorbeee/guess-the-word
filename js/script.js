const ul = document.querySelector("ul");
const guessButton = document.querySelector(".guess");
const inputLetter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress")
const remaining = document.querySelector(".remaining");
const span = document.querySelector("span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const word = "magnolia";
const guessedLetters = [];

const makeDots = function (word) {
    let hiddenWord = "";
    for (let element in word) {
        hiddenWord += "●";
    }

    wordInProgress.innerText = hiddenWord;
};

makeDots(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const inputValue = inputLetter.value;
    // console.log(inputValue);
    inputLetter.value = "";
    message.innerText = "";
    const result = checkInput(inputValue);
    console.log(result);
    makeGuess(result);
});

const checkInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "You gotta enter something to play!";
    } else if (input.length >= 2) {
        message.innerText = "Only one letter at a time, my friend.";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "That's not a letter and you know it!";
    }
    return input;
};

const makeGuess = function (letter) {
    const uppercaseLetter = letter.toUpperCase();
    if (guessedLetters.includes(uppercaseLetter)) {
        message.innerText = "You already guessed that letter, give it another go.";
      } else {
        guessedLetters.push(uppercaseLetter);
        console.log(guessedLetters);
        pageUpdate();
        updateWordInProgress(guessedLetters);
      }
};

const pageUpdate = function () {
    ul.innerHTML = "";
    guessedLetters.forEach( function (letter) {
        let li = document.createElement("li");
        li.innerText = letter;
        ul.append(li);
    });
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
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
};


