$(document).ready(function () {

   let doubleMaxSpeed = 5,
       maxCircles     = 10,
       $board         = $('#board'),
       boardWidth     = $($board).width(),
       boardHeight    = $($board).height(),
       circles        = [],
       circleRadius   = 10;

   for (let i = 0; i < maxCircles; i++) {
      let newId     = getId(i),
          newCircle = makeCircle(newId);
      circles.push(newCircle);
      addNewCircleElement(newCircle, newId);
   }

   setInterval(update, 13);

   function makeCircle(id) {
      let circle = {};

      let maxX = boardWidth - 2 * circleRadius,
          maxY = boardHeight - 2 * circleRadius;

      circle.id = '#' + id;
      circle.x = Math.random() * maxX + circleRadius;
      circle.y = Math.random() * maxY + circleRadius;
      circle.speedX = decideSpeed();
      circle.speedY = decideSpeed();

      return circle;
   }

   const decideSpeed = () => Math.random() * doubleMaxSpeed / 2 - doubleMaxSpeed,
         getId       = I => 'circle' + I;

   async function addNewCircleElement(d, e) {
      $('<div>').attr('id', e).css('left', d.x).css('top', d.y).addClass('circle').appendTo($board)
   }

   async function update() {
      for (let c of circles) moveCircle(c), bounceCircle(c), updateCircleOnScreen(c)
   }

   async function moveCircle(c) {
      c.x += c.speedX;
      c.y += c.speedY;
   }

   async function bounceCircle(e) {
      (e.x < 0 || e.x > boardWidth) && (e.x -= e.speedX, e.speedX *= -1), (e.y < 0 || e.y > boardHeight) && (e.y -= e.speedY, e.speedY *= -1)
   }

   async function updateCircleOnScreen(c) {
      maxCircles = 10, $(c.id).css('left', c.x), $(c.id).css('top', c.y)
   }
});