let snake = {body: [], head: [], tail: []}, apple = {element: [], row: [], column: []};

let Score = 0;

let ROWS = 20, COLUMNS = 20, SQUARE_SIZE = 20;

let updateInterval, activeKey;

document.body.addEventListener('keydown', e=>activeKey = e.key);

init();

function init() {
	snake.body = [];

	Snake_Construct(10, 10);
	snake.head = snake.body[0];

	Apple_Construct();

	updateInterval = setInterval(Update, 100);
}

function Update() {
	Snake_Move();

	if (snake.head.row<0 || snake.head.column<0 || snake.head.row>ROWS || snake.head.column>COLUMNS || Snake_Collide()) {Game_End();}

	if (apple.row===snake.head.row ? apple.column===snake.head.column : !1) {
		Score++;
		document.querySelector('#Score').textContent(`Score: ${Score}`);

		apple.element.remove();
		Apple_Construct();

		let row = snake.tail.row, column = snake.tail.column;

		if (snake.tail.direction==='left') column = snake.tail.column + 1, row = snake.tail.row;
		if (snake.tail.direction==='right') column = snake.tail.column - 1, row = snake.tail.row;
		if (snake.tail.direction==='up') row = snake.tail.row + 1, column = snake.tail.column;
		if (snake.tail.direction==='down') row = snake.tail.row - 1, column = snake.tail.column;

		Snake_Construct(row, column);
	}

}

function Snake_Move() {

	for (let i = snake.body.length - 1; i>0; i--) {
		let snakeSquare = snake.body[i];

		snakeSquare.direction = snake.body[i - 1].direction;
		snakeSquare.row = snake.body[i - 1].row, snakeSquare.column = snake.body[i - 1].column;
		MoveEl(snakeSquare);
	}

	if ((activeKey==="a" || activeKey==="ArrowLeft") && snake.head.direction!=='right') snake.head.direction = "left";
	if ((activeKey==="d" || activeKey==="ArrowRight") && snake.head.direction!=='left') snake.head.direction = "right";
	if ((activeKey==="w" || activeKey==="ArrowUp") && snake.head.direction!=='down') snake.head.direction = "up";
	if ((activeKey==="s" || activeKey==="ArrowDown") && snake.head.direction!=='up') snake.head.direction = "down";

	if (snake.head.direction==='left') snake.head.column -= 1;
	if (snake.head.direction==='right') snake.head.column += 1;
	if (snake.head.direction==='down') snake.head.row += 1;
	if (snake.head.direction==='up') snake.head.row -= 1;
	MoveEl(snake.head);
}

function Snake_Collide() {
	for (let j = snake.body.length - 1; j>0; j--) if (snake.head.row===snake.body[j].row && snake.head.column===snake.body[j].column) return !0;
	return !1;
}

function Game_End() {
	clearInterval(updateInterval);

	document.querySelector('#Board').innerHTML = '';
	document.querySelector('#HighScore').textContent(`High Score: ${CalcHS()}`);
	document.querySelector('#Score').textContent("Score: 0");
	Score = 0;

	setTimeout(init, 500);
}

function Snake_Construct(row, column) {
	let snakeSquare = {element: [], row: [], column: [], direction: []};

	snakeSquare.element = document.createElement('div');
	snakeSquare.element.classList.add('snake');
	document.querySelector('#board').appendChild(snakeSquare.element);

	snakeSquare.row = row, snakeSquare.column = column;

	MoveEl(snakeSquare);

	if (snake.body.length===0) snakeSquare.element.id = 'snake-head';

	snake.body.push(snakeSquare);
	snake.tail = snakeSquare;
}

function MoveEl(square) {
	square.element.style.left = `${square.column * SQUARE_SIZE + 20}px`;
	square.element.style.top = `${square.row * SQUARE_SIZE + 20}px`;
}

function Apple_Construct() {
	apple.element = document.createElement('div'), apple.element.classList.add('apple');
	document.getElementById('board').appendChild(apple.element);

	apple.row = RandPos().row, apple.column = RandPos().column;

	MoveEl(apple);
}

function RandPos() {
	let SpaceAvailable, randomPosition = {};

	while (!SpaceAvailable) {
		randomPosition.column = Math.floor(Math.random() * COLUMNS);
		randomPosition.row = Math.floor(Math.random() * ROWS);
		SpaceAvailable = !0;

		for (let k = snake.body.length - 1; k>=0; k--) if (randomPosition.row===snake.body[k].row && randomPosition.column===snake.body[k].column) SpaceAvailable = !1;
	}

	return randomPosition;
}

function CalcHS() {
	let HighScore = sessionStorage.getItem("HighScore") || 0;
	if (Score>HighScore) sessionStorage.setItem("HighScore", Score), HighScore = Score;
	return HighScore;
}