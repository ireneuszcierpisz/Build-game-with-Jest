let game = {
    currentGame: [],
    score: 0,
    // adds turnNumber as a default key (used in the showTurns function) with the value of zero
    turnNumber: 0,
    playerMoves: [],
    // array of choices to generate random move selection
    choices: ["button1", "button2", "button3", "button4"],
};

//the newGame function will  initially reset the score to zero,  
//empty the computer sequence and  empty the player's moves array too;
function newGame() {
    game.currentGame = [];
    game.playerMoves = [];
    game.score = 0;
    showScore();
    addTurn();
}

// adds a randomly  selected button ID to the sequence
function addTurn() {
    game.playerMoves = [];
    game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))]);
    showTurns();
}

function showScore() {
    document.getElementById("score").innerText = game.score;
}

function lightsOn(circ) {
    document.getElementById(circ).classList.add("light");
    setTimeout(function () {
        document.getElementById(circ).classList.remove("light");
    }, 400);
}

// showTurns needs to step through the currentGame array and turn on the appropriate light then turn it off again
// that is the computer sequence that the player will  try to follow
function showTurns() {
    // adds a new key and value to the global state by creating turnNumber
    // (it must be added to the global state too, as a default key with the value of zero)
    game.turnNumber = 0;
    // The setInterval() method calls a function at specified intervals (ms) until clearInterval() is called, or the window is closed.
    let turns = setInterval(function () {
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        // if turnNumber is equal or over the length of current game array then the sequence is finished so we can clear interval
        if (game.turnNumber >= game.currentGame.length) {
            clearInterval(turns);
        }
    }, 800);
}


// we're exporting more than one object and function from this file, 
// so we need to put them in curly braces.
module.exports = { game, newGame, showScore, addTurn, lightsOn, showTurns }; 