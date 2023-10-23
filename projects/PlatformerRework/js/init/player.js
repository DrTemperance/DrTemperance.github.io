(function (window) {
  'use strict';
  window.opspark = window.opspark || {};
  window.opspark.player = window.opspark.player || {};
  let player = window.opspark.player,opspark = window.opspark;

  player.init = game => {
	 game.player = opspark.createPlayer(game);
	 game.playerManager = opspark.createPlayerManager(game.player,game);
  };
})(window);