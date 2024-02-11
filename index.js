var words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
]


function updateDisplay () {
document.getElementById("remaining-guesses").innerText=numGuess
document.getElementById ("word-to-guess").innerText = guessingWord.join("")
document.getElementById("incorrect-letters").innerText= guessedLetters.join(" ")
document.getElementById("previous-word").innerText = previousWord
document.getElementById("wins").innerText = wins
document.getElementById("losses").innerText = losses
}


const maxGuess = 10
    var pauseGame = false
    
    var guessedLetters = []
    var guessingWord = []
    var wordToMatch =[]
    var numGuess
    var wins = 0
    var losses = 0
    var previousWord
    
    resetGame()

    // Wait for key press
    document.addEventListener("keypress", function(event) {
      let key = event
        // Make sure key pressed is an alpha character
        if (isAlpha(event.key) && !pauseGame) {
            checkForLetter(event.key.toLowerCase())
        }
        console.log(event)
    }
  );

    // Game Functions
    // Check if letter is in word & process
    function checkForLetter(letter) {
        var foundLetter = false
        numGuess--
        // Search string for letter
        for (var i=0, j= wordToMatch.length; i<j; i++) {
            if (letter === wordToMatch[i]) {
                guessingWord[i] = letter
                foundLetter = true
                // If guessing word matches random word
                if (guessingWord.join("") === wordToMatch) {
                    // Increment # of wins
                    wins++
                    pauseGame = true
                    setTimeout(resetGame,5000)
                }
            }
            updateDisplay()
        }
      
        

        if (!foundLetter) {
            // Check if inccorrect guess is already on the list
            if (!guessedLetters.includes(letter)) {
                // Add incorrect letter to guessed letter list
                guessedLetters.push(letter)
                // Decrement the number of remaining guesses
            }
            if (numGuess === 0) {
                // Display word before reseting game
                losses++
                guessingWord = wordToMatch
                pauseGame = true
                setTimeout(resetGame, 5000)
            }
        }
        updateDisplay()

      }

    // Check in keypressed is between A-Z or a-z
    function isAlpha (ch){
        return /^[A-Z]$/i.test(ch);
    }

    function resetGame() {
        numGuess = maxGuess
        pauseGame = false
        previousWord= wordToMatch

        // Get a new word
        wordToMatch = words[Math.floor(Math.random() * words.length)].toLowerCase()
        console.log(wordToMatch)

        // Reset word arrays
        guessedLetters = []
        guessingWord = []

        // Reset the guessed word
        for (var i=0, j=wordToMatch.length; i < j; i++){
            // Put a space instead of an underscore between multi word "words"
            if (wordToMatch[i] === " ") {
                guessingWord.push(" ")
            } else {
                guessingWord.push("_")
            }
        }

        // Update the Display
        updateDisplay()
    }



