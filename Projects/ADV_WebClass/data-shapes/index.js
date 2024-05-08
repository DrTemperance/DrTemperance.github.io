$("#cycle-left").on("click", ()=>{
	currentIndex = currentIndex ? currentIndex - 1 : dataShapes.length - 1;
	resetDisplay();
});
$("#cycle-right").on("click", ()=>{
	currentIndex = currentIndex===dataShapes.length - 1 ? 0 : currentIndex + 1;
	resetDisplay();
});
$("#execute1").on("click", ()=>{
	$("#shape").css("background", `url(images/${dataShapes[currentIndex].color}-${dataShapes[currentIndex].shape}.png)`);
	$("#shape").css("background-size", `${100 / dataShapes[currentIndex].repeat}% ${100 / dataShapes[currentIndex].repeat}%`);
	animationDetails.displayType = 1
});
$("#execute2").on("click", ()=>{
	var currentShape = dataShapes[currentIndex];
	$("#shape").css("background", `url(images/${(currentShape.color)}-${(currentShape.shape)}.png)`);
	$("#shape").css("background-size", `${100 / currentShape.repeat}% ${100 / currentShape.repeat}%`);
	animationDetails.displayType = 2
});
$("#execute3").on("click", ()=>{
	let currentShape = dataShapes[currentIndex], repeat = currentShape.repeat, repeat1 = repeat;
	repeat1++;
	$("#shape").css("background", `url(images/${currentShape.color}-${currentShape.shape}.png)`);
	$("#shape").css("background-size", `${100 / repeat1}% ${100 / repeat1}%`);
	animationDetails.displayType = 3
});

setInterval(()=>{
	animationDetails.displayType!==0 && $("#shape").html("");
	if (animationDetails.displayType<2) return;
	if (animationDetails.displayType===2) {
		switch (dataShapes[currentIndex].goodBehavior) {
			case "bounce":
				animateBounce();
				break;
			case "blink":
				animateBlink();
				break;
			case "spin":
				animationDetails.angle += 4;
				$("#shape").css("transform", `rotate(${animationDetails.angle}deg)`);
				break;
		}
	} else {
		switch (dataShapes[currentIndex].goodBehavior) {
			case "bounce":
				animateBlink();
				animationDetails.angle += 4;
				$("#shape").css("transform", `rotate(${animationDetails.angle}deg)`);
				break;
			case "blink":
				animateBounce();
				animationDetails.angle += 4;
				$("#shape").css("transform", `rotate(${animationDetails.angle}deg)`);
				break;
			case "spin":
				animateBounce();
				animateBlink();
				break;
		}
	}
}, 1000 / 60);

let animationDetails = {x: 148, y: 148, speedX: 2, speedY: 1, angle: 0, showCount: 60, show: true, displayType: 0};

const dataShapes = generateShapeData();
let currentIndex = 0;

resetDisplay();

let shape = {color: "blue", shape: "circle", repeat: 3};
dataShapes.push(shape);

for (let i = 0; i<dataShapes.length; i++) {
	dataShapes[i].goodBehavior = dataShapes[i].color==="red" ? "bounce" : dataShapes[i].goodBehavior = dataShapes[i].color==="blue" ? "blink" : "spin";
}

function generateShapeData() {
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

function resetDisplay() {
	$("#shape").css("background", "none");
	$("#shape").css("display", "block");
	$("#shape").css("background-size", "100% 100%");
	$("#shape").css("left", "150px");
	$("#shape").css("top", "150px");
	$("#shape").css("transform", "rotate(0deg)");
	$("#shape").html(`<p>${dataShapes[currentIndex].color}</p> <p>${dataShapes[currentIndex].shape}</p> <p>${dataShapes[currentIndex].repeat}x${dataShapes[currentIndex].repeat}</p>`);

	$("#info-bar").text(`Current index: ${currentIndex}`);

	animationDetails = {x: 148, y: 148, speedX: 2, speedY: 1, angle: 0, showCount: 60, show: true, displayType: 0};
}

function animateBounce() {
	animationDetails.x += animationDetails.speedX;
	animationDetails.y += animationDetails.speedY;
	if (animationDetails.x + $("#shape").width() + 8>=$("#shape-container").width() || animationDetails.x<2) animationDetails.speedX *= -1;
	if (animationDetails.y + $("#shape").height() + 4>=$("#shape-container").height() || animationDetails.y<2) animationDetails.speedY *= -1;
	$("#shape").css("left", animationDetails.x);
	$("#shape").css("top", animationDetails.y);
}

function animateBlink() {
	animationDetails.showCount--;
	if (animationDetails.showCount===0) {
		animationDetails.show = !animationDetails.show;
		if (animationDetails.show) $("#shape").css("display", "block"); else $("#shape").css("display", "none");
		animationDetails.showCount = 60;
	}
}