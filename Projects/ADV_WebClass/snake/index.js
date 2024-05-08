let snake = {
	    body: [],
	    head: [],
	    tail: []
    },
    apple = {
	    element: [],
	    row    : [],
	    column : []
    },
    score = 0,
    KEY   = {
	    LEFT : 37,
	    UP   : 38,
	    RIGHT: 39,
	    DOWN : 40
    },
    updateInterval,
    activeKey;


$('body').on('keydown', function (event) {
	if (event.which===KEYS.W) p1PaddleObj.speedY = -10;
	if (event.which===KEYS.S) p1PaddleObj.speedY = 10;
	if (event.which===KEYS.UP) p2PaddleObj.speedY = -10;
	if (event.which===KEYS.DOWN) p2PaddleObj.speedY = 10;
});

init();

function init() {
	snake.body = [];

	let snakeSquare = {
		element  : [],
		row      : [],
		column   : [],
		direction: []
	};

	snakeSquare.element = $('<div>').addClass('snake').appendTo($('#Board'));

	snakeSquare.row = 10;
	snakeSquare.column = 10;

	snakeSquare.element.css('left', snakeSquare.column * 20 + 20);
	snakeSquare.element.css('top', snakeSquare.row * 20 + 20);

	if (snake.body.length===0) {snakeSquare.element.attr('id', 'snake-head');}

	snake.body.push(snakeSquare);
	snake.tail = snakeSquare;
	snake.head = snake.body[0];

	apple.element = $('<div>').addClass('apple').appendTo($('#Board'));

	let randomPosition = getRandomAvailablePosition();

	apple.row = randomPosition.row;
	apple.column = randomPosition.column;

	apple.element.css('left', apple.column * 20 + 20);
	apple.element.css('top', apple.row * 20 + 20);

	updateInterval = setInterval(update, 100);
}

function update() {
	for (let i = snake.body.length - 1; i>0; i--) {
		snake.body[i].direction = snake.body[i - 1].direction;
		snake.body[i].row = snake.body[i - 1].row;
		snake.body[i].column = snake.body[i - 1].column;
		snake.body[i].element.css('left', snake.body[i].column * 20 + 20);
		snake.body[i].element.css('top', snake.body[i].row * 20 + 20);
	}

	if (activeKey===KEY.LEFT) {snake.head.direction = "left";}
	if (activeKey===KEY.RIGHT) {snake.head.direction = "right";}
	if (activeKey===KEY.UP) {snake.head.direction = "up";}
	if (activeKey===KEY.DOWN) {snake.head.direction = "down";}


	if (snake.head.direction==='left') {snake.head.column -= 1;}
	if (snake.head.direction==='right') {snake.head.column += 1;}
	if (snake.head.direction==='down') {snake.head.row += 1;}
	if (snake.head.direction==='up') {snake.head.row -= 1;}
	snake.head.element.css('left', snake.head.column * 20 + 20);
	snake.head.element.css('top', snake.head.row * 20 + 20);

	if (snake.head.row<0 || snake.head.column<0 || snake.head.row>20 || snake.head.column>20 || hasCollidedWithSnake()) {
		clearInterval(updateInterval);

		$('#Board').empty();

		$('#highScore').text(`High Score: ${calculateHighScore()}`);
		$('#score').text("Score: 0");
		score = 0;

		setTimeout(init, 500);
	}

	if (apple.row===snake.head.row ? apple.column===snake.head.column : false) {
		score++;
		$('#score').text("Score: " + score);

		apple.element.remove();
		apple.element = $('<div>').addClass('apple').appendTo($('#Board'));

		let randomPosition = getRandomAvailablePosition();

		apple.row = randomPosition.row;
		apple.column = randomPosition.column;

		apple.element.css('left', apple.column * 20 + 20);
		apple.element.css('top', apple.row * 20 + 20);

		if (snake.tail.direction==='left') {
			column = snake.tail.column + 1;
			row = snake.tail.row
		}
		if (snake.tail.direction==='right') {
			column = snake.tail.column - 1;
			row = snake.tail.row
		}
		if (snake.tail.direction==='up') {
			row = snake.tail.row + 1;
			column = snake.tail.column
		}
		if (snake.tail.direction==='down') {
			row = snake.tail.row - 1;
			column = snake.tail.column
		}

		let snakeSquare = {
			element  : [],
			row      : [],
			column   : [],
			direction: []
		};

		snakeSquare.element = $('<div>').addClass('snake').appendTo($('#Board'));

		snakeSquare.row = row;
		snakeSquare.column = column;

		snakeSquare.element.css('left', snakeSquare.column * 20 + 20);
		snakeSquare.element.css('top', snakeSquare.row * 20 + 20);

		if (snake.body.length===0) {snakeSquare.element.attr('id', 'snake-head');}

		snake.body.push(snakeSquare);
		snake.tail = snakeSquare;
	}

}

function hasCollidedWithSnake() {
	for (let j = snake.body.length - 1; j>0; j--) if (snake.head.row===snake.body[j].row && snake.head.column===snake.body[j].column) return true;
	return false;
}

function getRandomAvailablePosition() {
	let spaceIsAvailable, randomPosition = {};
	while (!spaceIsAvailable) {
		randomPosition.column = Math.floor(Math.random() * 20);
		randomPosition.row = Math.floor(Math.random() * 20);
		spaceIsAvailable = true;

		for (let k = snake.body.length - 1; k>=0; k--) if (randomPosition.row===snake.body[k].row && randomPosition.column===snake.body[k].column) spaceIsAvailable = false;
	}

	return randomPosition;
}

function calculateHighScore() {
	let highScore = sessionStorage.getItem("highScore") || 0;

	if (score>highScore) {
		sessionStorage.setItem("highScore", score);
		highScore = score;
		alert("New High Score!");
	}

	return highScore;
}