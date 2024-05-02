async function quickSort(array) {
	let swapped = !1;
	for (let i = 0; i<array.length - 1; i++) {
		swapped = !1;
		for (let j = 0; j<array.length - i - 1; j++) {
			if (array[j].value>array[j + 1].value) {
				Swap(array, j, j + 1);
				document.querySelector("#quickCounter").textContent = `Move Count: ${parseFloat(document.querySelector("#bubbleCounter").textContent.replace(/^\D+/g, '')) + 1}`;
				swapped = !0;
			}
		}
		if (!swapped) {break;}
		await new Promise(resolve=>setTimeout(resolve, 25));
	}
}

async function bubbleSort(array) {
	for (let i = 0; i<array.length; i++) {
		for (let j = array.length - 1; j>=i + 1; j--) {
			if (array[j].value<array[j - 1].value) {
				Swap(array, j, j - 1);
				document.querySelector("#bubbleCounter").textContent = `Move Count: ${parseFloat(document.querySelector("#bubbleCounter").textContent.replace(/^\D+/g, '')) + 1}`;
				await new Promise(resolve=>setTimeout(resolve, 15));
			}
		}
	}
}

function Swap(RayRay, I, J) {
	let temp = RayRay[I];
	RayRay[I] = RayRay[J];
	RayRay[J] = temp;
	let temp1 = `${parseFloat($(RayRay[I].id).css("top"))}px`;

	$(RayRay[I].id).css("top", `${parseFloat($(RayRay[J].id).css("top"))}px`);
	$(RayRay[J].id).css("top", temp1);
}