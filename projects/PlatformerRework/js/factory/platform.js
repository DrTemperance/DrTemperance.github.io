(function (window) {
  'use strict';
  window.opspark = window.opspark || {};
  let opspark = window.opspark;
  window.opspark.platform = window.opspark.platform || {};

  opspark.platform.factory = game => {
	 game.platforms = game.add.group();
	 game.platforms.enableBody = !0;

	 opspark.platform.create = (x,y,scaleX,scaleY,immovable) => {
		let platform = game.platforms.create(x,y,'platform');
		platform.scale.setTo(scaleX || 1,scaleY || 1);
		platform.body.immovable = immovable || !0;
		return platform;
	 };
  };
})(window);