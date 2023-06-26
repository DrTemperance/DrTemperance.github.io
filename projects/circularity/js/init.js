var init = function (window) {
  "use strict";
  var draw = window.opspark.draw,
    physikz = window.opspark.racket.physikz,
    app = window.opspark.makeApp(),
    canvas = app.canvas,
    view = app.view,
    fps = draw.fps("#fff");

  window.opspark.makeGame = function () {
    window.opspark.game = {};
    var game = window.opspark.game;

    var circle;
    var circles = [];

    function drawCircle() {
      circle = draw.randomCircleInArea(canvas, true, true, "#999", 2);
      physikz.addRandomVelocity(circle, canvas, 2, 2);
      view.addChild(circle);
      circles.push(circle);
    }

    for (var circleCount = 0; circleCount < 100; circleCount++) {
      drawCircle();
    }

    function update() {
      for (var i = 0; i < circles.length; i++) {
        physikz.updatePosition(circles[i]);
        game.checkCirclePosition(circles[i]);
      }
    }

    game.checkCirclePosition = function (circle) {
      var rightEdge = circle.x + circle.radius;
      var leftEdge = circle.x - circle.radius;
      var bottomEdge = circle.y + circle.radius;
      var topEdge = circle.y - circle.radius;
      if (leftEdge > canvas.width) {
        circle.x = 0 - circle.radius;
      } else if (rightEdge < 0) {
        circle.x = canvas.width + circle.radius;
      }
      if (topEdge > canvas.height) {
        circle.y = 0 - circle.radius;
      } else if (bottomEdge < 0) {
        circle.y = canvas.height + circle.radius;
      }
    };

    view.addChild(fps);
    app.addUpdateable(fps);

    game.circle = circle;
    game.circles = circles;
    game.drawCircle = drawCircle;
    game.update = update;

    app.addUpdateable(window.opspark.game);
  };
};

if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  module.exports = init;
}
