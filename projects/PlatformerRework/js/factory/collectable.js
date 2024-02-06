(window =>
  {
	 window.opspark = window.opspark || {}, window.opspark.collectable = window.opspark.collectable || {};

	 window.opspark.collectable.factory = game =>
		{
		  game.collectable = game.add.group();
		  game.collectable.enableBody = true;

		  window.opspark.collectable.create = (type, x, y, gravity, bounce) =>
			 {
				let collectable = game.collectable.create(x, y, type.assetKey);
				collectable.type = type;

				switch (type.assetKey) {
				  case 'big':
					 collectable.body.height = 44;
					 break;
				  default:
					 collectable.scale.x = collectable.scale.y = 0.9;
				}
				gravity && (collectable.body.gravity.y = gravity);
				bounce && (collectable.body.bounce.y = bounce + Math.random() * 0.2);
			 };
		};
  })(window);