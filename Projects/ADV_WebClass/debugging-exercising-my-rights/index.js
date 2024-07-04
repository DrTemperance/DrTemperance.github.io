let Circles = [];
const Board = document.querySelector('#board');
for (let K = 0; K<10; K++) {
	let NewCircle = Make_Circle(`circle${K}`);
	Circles.push(NewCircle);

	let Circle = document.createElement('div');
	Circle.id = `circle${K}`;
	Circle.style.left = `${NewCircle.x}px`;
	Circle.style.top = `${NewCircle.y}px`;
	Circle.classList.add('Circle');

	Board.appendChild(Circle);
}

setInterval(()=>{
	for (let I = 0; I<10; I++) {
		if (Circles[I].x<0 || Circles[I].x>Board.clientWidth) {
			Circles[I].x -= Circles[I].speedX;
			Circles[I].speedX *= -1;
		}
		if (Circles[I].y<0 || Circles[I].y>Board.clientHeight) {
			Circles[I].y -= Circles[I].speedY;
			Circles[I].speedY *= -1;
		}
		document.querySelector(Circles[I].id).style.left = `${Circles[I].x}px`;
		document.querySelector(Circles[I].id).style.top = `${Circles[I].y}px`;
	}
}, 1000 / 60);

function Make_Circle (id) {
	let Circle = {};

	Circle.id = `#${id}`;
	Circle.x = Math.random() * (Board.clientWidth - 20) + 10;
	Circle.y = Math.random() * (Board.clientHeight - 20) + 10;
	Circle.speedX = Math.random() * 2.5 - 1.25;
	Circle.speedY = Math.random() * 2.5 - 1.25;

	return Circle;
}