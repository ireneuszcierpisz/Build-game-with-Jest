let game = {
    currentGame: [],
    score: 0,
    playerMoves: [],
    // array of choices to generate our random move selection
    choices: ["button1", "button2", "button3", "button4"],
};


module.exports = { game }; //because we'll be exporting more than  
//one object and function from this file, so we need to put them in curly braces.