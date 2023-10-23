const SLEEP_AMOUNT        = 50,
		MAX_SQUARES         = 100,
		SEED                = 3,
		FACTOR              = 1774339,
		INCREASE            = 7181930,
		IMAGE_SIZE          = 256,
		MAX_SQUARE_WIDTH    = 25,
		MAX_SQUARE_HEIGHT   = 1,
		bubbleList          = [],
		quickList           = [],
		bubbleId            = '#displayBubble',
		quickId             = '#displayQuick',
		bubbleContainer     = '#bubbleArea',
		quickContainer      = '#quickArea',
		bubbleCounter       = '#bubbleCounter',
		quickCounter        = '#quickCounter',
		bubbleElementBaseId = 'bubble',
		quickElementBaseId  = 'quick',
		elementClass        = 'sortElement',
		bubbleClass         = 'bubbleElement',
		quickClass          = 'quickElement';
let bubbleSort,quickSort;

$(document).ready(() => {
  let e = $(bubbleId).width() * (Math.min(100 * MAX_SQUARES,MAX_SQUARE_WIDTH) / 100);
  $(bubbleId).height(e * MAX_SQUARES), $(quickId).height(e * MAX_SQUARES), generateList(bubbleList,
																													 bubbleId,
																													 bubbleClass,
																													 bubbleElementBaseId,
  ), generateList(quickList,quickId,quickClass,quickElementBaseId)
});

function generateList(e,t,n,a) {
  let o,v = [];
  for (o = 1; o<=MAX_SQUARES; o++) {v.push(o);}
  let s = SEED;
  for (o = 0; o<MAX_SQUARES; o++) {s = chooseIndex(s,v), createAndAddElement(e,t,n,a,v[s]), v.splice(s,1)}
}

function chooseIndex(n,e) {return (n * FACTOR + INCREASE) % e.length}

function createAndAddElement(s,e,d,t,a) {
  let n = makeElement(t + a,a),l = MAX_SQUARES / s.length * 100;
  s.push(n), $('<div>')
  .addClass(d)
  .addClass(elementClass)
  .attr('id',t + a)
  .css('height',`${MAX_SQUARE_HEIGHT}%`)
  .css('width',`${MAX_SQUARE_HEIGHT * a}%`)
  .css('background-size',`${(100 / a)}% 100%`)
  .css('top',`${l}%`)
  .appendTo(e)
}

function makeElement(id,value) {return {id: `#${id}`,value};}