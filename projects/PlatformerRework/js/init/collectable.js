(window => {
  window.opspark = window.opspark || {};
  window.opspark.collectable = window.opspark.collectable || {};
  let type = {
	 big  : {assetKey: 'big',points: 10},
	 one  : {assetKey: 'one',points: 20},
	 two  : {assetKey: 'two',points: 30},
	 three: {assetKey: 'three',points: 40},
	 four : {assetKey: 'four',points: 50},
  };

  window.opspark.collectable.type = type;

  window.opspark.collectable.init = game => {
	 window.opspark.collectable.create(type.big,535,290);
	 window.opspark.collectable.create(type.one,50,480);
	 window.opspark.collectable.create(type.two,240,440);
	 window.opspark.collectable.create(type.three,440,260);
	 window.opspark.collectable.create(type.four,350,210);
  };
})(window);