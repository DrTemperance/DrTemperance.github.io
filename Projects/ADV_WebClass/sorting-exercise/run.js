let STARTED = false;

let Bubble_List = [], Quick_List = [];

document.querySelector("#DisplayBubble").style.height = `${document.querySelector("#DisplayBubble").offsetWidth}px`;
document.querySelector("#DisplayQuick").style.height = `${document.querySelector("#DisplayBubble").offsetWidth}px`;

Gen_List(Bubble_List, "#DisplayBubble", "BubbleElement", "Bubble");
Gen_List(Quick_List, "#DisplayQuick", "QuickElement", "Quick");

async function Gen_List(list, list_id, css_class, base_id) {
	let Nums = Array.from({length: 100}, (_, i)=>i + 1), NextI = 2, Cuntainer = document.querySelector(list_id);
	for (let I = 0; I<100; I++) {
		NextI = (NextI * 1774339 + 7181930) % Nums.length;
		list.push({id: `#${base_id + Nums[NextI]}`, value: Nums[NextI]});

		let Div = document.createElement('div');
		Div.classList.add(css_class, "SortElement"), Div.id = base_id + Nums[NextI];
		Div.style.backgroundSize = `${100 / Nums[NextI]}% 100%`;
		Div.style.height = '1%', Div.style.width = `${Nums[NextI]}%`;
		Div.style.top = `${list.length / 100 * 100}%`;

		Cuntainer.appendChild(Div);
		Nums.splice(NextI, 1);
	}
}

document.querySelector("#GoButton").addEventListener("click", ()=>
	 STARTED || (STARTED = true, async function (array) {
		         for (let I = 0; I<array.length; I++) {
			         for (let J = array.length - 1; J>=I + 1; J--) {
				         if (array[J].value<array[J - 1].value) {
					         Swap(array, J, J - 1);
					         document.querySelector("#BubbleCounter").textContent = `Move Count: ${parseFloat(document.querySelector("#BubbleCounter").textContent.replace(/^\D+/g, '')) + 1}`;
					         await new Promise(resolve=>setTimeout(resolve, 15));
				         }
			         }
		         }
	         } && (async array=>{
		         for (let I = 0; I<array.length; I++) {
			         for (let J = array.length - 1; J>=I + 1; J--) {
				         if (array[J].value<array[J - 1].value) {
					         Swap(array, J, J - 1);
					         document.querySelector("#BubbleCounter").textContent = `Move Count: ${parseFloat(document.querySelector("#BubbleCounter").textContent.replace(/^\D+/g, '')) + 1}`;
					         await new Promise(resolve=>setTimeout(resolve, 15));
				         }
			         }
		         }
	         })(Bubble_List), async function (array) {
		         let Swapped = false;
		         for (let I = 0; I<array.length - 1; I++) {
			         Swapped = !1;
			         for (let J = 0; J<array.length - I - 1; J++) {
				         if (array[J].value>array[J + 1].value) {
					         Swap(array, J, J + 1);
					         document.querySelector("#quickCounter").textContent = `Move Count: ${parseFloat(document.querySelector("#BubbleCounter").textContent.replace(/^\D+/g, '')) + 1}`;
					         Swapped = true;
				         }
			         }
			         if (!Swapped) break;
			         await new Promise(resolve=>setTimeout(resolve, 25));
		         }
	         } && (async array=>{
		         let Swapped = false;
		         for (let I = 0; I<array.length - 1; I++) {
			         Swapped = false;
			         for (let J = 0; J<array.length - I - 1; J++) {
				         if (array[J].value>array[J + 1].value) {
					         Swap(array, J, J + 1);
					         document.querySelector("#quickCounter").textContent = `Move Count: ${parseFloat(document.querySelector("#BubbleCounter").textContent.replace(/^\D+/g, '')) + 1}`;
					         Swapped = true;
				         }
			         }
			         if (!Swapped) break;
			         await new Promise(resolve=>setTimeout(resolve, 25));
		         }
	         })(Quick_List, 0, Quick_List.length - 1)));

function Swap(rayray, i, j) {
	let Temp = rayray[i];
	rayray[i] = rayray[j];
	rayray[j] = Temp;

	let TempTop = document.querySelector(rayray[i].id).style.top;

	document.querySelector(rayray[i].id).style.top = document.querySelector(rayray[j].id).style.top;
	document.querySelector(rayray[j].id).style.top = TempTop;
}