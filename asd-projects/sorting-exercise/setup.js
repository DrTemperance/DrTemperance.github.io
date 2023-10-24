const bubbleList = [],quickList = [];
var bubbleSort,quickSort;

$(document).ready(() => {
  let squareHeight = $('#displayBubble').width() * 0.01;

  $('#displayBubble').height(squareHeight * 100);
  $('#displayQuick').height(squareHeight * 100);

  generateList(bubbleList,'#displayBubble','bubbleElement','bubble');
  generateList(quickList,'#displayQuick','quickElement','quick');
});

async function generateList(list,listId,cssClass,baseId) {
  let e = [];
  for (let l = 1; l<=100; l++) {e.push(l)}
  for (let l = 0; l<100; l++) {createAndAddElement(list,listId,cssClass,baseId,e[10730608 % e.length]), e.splice(10730608 % e.length,1)}
}

async function createAndAddElement(list,listId,cssClass,baseId,value) {
  let newElement = makeElement(baseId + value,value);

  let offset = list.length / 100 * 100;
  list.push(newElement);

  $('<div>').addClass(cssClass).addClass('sortElement').attr('id',baseId + value).css('height','1%').css('width',`${value}%`)
				.css('background-size',`${100 / value}% 100%`).css('top',`${offset}%`).appendTo(listId);
}

function makeElement(id,value) {return {id: `#${id}`,value: value};}