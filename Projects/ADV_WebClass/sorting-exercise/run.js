let STARTED = !1;

document.querySelector("#goButton").addEventListener("click", ()=>{
	if (STARTED) return;
	STARTED = !0;
	bubbleSort && bubbleSort(bubbleList);
	quickSort && quickSort(quickList, 0, quickList.length - 1);
});