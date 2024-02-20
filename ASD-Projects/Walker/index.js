const height = width = 50;
let Coord_X1 = Coord_Y1 = 290,
    Coord_X2 = Coord_Y2 = 100,
    Speed_X1 = Speed_Y1 = 0,
    Speed_X2 = Speed_Y2 = 0;

$(document).ready(() => {
	let Interval    = setInterval(NewFrame, 18),
	    Square_1    = {},
	    Square_2    = {},
	    BeginnerTag = Math.random(), Speed_Y2, Coord_Y1, Coord_Y2;

	$(document).on('keydown', async ({ key }) => {
		key==='ArrowLeft' && (Speed_X1 = -5);
		key==='ArrowRight' && (Speed_X1 = 5);
		key==='ArrowUp' && (Speed_Y1 = -5);
		key==='ArrowDown' && (Speed_Y1 = 5);
		key==='a' && (Speed_X2 = -5);
		key==='d' && (Speed_X2 = 5);
		key==='w' && (Speed_Y2 = -5);
		key==='s' && (Speed_Y2 = 5);
	}).on('keypress', async ({ key }) => {
		key==='ArrowLeft' && (Speed_X1 += 5);
		key==='ArrowRight' && (Speed_X1 -= 5);
		key==='ArrowUp' && (Speed_Y1 += 5);
		key==='ArrowDown' && (Speed_Y1 -= 5);
		key==='a' && (Speed_X2 += 5);
		key==='d' && (Speed_X2 -= 5);
		key==='w' && (Speed_Y2 += 5);
		key==='s' && (Speed_Y2 -= 5);
	});

	BeginnerTag<0.5 && ($('#Player_1').attr('class', 'tagged'), $('#Player_2').attr('class', 'not-tagged'));
	BeginnerTag>=0.5 && ($('#Player_2').attr('class', 'tagged'), $('#Player_1').attr('class', 'not-tagged'));

	function NewFrame() {
		Coord_X1 += Speed_X1, Coord_Y1 += Speed_Y1, Coord_X2 += Speed_X2, Coord_Y2 += Speed_Y2;
		$('#Player_1').css('left', Coord_X1), $('#Player_2').css('left', Coord_X2);
		$('#Player_1').css('top', Coord_Y1), $('#Player_2').css('top', Coord_Y2);

		Coord_X1 = Coord_X1>390 ? 0 : Coord_X1<=0 ? 390 : Coord_X1;
		Coord_Y1 = Coord_Y1>390 ? 0 : Coord_Y1<=0 ? 390 : Coord_Y1;
		Coord_X2 = Coord_X2>390 ? 0 : Coord_X2<=0 ? 390 : Coord_X2;
		Coord_Y2 = Coord_Y2>390 ? 0 : Coord_Y2<=0 ? 390 : Coord_Y2;

		$('.T-Tagged').css('background', '#F00').css('border', `2px solid #a00`);
		$('.F-Tagged').css('background', '#0F0').css('border', `2px solid #0a0`);

		Square_1.left = Coord_X1, Square_1.right = Coord_X1 + width;
		Square_1.top = Coord_Y1, Square_1.bottom = Coord_Y1 + height;
		Square_2.left = Coord_X2, Square_2.right = Coord_X2 + width;
		Square_2.top = Coord_Y2, Square_2.bottom = Coord_Y2 + height;

		if (!(Coord_X1<Coord_X2 + width && Coord_X1 + width>Coord_X2 && (Coord_Y1<Coord_Y2 + height && Coord_Y1 + height>Coord_Y2))) return;
		$(`.F-Tagged`).attr('class', 'tagging'), $('.F-Tagged').removeAttr('class', 'not-tagged');
		$('.T-Tagged').attr('class', 'not-tagged'), $('.T-Tagged').removeAttr('class', 'tagged');
		$('.Tagger').attr('class', 'tagged'), $('.Tagger').removeAttr('class', 'tagging');
		Coord_X2>Coord_X1 && (Coord_X1 -= 50, Coord_X2 += 50), Coord_Y2>Coord_Y1 && (Coord_Y1 -= 50, Coord_Y2 += 50);
		Coord_X1 + width>Coord_X2 + width && (Coord_X1 += 50, Coord_X2 -= 50), Coord_Y1 + height>Coord_Y2 + height && (Coord_Y1 += 50, Coord_Y2 -= 50);
	}
});