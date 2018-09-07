// Global Variables
// ==============================
// Arrays and Variables
var wordOptions = ["apples", "tacos", "steak", "pancakes", "chicken", "potatoes","carrots", "peas", "avocado", "celery", "dragonfruit", "burritos", "nachos", "burgers", ""];
var selectedWord = "";
var lettersInWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongLetters = [];

// Game Counters
var winCount = 0;
var lossCount = 0;
var guessesLeft = 9;

// Functions
// ==============================
function startGame () {
    selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
    lettersInWord = selectedWord.split("");
    numBlanks = lettersInWord.length;

    // Reset
    guessesLeft = 9;
    wrongLetters = [];
    blanksAndSuccesses = [];

    // Populate blanks and successes
    for (var i=0; i<numBlanks; i++){
        blanksAndSuccesses.push("_");
    }

    // Change HTML to reflect Conditions
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join("  ");
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("winCounter").innerHTML = winCount;
    document.getElementById("lossCounter").innerHTML = lossCount;

    // console logs/tests
    console.log(selectedWord);
    console.log(lettersInWord);
    console.log(numBlanks);
    console.log(blanksAndSuccesses);
}

function checkLetters(letter) {
    // Check if letter exists in word

    var isLetterInWord = false;

    for (var i=0; i<numBlanks; i++){
        if(selectedWord[i]== letter){
            isLetterInWord = true;
        }
    }

    // Check where letter exists in word
    if(isLetterInWord) {
    for (var i=0; i<numBlanks; i++) {
        if(selectedWord[i] == letter) {
            blanksAndSuccesses[i] = letter;
        }
    }
}
// Letter not found
    else{
        wrongLetters.push(letter);
        guessesLeft--;
    }
// Test/debug
console.log(blanksAndSuccesses);

}

function roundComplete(){
    console.log("Win Count" + winCount + "| Loss Count" + lossCount + "| Guesses Left" + guessesLeft);

    // Update HTML to reflect recent changes
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join("  ");
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("wrongGuesses").innerHTML = wrongLetters.join("  ")
    document.getElementById("winCounter").innerHTML = winCount;
    document.getElementById("lossCounter").innerHTML = lossCount;

    // Check if user won
    if(lettersInWord.toString() == blanksAndSuccesses.toString()){
        winCount++;
        alert("You Win!!!");

        // Update the win counter in HTML
        document.getElementById("winCounter").innerHTML = winCount;

        startGame();
    }
    // Check if user lost
    else if (guessesLeft == 0) {
        lossCount++;
        alert("You Lose!!!");

        // Update HTML
        document.getElementById("lossCounter").innerHTML = lossCount;

        startGame();
    }
}

// Main Process
// ==============================

// Initiates the code
startGame();

// Register Key Clicks
document.onkeyup = function(event) {
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetters(letterGuessed);
    roundComplete();

    // test / debug
    console.log(letterGuessed);
}