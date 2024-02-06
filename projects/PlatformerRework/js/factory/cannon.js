(window =>
  {
	 window.opspark = window.opspark || {}, window.opspark.cannon = window.opspark.cannon || {};

	 window.opspark.cannon.factory = game =>
		{
		  game.cannon = game.add.group();
		  game.projectile = game.add.group();
		  game.projectile.enableBody = !0;

		  function createProjectile (x, y) {
			 let projectile = game.projectile.create(x, y, 'projectile');
			 projectile.anchor.setTo(0.5, 0.5);
			 projectile.alpha = 0;
			 game.physics.arcade.enable(projectile);
			 return projectile;
		  }

		  const configureTween = ({onStart, onComplete}, {alpha, x: px, y: py}, {x: cx, y: cy}) =>
			 {
				onStart.addOnce(() => {projectile.alpha = 1});
				onComplete.addOnce(() => {alpha = 0, px = cx, py = cy});
			 };

		  window.opspark.cannon.create = (type, position, delay) =>
			 {

				if ((type==='top' || type==='bottom') && (position<0 || position>game.world.width)) {throw new Error(`You are trying to place a cannon off the stage at ${position}, this is not allowed!`)}
				if ((type==='right' || type==='left') && (position<0 || position>game.world.height)) {throw new Error(`You are trying to place a cannon off the stage at ${position}, this is not allowed!`)}

				let tweenTo = {}, cannon, projectile, tween, x, y, angle;

				switch (type) {
				  case 'top':
					 x = position, y = 40, angle = -180;
					 tweenTo.y = game.world.height;
					 break;
				  case 'bottom':
					 x = position, y = game.world.height - 72, angle = 0;
					 tweenTo.y = 0;
					 break;
				  case 'left':
					 x = 42, y = position, angle = 90;
					 tweenTo.x = game.world.width;
					 break;
				  case 'right':
					 x = game.world.width - 42, y = position, angle = -90;
					 tweenTo.x = 0
					 break;
				  default:
					 throw new Error(`${type} is not a valid cannon type`);
				}

				cannon = game.cannon.create(x, y, 'cannon');
				cannon.anchor.setTo(0.5, 0.5);
				cannon.angle = angle;

				projectile = game.projectile.create(cannon.x, cannon.y, 'projectile');
				projectile.anchor.setTo(0.5, 0.5);
				projectile.angle = angle;
				projectile.alpha = 0;

				tween = game.add.tween(projectile).to(tweenTo, 2000, null, !0, delay || 0, -1);
				configureTween(tween, projectile, cannon);
				return cannon;
			 };
		};
  })(window);