(window =>
  {
	 window.opspark = window.opspark || {};

	 window.opspark.createPlayerManager = (player, game) =>
		{
		  game.cursors = game.input.keyboard.createCursorKeys();
		  game.input.keyboard.addCallbacks(this, onDown, player.stop(), onPress);
		  const wKey    = game.input.keyboard.addKey(Phaser.Keyboard.W),
				  aKey    = game.input.keyboard.addKey(Phaser.Keyboard.A),
				  sKey    = game.input.keyboard.addKey(Phaser.Keyboard.S),
				  dKey    = game.input.keyboard.addKey(Phaser.Keyboard.D),
				  fireKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		  function onPress () {
			 game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
			 fireKey.onDown.add(player.fire(), player.asset);
		  }

		  const update = () =>
			 {
				player.asset.body && player.getStateName()!=='flyingJump' && (player.asset.body.velocity.x = 0)
				if (game.cursors.left.isDown ? game.cursors.left.isDown : aKey.isDown) {player.setDirection(-1), player.run()}
				if (game.cursors.right.isDown ? game.cursors.right.isDown : dKey.isDown) {player.setDirection(1), player.run()}
				if (game.cursors.down.isDown ? game.cursors.down.isDown : sKey.isDown) {player.duck()}
				if (game.cursors.up.isDown ? game.cursors.up.isDown : wKey.isDown) {player.asset.body.touching.down && player.flyingJump()}
			 };

		  return {update};
		};
  })(window);