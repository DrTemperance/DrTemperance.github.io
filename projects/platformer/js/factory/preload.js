!(function (a) {
  "use strict";
  a.opspark = a.opspark || {};
  a.opspark.preload = function (a) {
    [
      { key: "cannon", path: "./images/cannon.png" },
      { key: "projectile", path: "./images/projectile.png" },
      { key: "platform", path: "./images/platform.png" },
      { key: "db", path: "./images/collectables/database.png" },
      { key: "1", path: "./images/collectables/1.png" },
      { key: "2", path: "./images/collectables/2.png" },
      { key: "3", path: "./images/collectables/3.png" },
      { key: "4", path: "./images/collectables/4.png" },
    ].forEach((e) => {
      a.load.image(e.key, e.path);
    }),
      a.load.atlas(
        "halle",
        "./images/halle/phaser-json-array/halle.png",
        "./images/halle/phaser-json-array/halle.json"
      );
  };
})(window);
