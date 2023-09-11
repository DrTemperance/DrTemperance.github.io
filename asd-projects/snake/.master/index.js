/* global $, sessionStorage*/

////////////////////////////////////////////////////////////////////////////////
///////////////////////// VARIABLE DECLARATIONS ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// HTML jQuery Objects
var board = $('#board');
var scoreElement = $('#score');
var highScoreElement = $('#highScore');

// game variables
var snake = {};
var apple = {};
var score = 0;

// interval variable required for stopping the update function when the game ends
var updateInterval;

// variable to keep track of the key (keycode) last pressed by the user
var activeKey;

// Constant Variables
var ROWS = 20;
var COLUMNS = 20;
var SQUARE_SIZE = 20;
var KEY = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};

////////////////////////////////////////////////////////////////////////////////
////////////////////////////// GAME SETUP //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// turn on keyboard inputs
$('body').on('keydown', handleKeyDown);

// start the game
init();

function init() {
  // initialize the snake's body as an empty Array
  snake.body = [];

  // make the first snakeSquare and set it as the head
  makeSnakeSquare(10, 10);
  snake.head = snake.body[0];
  
  // initialize the first apple
  makeApple();
  
  // start update interval
  updateInterval = setInterval(update, 100);
}

////////////////////////////////////////////////////////////////////////////////
///////////////////////// PROGRAM FUNCTIONS ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/* 
 * On each update tick update each bubble's position and check for
 * collisions with the walls.
 */
function update() {
  moveSnake();

  if (hasCollidedWithApple()) {
    handleAppleCollision();
  }
  
  if (hasCollidedWithSnake() || hasHitWall()) {
    endGame();
  }
}

function moveSnake() {
  // starting at the tail, each snakeSquare moves to the (row, column) position
  // of the snakeSquare that comes before it. The head is moved separately
  for (var i = snake.body.length - 1; i >= 1; i--) {
    var snakeSquare = snake.body[i];
    var nextSnakeSquare = snake.body[i - 1];

    snakeSquare.direction = nextSnakeSquare.direction;

    snakeSquare.row = nextSnakeSquare.row;
    snakeSquare.column = nextSnakeSquare.column;

    repositionSquare(snakeSquare);
  }

  // Before moving the head, check for a new direction from keyboard input
  checkForNewDirection();

  // after the body has moved to follow the head, reposition the head
  // according to the current direction it is facing.
  if (snake.head.direction === "left") { snake.head.column--; }
  else if (snake.head.direction === "right") { snake.head.column++; }
  else if (snake.head.direction === "up") { snake.head.row--; }
  else if (snake.head.direction === "down") { snake.head.row++; }
  
  repositionSquare(snake.head);
}

function checkForNewDirection() {
  /* 
  Update snake.head.direction based on the value of activeKey.

  Only allow direction changes to take place if the new direction is
  perpendicular to the current direction
  */

  if (snake.head.direction !== "left" && snake.head.direction !== "right") {
    if (activeKey === KEY.LEFT) { 
      snake.head.direction = "left"; 
    }
    if (activeKey === KEY.RIGHT) { 
      snake.head.direction = "right"; 
    }
  }
  
  if (snake.head.direction !== "up" && snake.head.direction !== "down") {
    if (activeKey === KEY.UP) { 
      snake.head.direction = "up"; 
    }
    if (activeKey === KEY.DOWN) { 
      snake.head.direction = "down"; 
    }
  }
  console.log(snake.head.direction)
}

function hasCollidedWithApple() {
  return snake.head.row === apple.row && snake.head.column === apple.column;
}

function handleAppleCollision() {
  // increase the score and update the score DOM element
  score++;
  scoreElement.text("Score: " + score);
  
  // Remove existing Apple and create a new one
  apple.element.remove();
  makeApple();
  
  // calculate the location of the next snakeSquare based on the current
  // position and direction of the tail, then create the next snakeSquare
  var row = snake.tail.row;
  var column = snake.tail.column;
  if (snake.tail.direction === "left") { column++; }
  else if (snake.tail.direction === "right") { column--; }
  else if (snake.tail.direction === "up") { row++; }
  else if (snake.tail.direction === "down") { row--; }
  makeSnakeSquare(row, column);
}

