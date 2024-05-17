document.querySelector('#cycle-left').addEventListener('click', ()=>{
	I = I ? I - 1 : D_Shapes.length - 1;
	Reset();
});

document.querySelector('#cycle-right').addEventListener('click', ()=>{
	I = I===D_Shapes.length - 1 ? 0 : I + 1;
	Reset();
});

['#execute1', '#execute2', '#execute3'].forEach((button, index)=>document.querySelector(button).addEventListener('click', ()=>{
	let CurrentShape = D_Shapes[I], Repeat = index===2 ? CurrentShape.repeat + 1 : CurrentShape.repeat;
	document.querySelector('#shape').style.background = `url(images/${CurrentShape.color}-${CurrentShape.shape}.png)`;
	document.querySelector('#shape').style.backgroundSize = `${100 / Repeat}% ${100 / Repeat}%`;
	AnimDetails.displayType = index + 1;
}));

setInterval(()=>{
	if (AnimDetails.displayType!==0) document.querySelector('#shape').innerHTML = "";
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
				document.querySelector('#shape').style.transform = `rotate(${AnimDetails.angle}deg)`;
				break;
		}
	} else {
		switch (D_Shapes[I].goodBehavior) {
			case "bounce":
				Blink();
				AnimDetails.angle += 4;
				document.querySelector('#shape').style.transform = `rotate(${AnimDetails.angle}deg)`;
				break;
			case "blink":
				Bounce();
				AnimDetails.angle += 4;
				document.querySelector('#shape').style.transform = `rotate(${AnimDetails.angle}deg)`;
				break;
			case "spin":
				Bounce();
				Blink();
				break;
		}
	}
}, 1000 / 60);
let AnimDetails = {x: 148, y: 148, speedX: 2, speedY: 1, angle: 0, showCount: 60, show: true, displayType: 0}, I = 0;

const D_Shapes = Gen_Shapes();

Reset();

D_Shapes.push({color: "blue", shape: "circle", repeat: 3});

for (const Item of D_Shapes) Item.goodBehavior = Item.color==="red" ? "bounce" : Item.goodBehavior = Item.color==="blue" ? "blink" : "spin";

function Gen_Shapes() {
	const Data = [], Colors = ["red", "green", "blue"], Shapes = ["square", "triangle", "circle"];
	for (let i = 0; i<Colors.length; i++) {
		for (let j = 0; j<Shapes.length; j++) {
			for (let k = 0; k<[1, 2, 3].length; k++) if (i!==Colors.length - 1 || j!==Shapes.length - 1 || k!==[1, 2, 3].length - 1) Data.push({color: Colors[i], shape: Shapes[j], repeat: [1, 2, 3][k]});
		}
	}
	return Data;
}

async function Reset() {
	const Shape = await document.querySelector('#shape');
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

async function Bounce() {
	AnimDetails.x += AnimDetails.speedX;
	AnimDetails.y += AnimDetails.speedY;
	if (AnimDetails.x + document.querySelector('#shape').offsetWidth + 8>=document.querySelector('#shape-container').clientWidth || AnimDetails.x<2) AnimDetails.speedX *= -1;
	if (AnimDetails.y + document.querySelector('#shape').offsetHeight + 4>=document.querySelector('#shape-container').clientHeight || AnimDetails.y<2) AnimDetails.speedY *= -1;
	document.querySelector('#shape').style.left = `${AnimDetails.x}px`;
	document.querySelector('#shape').style.top = `${AnimDetails.y}px`;
}

async function Blink() {
	AnimDetails.showCount--;
	if (AnimDetails.showCount==0) {
		AnimDetails.show = !AnimDetails.show;
		document.querySelector('#shape').style.display = AnimDetails.show ? 'block' : 'none';
		AnimDetails.showCount = 60;
	}
}