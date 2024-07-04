let ROWS        = 20,
    COLUMNS     = 20,
    SQUARE_SIZE = 20,
    Score       = 0,
    Apple       = {element: [], row: [], column: []},
    Snake       = {body: [], head: [], tail: []},
    updateInterval, activeKey;
document.body.addEventListener('keydown', e=>activeKey = e.key);

const Init = ()=>{
	Snake.body = [];

	Snake_Construct(10, 10);
	Snake.head = Snake.body[0];

	Apple_Construct();

	updateInterval = setInterval(Update, 100);
};

function Update () {
	for (let I = Snake.body.length - 1; I>0; I--) {
		let SnakeSquare = Snake.body[I];

		SnakeSquare.direction = Snake.body[I - 1].direction;
		SnakeSquare.row = Snake.body[I - 1].row;
		SnakeSquare.column = Snake.body[I - 1].column;
		Move_El(SnakeSquare);
	}

	if ((activeKey==="a" || activeKey==="ArrowLeft") && Snake.head.direction!=='right') Snake.head.direction = "left";
	if ((activeKey==="d" || activeKey==="ArrowRight") && Snake.head.direction!=='left') Snake.head.direction = "right";
	if ((activeKey==="w" || activeKey==="ArrowUp") && Snake.head.direction!=='down') Snake.head.direction = "up";
	if ((activeKey==="s" || activeKey==="ArrowDown") && Snake.head.direction!=='up') Snake.head.direction = "down";

	if (Snake.head.direction==='left') Snake.head.column -= 1;
	if (Snake.head.direction==='right') Snake.head.column += 1;
	if (Snake.head.direction==='down') Snake.head.row += 1;
	if (Snake.head.direction==='up') Snake.head.row -= 1;
	Move_El(Snake.head);

	(Snake.head.row<0 || Snake.head.column<0 || Snake.head.row>ROWS || Snake.head.column>COLUMNS || Snake_Collide()) && Game_End();

	if (Apple.row===Snake.head.row ? Apple.column===Snake.head.column : !1) {
		Score++;
		document.querySelector('#Score').textContent = `Score: ${Score}`;

		Apple.element.remove();
		Apple_Construct();

		let Row    = Snake.tail.row,
		    Column = Snake.tail.column;

		if (Snake.tail.direction==='left') {
			Column = Snake.tail.column + 1;
			Row = Snake.tail.row;
		}
		if (Snake.tail.direction==='right') {
			Column = Snake.tail.column - 1;
			Row = Snake.tail.row;
		}
		if (Snake.tail.direction==='up') {
			Row = Snake.tail.row + 1;
			Column = Snake.tail.column;
		}
		if (Snake.tail.direction==='down') {
			Row = Snake.tail.row - 1;
			Column = Snake.tail.column;
		}

		Snake_Construct(Row, Column);
	}

}

function Snake_Collide () {
	for (let J = Snake.body.length - 1; J>0; J--) if (Snake.head.row===Snake.body[J].row && Snake.head.column===Snake.body[J].column) return !0;
	return !1;
}

function Game_End () {
	clearInterval(updateInterval);

	document.querySelector('#Board').innerHTML = '';
	document.querySelector('#HighScore').textContent = `High Score: ${Calc_High()}`;
	document.querySelector('#Score').textContent = "Score: 0";
	Score = 0;

	setTimeout(Init, 500);
}

function Snake_Construct (row, column) {
	let SnakeSquare = {element: [], row: [], column: [], direction: []};

	SnakeSquare.element = document.createElement('div');
	SnakeSquare.element.classList.add('snake');
	document.querySelector('#board').appendChild(SnakeSquare.element);

	SnakeSquare.row = row;
	SnakeSquare.column = column;

	Move_El(SnakeSquare);

	if (Snake.body.length===0) SnakeSquare.element.id = 'snake-head';

	Snake.body.push(SnakeSquare);
	Snake.tail = SnakeSquare;
}

function Move_El ({column, element, row}) {
	element.style.left = `${column * SQUARE_SIZE + 20}px`;
	element.style.top = `${row * SQUARE_SIZE + 20}px`;
}

function Apple_Construct () {
	Apple.element = document.createElement('div');
	Apple.element.classList.add('apple');
	document.getElementById('board').appendChild(Apple.element);

	Apple.row = Rand_Pos().row;
	Apple.column = Rand_Pos().column;

	Move_El(Apple);
}

function Rand_Pos () {
	let SpaceAvailable, RandomPosition = {};

	while (!SpaceAvailable) {
		RandomPosition.column = Math.floor(Math.random() * COLUMNS);
		RandomPosition.row = Math.floor(Math.random() * ROWS);
		SpaceAvailable = !0;

		for (let k = Snake.body.length - 1; k>=0; k--) if (RandomPosition.row===Snake.body[k].row && RandomPosition.column===Snake.body[k].column) SpaceAvailable = !1;
	}

	return RandomPosition;
}

function Calc_High () {
	let HighScore = sessionStorage.getItem("HighScore") || 0;
	Score>HighScore && (sessionStorage.setItem("HighScore", Score), HighScore = Score);
	return HighScore.toString()
}

Init();