//Hangman Game - Vanilla Javascript Solution using a keycode/array strategy:

//First: Declare global objects

// Object: Computer Choice Array

var wordBank = ["tripod", "camera", "telephoto-lens", "photography", "portrait", "family-pictures", "astro-photography", "fine-art", "stock-image", "wide-angle", "long-exposure", "street-photography", "candid-portrait", "aperture", "photoshopped", "post-processing", "on-location", "light-box", "studio", "off-camera-flash", "action-camera", "underwater-camera", "point-n-shoot", "film-camera", "digital-camera", "canvas-prints", "one-hour-photo", "polaroid-photo", "dark-room", "negative", "bokeh", "soft-focus", "gaussian-blur", "clone-stamp", "touch-up", "drone-photography"];

// Object: Guesses Letter Array

var guessedLetters = [];

// Object: Correctly Guessed Letter Arrary

var guessedRight = [];

// Object: keycodes for each letter of the current word.

var letterKeys = [];

// Object: array to store and display guessed words

var guessedWords = [];

// Object: Build image array for the game's hint images and background images

var imageArray = [
    "\"../word-guess-game/assets/images/tripod.jpeg\"", 
    "\"../word-guess-game/assets/images/camera.jpeg\"", 
    "\"../word-guess-game/assets/images/telephoto-lens.jpeg\"", 
    "\"../word-guess-game/assets/images/photography.jpeg\"", 
    "\"../word-guess-game/assets/images/portrait.jpeg\"", 
    "\"../word-guess-game/assets/images/family-pictures.jpeg\"", 
    "\"../word-guess-game/assets/images/astro-photography.jpg\"", 
    "\"../word-guess-game/assets/images/fine-art.jpeg\"", 
    "\"../word-guess-game/assets/images/stock-image.jpeg\"", 
    "\"../word-guess-game/assets/images/wide-angle.jpeg\"", 
    "\"../word-guess-game/assets/images/long-exposure.jpeg\"", 
    "\"../word-guess-game/assets/images/street-photography.jpeg\"", 
    "\"../word-guess-game/assets/images/candid-portrait.jpeg\"", 
    "\"../word-guess-game/assets/images/aperture.jpeg\"", 
    "\"../word-guess-game/assets/images/photoshopped.jpeg\"", 
    "\"../word-guess-game/assets/images/post-processing.jpg\"", 
    "\"../word-guess-game/assets/images/on-location.jpeg\"", 
    "\"../word-guess-game/assets/images/light-box.jpeg\"", 
    "\"../word-guess-game/assets/images/studio.jpeg\"", 
    "\"../word-guess-game/assets/images/off-camera-flash.jpeg\"", 
    "\"../word-guess-game/assets/images/action-camera.jpeg\"", 
    "\"../word-guess-game/assets/images/underwater-camera.jpeg\"", 
    "\"../word-guess-game/assets/images/point-n-shoot.jpeg\"",
    "\"../word-guess-game/assets/images/film-camera.jpeg\"",
    "\"../word-guess-game/assets/images/digital-camera.jpeg\"",
    "\"../word-guess-game/assets/images/canvas-prints.jpeg\"",
    "\"../word-guess-game/assets/images/one-hour-photo.jpeg\"",
    "\"../word-guess-game/assets/images/polaroid-photo.jpeg\"",
    "\"../word-guess-game/assets/images/dark-room.jpeg\"",
    "\"../word-guess-game/assets/images/negative.jpeg\"",
    "\"../word-guess-game/assets/images/bokeh.jpeg\"",
    "\"../word-guess-game/assets/images/soft-focus.jpeg\"",
    "\"../word-guess-game/assets/images/gaussian-blur.jpeg\"",
    "\"../word-guess-game/assets/images/clone-stamp.jpeg\"",
    "\"../word-guess-game/assets/images/touch-up.jpg\"",
    "\"../word-guess-game/assets/images/drone-photography.jpeg\"",
];

// Objects: Game Tallies

var Win = 0,
    Loss = 0,
    Guesses = 12;


// Objects: HTML References

var uGuess = document.getElementById("userGuess"),
    wTally = document.getElementById("winsTally"),
    gLeft = document.getElementById("guessesLeft"),
    hWord = document.getElementById("hangWord"),
    inst = document.getElementById("instructions"),
    gWord = document.getElementById("guessed-word-bucket"),
    wImage = document.getElementById("wordImage"),
    bImage = document.getElementById("background"),
    hText = document.getElementById("hintText");

