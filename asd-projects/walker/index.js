$(document).ready(runProgram);

const height = 50,width = 50;
const {A,D,DOWN,LEFT,RIGHT,S,UP,W} = {LEFT: 37,UP: 38,RIGHT: 39,DOWN: 40,W: 87,A: 65,S: 83,D: 68};
let posX    = 290,
	 posY    = 290,
	 speedX  = 0,
	 speedY  = 0,
	 posX2   = 100,
	 posY2   = 100,
	 speedX2 = 0,
	 speedY2 = 0;

function runProgram() {
  let interval    = setInterval(newFrame,18),
		square1     = {},
		square2     = {},
		tagBeginner = Math.random();

  $(document).on('keydown',handleKeyDown);
  $(document).on('keyup',handleKeyUp);

  tagBeginner<0.5 && ($('#walker').attr('class','tagged'), $('#walker2').attr('class','not-tagged'));
  tagBeginner>=0.5 && ($('#walker2').attr('class','tagged'), $('#walker').attr('class','not-tagged'));

  function newFrame() {
	 repositionGameItem();
	 redrawGameItem();

	 posX<0 && (posX = 390);
	 posX>390 && (posX = 0);
	 posY<0 && (posY = 390);
	 posY>390 && (posY = 0);
	 posX2<0 && (posX2 = 390);
	 posX2>390 && (posX2 = 0);
	 posY2<0 && (posY2 = 390);
	 posY2>390 && (posY2 = 0);

	 $('.tagged').css('background','red');
	 $('.not-tagged').css('background','lime');

	 square1.left = posX, square1.right = posX + width;
	 square1.top = posY, square1.bottom = posY + height;
	 square2.left = posX2, square2.right = posX2 + width;
	 square2.top = posY2, square2.bottom = posY2 + height;

	 if (square1.left<square2.right && square1.right>square2.left && (square1.top<square2.bottom && square1.bottom>square2.top)) {
		$('.not-tagged').attr('class','tagging'), $('.not-tagged').removeAttr('class','not-tagged');
		$('.tagged').attr('class','not-tagged'), $('.tagged').removeAttr('class','tagged');
		$('.tagging').attr('class','tagged'), $('.tagging').removeAttr('class','tagging');
		square2.left>square1.left && (posX -= 50, posX2 += 50);
		square1.right>square2.right && (posX += 50, posX2 -= 50);
		square2.top>square1.top && (posY -= 50, posY2 += 50);
		square1.bottom>square2.bottom && (posY += 50, posY2 -= 50);
	 }
  }

  function handleKeyDown({which}) {
	 which===LEFT && (speedX = -5);
	 which===RIGHT && (speedX = 5);
	 which===UP && (speedY = -5);
	 which===DOWN && (speedY = 5);
	 which===A && (speedX2 = -5);
	 which===D && (speedX2 = 5);
	 which===W && (speedY2 = -5);
	 which===S && (speedY2 = 5);
  }

  function handleKeyUp({which}) {
	 which===LEFT && (speedX += 5);
	 which===RIGHT && (speedX -= 5);
	 which===UP && (speedY += 5);
	 which===DOWN && (speedY -= 5);
	 which===A && (speedX2 += 5);
	 which===D && (speedX2 -= 5);
	 which===W && (speedY2 += 5);
	 which===S && (speedY2 -= 5);
  }

  function repositionGameItem() {posX += speedX, posY += speedY, posX2 += speedX2, posY2 += speedY2}

  function redrawGameItem() {
	 $('#walker').css('left',posX), $('#walker2').css('left',posX2);
	 $('#walker').css('top',posY), $('#walker2').css('top',posY2);
  }

  const endGame = () => {clearInterval(interval), $(document).off()};
}