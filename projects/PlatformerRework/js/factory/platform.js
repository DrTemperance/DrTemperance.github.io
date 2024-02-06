(window =>
  {
	 window.opspark = window.opspark || {}, window.opspark.platform = window.opspark.platform || {};

	 window.opspark.platform.factory = game =>
		{
		  game.platforms = game.add.group();
		  game.platforms.enableBody = true;

		  window.opspark.platform.create = (x, y, scaleX, scaleY, immovable) =>
			 {
				let platform = game.platforms.create(x, y, 'platform');
				platform.scale.setTo(scaleX || 1, scaleY || 1);
				platform.body.immovable = immovable || true;
				return platform;
			 };
		};
  })(window);