(window => {
  window.opspark = window.opspark || {};

  window.opspark.preload = game => {
	 game.load.image('cannon','./asset/cannon.png');
	 game.load.image('projectile','./asset/projectile.png');
	 game.load.image('platform','./asset/platform.png');
	 game.load.image('big','./asset/collectable/big-collectable.png');
	 game.load.image('one','./asset/collectable/collectable-1.png');
	 game.load.image('two','./asset/collectable/collectable-2.png');
	 game.load.image('three','./asset/collectable/collectable-3.png');
	 game.load.image('four','./asset/collectable/collectable-4.png');
	 game.load.atlas('player','./asset/player/phaser-json-array/player.png','./asset/halle/phaser-json-array/player.json');
  };
})(window);