
// Declare Variable: Computer Choice Array

var wordBank = ["tripod", "aperture", "long-exposure", "astrophotography", "infrared", "depth-of-field", "landscape", "skyline", "photoshop", "lazy-shutter", "cityscape", "macro-image", "iso-sensitivity", "portrait-photographer", "fashion-shoot", "telephoto-lens", "wide-angle-lens"];

// Declare Variable: Guesses Letter Array

var guessedLetters = [];

// Declare Variable: Correctly Guessed Letter Arrary

var guessedRight = [];

// Declare Variable: keycodes for each letter of the current word.

var letterKeys = [];

// Declare Variables: Game Tallies

var Win = 0;
var Loss = 0;
var Guesses = 12;


// Declare Variable: HTML References

var uGuess = document.getElementById("userGuess");
var wTally = document.getElementById("winsTally");
var gLeft = document.getElementById("guessesLeft");
var hWord = document.getElementById("hangWord");
var inst = document.getElementById("instructions");

// Declare Variable: The Computer's Word Choice

var curWord = wordBank[Math.floor(Math.random() * wordBank.length)];

console.log(curWord);

// Declare Function: And create a function to push "under lines" to each letter position, and retain the hyphens.

function letterStart() {
    for ( var j = 0, k = 0; j = curWord.charAt(k); j++, k++ ) {
        guessedRight.push(" _ ");
        letterKeys.push(curWord.charCodeAt(k));
        if ( curWord.charCodeAt(k) === 45 ) {
            guessedRight.splice(k, 1, " - ")
        };
    };
};

// Run Function: Set up the initial display.

letterStart();

// console.log(letterKeys);

// Declare Function: Refresh the Current Word and initial arrays

function gameRefresh() {
    curWord = wordBank[Math.floor(Math.random() * wordBank.length)],
    guessedRight = [],
    letterKeys = [],
    guessedLetters = [];
    letterStart();
};

// This is the User's Guess

document.onkeyup = function(event) {
    var usGuess = event.key;

    //Hide the instructions

    inst = document.getElementById("instructions").style.visibility = "hidden";

    // Declare Variable: Grab the Keycode for the user Guess

    var key = event.which || event.keycode;

    // First, Check if usGuess is a lowercase letter

    if ( (key >= 65 ) && (key <= 90 ) ) {

        // Then, check to see if the keycode of the userGuess meets the keycode of any of the current word's characters.

        for ( var m = 0; m < letterKeys.length; m++ ) {
            if ( key === ( letterKeys[m] - 32 ) ) {
                guessedRight.splice(m, 1, usGuess);
            } 
        };

        // If none of the keycodes match, push the guess to the guessedLetters array and reduce the guesses remaining.

        if ( ( key !== letterKeys.indexOf() ) && ( guessedLetters.indexOf(" " + usGuess) === -1 ) ) {
            guessedLetters.push(" " + usGuess),
            Guesses--;
        }

    };

    // If the user runs out of guesses, refresh the game
    
    if ( Guesses === 0 ) {
        Guesses = 12, 
        gameRefresh();
    };

    // If the user guesses the word correctly, refresh the game

    if ( guessedRight.includes(" _ ") == false ) {
        Win++,
        Guesses = 12,
        gameRefresh();
    }

    

    var guessR = guessedLetters.toString().toUpperCase();
    var hang = guessedRight.join(" ").toUpperCase();

    // This is the display of the results
    hWord.innerText = "Guess this word: " + hang;
    uGuess.innerText = "Your Guesses So Far: " + guessR;
    wTally.textContent = "Wins: " + Win;
    gLeft.textContent = "Guesses Left: " + Guesses;


    // console.log("this is a text log");
    // console.log(key);
    // console.log(guessR);
};