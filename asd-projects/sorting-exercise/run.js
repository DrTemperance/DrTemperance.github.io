let STARTED = !1;

$(document).ready(() => {
  $('#goButton').on('click',() => {
	 STARTED || (STARTED = !0, bubbleSort && bubbleSort(bubbleList), quickSort && quickSort(quickList,0,quickList.length - 1));
  })
});