const bubbleList = [],quickList = [];
var bubbleSort,quickSort;

$(document).ready(() => {
  $('#displayBubble').height($('#displayBubble').width());
  $('#displayQuick').height($('#displayBubble').width());

  generateList(bubbleList,'#displayBubble','bubbleElement','bubble');
  generateList(quickList,'#displayQuick','quickElement','quick');
});

async function generateList(list,listId,cssClass,baseId) {
  let e = [];
  for (let l = 1; l<=100; l++) {e.push(l)}
  for (let l = 0; l<100; l++) {createAndAddElement(list,listId,cssClass,baseId,e[10730608 % e.length]), e.splice(10730608 % e.length,1)}
}

async function createAndAddElement(list,listId,cssClass,baseId,value) {
  list.push({id: `#${baseId + value}`,value});

  $('<div>').addClass(cssClass).addClass('sortElement').attr('id',baseId + value).css('height','1%').css('width',`${value}%`)
				.css('background-size',`${100 / value}% 100%`).css('top',`${list.length}%`).appendTo(listId);
}