function hasCollidedWithSnake() {
  for (var i = 1; i < snake.body.length; i++) {
    if (snake.head.row === snake.body[i].row && snake.head.column === snake.body[i].column) {
      return true;
    }
  }
}

function hasHitWall() {
  return snake.head.row > ROWS || snake.head.row < 0 || snake.head.column > COLUMNS || snake.head.column < 0;
}

function endGame() {
  // stop update function from running
  clearInterval(updateInterval);

  // clear board of all elements
  board.empty();
  
  // restart the game after 500 ms
  setTimeout(function() {
    // set score to 0
    scoreElement.text("Score: 0");
    score = 0;

    // update the highScoreElement to display the highScore
    highScoreElement.text("High Score: " + calculateHighScore());
    
    init();
    
  }, 500);

  
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/* Create an HTML element for a snakeSquare using jQuery. Then, given a row and
 * column on the board, position it on the screen. Finally, add the new 
 * snakeSquare to the snake.body Array and set a new tail.
 */
function makeSnakeSquare(row, column) {  
  var snakeSquare = {}
  
  // make the new snakeSquare HTML element and save a reference to it
  snakeSquare.element = $('<div>').addClass('snake').appendTo(board);
  
  // save references to the starting row and column values 
  snakeSquare.row = row;
  snakeSquare.column = column;

  // position of the snake on the screen
  repositionSquare(snakeSquare);
  
  // if this is the head, add the 'snake-head' id to the HTML element for unique styling
  if (snake.body.length === 0) {
    snakeSquare.element.attr('id', 'snake-head');
  }

  // add the new snakeSquare to the end of the body Array and set it as the new tail
  snake.body.push(snakeSquare);
  snake.tail = snakeSquare;
}

/* Given a gameSquare (which may be a snakeSquare or the apple), update that
 * game Square's row and column properties and then position the gameSquare on the
 * screen. 
 */
function repositionSquare(square) {
  var buffer = 20;
  
  // position the square on the screen according to the row and column
  square.element.css('left', square.column * SQUARE_SIZE + buffer);
  square.element.css('top', square.row * SQUARE_SIZE + buffer);
}

/* Create an HTML element for the apple using jQuery. Then find a random 
 * position on the board that is not occupied and position the apple there.
 */
function makeApple() {
  // make the apple jQuery Object and append it to the board
  apple.element = $('<div>').addClass('apple').appendTo(board);

  // get a random available row/column on the board 
  var randomPosition = getRandomAvailablePosition();

  // initialize the row/column properties on the Apple Object
  apple.row = randomPosition.row;
  apple.column = randomPosition.column;

  // position the apple on the screen
  repositionSquare(apple);
}

/* Returns a (row,column) Object that is not occupied by another game component 
 */
function getRandomAvailablePosition() {
  var spaceIsAvailable;
  var randomPosition = {};
  
  /* Generate random positions until one is found that doesn't overlap with the snake */
  while (!spaceIsAvailable) {
    randomPosition.column = Math.floor(Math.random() * COLUMNS);
    randomPosition.row = Math.floor(Math.random() * ROWS);
    spaceIsAvailable = true;
    
    for (var i = 0; i < snake.body.length; i++) {
      var snakeSquare = snake.body[i];
      if (snakeSquare.row === randomPosition.row && snakeSquare.column === randomPosition.column) {
        spaceIsAvailable = false;
      }
    }
  }
  
  return randomPosition;
}

/* 
event.which returns the keycode of the key that is pressed when the
keydown event occurs

The KEY Object creates a map for the Arrow Keys to their keycode:

  KEY.LEFT = 37
  KEY.UP = 38
  KEY.RIGHT = 39
  KEY.DOWN = 40
*/
function handleKeyDown(event) {
  activeKey = event.which;
  console.log(activeKey);
}

// retrieve the high score from session storage if it exists, or set it to 0
function calculateHighScore() {
  var highScore = sessionStorage.getItem("highScore") || 0;

  if (score > highScore) {
    sessionStorage.setItem("highScore", score);
    highScore = score;
    alert("New High Score!");
  }

  return highScore;s
}