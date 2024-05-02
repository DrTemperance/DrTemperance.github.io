$(document).ready(()=>{
	let p1ScoreVar = 0, p2ScoreVar = 0;

	let winner;

	const gameItem = id=>{
		let object = {};
		object.id = id;
		object.x = parseFloat($(id).css("left"));
		object.y = parseFloat($(id).css("top"));
		object.width = $(id).width();
		object.height = $(id).height();
		object.speedX = 0, object.speedY = 0;
		return object
	};

	let Orig_BallY = parseFloat($('#ball').css("top")),
	    Orig_BallX = parseFloat($('#ball').css("left"));

	$(document).on("keydown", ({key})=>{
		switch (key) {
			case 'W':
				gameItem('#p1Paddle').speedY = -10;
			case 'S':
				gameItem('#p1Paddle').speedY = 10;
			case 'UP':
				gameItem('#p2Paddle').speedY = -10;
			case 'DOWN':
				gameItem('#p2Paddle').speedY = 10
		}
	});
	$(document).on("keyup", ({key})=>{
		switch (key) {
			case 'W':
				gameItem('#p1Paddle').speedY += 10;
			case 'S':
				gameItem('#p1Paddle').speedY -= 10;
			case 'UP':
				gameItem('#p2Paddle').speedY += 10;
			case 'DOWN':
				gameItem('#p2Paddle').speedY -= 10;
		}
	});

	let interval = setInterval(()=>{
		gameItem('#p1Paddle').y += gameItem('#p1Paddle').speedY;
		gameItem('#p2Paddle').y += gameItem('#p2Paddle').speedY;
		if (gameItem('#p1Paddle').y<0) {gameItem('#p1Paddle').y = 0}
		if (gameItem('#p1Paddle').y>$("#Board").height() - gameItem('#p1Paddle').height) {gameItem('#p1Paddle').y = $("#Board").height() - gameItem('#p1Paddle').height}
		if (gameItem('#p2Paddle').y<0) {gameItem('#p2Paddle').y = 0}
		if (gameItem('#p2Paddle').y>$("#Board").height() - gameItem('#p2Paddle').height) {gameItem('#p2Paddle').y = $("#Board").height() - gameItem('#p2Paddle').height}

		$(gameItem('#p1Paddle').id).css("top", gameItem('#p1Paddle').y);
		$(gameItem('#p2Paddle').id).css("top", gameItem('#p2Paddle').y);

		gameItem('#ball').x += gameItem('#ball').speedX;
		gameItem('#ball').y += gameItem('#ball').speedY;

		if (gameItem('#ball').y<0) {gameItem('#ball').speedY *= -1}
		if (gameItem('#ball').y>$("#Board").height() - gameItem('#ball').height) {gameItem('#ball').speedY *= -1}

		if (gameItem('#ball').x<0) {
			p2ScoreVar += 1;
			gameItem('#ball').x = Orig_BallX;
			gameItem('#ball').y = Orig_BallY;
			gameItem('#ball').speedX = 5 * (Math.random()>0.5 ? -1 : 1);
			gameItem('#ball').speedY = 5 * (Math.random()>0.5 ? -1 : 1);
		} else if (gameItem('#ball').x>$("#Board").width() - gameItem('#ball').width) {
			p1ScoreVar += 1;
			gameItem('#ball').x = Orig_BallX;
			gameItem('#ball').y = Orig_BallY;
			gameItem('#ball').speedX = 5 * (Math.random()>0.5 ? -1 : 1);
			gameItem('#ball').speedY = 5 * (Math.random()>0.5 ? -1 : 1);
		}

		if (gameItem('#p1Paddle').x<gameItem('#ball').x + gameItem('#ball').width && gameItem('#p1Paddle').x + gameItem('#p1Paddle').width>gameItem('#ball').x && (gameItem('#p1Paddle').y<gameItem('#ball').y + gameItem(
			 '#ball').height && gameItem('#p1Paddle').y + gameItem('#p1Paddle').height>gameItem('#ball').y)) {
			gameItem('#ball').speedX *= -1;
			gameItem('#ball').speedX += 0.5;
		}
		if (gameItem('#p2Paddle').x<gameItem('#ball').x + gameItem('#ball').width && gameItem('#p2Paddle').x + gameItem('#p2Paddle').width>gameItem('#ball').x && (gameItem('#p2Paddle').y<gameItem('#ball').y + gameItem(
			 '#ball').height && gameItem('#p2Paddle').y + gameItem('#p2Paddle').height>gameItem('#ball').y)) {
			gameItem('#ball').speedX *= -1;
			gameItem('#ball').speedX -= 0.5;
		}

		$(gameItem('#ball').id).css("top", gameItem('#ball').y);
		$(gameItem('#ball').id).css("left", gameItem('#ball').x);

		$("#p1Score").text(p1ScoreVar);
		$("#p2Score").text(p2ScoreVar);

		if (p1ScoreVar>=7) {
			winner = "Player 1";
			clearInterval(interval);

			$(document).off();

			alert(`${winner} Won!!!\nRefresh Page to Play Again!!!`)
		}
		if (p2ScoreVar>=7) {
			winner = "Player 2";
			clearInterval(interval);

			$(document).off();

			alert(`${winner} Won!!!\nRefresh Page to Play Again!!!`)
		}
	}, 1000 / 60);
	gameItem('#ball').speedX = 5 * (Math.random()>0.5 ? -1 : 1);
	gameItem('#ball').speedY = 5 * (Math.random()>0.5 ? -1 : 1);
});