const ROWS = COLUMNS = 20;
let snake = {body: [],head: [],tail: [],direction: null},
	 apple = {element: [],row: [],column: []},
	 score = 0,
	 updateInterval,
	 activeKey;

document.addEventListener('keydown',({key}) => activeKey = key);
init();

function init() {snake.body = [], makeSnakeSquare(10,10), snake.head = snake.body[0], makeApple(), updateInterval = setInterval(update,100)}

function update() {
  moveSnake(), (snake.head.row<0 || snake.head.column<0 || snake.head.row>ROWS || snake.head.column>COLUMNS || hasCollidedWithSnake())
					&& endGame(), apple.row===snake.head.row && apple.column===snake.head.column && handleAppleCollision()
}

function moveSnake() {
  for (let i = snake.body.length - 1; i>0; i--) {
	 snake.body[i].direction = snake.body[i - 1].direction;
	 snake.body[i].row = snake.body[i - 1].row;
	 snake.body[i].column = snake.body[i - 1].column;
	 repositionSquare(snake.body[i]);
  }

  activeKey!=='ArrowLeft' && activeKey!=='a' || (snake.head.direction = snake.head.direction==='right' ? snake.head.direction : 'left');
  activeKey!=='ArrowRight' && activeKey!=='d' || (snake.head.direction = snake.head.direction==='left' ? snake.head.direction : 'right');
  activeKey!=='ArrowUp' && activeKey!=='w' || (snake.head.direction = snake.head.direction==='down' ? snake.head.direction : 'up');
  activeKey!=='ArrowDown' && activeKey!=='s' || (snake.head.direction = snake.head.direction==='up' ? snake.head.direction : 'down');

  snake.head.direction==='left' && snake.head.column--, snake.head.direction==='right' && snake.head.column++;
  snake.head.direction==='down' && snake.head.row++, snake.head.direction==='up' && snake.head.row--;
  repositionSquare(snake.head);
}

function handleAppleCollision() {
  score++;
  document.getElementById('score').textContent = `Apples: ${score}`;
  apple.element.remove(), makeApple();
  sessionStorage.setItem('highScore',Math.max(sessionStorage.getItem('highScore') || 0,score));

  makeSnakeSquare(
	  (snake.tail.direction==='up' || snake.tail.direction==='down') && parseInt(snake.tail.row),
	  (snake.tail.direction==='left' || snake.tail.direction==='right') && parseInt(snake.tail.column),
  );
}

function hasCollidedWithSnake() {
  for (let j = snake.body.length - 1; j>0; j--) {if (snake.head.row===snake.body[j].row && snake.head.column===snake.body[j].column) {return !0}}
  return !1
}

function endGame() {
  clearInterval(updateInterval);
  document.getElementById('board').textContent = '';
  document.getElementById('highScore').textContent = `High Score: ${Math.max(sessionStorage.getItem('highScore') || 0,score)}`;
  document.getElementById('score').textContent = `Apples: 0`;
  score = 0;
  setTimeout(init,500);
}

function makeSnakeSquare(row,column) {
  const snakeSquare = {
	 element  : document.createElement('div'),row,column,
	 direction: [],
  };
  snakeSquare.element.classList.add('snake');
  document.getElementById('board').appendChild(snakeSquare.element);
  repositionSquare(snakeSquare);
  snake.body.length===0 && (snakeSquare.element.id = 'snake-head');
  snake.body.push(snakeSquare);
  snake.tail = snakeSquare;
}

function repositionSquare(square) {
  square.element.style.left = `${20 * square.column + 20}`;
  square.element.style.top = `${20 * square.row + 20}`;
}

function makeApple() {
  apple.element = document.createElement('div'), apple.element.classList.add('apple');
  document.getElementById('board').appendChild(apple.element);
  apple.row = getRandomAvailablePosition().row;
  apple.column = getRandomAvailablePosition().column;
  repositionSquare(apple);
}

function getRandomAvailablePosition() {
  let spaceIsAvailable,randomPosition = {};
  do {
	 randomPosition.column = Math.round(COLUMNS * Math.random());
	 randomPosition.row = Math.round(ROWS * Math.random());
	 spaceIsAvailable = snake.body.every(o => randomPosition.row!==o.row || randomPosition.column!==o.column);
  } while (!spaceIsAvailable);
  return randomPosition;
}

document.getElementById('highScore').textContent = `High Score: ${Math.max(sessionStorage.getItem('highScore') || 0,score)}`;