// Object: The Computer's Word Choice

var curWord = wordBank[Math.floor(Math.random() * wordBank.length)];

// console.log(curWord);

//This is the Initial Background Image:

bImage.innerHTML = "<img id=\"hintBackground\" src = \"../word-guess-game/assets/images/connectwork.png\">";

// Initalize Function: This creates a function to push "under lines" to each letter position, and retain the hyphens.

function letterStart() {
    for ( var j = 0, k = 0; j = curWord.charAt(k); j++, k++ ) {
        guessedRight.push(" _ ");
        letterKeys.push(curWord.charCodeAt(k));
        if ( curWord.charCodeAt(k) === 45 ) {
            guessedRight.splice(k, 1, " - ")
        };
    };
};

// Run letterStart Function: Set up the initial display.

letterStart();

// console.log(letterKeys);

// Refresh Function: Refresh the Current Word and clear the intial arrays. This is also checks that the computer does not chose a word twice.

function gameRefresh() {
    curWord = wordBank[Math.floor(Math.random() * wordBank.length)],
    guessedRight = [],
    letterKeys = [],
    guessedLetters = [],
    letterStart();
    if ( guessedWords.indexOf(curWord) !== -1 ) {
        gameRefresh();
    };
    // console.log(curWord);
};




// Event: This is the User's Guess

document.onkeyup = function(event) {
    var usGuess = event.key;

    //Start with hiding the instructions and showing "hint:"

    inst = document.getElementById("instructions").style.visibility = "hidden";
    hText.innerHTML = "<p id=\"hintW\"> hint: </p>";

    // Event Object: Grab the Keycode for the user Guess

    var key = event.which || event.keycode;

    // Logic: First, Check if usGuess is a lowercase letter

    if ( (key >= 65 ) && (key <= 90 ) ) {

        // Logic: Then, check to see if the keycode of the userGuess meets the keycode of any of the current word's characters.

        for ( var m = 0; m < letterKeys.length; m++ ) {
            if ( key === ( letterKeys[m] - 32 ) ) {
                guessedRight.splice(m, 1, usGuess);
            } 

            // Logic: If none of the keycodes match, push the guess to the guessedLetters array and reduce the guesses remaining.There are checks here to prevent the guessedRight letter from being stored in the guessedLetter array, but it happens anyway.

            else if ( ( letterKeys.includes(key) === false ) && ( guessedLetters.indexOf(" " + usGuess) === -1 ) && ( guessedRight.includes(usGuess) === false ) ) {
                guessedLetters.push(" " + usGuess),
                Guesses--;
            }
        };

        

    };

    // Logic: If the user guesses the word correctly, refresh the game

    if ( guessedRight.includes(" _ ") == false ) {
        Win++,
        Guesses = 12,
        guessedWords.push(curWord),
        gameRefresh();
    }
    
    // Logic: If the user runs out of guesses, refresh the game
    
    if ( Guesses === 0 ) {
        Guesses = 12, 
        gameRefresh();
    };

    


    // Objects: More Variable References to connect outcomes of the game back to the index page

    var guessR = guessedLetters.toString().toUpperCase(),
        hang = guessedRight.join(" ").toUpperCase(),
        gW = guessedWords.join(", ").toUpperCase();

    // This is the display of the game progress, results, and image updates

    hWord.innerText = "Guess this word: " + hang;
    uGuess.innerText = "Your Guesses So Far: " + guessR;
    wTally.textContent = "Wins: " + Win;
    gLeft.textContent = "Guesses Left: " + Guesses;
    gWord.innerText = "Correctly Guessed Words: " + gW;
    wImage.innerHTML = "<img " + "id=\"hint\" " + "src =" + imageArray[wordBank.indexOf(curWord)] + ">";
    bImage.innerHTML = "<img " + "id=\"hintBackground\" " + "src =" + imageArray[wordBank.indexOf(curWord)] + ">";

    //Console Logs for testing purposes:

    // console.log("this is a text log");
    // console.log(key);
    // console.log(guessR);
    // console.log("guessedLetters" + guessedLetters);
    // console.log("guessedRight" + guessedRight);
};