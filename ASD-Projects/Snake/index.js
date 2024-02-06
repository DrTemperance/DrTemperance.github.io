const Rows = Columns = 20;
let Snake = { Body: [], Head: [], tail: [], Direction: null },
    Apple = { element: [], row: [], column: [] },
    Score = 0,
    UpdateInterval,
    ActiveKey;

document.addEventListener('keydown', ({ key }) => ActiveKey = key);
Init();

async function Init() {
	Snake.Body = [], CreateSnake(10, 10), Snake.Head = Snake.Body[0], CreateApple(), UpdateInterval = setInterval(Update, 100)
}

async function Update() {MoveSnake(), (Snake.Head.row<0 || Snake.Head.column<0 || Snake.Head.row>Rows || Snake.Head.column>Columns || HasCollidedWithSnake()) && EndGame(), Apple.row===Snake.Head.row && Apple.column===Snake.Head.column && AppleCollision()}

async function MoveSnake() {
	for (let I = Snake.Body.length - 1; I>0; I--) {
		Snake.Body[I].Direction = Snake.Body[I - 1].Direction;
		Snake.Body[I].row = Snake.Body[I - 1].row;
		Snake.Body[I].column = Snake.Body[I - 1].column;
		RepositionSquare(Snake.Body[I]);
	}

	ActiveKey!=='ArrowLeft' && ActiveKey!=='a' || (Snake.Head.Direction = Snake.Head.Direction==='right' ? Snake.Head.Direction : 'left');
	ActiveKey!=='ArrowRight' && ActiveKey!=='d' || (Snake.Head.Direction = Snake.Head.Direction==='left' ? Snake.Head.Direction : 'right');
	ActiveKey!=='ArrowUp' && ActiveKey!=='w' || (Snake.Head.Direction = Snake.Head.Direction==='down' ? Snake.Head.Direction : 'up');
	ActiveKey!=='ArrowDown' && ActiveKey!=='s' || (Snake.Head.Direction = Snake.Head.Direction==='up' ? Snake.Head.Direction : 'down');

	Snake.Head.Direction==='left' && Snake.Head.column--, Snake.Head.Direction==='right' && Snake.Head.column++;
	Snake.Head.Direction==='down' && Snake.Head.row++, Snake.Head.Direction==='up' && Snake.Head.row--;
	RepositionSquare(Snake.Head);
}

function AppleCollision() {
	Score++;
	document.getElementById('Score').textContent = `Apples: ${Score}`;
	Apple.element.remove(), CreateApple();
	sessionStorage.setItem('HighScore', Math.max(sessionStorage.getItem('HighScore') || 0, Score));

	CreateSnake((Snake.tail.Direction==='up' || Snake.tail.Direction==='down') && parseInt(Snake.tail.row),
	            (Snake.tail.Direction==='left' || Snake.tail.Direction==='right') && parseInt(Snake.tail.column));
}

function HasCollidedWithSnake() {
	for (let n = Snake.Body.length - 1; n>0; n--) { if (Snake.Head.row===Snake.Body[n].row && Snake.Head.column===Snake.Body[n].column) {return true}}
	return false
}

function EndGame() {
	clearInterval(UpdateInterval);
	document.getElementById('Board').textContent = '';
	document.getElementById('HighScore').textContent = `High Score: ${Math.max(sessionStorage.getItem('HighScore') || 0, Score)}`;
	document.getElementById('Score').textContent = 'Apples: 0';
	Score = 0;
	setTimeout(Init, 500);
}

function CreateSnake(row, column) {
	const snakeSquare = { element: document.createElement('div'), row, column, Direction: [] };
	snakeSquare.element.classList.add('snake');
	document.getElementById('Board').appendChild(snakeSquare.element);
	RepositionSquare(snakeSquare);
	Snake.Body.length===0 && (snakeSquare.element.id = 'snake-head');
	Snake.Body.push(snakeSquare);
	Snake.tail = snakeSquare;
}

function RepositionSquare(sq) {sq.element.style.left = `${20 * sq.column + 20}`, sq.element.style.top = `${20 * sq.row + 20}`}

function CreateApple() {
	Apple.element = document.createElement('div'), Apple.element.classList.add('Apple');
	document.getElementById('Board').appendChild(Apple.element);
	Apple.row = RandomPosition().row, Apple.column = RandomPosition().column;
	RepositionSquare(Apple);
}

function RandomPosition() {
	let RandCoord = { column: NaN, row: NaN };
	do {
		RandCoord.column = Math.round(Columns * Math.random()), RandCoord.row = Math.round(Rows * Math.random());
	} while (!Snake.Body.every(o => RandCoord.row!==o.row || RandCoord.column!==o.column));
	return RandCoord;
}

document.getElementById('HighScore').textContent = `High Score: ${Math.max(sessionStorage.getItem('HighScore') || 0, Score)}`;