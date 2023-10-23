const board            = document.getElementById('board'),
		scoreElement     = document.getElementById('score'),
		highScoreElement = document.getElementById('highScore'),
		ROWS             = 20,
		COLUMNS          = 20,
		SQUARE_SIZE      = 20,
		handleKeyDown    = event => activeKey = event.key;
let snake = {body: [],head: [],tail: [],direction: null},
	 apple = {element: [],row: [],column: []},
	 score = 0,
	 updateInterval,
	 activeKey;

document.addEventListener('keydown',handleKeyDown);
init();

function init() {snake.body = [], makeSnakeSquare(10,10), snake.head = snake.body[0], makeApple(), updateInterval = setInterval(update,100)}

function update() {
  moveSnake(), (snake.head.row<0 || snake.head.column<0 || snake.head.row>ROWS || snake.head.column>COLUMNS || hasCollidedWithSnake())
					&& endGame(), apple.row===snake.head.row && apple.column===snake.head.column && handleAppleCollision()
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

  snake.head.direction==='left' && snake.head.column--;
  snake.head.direction==='right' && snake.head.column++;
  snake.head.direction==='down' && snake.head.row++;
  snake.head.direction==='up' && snake.head.row--;

  repositionSquare(snake.head);
}

function checkForNewDirection() {
  activeKey!=='ArrowLeft' && activeKey!=='a' || (snake.head.direction = snake.head.direction==='right' ? snake.head.direction : 'left')
  activeKey!=='ArrowRight' && activeKey!=='d' || (snake.head.direction = snake.head.direction==='left' ? snake.head.direction : 'right')
  activeKey!=='ArrowUp' && activeKey!=='w' || (snake.head.direction = snake.head.direction==='down' ? snake.head.direction : 'up')
  activeKey!=='ArrowDown' && activeKey!=='s' || (snake.head.direction = snake.head.direction==='up' ? snake.head.direction : 'down')
}

function handleAppleCollision() {
  score++;
  scoreElement.textContent = `Apples: ${score}`;
  apple.element.remove();
  makeApple();
  let row = parseInt(snake.tail.row),column = parseInt(snake.tail.column);

  snake.tail.direction==='left' && column++;
  snake.tail.direction==='right' && column--;
  snake.tail.direction==='up' && row--;
  snake.tail.direction==='down' && row++;

  makeSnakeSquare(row,column);
}

function hasCollidedWithSnake() {
  for (let j = snake.body.length - 1; j>0; j--) {
	 if (snake.head.row===snake.body[j].row && snake.head.column===snake.body[j].column) {return !0}
  }
  return !1
}

function endGame() {
  clearInterval(updateInterval);
  board.innerHTML = '';
  highScoreElement.textContent = `High Score: ${calculateHighScore()}`;
  scoreElement.textContent = `Apples: 0`;
  score = 0;
  setTimeout(init,500);
}

function makeSnakeSquare(row,column) {
  const snakeSquare = {
	 element  : document.createElement('div'),
	 row,column,
	 direction: [],
  };
  snakeSquare.element.classList.add('snake');
  board.appendChild(snakeSquare.element);
  repositionSquare(snakeSquare);
  snake.body.length===0 && (snakeSquare.element.id = 'snake-head');
  snake.body.push(snakeSquare);
  snake.tail = snakeSquare;
}

function repositionSquare(square) {
  const {element,row,column} = square,buffer = 20;
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
  let spaceIsAvailable,randomPosition = {};
  do {
	 randomPosition.column = Math.floor(COLUMNS * Math.random());
	 randomPosition.row = Math.floor(ROWS * Math.random());
	 spaceIsAvailable = snake.body.every(o => randomPosition.row!==o.row || randomPosition.column!==o.column);
  } while (!spaceIsAvailable);
  return randomPosition;
}

function calculateHighScore() {
  let highScore = Math.max(sessionStorage.getItem('highScore') || 0,score);
  sessionStorage.setItem('highScore',highScore);
  return highScore;
}

highScoreElement.textContent = `High Score: ${calculateHighScore()}`;