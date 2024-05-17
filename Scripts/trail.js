if (!/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
	let MouseMoved = false;

	const
		 Canvas  = document.querySelector("canvas"),
		 CTX     = Canvas.getContext('2d'),
		 Pointer = {x: 0.5 * window.innerWidth, y: 0.5 * window.innerHeight},
		 Param   = {
			 PointsNum   : 25,
			 Width_Factor: 0.2,
			 Spring      : 0.35,
			 Friction    : 0.4
		 },
		 Trail   = new Array(Param.PointsNum);

	for (let I = 0; I<Param.PointsNum; I++) {
		Trail[I] = {
			x : Pointer.x, y: Pointer.y,
			dx: 0, dy: 0
		}
	}

	window.addEventListener("click", async ({pageX, pageY})=>Update_Mouse_Pos(pageX, pageY));
	window.addEventListener("mousemove", async ({pageX, pageY})=>{
		MouseMoved = true;
		Update_Mouse_Pos(pageX, pageY);
	});
	window.addEventListener("touchmove", async e=>{
		MouseMoved = true;
		Update_Mouse_Pos(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
	});

	async function Update_Mouse_Pos(xe, ye) {Pointer.x = xe, Pointer.y = ye;}

	Setup_Canvas();
	Update(0);
	window.addEventListener("resize", Setup_Canvas);

	async function Update(t) {
		CTX.strokeStyle = '#4b53bd';

		if (!MouseMoved) {
			Pointer.x = (0.5 + 0.3 * Math.cos(0.002 * t) * Math.sin(0.005 * t)) * window.innerWidth;
			Pointer.y = (0.5 + 0.2 * Math.cos(0.005 * t) + 0.1 * Math.cos(0.01 * t)) * window.innerHeight;
		}

		CTX.clearRect(0, 0, Canvas.width, Canvas.height);
		Trail.forEach((p, pIdx)=>{
			p.dx += ((pIdx===0 ? Pointer : Trail[pIdx - 1]).x - p.x) * (pIdx===0 ? 0.4 * Param.Spring : Param.Spring);
			p.dy += ((pIdx===0 ? Pointer : Trail[pIdx - 1]).y - p.y) * (pIdx===0 ? 0.4 * Param.Spring : Param.Spring);
			p.dx *= Param.Friction;
			p.dy *= Param.Friction;
			p.x += p.dx;
			p.y += p.dy;
		});

		CTX.lineCap = "round";
		CTX.beginPath();
		CTX.moveTo(Trail[0].x, Trail[0].y);

		for (let I = 1; I<Trail.length - 1; I++) {
			const Xc = 0.5 * (Trail[I].x + Trail[I + 1].x),
			      Yc = 0.5 * (Trail[I].y + Trail[I + 1].y);
			CTX.quadraticCurveTo(Trail[I].x, Trail[I].y, Xc, Yc);
			CTX.lineWidth = Param.Width_Factor * (Param.PointsNum - I);
			CTX.stroke();
		}
		CTX.lineTo(Trail[Trail.length - 1].x, Trail[Trail.length - 1].y);
		CTX.stroke();

		window.requestAnimationFrame(Update);
	}

	async function Setup_Canvas() {Canvas.width = window.innerWidth, Canvas.height = window.innerHeight;}
}