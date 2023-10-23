(function (window) {
  'use strict';
  window.opspark = window.opspark || {};
  window.opspark.collectable = window.opspark.collectable || {};
  let cannon = window.opspark.cannon;

  cannon.init = game => {
	 let createCannon = cannon.create;
	 createCannon('top',450);
	 createCannon('right',530,200);
	 createCannon('top',600,1000);
	 createCannon('left',360);
	 createCannon('right',650,5000);
  };
})(window);