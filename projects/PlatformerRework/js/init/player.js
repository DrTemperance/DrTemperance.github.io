(window =>
  {
	 window.opspark = window.opspark || {};
	 window.opspark.player = window.opspark.player || {};

	 window.opspark.player.init = game =>
		{
		  game.player = window.opspark.createPlayer(game);
		  game.playerManager = window.opspark.createPlayerManager(game.player, game);
		};
  })(window);