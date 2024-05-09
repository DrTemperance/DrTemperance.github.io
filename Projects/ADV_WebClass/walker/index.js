let Inc_X = 0, Inc_Y = 0, Inc_X2 = 0, Inc_Y2 = 0, Pos_X = 290, Pos_Y = 290, Pos_X2 = 100, Pos_Y2 = 100, Delt_X = 0, Delt_Y = 0, Delt_X2 = 0, Delt_Y2 = 0, timer;

const Sq_1 = {}, Sq_2 = {}, kState = {};

const Walker1 = document.querySelector('#walker'), Walker2 = document.querySelector('#walker2'), Board = document.querySelector('#board');

let WalkerSize = 50, Board_Height = 500;

let Board_Aspect = "1:1";

const Aspects = {
	"16:10": 1.6, "16:9": 16 / 9, "1:1": 1, "21:9": 21 / 9, "32:9": 32 / 9, "3:2": 1.5, "4:2": 2, "4:3": 4 / 3, "5:3": 5 / 3, "5:4": 1.25
};

// EventListeners //

document.addEventListener('keydown', ({key})=>!kState[key] && (kState[key] = true, Direction_Update(key, true)));
document.addEventListener('keyup', ({key})=>kState[key] && (kState[key] = false, Direction_Update(key, false)));
window.addEventListener('resize', ()=>{
	{
		document.querySelector('#board-size').max = (window.innerWidth - 50) / Aspects[Board_Aspect];
		document.querySelector('#board-size').value = Math.min(document.querySelector('#board-size').value, window.innerWidth - 50);
		Board_Height = document.querySelector('#board-size').value;
	}
	SetBoard();
	{
		Debounce_(Aspect_Check, 250);
		Debounce_(repositionWalkers, 250);
	}
});
document.querySelector('#board-aspect').addEventListener('change', ({target})=>Board_Aspect = target.value);
document.querySelector('#board-size').addEventListener('mousemove', ({target})=>Board_Height = target.value);
document.querySelector('#board-size').addEventListener('mouseup', ({target})=>Board_Height = target.value);
document.querySelector('#reset-walkers').addEventListener('click', repositionWalkers());

// Functions //
setInterval(async ()=>{
	SetBoard();
	Board.appendChild(Walker1), Board.appendChild(Walker2);

	Walker1.style.transform = `scale(${WalkerSize / 50})`;
	Walker2.style.transform = `scale(${WalkerSize / 50})`;

	Pos_X += Delt_X, Pos_X2 += Delt_X2;
	Pos_Y += Delt_Y, Pos_Y2 += Delt_Y2;

	Walker1.style.left = Pos_X, Walker1.style.top = Pos_Y;
	Walker2.style.left = Pos_X2, Walker2.style.top = Pos_Y2;

	Pos_X = (Pos_X + (Board_Height - WalkerSize)) % (Board_Height - WalkerSize);
	Pos_Y = (Pos_Y + (Board_Height - WalkerSize)) % (Board_Height - WalkerSize);

	Pos_X2 = (Pos_X2 + (Board_Height - WalkerSize)) % (Board_Height - WalkerSize);
	Pos_Y2 = (Pos_Y2 + (Board_Height - WalkerSize)) % (Board_Height - WalkerSize);

	document.querySelector('.not-tagged').style.background = '#0F0';
	document.querySelector('.tagged').style.background = '#F00';
	document.querySelector('.tagged').appendChild(document.querySelector('#tag-indicator'));


	Sq_1.left = Pos_X, Sq_2.left = Pos_X2;
	Sq_1.right = Pos_X + WalkerSize, Sq_2.right = Pos_X2 + WalkerSize;
	Sq_1.top = Pos_Y, Sq_2.top = Pos_Y2;
	Sq_1.bottom = Pos_Y + WalkerSize, Sq_2.bottom = Pos_Y2 + WalkerSize;

	if (Sq_1.left<Sq_2.right && Sq_1.right>Sq_2.left && (Sq_1.top<Sq_2.bottom && Sq_1.bottom>Sq_2.top)) {
		new Audio('Audio/Tag.mp3').play();
		document.querySelector('.not-tagged').className = 'tagging';
		document.querySelector('.tagged').className = 'not-tagged';
		document.querySelector('.tagging').className = 'tagged';

		Sq_1.left<Sq_2.left && (Pos_X -= WalkerSize, Pos_X2 += WalkerSize);
		Sq_1.right>Sq_2.right && (Pos_X += WalkerSize, Pos_X2 -= WalkerSize);
		Sq_1.top<Sq_2.top && (Pos_Y -= WalkerSize, Pos_Y2 += WalkerSize);
		Sq_1.bottom>Sq_2.bottom && (Pos_Y += WalkerSize, Pos_Y2 -= WalkerSize);
	}
}, 1000 / 60);

function repositionWalkers() {
	const padding = Board_Height / 8;

	Pos_X = padding;
	Pos_Y = padding;

	Pos_X2 = Board_Height * Aspects[Board_Aspect] - (WalkerSize + padding);
	Pos_Y2 = Board_Height - WalkerSize - padding;

	Walker1.style.left = `${Pos_X}px`;
	Walker1.style.top = `${Pos_Y}px`;

	Walker2.style.left = `${Pos_X2}px`;
	Walker2.style.top = `${Pos_Y2}px`;
}

async function Direction_Update(key, isKeyDown) {
	let v = isKeyDown ? 5 : -5;

	key==='ArrowLeft' && (Inc_X -= v), key==='a' && (Inc_X2 -= v);
	key==='ArrowRight' && (Inc_X += v), key==='d' && (Inc_X2 += v);
	key==='ArrowUp' && (Inc_Y -= v), key==='w' && (Inc_Y2 -= v);
	key==='ArrowDown' && (Inc_Y += v), key==='s' && (Inc_Y2 += v);

	Delt_X = Inc_X, Delt_Y = Inc_Y;
	Delt_X2 = Inc_X2, Delt_Y2 = Inc_Y2;
}

async function Aspect_Check() {for (let [key, r] of Object.entries(Aspects)) document.querySelector(`option[value="${key}"]`).disabled = Board_Height * r>=window.innerWidth;}

function Debounce_(func, delay) {return ()=>{clearTimeout(timer), timer = setTimeout(()=>func.apply(this, arguments), delay)}}

// Init //

Math.random()<0.5 && (Walker1.classList.toggle("tagged"), Walker2.classList.toggle("not-tagged")) || (Walker2.classList.toggle("tagged"), Walker1.classList.toggle("not-tagged"));

Aspect_Check();
repositionWalkers();
SetBoard();

function SetBoard() {
	Board.style.height = `${Board_Height}px`;
	Board.style.width = `${Board_Height * Aspects[Board_Aspect]}px`;
}