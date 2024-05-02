$(document).ready(()=>{

	const $board = $('#Board');
	let Circles = [];
	for (let K = 0; K<10; K++) {
		let NewCircle = Make_Circle(`circle${K}`);
		Circles.push(NewCircle);

		addNewCircleElement(NewCircle, `circle${K}`);
	}

	setInterval(()=>{
		for (let I = 0; I<10; I++) {
			if (Circles[I].x<0 || Circles[I].x>$($board).width()) {
				Circles[I].x -= Circles[I].speedX;
				Circles[I].speedX *= -1;
			}
			if (Circles[I].y<0 || Circles[I].y>$($board).height()) {
				Circles[I].y -= Circles[I].speedY;
				Circles[I].speedY *= -1;
			}
			$(Circles[I].id).css('left', Circles[I].x);
			$(Circles[I].id).css('top', Circles[I].y);
		}
	}, 1000 / 60);


	function Make_Circle(ID) {
		let Circle = {};

		Circle.id = `#${ID}`;
		Circle.x = Math.random() * ($($board).width() - 20) + 10;
		Circle.y = Math.random() * ($($board).height() - 20) + 10;
		Circle.Speed_X = Math.random() * 2.5 - 5;
		Circle.Speed_Y = Math.random() * 2.5 - 5;

		return Circle;
	}

	const NewCircle = (Circle_, ID)=>{
		let $circle = $('<div>').attr('id', ID).css('left', Circle_.x).css('top', Circle_.y).addClass("Circle");

		$circle.appendTo($board);
	};

});