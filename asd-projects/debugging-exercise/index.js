document.addEventListener('DOMContentLoaded',() => {

  let doubleMaxSpeed = 5,
      maxCircles     = 10,
      $board         = $('#board'),
      boardWidth     = $($board).width(),
      boardHeight    = $($board).height(),
      circles        = [],
      circleRadius   = 10;

  for (let i = 0; i<maxCircles; i++) {
    let newId = getId(i),newCircle = makeCircle(newId);
    circles.push(newCircle);

    addNewCircleElement(newCircle,newId);
  }

  setInterval(update,16);

  function makeCircle(id) {
    let circle = {},
        maxX   = boardWidth - circleRadius * 2,
        maxY   = boardHeight - circleRadius * 2;
    circle.id = `#${id}`;
    circle.x = Math.random() * maxX + circleRadius;
    circle.y = Math.random() * maxY + circleRadius;
    circle.speedX = decideSpeed();
    circle.speedY = decideSpeed();
    return circle;
  }

  function decideSpeed() {return doubleMaxSpeed - Math.random() * doubleMaxSpeed / 2;}

  function getId(number) {return `circle${number}`;}

  function addNewCircleElement(circle,id) {
    let $circle = $('<div>').attr('id',id).css('left',circle.x).css('top',circle.y).addClass('circle');
    $circle.appendTo($board);
  }

  function update() {
    for (let c of circles) {
      moveCircle(c);
      bounceCircle(c);
      updateCircleOnScreen(c);
    }
  }

  function moveCircle(circle) {
    circle.x += circle.speedX;
    circle.y += circle.speedY;
  }

  function bounceCircle(circle) {

    if (circle.x<0 || circle.x>boardWidth) {
      circle.x -= circle.speedX;
      circle.speedX *= -1;
    }
    if (circle.y<0 || circle.y>boardHeight) {
      circle.y -= circle.speedY;
      circle.speedY *= -1;
    }
  }

  function updateCircleOnScreen(circle) {
    maxCircles = 10;

    $(circle.id).css('left',circle.x);
    $(circle.id).css('top',circle.y);
  }
});