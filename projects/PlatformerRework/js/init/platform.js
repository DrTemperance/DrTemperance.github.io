(window => {
  window.opspark = window.opspark || {};
  window.opspark.platform = window.opspark.platform || {};

  window.opspark.platform.init = game => {
	 window.opspark.platform.create(0,game.world.height - 32,3,2);
	 window.opspark.platform.create(200,520,1.25);
	 window.opspark.platform.create(200,490);
	 window.opspark.platform.create(800,580);
	 window.opspark.platform.create(200,0,.05,15.3);
	 window.opspark.platform.create(675,390);
	 window.opspark.platform.create(500,340,.25);
  };
})(window);