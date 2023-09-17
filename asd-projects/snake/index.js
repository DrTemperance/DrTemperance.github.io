const board            = document.getElementById('board'),
      scoreElement     = document.getElementById('score'),
      highScoreElement = document.getElementById('highScore'),
      ROWS             = 20,
      COLUMNS          = 20,
      SQUARE_SIZE      = 20,
      handleKeyDown    = event => {activeKey = event.key;};
let snake = {
      body     : [],
      head     : [],
      tail     : [],
      direction: null,
    },
    apple = {
      element: [],
      row    : [],
      column : [],
    },
    score = 0,
    updateInterval,
    activeKey;

document.addEventListener('keydown',handleKeyDown);
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
  if (snake.head.row<0 || snake.head.column<0 || snake.head.row>ROWS || snake.head.column>COLUMNS || hasCollidedWithSnake()) {
    endGame();
  }
  if (apple.row===snake.head.row && apple.column===snake.head.column) {handleAppleCollision();}
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

  if (snake.head.direction==='left') {
    snake.head.column -= 1;
  } else if (snake.head.direction==='right') {
    snake.head.column += 1;
  } else if (snake.head.direction==='down') {
    snake.head.row += 1;
  } else if (snake.head.direction==='up') {
    snake.head.row -= 1;
  } else {}
  repositionSquare(snake.head);
}

function checkForNewDirection() {
  if (activeKey==='ArrowLeft' || activeKey==='a') {
    snake.head.direction = snake.head.direction==='right' ? snake.head.direction : 'left';
  } else if (activeKey==='ArrowRight' || activeKey==='d') {
    snake.head.direction = snake.head.direction==='left' ? snake.head.direction : 'right';
  } else if (activeKey==='ArrowUp' || activeKey==='w') {
    snake.head.direction = snake.head.direction==='down' ? snake.head.direction : 'up';
  } else if (activeKey==='ArrowDown' || activeKey==='s') {
    snake.head.direction = snake.head.direction==='up' ? snake.head.direction : 'down';
  }
}

function handleAppleCollision() {
  score++;
  scoreElement.textContent = `Apples: ${score}`;
  apple.element.remove();
  makeApple();
  let row    = snake.tail.row + 0,
      column = snake.tail.column + 0;

  if (snake.tail.direction==='left') {
    column++;
  } else if (snake.tail.direction==='right') {
    column--;
  } else if (snake.tail.direction==='up') {
    row--;
  } else if (snake.tail.direction==='down') {
    row++;
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

function endGame() {
  clearInterval(updateInterval);
  board.innerHTML = '';
  highScoreElement.textContent = `High Score: ${calculateHighScore()}`;
  scoreElement.textContent = 'Apples: 0';
  score = 0;
  setTimeout(init,500);
}

function makeSnakeSquare(row,column) {
  const snakeSquare = {
    element: document.createElement('div'),
    row,
    column,
    direction: [],
  };
  snakeSquare.element.classList.add('snake');
  board.appendChild(snakeSquare.element);
  repositionSquare(snakeSquare);
  if (snake.body.length===0) {
    snakeSquare.element.id = 'snake-head';
  }
  snake.body.push(snakeSquare);
  snake.tail = snakeSquare;
}

function repositionSquare(square) {
  const {element,row,column} = square;
  const buffer = 20;
  element.style.left = `${SQUARE_SIZE * column + buffer}`;
  element.style.top = `${SQUARE_SIZE * row + buffer}`;
}

function makeApple() {
  const {row,column} = getRandomAvailablePosition();
  apple.element = document.createElement('div');
  apple.element.classList.add('apple');
  board.appendChild(apple.element);
  apple.row = row;
  apple.column = column;
  repositionSquare(apple);
}

function getRandomAvailablePosition() {
  let spaceIsAvailable,
      randomPosition = {};
  do {
    randomPosition.column = Math.floor(COLUMNS * Math.random());
    randomPosition.row = Math.floor(ROWS * Math.random());
    spaceIsAvailable = snake.body.every(bodyPart => randomPosition.row!==bodyPart.row || randomPosition.column!==bodyPart.column);
  } while (!spaceIsAvailable);
  return randomPosition;
}

function calculateHighScore() {
  let highScore = Math.max(sessionStorage.getItem('highScore') || 0,score);
  sessionStorage.setItem('highScore',highScore);
  return highScore;
}

highScoreElement.textContent = `High Score: ${calculateHighScore()}`;