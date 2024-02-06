(window =>
  {
	 window.opspark = window.opspark || {};
	 window.opspark.collectable = window.opspark.collectable || {};

	 window.opspark.cannon.init = game =>
		{
		  const {cannon} = window.opspark;
		  cannon.create('top', 450);
		  cannon.create('right', 530, 200);
		  cannon.create('top', 600, 1000);
		  cannon.create('left', 360);
		  cannon.create('right', 650, 5000);
		};
  })(window);