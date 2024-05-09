let incrementX  = 0,
    incrementY  = 0,
    incrementX2 = 0,
    incrementY2 = 0,
    posX        = 290,
    posY        = 290,
    speedX      = 0,
    speedY      = 0,
    posX2       = 100,
    posY2       = 100,
    speedX2     = 0,
    speedY2     = 0;

const FRAME_RATE = 60,
      square1    = {},
      square2    = {},
      keyState   = {};

const Walker1 = document.querySelector('#walker'),
      Walker2 = document.querySelector('#walker2'),
      Board   = document.querySelector('#board');

let WalkerSize  = 50,
    BoardHeight = 500;

let Board_Aspect = "1:1";

const Aspects = {
	"16:10": 1.6,
	"16:9" : 16 / 9,
	"1:1"  : 1,
	"21:9" : 21 / 9,
	"32:9" : 32 / 9,
	"3:2"  : 1.5,
	"4:2"  : 2,
	"4:3"  : 4 / 3,
	"5:3"  : 5 / 3,
	"5:4"  : 1.25
};

const offsetsizeee = BoardHeight - WalkerSize;

setInterval(async ()=>{

	Board.style.height = `${BoardHeight}px`;
	Board.style.width = `${BoardHeight * Aspects[Board_Aspect]}px`;

	Walker1.style.transform = `scale(${WalkerSize / 50})`;
	Walker2.style.transform = `scale(${WalkerSize / 50})`;

	posX += speedX, posX2 += speedX2;
	posY += speedY, posY2 += speedY2;

	Walker1.style.left = posX, Walker1.style.top = posY;
	Walker2.style.left = posX2, Walker2.style.top = posY2;

	posX = (posX + offsetsizeee) % offsetsizeee, posX2 = (posX2 + offsetsizeee) % offsetsizeee;
	posY = (posY + offsetsizeee) % offsetsizeee, posY2 = (posY2 + offsetsizeee) % offsetsizeee;

	document.querySelector('.not-tagged').style.background = '#0F0';
	document.querySelector('.tagged').style.background = '#F00';
	document.querySelector('.tagged').appendChild(document.querySelector('#tag-indicator'));

	Board.appendChild(Walker1), Board.appendChild(Walker2);

	square1.left = posX, square2.left = posX2;
	square1.right = posX + WalkerSize, square2.right = posX2 + WalkerSize;
	square1.top = posY, square2.top = posY2;
	square1.bottom = posY + WalkerSize, square2.bottom = posY2 + WalkerSize;

	if (square1.left<square2.right && square1.right>square2.left && (square1.top<square2.bottom && square1.bottom>square2.top)) {
		document.querySelector('.not-tagged').className = 'tagging';
		document.querySelector('.tagged').className = 'not-tagged';
		document.querySelector('.tagging').className = 'tagged';

		square1.left<square2.left && (posX -= WalkerSize, posX2 += WalkerSize);
		square1.right>square2.right && (posX += WalkerSize, posX2 -= WalkerSize);
		square1.top<square2.top && (posY -= WalkerSize, posY2 += WalkerSize);
		square1.bottom>square2.bottom && (posY += WalkerSize, posY2 -= WalkerSize);
	}
}, 1000 / FRAME_RATE);

document.addEventListener('keydown', ({key})=>!keyState[key] && (keyState[key] = true, updateDirection(key, true)));
document.addEventListener('keyup', ({key})=>keyState[key] && (keyState[key] = false, updateDirection(key, false)));

Math.random()<0.5
&& (Walker1.classList.toggle("tagged"), Walker2.classList.toggle("not-tagged"))
|| (Walker2.classList.toggle("tagged"), Walker1.classList.toggle("not-tagged"));

async function updateDirection(key, isKeyDown) {
	let v = isKeyDown ? 5 : -5;

	key==='ArrowLeft' && (incrementX -= v), key==='a' && (incrementX2 -= v);
	key==='ArrowRight' && (incrementX += v), key==='d' && (incrementX2 += v);
	key==='ArrowUp' && (incrementY -= v), key==='w' && (incrementY2 -= v);
	key==='ArrowDown' && (incrementY += v), key==='s' && (incrementY2 += v);

	speedX = incrementX, speedY = incrementY;
	speedX2 = incrementX2, speedY2 = incrementY2;
}

document.querySelector('#board-aspect').addEventListener('change', ({target})=>Board_Aspect = target.value);
document.querySelector('#board-size').addEventListener('mousemove', ({target})=>BoardHeight = target.value);
document.querySelector('#board-size').addEventListener('mouseup', ({target})=>BoardHeight = target.value);