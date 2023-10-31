(window => {
  window.opspark = window.opspark || {};
  window.opspark.collectable = window.opspark.collectable || {};

  window.opspark.cannon.init = game => {
	 window.opspark.cannon.create('top',450);
	 window.opspark.cannon.create('right',530,200);
	 window.opspark.cannon.create('top',600,1000);
	 window.opspark.cannon.create('left',360);
	 window.opspark.cannon.create('right',650,5000);
  };
})(window);