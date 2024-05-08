let STARTED = false;

let bubbleList = [], quickList = [];

document.querySelector("#displayBubble").style.height = `${document.querySelector("#displayBubble").offsetWidth}px`;
document.querySelector("#displayQuick").style.height = `${document.querySelector("#displayBubble").offsetWidth}px`;

generateList(bubbleList, "#displayBubble", "bubbleElement", "bubble");
generateList(quickList, "#displayQuick", "quickElement", "quick");

async function generateList(list, listId, cssClass, baseId) {
	let numbers = Array.from({length: 100}, (_, i)=>i + 1), nextIndex = 2, container = document.querySelector(listId);
	for (let i = 0; i<100; i++) {
		nextIndex = (nextIndex * 1774339 + 7181930) % numbers.length;
		list.push({id: `#${baseId + numbers[nextIndex]}`, value: numbers[nextIndex]});

		let div = document.createElement('div');
		div.classList.add(cssClass, "sortElement"), div.id = baseId + numbers[nextIndex];
		div.style.height = '1%', div.style.width = `${numbers[nextIndex]}%`;
		div.style.backgroundSize = `${100 / numbers[nextIndex]}% 100%`;
		div.style.top = `${list.length / 100 * 100}%`;

		container.appendChild(div);
		numbers.splice(nextIndex, 1);
	}
}

document.querySelector("#goButton").addEventListener("click", ()=>
	 STARTED || (STARTED = true, async function (array) {
		         for (let i = 0; i<array.length; i++) {
			         for (let j = array.length - 1; j>=i + 1; j--) {
				         if (array[j].value<array[j - 1].value) {
					         Swap(array, j, j - 1);
					         document.querySelector("#bubbleCounter").textContent = `Move Count: ${parseFloat(document.querySelector("#bubbleCounter").textContent.replace(/^\D+/g, '')) + 1}`;
					         await new Promise(resolve=>setTimeout(resolve, 15));
				         }
			         }
		         }
	         } && (async function (array) {
		         for (let i = 0; i<array.length; i++) {
			         for (let j = array.length - 1; j>=i + 1; j--) {
				         if (array[j].value<array[j - 1].value) {
					         Swap(array, j, j - 1);
					         document.querySelector("#bubbleCounter").textContent = `Move Count: ${parseFloat(document.querySelector("#bubbleCounter").textContent.replace(/^\D+/g, '')) + 1}`;
					         await new Promise(resolve=>setTimeout(resolve, 15));
				         }
			         }
		         }
	         })(bubbleList), async function (array) {
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
	         } && (async array=>{
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
	         })(quickList, 0, quickList.length - 1)));

function Swap(RayRay, I, J) {
	let temp = RayRay[I];
	RayRay[I] = RayRay[J];
	RayRay[J] = temp;

	let tempTop = document.querySelector(RayRay[I].id).style.top;

	document.querySelector(RayRay[I].id).style.top = document.querySelector(RayRay[J].id).style.top;
	document.querySelector(RayRay[J].id).style.top = tempTop;
}