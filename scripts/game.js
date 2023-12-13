let game = {
    currentGame: [],
    score: 0,
    playerMoves: [],
    // array of choices to generate our random move selection
    choices: ["button1", "button2", "button3", "button4"],
};

//the newGame function will  initially reset the score to zero,  
//empty the computer sequence and  empty the player's moves array too;
function newGame() {
    game.currentGame = [];
    game.playerMoves = [];
    game.score = 0;
    showScore();
}

function showScore() {
    document.getElementById("score").innerText = game.score;
}

// we're exporting more than one object and function from this file, 
// so we need to put them in curly braces.
module.exports = { game, newGame, showScore }; 