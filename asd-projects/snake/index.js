const board            = $('#board'),
      scoreElement     = $('#score'),
      highScoreElement = $('#highScore'),
      ROWS             = 20,
      COLUMNS          = 20,
      SQUARE_SIZE      = 20,
      KEY              = {
        LEFT : 37,
        UP   : 38,
        RIGHT: 39,
        DOWN : 40,
      };
let snake = {
      body: [],
      head: [],
      tail: [],
    },
    apple = {
      element: [],
      row    : [],
      column : [],
    },
    score = 0,
    updateInterval,
    activeKey;

$('body').on('keydown',handleKeyDown);
init();

function init() {
  snake.body = [];

  makeSnakeSquare(10,10);
  snake.head = snake.body[0];

  makeApple();

  updateInterval = setInterval(update,100);
}

function update() {
  moveSnake();

  if (hasHitWall() || hasCollidedWithSnake()) {endGame();}
  if (hasCollidedWithApple()) {handleAppleCollision();}
}

function moveSnake() {
  for (let i = snake.body.length - 1; i>0; i--) {
    let snakeSquare     = snake.body[i],
        nextSnakeSquare = snake.body[i - 1],
        nextRow         = nextSnakeSquare.row,
        nextColumn      = nextSnakeSquare.column;
    snakeSquare.direction = nextSnakeSquare.direction;
    snakeSquare.row = nextRow;
    snakeSquare.column = nextColumn;
    repositionSquare(snakeSquare);
  }

  checkForNewDirection();

  switch (snake.head.direction) {
    case 'left':
      snake.head.column -= 1;
      break;
    case 'right':
      snake.head.column += 1;
      break;
    case 'down':
      snake.head.row += 1;
      break;
    case 'up':
      snake.head.row -= 1;
      break;
    default:
      break;
  }
  repositionSquare(snake.head);
}

function checkForNewDirection() {
  switch (activeKey) {
    case KEY.LEFT:
      snake.head.direction = snake.head.direction==='right' ? snake.head.direction : 'left';
      break;
    case KEY.RIGHT:
      snake.head.direction = snake.head.direction==='left' ? snake.head.direction : 'right';
      break;
    case KEY.UP:
      snake.head.direction = snake.head.direction==='down' ? snake.head.direction : 'up';
      break;
    case KEY.DOWN:
      snake.head.direction = snake.head.direction==='up' ? snake.head.direction : 'down';
      break;
    default:
      break;
  }
}

function hasCollidedWithApple() {return apple.row===snake.head.row && apple.column===snake.head.column}

function handleAppleCollision() {
  score++;
  scoreElement.text(`Apples: ${score}`);
  apple.element.remove();
  makeApple();

  let row    = snake.tail.row + 0,
      column = snake.tail.column + 0;

  switch (snake.tail.direction) {
    case 'left':
      column++;
      break;
    case 'right':
      column--;
      break;
    case 'up':
      row--;
      break;
    case 'down':
      row++;
      break;
  }
  makeSnakeSquare(row,column);
}

function hasCollidedWithSnake() {
  for (let j = snake.body.length - 1; j>0; j--) {
    if (snake.head.row===snake.body[j].row && snake.head.column===snake.body[j].column) {
      return true
    }
  }
  return false;
}

function hasHitWall() {
  return snake.head.row<0 || snake.head.column<0 || snake.head.row>ROWS || snake.head.column>COLUMNS;
}

function endGame() {
  clearInterval(updateInterval);

  board.empty();

  highScoreElement.text(`High Score: ${calculateHighScore()}`);
  scoreElement.text('Score: 0');
  score = 0;

  setTimeout(init,500);
}

function makeSnakeSquare(row,column) {
  let snakeSquare = {
    element  : [],
    row      : [],
    column   : [],
    direction: [],
  };

  snakeSquare.element = $('<div>').addClass('snake').appendTo(board);

  snakeSquare.row = row;
  snakeSquare.column = column;

  repositionSquare(snakeSquare);

  if (snake.body.length===0) {snakeSquare.element.attr('id','snake-head');}

  snake.body.push(snakeSquare);
  snake.tail = snakeSquare;
}

function repositionSquare(square) {
  let squareElement                 = square.element,
      row                           = square.row,
      column = square.column,buffer = 20;
  squareElement.css('left',SQUARE_SIZE * column + buffer);
  squareElement.css('top',SQUARE_SIZE * row + buffer);
}

function makeApple() {
  apple.element = $('<div>').addClass('apple').appendTo(board);

  let randomPosition = getRandomAvailablePosition();

  apple.row = randomPosition.row;
  apple.column = randomPosition.column;

  repositionSquare(apple);
}

function getRandomAvailablePosition() {
  let spaceIsAvailable,randomPosition = {};
  while (!spaceIsAvailable) {
    randomPosition.column = Math.floor(COLUMNS * Math.random());
    randomPosition.row = Math.floor(ROWS * Math.random());
    spaceIsAvailable = true;

    for (let k = snake.body.length - 1; k>=0; k--) {
      if (randomPosition.row===snake.body[k].row && randomPosition.column===snake.body[k].column) {
        spaceIsAvailable = false
      }
    }
  }
  return randomPosition;
}

function handleKeyDown(event) {activeKey = event.which;}

function calculateHighScore() {
  let highScore = sessionStorage.getItem('highScore') || 0;
  if (score>highScore) {
    sessionStorage.setItem('highScore',score);
    highScore = score;
  }
  return highScore;
}