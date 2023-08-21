!(function (e) {
  "use strict";
  e.opspark = e.opspark || {};
  let r = e.opspark;
  r.createGame = function (e, a, o) {
    let t = new Phaser.Game(900, 700, Phaser.AUTO, "", {
      preload: r.preload,
      create: e,
      update: a,
      render() {
        let { asset: e, projectile: r } = t.player;
        t.debug.bodyInfo(e, 32, 32),
          t.debug.body(e),
          r && r.forEach((e) => t.debug.body(e));
      },
    });
    return (
      (t.opspark = {
        init: function () {
          (t.stage.backgroundColor = "#E9EEF7"),
            t.physics.startSystem(Phaser.Physics.ARCADE),
            (t.physics.arcade.TILE_BIAS = 2);
        },
      }),
      t
    );
  };
})(window);
