(window =>
  {
	 window.opspark = window.opspark || {};
	 let animations = {}, spawnX = 30, spawnY = 6.00;

	 window.opspark.createPlayer = game =>
		{
		  let asset       = init(game),
				_direction  = 1,
				_run        = createState('run'),
				_duck       = createDuckState('duck'),
				_idle       = createState('idle'),
				_flyingJump = createFlyingJumpState('flyingJump'),
				_stop       = createStopState('stop'),
				_fire       = createFireState('fire'),
				_die        = createDieState('die'),
				_state      = _idle;

		  function createState (name) {
			 return {
				idle,
				duck,
				run,
				stop,
				fire,
				flyingJump,
				die,
				onKeyUp      : stop,
				onCursorLeft : run,
				onCursorRight: run,
				enter () {asset.body.setSize(22, 95, 0, -3)},
				getName () {return name}
			 };
		  }


		  function createDuckState (name) {
			 let xOffset = -6, yOffset = 0, state = createState(name);
			 state.enter = () =>
				{
				  asset.body.setSize(22, 70, 0, -2);
				  asset.x += xOffset * _direction;
				  asset.y += yOffset;
				};
			 state.exit = () =>
				{
				  asset.x -= xOffset * _direction;
				  asset.y -= yOffset;
				};
			 return state;
		  }

		  function createStopState (name) {
			 let xOffset = 0.5, yOffset = -1, state = createState(name);
			 state.enter = () =>
				{
				  asset.body.setSize(22, 95, 0, -2);
				  asset.x += xOffset * _direction;
				  asset.y += yOffset;
				};
			 state.exit = () =>
				{
				  asset.x -= xOffset * _direction;
				  asset.y -= yOffset;
				};
			 return state;
		  }

		  function createDieState (name) {
			 let xOffset = 8, yOffset = 102, state = createState(name);
			 state.stop = state.duck = state.fire = state.idle = state.walk = state.run = state.stop = state.duck = state.jump = state.flyingJump
				 = doNothing;
			 state.enter = () =>
				{
				  asset.body.setSize(22, 92, 0, -102);
				  asset.x += xOffset;
				  asset.y += yOffset;
				};
			 state.exit = () =>
				{
				  asset.x -= xOffset * _direction;
				  asset.y -= yOffset;
				};
			 return state;
		  }

		  function createFireState (name) {
			 let xOffset = 14, yOffset = 9, state = createState(name);
			 state.fire = state.duck = state.idle = state.walk = state.run = state.stop = state.duck = state.jump = state.flyingJump = doNothing;
			 state.enter = () =>
				{
				  asset.body.setSize(22, 100, 0, -12);
				  asset.x += xOffset * _direction;
				  asset.y += yOffset;
				};
			 state.exit = () =>
				{
				  asset.x -= xOffset * _direction;
				  asset.y -= yOffset;
				};
			 return state;
		  }

		  function createFlyingJumpState (name) {
			 let xOffset = 17, yOffset = 9, state = createState(name);
			 state.fire = state.duck = state.idle = state.walk = state.run = state.stop = state.duck = state.jump = state.flyingJump = doNothing;
			 state.enter = () =>
				{
				  asset.body.bounce.y = 0;
				  game.add.tween(asset.body).to({y: asset.body.y - 100}, 1.0e3, Phaser.Easing.Linear.None, !0)
				  asset.body.velocity.x = 200 * _direction;
				  asset.x += xOffset * _direction;
				  asset.y += yOffset;
				};
			 state.exit = () =>
				{
				  asset.body.bounce.y = 0.4;
				  asset.x -= xOffset * _direction;
				  asset.y -= yOffset;
				};
			 return state;
		  }

		  function idle () {
			 asset.animations.play('idle');
			 setState(_idle);
		  }

		  function die () {
			 asset.animations.play('die');
			 asset.animations.currentAnim.onComplete.addOnce(() => {asset.destroy()}, this);
			 setState(_die);
		  }

		  function run () {
			 asset.scale.x = _direction;
			 asset.body.velocity.x = 200 * _direction;
			 asset.animations.play('run');
			 setState(_run);
		  }

		  function duck () {
			 let duck = animations.duck, onUpdate = (anim, frame) => {frame.index===14 && asset.animations.stop()};

			 duck.enableUpdate = true;
			 duck.onUpdate.add(onUpdate, this);

			 duck.play();
			 asset.animations.currentAnim.onComplete.addOnce(function onComplete ()
																			 {
																				duck.onUpdate.remove(onUpdate, this);
																				stop();
																			 }, this);
			 setState(_duck);
		  }

		  function stop () {
			 asset.animations.play('stop');
			 setState(_stop);
		  }

		  function flyingJump () {
			 let mid = Math.floor(animations.flyingJump.frameTotal / 2), origYOffset = asset.body.offset.y;

			 asset.body.offset.x += 10 * _direction;
			 asset.body.offset.y -= 30;
			 asset.body.y -= 22;
			 let onUpdate = (anim, frame) =>
				{
				  frame.index<52 ? asset.body.offset.y -= 1 : (asset.body.offset.x -= _direction, asset.body.offset.y += 2)
				};

			 animations.flyingJump.enableUpdate = true;
			 animations.flyingJump.onUpdate.add(onUpdate, this);

			 animations.flyingJump.play();
			 setState(_flyingJump);
			 asset.animations.currentAnim.onComplete.addOnce(function onComplete ()
																			 {
																				asset.body.offset.y += 24;
																				animations.flyingJump.onUpdate.remove(onUpdate, this);
																				stop();
																			 }, this);
		  }

		  function fire () {
			 let {fire} = animations, i = 0;
			 fire.enableUpdate = true;
			 let onUpdate = () => {++i};
			 fire.onUpdate.add(onUpdate, this);
			 asset.animations.play('fire');
			 setState(_fire);
			 asset.animations.currentAnim.onComplete.addOnce(() =>
																			 {
																				fire.onUpdate.remove(onUpdate, this);
																				stop();
																			 }, this);
		  }

		  function setState (state) {
			 _state.exit();
			 _state = state;
			 _state.enter();
		  }

		  return {
			 asset,
			 onKeyUp () {_state.onKeyUp()},
			 onCursorRight () {_state.onCursorRight()},
			 onCursorLeft () {_state.onCursorLeft()},
			 run () {_state.run()},
			 duck () {_state.duck()},
			 idle () {_state.idle()},
			 fire () {_state.fire()},
			 flyingJump () {_state.flyingJump()},
			 stop () {_state.stop()},
			 die () {_state.die()},
			 getStateName () {return _state.getName()},
			 setState,
			 setDirection (direction) {_direction = direction}
		  };
		};


	 function init (game) {
		let asset = game.add.sprite(spawnX, spawnY, 'halle');
		asset.anchor.setTo(0.5, 1);

		animations.walk = asset.animations.add('walk', Phaser.Animation.generateFrameNames('walk-', 1, 30, '.png', 4), 30, !0);
		animations.duck = asset.animations.add('duck', Phaser.Animation.generateFrameNames('duck-', 1, 28, '.png', 4), 30, !1);
		animations.jump = asset.animations.add('jump', Phaser.Animation.generateFrameNames('jump-', 1, 24, '.png', 4), 30, !1);
		animations.run = asset.animations.add('run', Phaser.Animation.generateFrameNames('run-', 1, 21, '.png', 4), 30, !0);
		animations.flyingJump = asset.animations.add('flying-jump', Phaser.Animation.generateFrameNames('flying-jump-', 1, 48, '.png', 4), 30, !1);
		animations.fire = asset.animations.add('fire', Phaser.Animation.generateFrameNames('lazer-', 1, 31, '.png', 4), 30, !1);
		animations.stop = asset.animations.add('stop', Phaser.Animation.generateFrameNames('stop-', 1, 2, '.png', 4), 30, !0);
		animations.idle = asset.animations.add('idle', Phaser.Animation.generateFrameNames('front-idle-', 1, 179, '.png', 4), 30, !0);
		animations.die = asset.animations.add('die', Phaser.Animation.generateFrameNames('front-death-', 1, 64, '.png', 4), 30, !1);

		game.player = asset;
		game.physics.arcade.enable(asset);

		asset.body.bounce.y = 0.4;
		asset.body.gravity.y = 900;
		asset.body.setSize(22, 95, 0, -3);
		asset.body.collideWorldBounds = true;

		return asset;
	 }
  })(window);