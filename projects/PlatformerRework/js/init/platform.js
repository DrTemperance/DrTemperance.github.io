(function (window) {
  'use strict';
  window.opspark = window.opspark || {};
  window.opspark.platform = window.opspark.platform || {};

  let platform = window.opspark.platform;

  platform.init = game => {
	 let createPlatform = platform.create;

	 createPlatform(0,game.world.height - 32,3,2);
	 createPlatform(200,520,1.25);
	 createPlatform(200,490);
	 createPlatform(800,580);
	 createPlatform(200,0,.05,15.3);
	 createPlatform(675,390);
	 createPlatform(500,340,.25);
  };
})(window);