(window => {
  window.opspark = window.opspark || {};

  window.opspark.createGame = (create,update,renderDebug) => {
	 let game,config = {preload: window.opspark.preload,create,update};

	 const render = () => {
		game.debug.bodyInfo(game.player.asset,32,32);
		game.debug.spriteBounds(game.player.asset);
		game.debug.body(game.player.asset);
		game.projectile && game.projectile.forEach(e => game.debug.body(e))
	 };

	 renderDebug && (config.render = render)
	 game = new Phaser.Game(900,700,Phaser.AUTO,'',config);

	 game.opspark = {
		init: () => {
		  game.stage.backgroundColor = '#E9EEF7';
		  game.physics.startSystem(Phaser.Physics.ARCADE);
		  game.physics.arcade.TILE_BIAS = 2;
		},
	 };
	 return game;
  };
})(window);