const height = width = 50;
let posX    = posY = 290,
	 posX2   = posY2 = 100,
	 speedX  = speedY = 0,
	 speedX2 = speedY2 = 0;

const runProgram = () => {
  let interval    = setInterval(newFrame,18),
		square1     = {},
		square2     = {},
		tagBeginner = Math.random();

  $(document).on('keydown',async ({key: k}) => {
	 k==='ArrowLeft' && (speedX = -5);
	 k==='ArrowRight' && (speedX = 5);
	 k==='ArrowUp' && (speedY = -5);
	 k==='ArrowDown' && (speedY = 5);
	 k==='a' && (speedX2 = -5);
	 k==='d' && (speedX2 = 5);
	 k==='w' && (speedY2 = -5);
	 k==='s' && (speedY2 = 5);
  }).on('keyup',async ({key: k}) => {
	 k==='ArrowLeft' && (speedX += 5);
	 k==='ArrowRight' && (speedX -= 5);
	 k==='ArrowUp' && (speedY += 5);
	 k==='ArrowDown' && (speedY -= 5);
	 k==='a' && (speedX2 += 5);
	 k==='d' && (speedX2 -= 5);
	 k==='w' && (speedY2 += 5);
	 k==='s' && (speedY2 -= 5);
  });

  tagBeginner<0.5 && ($('#walker').attr('class','tagged'), $('#walker2').attr('class','not-tagged'));
  tagBeginner>=0.5 && ($('#walker2').attr('class','tagged'), $('#walker').attr('class','not-tagged'));

  function newFrame() {
	 posX += speedX, posY += speedY, posX2 += speedX2, posY2 += speedY2;
	 $('#walker').css('left',posX), $('#walker2').css('left',posX2);
	 $('#walker').css('top',posY), $('#walker2').css('top',posY2);

	 posX = posX>390 ? 0 : posX<=0 ? 390 : posX;
	 posY = posY>390 ? 0 : posY<=0 ? 390 : posY;
	 posX2 = posX2>390 ? 0 : posX2<=0 ? 390 : posX2;
	 posY2 = posY2>390 ? 0 : posY2<=0 ? 390 : posY2;

	 $('.tagged').css('background','#F00').css('border',`2px solid #a00`);
	 $('.not-tagged').css('background','#0F0').css('border',`2px solid #0a0`);

	 square1.left = posX, square1.right = posX + width;
	 square1.top = posY, square1.bottom = posY + height;
	 square2.left = posX2, square2.right = posX2 + width;
	 square2.top = posY2, square2.bottom = posY2 + height;

	 if (!(posX<posX2 + width && posX + width>posX2 && (posY<posY2 + height && posY + height>posY2))) {return}
	 $('.not-tagged').attr('class','tagging'), $('.not-tagged').removeAttr('class','not-tagged');
	 $('.tagged').attr('class','not-tagged'), $('.tagged').removeAttr('class','tagged');
	 $('.tagging').attr('class','tagged'), $('.tagging').removeAttr('class','tagging');
	 square2.left>square1.left && (posX -= 50, posX2 += 50);
	 square1.right>square2.right && (posX += 50, posX2 -= 50);
	 square2.top>square1.top && (posY -= 50, posY2 += 50);
	 square1.bottom>square2.bottom && (posY += 50, posY2 -= 50);
  }

  function handleKeyDown({key}) {
	 key==='ArrowLeft' && (speedX = -5);
	 key==='ArrowRight' && (speedX = 5);
	 key==='ArrowUp' && (speedY = -5);
	 key==='ArrowDown' && (speedY = 5);
	 key==='a' && (speedX2 = -5);
	 key==='d' && (speedX2 = 5);
	 key==='w' && (speedY2 = -5);
	 key==='s' && (speedY2 = 5);
  }

  const endGame = () => {clearInterval(interval), $(document).off()}
};

$(document).ready(runProgram);