let t = !1;
$(document).ready(() => {$('#goButton').on('click',() => {t || (t = !0, bubbleSort && bubbleSort(bubbleList), quickSort && quickSort(quickList,0,quickList.length - 1))})});