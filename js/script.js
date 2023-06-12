const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress")
const remaining = document.querySelector(".remaining");
const span = document.querySelector("span");
const messages = document.querySelector(".messages");
const playAgainButton = document.querySelector(".play-again");
const word = "magnolia";

const UpdateWordInProgress = function (word) {
    let hiddenWord = "";
    for (let element in word) {
        hiddenWord += "●";
    }

    wordInProgress.innerText = hiddenWord;
};

UpdateWordInProgress(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const inputValue = letter.value;
    console.log(inputValue);
    letter.value = "";
});