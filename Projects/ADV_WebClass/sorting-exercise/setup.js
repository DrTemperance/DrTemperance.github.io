var bubbleSort, quickSort;
let bubbleList = [], quickList = [];

document.querySelector("#displayBubble").style.height = `${document.querySelector("#displayBubble").offsetWidth}px`;
document.querySelector("#displayQuick").style.height = `${document.querySelector("#displayBubble").offsetWidth}px`;

generateList(bubbleList, "#displayBubble", "bubbleElement", "bubble");
generateList(quickList, "#displayQuick", "quickElement", "quick");


function generateList(list, listId, cssClass, baseId) {
	let numbers = Array.from({length: 100}, (_, i)=>i + 1), nextIndex = 2;

	for (let i = 0; i<100; i++) {
		nextIndex = (nextIndex * 1774339 + 7181930) % numbers.length;

		let offset = list.length / 100 * 100;
		list.push({id: `#${(baseId + numbers[nextIndex])}`, value: numbers[nextIndex]});

		let div = document.createElement('div');
		div.classList.add(cssClass, "sortElement");
		div.id = baseId + numbers[nextIndex];
		div.style.height = `${1}%`;
		div.style.width = `${1 * numbers[nextIndex]}%`;
		div.style.backgroundSize = `${100 / numbers[nextIndex]}% 100%`;
		div.style.top = `${offset}%`;

		document.querySelector(listId).appendChild(div);

		numbers.splice(nextIndex, 1);
	}
}