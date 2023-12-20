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
    // add the event listeners to the newGame function
    // check the  attribute of each circle 
    for (let circle of document.getElementsByClassName("circle")) {
        // and if the attribute is set to false, then add event listener 'click'
        if (circle.getAttribute("data-listener") !== "true") {
            // add an event listener to the html element of class 'circle'
            // pass in the 'click' event object as 'e'
            circle.addEventListener("click", (e) => {
                // get click targets ID (depending on which circle we click it'll be button1, button2, button3 or button4
                // and store that ID in move
                let move = e.target.getAttribute("id");
                // call lightsOn with move, that will illuminate the correct circle
                lightsOn(move);
                // push that 'move' into game.playerMoves 
                game.playerMoves.push(move);
                // call 'playerTurn'  function
                playerTurn();
            });
            // after adding the event listener, sets the data listener attribute on the circle to 'true'
            circle.setAttribute("data-listener", "true");
            /* 
            If we want to confirm that an event listener has been attached to the DOM,  
            we need to use something like global state or an attribute to do it. 
            */
        }
    }
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

function playerTurn() {
    let i = game.playerMoves.length - 1;
    if (game.currentGame[i] === game.playerMoves[i]) {
        if (game.currentGame.length === game.playerMoves.length) {
            game.score++;
            showScore();
            addTurn();
        }
    } else {
        alert("Wrong move!");
        newGame();
    }
}


// we're exporting more than one object and function from this file, 
// so we need to put them in curly braces.
module.exports = { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn }; 