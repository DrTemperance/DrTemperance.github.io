const Display = document.querySelector('#Display');
Render(Display, image);

document.querySelector("#apply").addEventListener("click", ()=>{
	for (const Item of image) {
		for (let RGB_String of Item) {
			const RGB_Numbers = Rgb_String_To_Array(RGB_String);
			(Array=>{Array[0] = 200})(RGB_Numbers);
			RGB_String = `rgb(${RGB_Numbers[0]},${RGB_Numbers[1]},${RGB_Numbers[2]})`;
			RGB_String = RGB_String
		}
	}
	for (const Item of image) {
		Item.forEach(item1=>{
			if (item1!==image[0][0]) {
				let RGB_String = item1;
				const RGB_Numbers = Rgb_String_To_Array(RGB_String);
				(Array=>{Array[2] = Inbound(Array[2] - 50)})(RGB_Numbers);
				RGB_String = `rgb(${RGB_Numbers[0]},${RGB_Numbers[1]},${RGB_Numbers[2]})`;
				item1 = RGB_String
			}
		});
	}
	for (const Item of image) {
		for (let ItemA of Item) {
			if (ItemA!==image[0][0]) {
				let RGB_String = ItemA;
				const RGB_Numbers = Rgb_String_To_Array(RGB_String);
				(Array=>{Array[1] = Inbound(Array[1] + Array[2])})(RGB_Numbers);
				RGB_String = `rgb(${RGB_Numbers[0]},${RGB_Numbers[1]},${RGB_Numbers[2]})`;
				ItemA = RGB_String
			}
		}
	}

	Render(Display, image);
});

document.querySelector('#reset').addEventListener('click', ()=>{
	Reset();
	Render(Display, image);
});

function Inbound (n) {
	let Bound = Math.max(0, n);
	return Math.min(255, Bound)
}