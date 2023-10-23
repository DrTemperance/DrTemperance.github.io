/* global Phaser */
(function (window) {
	  'use strict';
	  window.opspark = window.opspark || {};
	  let opspark = window.opspark;

	  opspark.createPlayerManager = function (player,game) {
		 let asset   = player.asset,
			  cursors = game.cursors = game.input.keyboard.createCursorKeys();
		 game.input.keyboard.addCallbacks(this,onDown,onUp,onPress);
		 const wKey    = game.input.keyboard.addKey(Phaser.Keyboard.W),
				 aKey    = game.input.keyboard.addKey(Phaser.Keyboard.A),
				 sKey    = game.input.keyboard.addKey(Phaser.Keyboard.S),
				 dKey    = game.input.keyboard.addKey(Phaser.Keyboard.D),
				 fireKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		 function onDown() {}

		 function onUp() {player.stop();}

		 function onPress() {
			game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
			fireKey.onDown.add(fire,player.asset);
		 }

		 function fire() {player.fire();}

		 const update = () => {
			// todo : fix states to include velocity or keyup/cursorLeft
			if (asset.body && player.getStateName()!=='flyingJump') {asset.body.velocity.x = 0;}
			if (cursors.left.isDown || aKey.isDown) {
			  player.setDirection(-1);
			  player.run();
			} else if (cursors.right.isDown || dKey.isDown) {
			  player.setDirection(1);
			  player.run();
			} else if (cursors.down.isDown || sKey.isDown) {player.duck();}

			if ((cursors.up.isDown || wKey.isDown) && asset.body.touching.down) {player.flyingJump();}
		 };

		 return {update};
	  };
	}
)
(window);