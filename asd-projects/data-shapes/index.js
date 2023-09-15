$(document).ready(function () {

  $('#cycle-left').on('click', decrementIndex);
  $('#cycle-right').on('click', incrementIndex);
  $('#execute1').on('click', staticDisplay);
  $('#execute2').on('click', goodDisplay);
  $('#execute3').on('click', badDisplay);

  setInterval(animate, 8.5);

  let animationDetails = {
    x          : 148,
    y          : 148,
    speedX     : 2,
    speedY     : 1,
    angle      : 0,
    showCount  : 60,
    show       : !0,
    displayType: 0,
  };

  const dataShapes = generateShapeData();
  let currentIndex = 0;

  resetDisplay();

  // TODO 0 complete

  dataShapes.push({color: 'blue', shape: 'circle', repeat: 3});

  for (let i of dataShapes) {
    switch (i.color) {
      case 'red':
        i.goodBehavior = 'bounce';
        break;
      case 'blue':
        i.goodBehavior = 'blink';
        break;
      default:
        i.goodBehavior = 'spin';
        break;
    }
  }

  const handleStatic = data => {
    setBackgroundWithObject(data);
    animationDetails.displayType = 1;
  };

  const handleGood = (color, shape, repeat) => {
    setBackgroundWithSimple(color, shape, repeat);
    animationDetails.displayType = 2;
  };

  const handleBad = (data, repeat) => {
    repeat++;
    setBackgroundWithMixed(data, repeat);
    animationDetails.displayType = 3;
  };

  function staticDisplay() {
    handleStatic(dataShapes[currentIndex]);
  }

  function goodDisplay() {
    handleGood(dataShapes[currentIndex].color, dataShapes[currentIndex].shape, dataShapes[currentIndex].repeat);
  }

  function badDisplay() {handleBad(dataShapes[currentIndex], dataShapes[currentIndex].repeat);}

  function generateShapeData() {
    const data    = [],
          colors  = ['red', 'green', 'blue', 'purple'],
          shapes  = ['square', 'triangle', 'circle', 'tesseract'],
          repeats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    for (let c of colors) {
      for (let s of shapes) {
        for (let r of repeats) {
          data.push({color: c, repeat: r, shape: s});
        }
      }
    }
    return data;
  }

  function decrementIndex() {
    currentIndex = currentIndex ? currentIndex - 1 : dataShapes.length - 1;
    resetDisplay();
  }

  function incrementIndex() {
    currentIndex = currentIndex === dataShapes.length - 1 ? 0 : currentIndex + 1;
    resetDisplay();
  }

  function resetDisplay() {
    const shapeData = dataShapes[currentIndex];

    $('#shape').css('background', 'none');
    $('#shape').css('display', 'block');
    $('#shape').css('background-size', '100% 100%');
    $('#shape').css('left', '150px');
    $('#shape').css('top', '150px');
    $('#shape').css('transform', 'rotate(0deg)');
    $('#shape').
       html(`<p>${shapeData.color}</p> <p>${shapeData.shape}</p> <p>${shapeData.repeat}x${shapeData.repeat}</p>`);

    $('#info-bar').text(`Current Index: ${currentIndex}`);

    animationDetails = {
      x          : 148,
      y          : 148,
      speedX     : 2,
      speedY     : 1,
      angle      : 0,
      showCount  : 60,
      show       : !0,
      displayType: 0,
    };
  }

  function setBackgroundWithObject(obj) {
    obj.shape == 'tesseract'
    ? $('#shape').css('background', `url(images/${obj.shape}.gif)`)
    : $('#shape').css('background', `url(images/${obj.color}-${obj.shape}.png)`);
    setBackgroundRepeat(obj.repeat);
  }

  function setBackgroundWithSimple(color, shape, repeat) {
    $('#shape').css('background', `url(images/${color}-${shape}.png)`);
    setBackgroundRepeat(repeat);
  }

  function setBackgroundWithMixed(obj, repeat) {
    $('#shape').css('background', `url(images/${obj.color}-${obj.shape}.png)`);
    setBackgroundRepeat(repeat);
  }

  function setBackgroundRepeat(repeat) {
    $('#shape').css('background-size', `${100 / repeat}% ${100 / repeat}%`);
  }

  function animate() {
    if (animationDetails.displayType !== 0) {
      $('#shape').html('');
    }
    if (animationDetails.displayType < 2) {
      return;
    }
    if (animationDetails.displayType === 2) {
      switch (dataShapes[currentIndex].goodBehavior) {
        case 'bounce':
          animateBounce();
          break;
        case 'blink':
          animateBlink();
          break;
        case 'spin':
          animateSpin();
          break;
      }
    } else {
      switch (dataShapes[currentIndex].goodBehavior) {
        case 'bounce':
          animateBlink();
          animateSpin();
          break;
        case 'blink':
          animateBounce();
          animateSpin();
          break;
        case 'spin':
          animateBounce();
          animateBlink();
          break;
      }
    }
  }

  function animateBounce() {
    animationDetails.x += animationDetails.speedX;
    animationDetails.y += animationDetails.speedY;
    if (animationDetails.x + $('#shape').width() + 8 >= $('#shape-container').width() || animationDetails.x < 2) {
      animationDetails.speedX *= -1;
    }
    if (animationDetails.y + $('#shape').height() + 4 >= $('#shape-container').height() || animationDetails.y < 2) {
      animationDetails.speedY *= -1;
    }
    $('#shape').css('left', animationDetails.x);
    $('#shape').css('top', animationDetails.y);
  }

  function animateBlink() {
    animationDetails.showCount--;
    if (animationDetails.showCount === 0) {
      animationDetails.show = !animationDetails.show;
      if (animationDetails.show) {
        $('#shape').css('display', 'block');
      } else {
        $('#shape').css('display', 'none');
      }
      animationDetails.showCount = 60;
    }
  }

  function animateSpin() {
    animationDetails.angle += 4;
    $('#shape').css('transform', `rotate(${animationDetails.angle}deg)`);
  }
});