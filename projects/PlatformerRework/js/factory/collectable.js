(function (window) {
  'use strict';
  window.opspark = window.opspark || {};
  let opspark = window.opspark;
  window.opspark.collectable = window.opspark.collectable || {};

  opspark.collectable.factory = game => {
	 game.collectable = game.add.group();
	 game.collectable.enableBody = true;

	 opspark.collectable.create = (type,x,y,gravity,bounce) => {
		let collectable = game.collectable.create(x,y,type.assetKey);
		collectable.type = type;

		switch (type.assetKey) {
		  case 'db':
			 collectable.body.height = 44;
			 break;

		  case 'grace':
		  case 'kennedi':
			 collectable.scale.x = collectable.scale.y = 0.9;
			 break;

		  default:
			// code
		}
		if (gravity) {collectable.body.gravity.y = gravity;}
		if (bounce) {collectable.body.bounce.y = bounce + Math.random() * 0.2;}
	 };
  };
})(window);