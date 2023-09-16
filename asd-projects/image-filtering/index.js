$(document).ready(() => {
  render($('#display'),image);
  $('#apply').on('click',applyAndRender);
  $('#reset').on('click',resetAndRender);
});

function resetAndRender() {
  reset();
  render($('#display'),image);
}

function applyAndRender() {
  applyFilter(reddify);
  applyFilterNoBackground(decreaseBlue);
  applyFilterNoBackground(increaseGreenByBlue);
  render($('#display'),image);
}

function applyFilter(filterFunction) {
  for (const item of image) {
    for (let j = 0; j<item.length; j++) {
      let rgbString  = item[j],
          rgbNumbers = rgbStringToArray(rgbString);
      filterFunction(rgbNumbers);
      rgbString = rgbArrayToString(rgbNumbers);
      item[j] = rgbString
    }
  }
}

function reddify(array) {array[RED] = 200}

function decreaseBlue(array) {array[BLUE] = keepInBounds(array[BLUE] - 50)}

function increaseGreenByBlue(array) {array[GREEN] = keepInBounds(array[GREEN] + array[BLUE])}

function keepInBounds(num) {return Math.min(255,Math.max(0,num));}

function applyFilterNoBackground(filterFunction) {
  let backgroundColor = image[0][0];
  for (const item of image) {
    for (let j = 0; j<item.length; j++) {
      if (item[j]!==backgroundColor) {
        let rgbString  = item[j],
            rgbNumbers = rgbStringToArray(rgbString);
        filterFunction(rgbNumbers);
        rgbString = rgbArrayToString(rgbNumbers);
        item[j] = rgbString
      }
    }
  }
}