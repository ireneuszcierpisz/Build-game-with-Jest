/**
 * @jest-environment jsdom
 */
//added jsdom environment block for Jest 27


// import modules from game.js
const { game, newGame, showScore, addTurn, lightsOn } = require("../game");


// ! build the tests first  and create the code incrementally
// beforeAll runs before all of the tests
beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

describe("game object contains correct keys", () => {
    test("score key exists", () => {
        expect("score" in game).toBe(true);
    });
    test("currentGame key exists", () => {
        expect("currentGame" in game).toBe(true);
    });
    test("playerMoves key exists", () => {
        expect("playerMoves" in game).toBe(true);
    });
    test("choices key exists", () => {
        expect("choices" in game).toBe(true);
    });
    // choices array should contain the IDs of the four buttons
    test("choices contain correct ids", () => {
        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
    });
});

describe("newGame works correctly", () => {
    // we want to set up the game state with some fake values to  see if the newGame function resets them.
    // beforeAll runs before all of the tests
    beforeAll(() => {
        game.score = 42;
        game.playerMoves = ["button1", "button2"];
        game.currentGame = ["button1", "button2"];
        document.getElementById("score").innerText = "42";
        newGame();  // there is an addTurn() called at the end of the newGame() function
    });
    test("should set game score to zero", () => {
        expect(game.score).toEqual(0);
    });
    test("should display 0 for the element with id of score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
    test("should clear the player moves array", () => {
        expect(game.playerMoves.length).toBe(0);
    });

    // test("should clear the computer sequence array", () => {
    //     expect(game.currentGame.length).toBe(0);
    // });
    // if addTurn() is called at the end of the  newGame() function, then tests need to be change.

    // Instead of testing to see if the currentGame sequence is empty,
    // we check if it contains one element(which is the new turn just added)
    test("should add one move to the computer's game array", () => {
        expect(game.currentGame.length).toBe(1);
    });
});

describe("gameplay works correctly", () => {
    // beforeEach runs before each test is run, so  we're going to reset the state each time.
    beforeEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });
    test("addTurn adds a new turn to the game", () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    test("should add correct class to light up the buttons", () => {
        // gets first  element in the currentGame array,  
        // because we know there'll always  be at least one element in there
        let button = document.getElementById(game.currentGame[0]);
        // calls the lightsOn function with that same ID
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain("light");
    });
});




/*
codeany@ea4a8227eeda:/workspaces/Build-game-with-Jest$ npm test
> build-game-with-jest@1.0.0 test
> jest
 PASS  scripts/tests/game.test.js (7.042 s)
  game object contains correct keys
    ✓ score key exists (4 ms)
    ✓ currentGame key exists
    ✓ playerMoves key exists
    ✓ choices key exists (1 ms)
    ✓ choices contain correct ids (3 ms)
  newGame works correctly
    ✓ should set game score to zero (1 ms)
    ✓ should display 0 for the element with id of score
    ✓ should clear the player moves array (1 ms)
    ✓ should clear the computer sequence array (1 ms)
*/
