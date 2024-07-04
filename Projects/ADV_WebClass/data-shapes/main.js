document.querySelector('#cycle-left').addEventListener('click', ()=>{
	I = I ? I - 1 : D_Shapes.length - 1;
	Reset();
});

document.querySelector('#cycle-right').addEventListener('click', ()=>{
	I = I===D_Shapes.length - 1 ? 0 : I + 1;
	Reset();
});

const Shape = document.querySelector('#shape');

['#execute1', '#execute2', '#execute3'].forEach((button, index)=>
	                                                 document.querySelector(button).addEventListener('click', ()=>{
		                                                 let Repeat = index===2 ? D_Shapes[I].repeat + 1 : D_Shapes[I].repeat;
		                                                 Shape.style.background = `url(images/${D_Shapes[I].color}-${D_Shapes[I].shape}.png)`;
		                                                 Shape.style.backgroundSize = `${100 / Repeat}% ${100 / Repeat}%`;
		                                                 AnimDetails.displayType = index + 1;
	                                                 }));

setInterval(()=>{
	if (AnimDetails.displayType!==0) Shape.innerHTML = "";
	if (AnimDetails.displayType<2) return;
	if (AnimDetails.displayType==2) {
		switch (D_Shapes[I].goodBehavior) {
			case "bounce":
				Bounce();
				break;
			case "blink":
				Blink();
				break;
			case "spin":
				AnimDetails.angle += 4;
				Shape.style.transform = `rotate(${AnimDetails.angle}deg)`;
				break;
		}
	} else {
		switch (D_Shapes[I].goodBehavior) {
			case "bounce":
				Blink();
				AnimDetails.angle += 4;
				Shape.style.transform = `rotate(${AnimDetails.angle}deg)`;
				break;
			case "blink":
				Bounce();
				AnimDetails.angle += 4;
				Shape.style.transform = `rotate(${AnimDetails.angle}deg)`;
				break;
			case "spin":
				Bounce();
				Blink();
				break;
		}
	}
}, 1000 / 60);

let AnimDetails = {
	x          : 148,
	y          : 148,
	speedX     : 2,
	speedY     : 1,
	angle      : 0,
	showCount  : 60,
	show       : true,
	displayType: 0
}, I            = 0;

const D_Shapes = Gen_Shapes();

Reset();

D_Shapes.push({color: "blue", shape: "circle", repeat: 3});

for (const Item of D_Shapes) {
	if (Item.color==="red") Item.goodBehavior = "bounce";
	else Item.goodBehavior = Item.color==="blue" ? "blink" : "spin";
}

function Gen_Shapes () {
	const Data   = [],
	      Colors = ["red", "green", "blue"],
	      Shapes = ["square", "triangle", "circle"];
	for (let I = 0; I<Colors.length; I++) {
		for (let J = 0; J<Shapes.length; J++) {
			for (let K = 0; K<[1, 2, 3].length; K++) {
				if (I!==Colors.length - 1 || J!==Shapes.length - 1 || K!==[1, 2, 3].length - 1)
					Data.push({color: Colors[I], shape: Shapes[J], repeat: [1, 2, 3][K]});
			}
		}
	}
	return Data;
}

async function Reset () {
	Shape.style.background = 'none';
	Shape.style.backgroundSize = '100% 100%';
	Shape.style.display = 'block';
	Shape.style.left = '150px';
	Shape.style.top = '150px';
	Shape.style.transform = 'rotate(0deg)';
	Shape.innerHTML = `<p>${D_Shapes[I].color}</p> <p>${D_Shapes[I].shape}</p> <p>${D_Shapes[I].repeat}x${D_Shapes[I].repeat}</p>`;

	document.querySelector("#info-bar").textContent = `Current index: ${I}`;

	AnimDetails = {x: 148, y: 148, speedX: 2, speedY: 1, angle: 0, showCount: 60, show: true, displayType: 0};
}

async function Bounce () {
	AnimDetails.x += AnimDetails.speedX;
	AnimDetails.y += AnimDetails.speedY;
	if (AnimDetails.x + Shape.offsetWidth + 8>=document.querySelector('#shape-container').clientWidth || AnimDetails.x<2)
		AnimDetails.speedX *= -1;
	if (AnimDetails.y + Shape.offsetHeight + 4>=document.querySelector('#shape-container').clientHeight || AnimDetails.y<2)
		AnimDetails.speedY *= -1;
	Shape.style.left = `${AnimDetails.x}px`;
	Shape.style.top = `${AnimDetails.y}px`;
}

async function Blink () {
	AnimDetails.showCount--;
	if (AnimDetails.showCount==0) {
		AnimDetails.show = !AnimDetails.show;
		Shape.style.display = AnimDetails.show ? 'block' : 'none';
		AnimDetails.showCount = 60;
	}
}

document.body.addEventListener('keydown', async ({key})=>{
	if (key==="ArrowLeft") {
		document.querySelector('#cycle-left').click();
	}
	if (key==="ArrowRight") {
		document.querySelector('#cycle-right').click();
	}
	if (key==="d") {
		document.querySelector('#execute1').click();
	}
	if (key==="g") {
		document.querySelector('#execute2').click();
	}
	if (key==="b") {
		document.querySelector('#execute3').click();
	}
});