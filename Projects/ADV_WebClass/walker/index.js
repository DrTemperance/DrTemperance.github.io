$(document).ready(()=>{
	let square1 = {};
	let square2 = {};

	let interval = setInterval(()=>{
		posX += speedX;
		posY += speedY;
		posX2 += speedX2;
		posY2 += speedY2;
		$("#walker").css("left", posX);
		$("#walker").css("top", posY);
		$("#walker2").css("left", posX2);
		$("#walker2").css("top", posY2);

		if (posX<0) {posX = 390}
		if (posX>390) {posX = 0}
		if (posY<0) {posY = 390}
		if (posY>390) {posY = 0}
		if (posX2<0) {posX2 = 390}
		if (posX2>390) {posX2 = 0}
		if (posY2<0) {posY2 = 390}
		if (posY2>390) {posY2 = 0}

		$(".tagged").css("background", "red");
		$(".not-tagged").css("background", "lime");
		$("#tag-indicator").appendTo(".tagged");

		square1.left = posX;
		square1.right = posX + width;
		square1.top = posY;
		square1.bottom = posY + height;
		square2.left = posX2;
		square2.right = posX2 + width;
		square2.top = posY2;
		square2.bottom = posY2 + height;

		if (square1.left<square2.right && square1.right>square2.left && (square1.top<square2.bottom && square1.bottom>square2.top)) {
			document.querySelector(".not-tagged").classList.toggle("tagging", "not-tagged");
			document.querySelector(".tagged").classList.toggle("not-tagged", "tagged");
			document.querySelector(".tagging").classList.toggle("tagged", "tagging");
			if (square1.left<square2.left) {
				posX -= 50;
				posX2 += 50
			}
			if (square1.right>square2.right) {
				posX += 50;
				posX2 -= 50
			}
			if (square1.top<square2.top) {
				posY -= 50;
				posY2 += 50
			} else if (square1.bottom>square2.bottom) {
				posY += 50;
				posY2 -= 50
			}
		}
	}, 1000 / 60);
	document.addEventListener('keydown', ({which})=>{
		if (which===KEY.LEFT) {speedX = -5}
		if (which===KEY.UP) {speedY = -5}
		if (which===KEY.RIGHT) {speedX = 5}
		if (which===KEY.DOWN) {speedY = 5}
		if (which===KEY.A) {speedX2 = -5}
		if (which===KEY.W) {speedY2 = -5}
		if (which===KEY.D) {speedX2 = 5}
		if (which===KEY.S) {speedY2 = 5}
	});
	document.addEventListener('keyup', ({which})=>{
		if (which===KEY.LEFT) {speedX += 5}
		if (which===KEY.UP) {speedY += 5}
		if (which===KEY.RIGHT) {speedX -= 5}
		if (which===KEY.DOWN) {speedY -= 5}
		if (which===KEY.A) {speedX2 += 5}
		if (which===KEY.W) {speedY2 += 5}
		if (which===KEY.D) {speedX2 -= 5}
		if (which===KEY.S) {speedY2 -= 5}
	});

	if (Math.random()<0.5) {
		document.querySelector("#walker").classList = ("class", "tagged");
		document.querySelector("#walker2").classList = ("class", "not-tagged")
	} else {
		document.querySelector("#walker2").classList = ("class", "tagged");
		document.querySelector('#walker').classList = ("class", "not-tagged");
	}

	function endGame() {
		clearInterval(interval);
		$(document).off();
	}
});

const KEY = {LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, W: 87, A: 65, S: 83, D: 68};

let posX = 290, posY = 290;
let speedX = 0, speedY = 0;

let posX2 = 100, posY2 = 100;
let speedX2 = 0, speedY2 = 0;

let height = 50, width = 50;