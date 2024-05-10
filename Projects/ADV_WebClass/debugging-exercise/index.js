let Circles = [];
for (let K = 0; K<10; K++) {
	let NewCircle = Make_Circle(`circle${K}`);
	Circles.push(NewCircle);

	let circle = document.createElement('div');
	circle.id = `circle${K}`;
	circle.style.left = `${NewCircle.x}px`, circle.style.top = `${NewCircle.y}px`;
	circle.classList.add('Circle');

	document.querySelector('#board').appendChild(circle);
}

setInterval(()=>{
	for (let I = 0; I<10; I++) {
		if (Circles[I].x<0 || Circles[I].x>document.querySelector('#board').clientWidth) Circles[I].x -= Circles[I].speedX, Circles[I].speedX *= -1;
		if (Circles[I].y<0 || Circles[I].y>document.querySelector('#board').clientHeight) Circles[I].y -= Circles[I].speedY, Circles[I].speedY *= -1;
		document.querySelector(Circles[I].id).style.left = `${Circles[I].x}px`, document.querySelector(Circles[I].id).style.top = `${Circles[I].y}px`;
	}
}, 1000 / 60);

function Make_Circle(ID) {
	let Circle = {};

	Circle.id = `#${ID}`;
	Circle.x = Math.random() * (document.querySelector('#board').clientWidth - 20) + 10;
	Circle.y = Math.random() * (document.querySelector('#board').clientHeight - 20) + 10;
	Circle.speedX = Math.random() * 2.5 - 1.25, Circle.speedY = Math.random() * 2.5 - 1.25;

	return Circle;
}