let Entities = [];

for (let Entity of Entities) {

	setInterval(Update(Entity), 1000 / 60);
}

function Update(entIter) {
	let Chances = [Math.random(), Math.random()];

	if () {
		let sourceNeedle = 0;
		switch (Chances[0]) {
			case 0:
				Check_Empty_Space(entIter);
				Walk(entIter);
				Check_Empty_Space(entIter.yaw, entIter.innerWidth);
			case 1:
				entIter.yaw += Math.PI * 2 * Math.random();
				break;
			default:
				break;
		}
	} else {
		switch (Chances[0]) {
			case 0:
				Check_Empty_Space(entIter);
				Walk(entIter);
				break;
			case 1:
				entIter.yaw += Math.PI * 2 * Math.random();
				break;
			default:
				break;
		}
	}
	switch (Chances[1]) {

	}
}


function Walk(entIter) {


}

function Check_Empty_Space(yaw, size) {

}