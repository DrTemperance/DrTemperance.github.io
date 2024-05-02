$(document).ready(function () {
	document.querySelector("#cycle-left").addEventListener("mousedown", function () {
		Index_N = Index_N ? Index_N - 1 : GenerateShapes().length - 1;
		const shapeData1 = (GenerateShapes())[Index_N];

		document.getElementById("Shape").style.background = "none";
		document.getElementById("Shape").style.display = "block";
		document.getElementById("Shape").style.backgroundSize = "100% 100%";
		document.getElementById("Shape").style.left = "150px";
		document.getElementById("Shape").style.top = "150px";
		document.getElementById("Shape").style.transform = "rotate(0deg)";
		document.getElementById("Shape").html(`<p>${shapeData1.color}</p> <p>${shapeData1.shape}</p> <p>${shapeData1.repeat}x${shapeData1.repeat}</p>`);

		document.getElementById("info-bar").innerHTML = `Current index: ${Index_N}`;

		Animation_Details = {x: 148, y: 148, speedX: 2, speedY: 1, angle: 0, showCount: 60, show: true, displayType: 0};
	});
	document.querySelector("#cycle-right").addEventListener("mousedown", function () {
		Index_N = Index_N===GenerateShapes().length - 1 ? 0 : Index_N + 1;
		const shapeData1 = (GenerateShapes())[Index_N];

		document.getElementById("Shape").style.background = "none";
		document.getElementById("Shape").style.display = "block";
		document.getElementById("Shape").style.backgroundSize = "100% 100%";
		document.getElementById("Shape").style.left = "150px";
		document.getElementById("Shape").style.top = "150px";
		document.getElementById("Shape").style.transform = "rotate(0deg)";
		document.getElementById("Shape").html(`<p>${shapeData1.color}</p> <p>${shapeData1.shape}</p> <p>${shapeData1.repeat}x${shapeData1.repeat}</p>`);

		document.getElementById("info-bar").innerHTML = `Current index: ${Index_N}`;

		Animation_Details = {x: 148, y: 148, speedX: 2, speedY: 1, angle: 0, showCount: 60, show: true, displayType: 0};
	});
	document.querySelector("#execute1").addEventListener("mousedown", function () {
		$("#Shape").css("background", `url(images/${(GenerateShapes())[Index_N].color}-${(GenerateShapes())[Index_N].shape}.png)`);
		$("#Shape").css("background-size", `${100 / (GenerateShapes())[Index_N].repeat}% ${100 / (GenerateShapes())[Index_N].repeat}%`);
		Animation_Details.Display_Type = 1
	});
	document.querySelector("#execute2").addEventListener("mousedown", function () {
		let currentShape = (GenerateShapes())[Index_N];
		document.getElementById("Shape").css("background", `url(images/${(currentShape.color)}-${(currentShape.shape)}.png)`);
		document.getElementById("Shape").css("background-size", `${100 / currentShape.repeat}% ${100 / currentShape.repeat}%`);
		Animation_Details.Display_Type = 2
	});
	document.querySelector("#execute3").addEventListener("mousedown", function () {
		let repeat = (GenerateShapes())[Index_N].repeat, repeat1 = repeat;
		repeat1++;
		document.getElementById("Shape").css("background", `url(images/${(GenerateShapes())[Index_N].color}-${(GenerateShapes())[Index_N].shape}.png)`);
		document.getElementById("Shape").css("background-size", `${100 / repeat1}% ${100 / repeat1}%`);
		Animation_Details.Display_Type = 3
	});

	setInterval(Animate, 1000 / 120);

	let Animation_Details = {
		x: 148, y: 148, Speed_X: 2, Speed_Y: 1, Angle: 0, ShowCount: 60, Show: false, Display_Type: 0
	};

	let Index_N = 0;

	const shapeData = (GenerateShapes())[Index_N];

	document.getElementById("Shape").style.background = "none";
	document.getElementById("Shape").style.display = "block";
	document.getElementById("Shape").style.backgroundSize = "100% 100%";
	document.getElementById("Shape").style.left = "150px";
	document.getElementById("Shape").style.top = "150px";
	document.getElementById("Shape").style.transform = "rotate(0deg)";
	document.getElementById("Shape").html(`<p>${shapeData.color}</p> <p>${shapeData.shape}</p> <p>${shapeData.repeat}x${shapeData.repeat}</p>`);

	document.getElementById("info-bar").innerHTML = `Current index: ${Index_N}`;

	Animation_Details = {x: 148, y: 148, speedX: 2, speedY: 1, angle: 0, showCount: 60, show: true, displayType: 0};

	let Shape = {color: "blue", shape: "circle", repeat: 3};

	GenerateShapes().push(Shape);

	for (let I of GenerateShapes()) {
		let IndexedShape = I;
		IndexedShape.goodBehavior = IndexedShape.color==="red" ? "bounce" : IndexedShape.goodBehavior = IndexedShape.color==="blue" ? "blink" : "spin";
	}

	function GenerateShapes() {
		const data = [], colors = ["red", "green", "blue"], shapes = ["square", "triangle", "circle"], repeats = [1, 2, 3];
		for (let i = 0; i<colors.length; i++) {
			for (let j = 0; j<shapes.length; j++) {
				for (let k = 0; k<repeats.length; k++) {
					if (i!==colors.length - 1 || j!==shapes.length - 1 || k!==repeats.length - 1) {
						data.push({color: colors[i], shape: shapes[j], repeat: repeats[k]});
					}
				}
			}
		}

		return data;
	}

	function Animate() {
		if (Animation_Details.Display_Type!==0) {$("#Shape").html("");}
		if (Animation_Details.Display_Type<2) {return;}
		if (Animation_Details.Display_Type===2) {
			switch ((GenerateShapes())[Index_N].goodBehavior) {
				case "bounce":
					animateBounce();
				case "blink":
					animateBlink();
				case "spin":
					animateSpin();
			}
		} else {
			switch ((GenerateShapes())[Index_N].goodBehavior) {
				case "blink":
					animateBounce();
					animateSpin();
				case "bounce":
					animateSpin();
					animateBlink();
				case "spin":
					animateBounce();
					animateBlink();
			}
		}
	}

	function animateBounce() {
		Animation_Details.x += Animation_Details.Speed_X;
		Animation_Details.y += Animation_Details.Speed_Y;
		if (Animation_Details.x + document.getElementById("Shape").width() + 8>=$("#Shape-container").width() || Animation_Details.x<2) {Animation_Details.Speed_X *= -1;}
		if (Animation_Details.y + document.getElementById("Shape").height() + 4>=$("#Shape-container").height() || Animation_Details.y<2) {Animation_Details.Speed_Y *= -1;}
		document.getElementById("Shape").css("left", Animation_Details.x);
		document.getElementById("Shape").css("top", Animation_Details.y);
	}

	function animateBlink() {
		Animation_Details.ShowCount--;
		if (Animation_Details.ShowCount===0) {
			Animation_Details.Show = !Animation_Details.Show;
			if (Animation_Details.Show) $("#Shape").css("display", "block"); else $("#Shape").css("display", "none");
			Animation_Details.ShowCount = 60;
		}
	}

	function animateSpin() {
		Animation_Details.Angle += 4;
		document.getElementById("Shape").css("transform", `rotate(${Animation_Details.Angle}deg)`);
	}
});