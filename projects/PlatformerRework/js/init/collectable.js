(function (window) {
  'use strict';
  window.opspark = window.opspark || {};
  window.opspark.collectable = window.opspark.collectable || {};
  let collectable = window.opspark.collectable,
		type        = {
		  db     : {assetKey: 'db',points: 10},
		  max    : {assetKey: 'max',points: 20},
		  steve  : {assetKey: 'steve',points: 30},
		  grace  : {assetKey: 'grace',points: 40},
		  kennedi: {assetKey: 'kennedi',points: 50},
		};

  window.opspark.collectable.type = type;

  collectable.init = game => {
	 let createCollectable = collectable.create;

	 createCollectable(type.steve,240,440);
	 createCollectable(type.db,535,290);
	 createCollectable(type.max,50,480);
	 createCollectable(type.grace,440,260);
	 createCollectable(type.kennedi,350,210);
  };
})(window);