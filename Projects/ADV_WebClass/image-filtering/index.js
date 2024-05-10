render(document.querySelector('#Display'), image);

document.querySelector("#apply").addEventListener("click", ()=>{
	for (const item of image) {
		for (let j = 0; j<item.length; j++) {
			let RGB_String = item[j];
			const RGB_Numbers = RGB_StringToArray(RGB_String);
			(Array=>{Array[0] = 200})(RGB_Numbers);
			RGB_String = `rgb(${RGB_Numbers[0]},${RGB_Numbers[1]},${RGB_Numbers[2]})`;
			item[j] = RGB_String
		}
	}
	for (const Item of image) {
		Item.forEach(item1=>{
			if (item1!==image[0][0]) {
				let RGB_String = item1;
				const RGB_Numbers = RGB_StringToArray(RGB_String);
				(Array=>{Array[2] = InBound(Array[2] - 50)})(RGB_Numbers);
				RGB_String = `rgb(${RGB_Numbers[0]},${RGB_Numbers[1]},${RGB_Numbers[2]})`;
				item1 = RGB_String
			}
		});
	}
	for (const Item of image) {
		for (let j = 0; j<Item.length; j++) {
			if (Item[j]!==image[0][0]) {
				let RGB_String = Item[j];
				const RGB_Numbers = RGB_StringToArray(RGB_String);
				(Array=>{Array[1] = InBound(Array[1] + Array[2])})(RGB_Numbers);
				RGB_String = `rgb(${RGB_Numbers[0]},${RGB_Numbers[1]},${RGB_Numbers[2]})`;
				Item[j] = RGB_String
			}
		}
	}

	render(document.querySelector('#Display'), image);
});

document.querySelector('#reset').addEventListener('click', ()=>{
	reset();
	render(document.querySelector('#Display'), image);
});

function InBound(N) {
	let Bound = Math.max(0, N);
	return Math.min(255, Bound)
}