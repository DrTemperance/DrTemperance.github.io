(function (window) {
  "use strict";
  window.opspark = window.opspark || {};
  let opspark = window.opspark;

  opspark.preload = function (game) {
    game.load.image("cannon", "./images/cannon.png");
    game.load.image("projectile", "./images/projectile.png");
    game.load.image("platform", "./images/platform.png");
    game.load.image("db", "./images/collectables/database.png");
    game.load.image("steve", "./images/collectables/1.png");
    game.load.image("grace", "./images/collectables/2.png");
    game.load.image("kennedi", "./images/collectables/3.png");
    game.load.image("max", "./images/collectables/4.png");
    game.load.atlas(
      "halle",
      "./images/halle/phaser-json-array/halle.png",
      "./images/halle/phaser-json-array/halle.json"
    );
  };
})(window);
