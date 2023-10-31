$(document).ready(() => {

  $('#cycle-left').on('click',() => {currentIndex = currentIndex ? currentIndex - 1 : dataShapes.length - 1, resetDisplay()});
  $('#cycle-right').on('click',() => {currentIndex = currentIndex===dataShapes.length - 1 ? 0 : currentIndex + 1, resetDisplay()});
  $('#execute1').on('click',() => {handleStatic(dataShapes[currentIndex])});
  $('#execute2').on('click',() => {handleGood(dataShapes[currentIndex].color,dataShapes[currentIndex].shape,dataShapes[currentIndex].repeat)});
  $('#execute3').on('click',() => {handleBad(dataShapes[currentIndex],dataShapes[currentIndex].repeat)});

  setInterval(animate,8.5);

  let animationDetails = {
	 angle      : 0,
	 displayType: 0,
	 show       : !0,
	 showCount  : 60,
	 speedX     : 2,
	 speedY     : 1,
	 x          : 148,
	 y          : 148,
  },currentIndex       = 0;

  const dataShapes = generateShapeData();

  resetDisplay();

  dataShapes.push({color: 'blue',shape: 'circle',repeat: 3})

  for (let i of dataShapes) {i.color==='red' ? i.goodBehavior = 'bounce' : i.color==='blue' ? i.goodBehavior = 'blink' : i.goodBehavior = 'spin'}

  const handleStatic = a => {setBackgroundWithObject(a), animationDetails.displayType = 1},
		  handleGood   = (a,i,t) => {setBackgroundWithSimple(a,i,t), animationDetails.displayType = 2},
		  handleBad    = (a,i) => {i++, setBackgroundWithMixed(a,i), animationDetails.displayType = 3};

  function generateShapeData() {
	 const data    = [],
			 colors  = ['red','green','blue','purple'],
			 shapes  = ['square','triangle','circle','tesseract'],
			 repeats = [1,2,3,4,5,6,7,8,9,10];

	 for (let o of colors) {for (let e of shapes) {for (let a of repeats) {data.push({color: o,repeat: a,shape: e})}}}
	 return data;
  }

  function resetDisplay() {
	 const {color,repeat,shape} = dataShapes[currentIndex];

	 $('#shape').css('background-size','100% 100%')
	 .css('transform','rotate(0deg)')
	 .css('background','none')
	 .css('display','block')
	 .css('left','150px')
	 .css('top','150px')
	 .html(`<p>${color}</p> <p>${shape}</p> <p>${repeat}x${repeat}</p>`);
	 $('#info-bar').text(`Current Index: ${currentIndex}`);
  }

  function setBackgroundWithObject(obj) {
	 obj.shape==='tesseract' ? $('#shape').css('background',`url(images/${obj.shape}.gif)`)
									 : $('#shape').css('background',`url(images/${obj.color}-${obj.shape}.png)`), setBackgroundRepeat(obj.repeat)
  }

  function setBackgroundWithSimple(color,shape,repeat) {
	 $('#shape').css('background',`url(images/${color}-${shape}.png)`), setBackgroundRepeat(repeat)
  }

  function setBackgroundWithMixed(obj,repeat) {
	 $('#shape').css('background',`url(images/${obj.color}-${obj.shape}.png)`), setBackgroundRepeat(repeat)
  }

  function setBackgroundRepeat(repeat) {$('#shape').css('background-size',`${100 / repeat}% ${100 / repeat}%`)}

  function animate() {
	 animationDetails.displayType!==0 && $('#shape').html(''), animationDetails.displayType
	 if (animationDetails.displayType===2) {
		dataShapes[currentIndex].goodBehavior==='bounce' && animateBounce();
		dataShapes[currentIndex].goodBehavior==='blink' && animateBlink();
		dataShapes[currentIndex].goodBehavior==='spin' && animateSpin();
	 } else {
		dataShapes[currentIndex].goodBehavior==='bounce' && (animateBlink(), animateSpin());
		dataShapes[currentIndex].goodBehavior==='blink' && (animateBounce(), animateSpin());
		dataShapes[currentIndex].goodBehavior==='spin' && (animateBounce(), animateBlink());
	 }
  }

  function animateBounce() {
	 $('#shape').css('background-size',`${100 / repeat}% ${100 / repeat}%`);
	 animationDetails.x += animationDetails.speedX, animationDetails.y += animationDetails.speedY;
	 (animationDetails.x + $('#shape').width() + 8>=$('#shape-container').width() || animationDetails.x<2) && (animationDetails.speedX *= -1),
	 (animationDetails.y + $('#shape').height() + 4>=$('#shape-container').height() || animationDetails.y<2) && (animationDetails.speedY *= -1);
	 $('#shape').css('left',animationDetails.x).css('top',animationDetails.y);
  }

  function animateBlink() {
	 animationDetails.showCount--;
	 animationDetails.showCount===0 && (animationDetails.show = !animationDetails.show,
		 animationDetails.show ? $('#shape').css('display','block') : $('#shape').css('display','none'), animationDetails.showCount = 60)
  }

  function animateSpin() {animationDetails.angle += 4, $('#shape').css('transform',`rotate(${animationDetails.angle}deg)`)}
});