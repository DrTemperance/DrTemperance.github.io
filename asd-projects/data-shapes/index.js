$(document).ready(() => {

   $('#cycle-left').on('click', () => {
      currentIndex = currentIndex ? currentIndex - 1 : dataShapes.length - 1;
      resetDisplay();
   });
   $('#cycle-right').on('click', () => {
      currentIndex = currentIndex === dataShapes.length - 1 ? 0 : currentIndex + 1;
      resetDisplay();
   });
   $('#execute1').on('click', () => {
      // TODO 3-b: call your handleStatic function
   });
   $('#execute2').on('click', () => {
      // TODO 4-b: call your handleGood function
   });
   $('#execute3').on('click', () => {
      // TODO 5-b: call your handleBad function
   });

   setInterval(animate, 1e3 / 60);

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

   // TODO 0 complete <3

   let shape = {
      color : 'blue',
      shape : 'circle',
      repeat: 3,
   };

   // TODO 2: add a new property to all data shapes

   // TODO 3-a: add a function that handles the static display type

   // TODO 4-a: add a function that handles the good display type

   // TODO 5-a: add a function that handles the bad display type

   /////////////////////////////////////////////////
   // BUTTON HANDLERS BELOW HERE (3-b, 4-b, 5-b) ///
   /////////////////////////////////////////////////

   const generateShapeData = () => {
      const data    = [],
            colors  = ['red', 'green', 'blue'],
            shapes  = ['square', 'triangle', 'circle'],
            repeats = [1, 2, 3];

      for (c of colors) {
         for (s of shapes) {
            for (r of repeats) {
               const newObj = {
                  color : c,
                  shape : s,
                  repeat: r,
               };
               data.push(newObj);
            }
         }
      }
   }
   return data;
});

function resetDisplay() {
   const shapeData = dataShapes[currentIndex];

   $('#shape').css('background', 'none');
   $('#shape').css('display', 'block');
   $('#shape').css('background-size', '100% 100%');
   $('#shape').css('left', '150px');
   $('#shape').css('top', '150px');
   $('#shape').css('transform', 'rotate(0deg)');
   $('#shape').html(
      `<p>${shapeData.color}</p> <p>${shapeData.shape}</p> <p>${shapeData.repeat}x${shapeData.repeat}</p>`,
   );

   $('info-bar').text = `Current index: ${currentIndex}`;

   // Reset the JavaScript Data
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
   $('#shape').css('background', `url(images/${obj.color}-${obj.shape}.png)`);
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
   if (0 !== animationDetails.displayType) {
      $('#shape').html('')
   }
   if (2 > animationDetails.displayType) return;
   if (2 === animationDetails.displayType) {
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
            animateBlink(), animateSpin();
            break;
         case 'blink':
            animateBounce(), animateSpin();
            break;
         case 'spin':
            animateBounce(), animateBlink();
            break;
      }
   }
}

const animateBounce = () => {
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

const animateBlink = () => {
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

const animateSpin = () => {
   animationDetails.angle += 4;
   $('#shape').css('transform', `rotate(${animationDetails.angle}deg)`);
}