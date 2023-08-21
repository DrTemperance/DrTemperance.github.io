/* global Phaser */
"use strict";
(function (window) {
  window.opspark = window.opspark || {};
  let opspark = window.opspark,
    animations = {},
    spawnX = 30,
    spawnY = 600;

  opspark.createPlayer = function (game) {
    let asset = init(game),
      _direction = 1,
      _run = createState("run"),
      _duck = createDuckState("duck"),
      _idle = createState("idle"),
      _flyingJump = createFlyingJumpState("flyingJump"),
      _stop = createStopState("stop"),
      _fire = createFireState("fire"),
      _die = createDieState("die"),
      _state = _idle;

    function createState(name) {
      return {
        idle,
        walk: doNothing,
        duck,
        run,
        stop,
        fire,
        jump: doNothing,
        flyingJump,
        die,
        onKeyUp: stop,
        onCursorLeft: run,
        onCursorRight: run,
        enter: () => {
          console.log(`entering ${name}`);
          const { body } = asset;
          body.setSize(22, 95, 0, -3);
        },
        exit: doNothing,
        getName: () => name,
      };
    }

    function createDuckState(name) {
      const xOffset = -6;
      const yOffset = 0;
      const state = createState(name);

      state.duck = doNothing;

      state.enter = () => {
        console.log(`entering ${name}`);
        asset.body.setSize(22, 70, 0, -2);
        asset.x += xOffset * _direction;
        asset.y += yOffset;
      };

      state.exit = function () {
        asset.x -= xOffset * _direction;
        asset.y -= yOffset;
      };

      return state;
    }

    function createStopState(name) {
      const xOffset = 0.5;
      const yOffset = -1;

      const state = createState(name);

      state.stop = doNothing;

      state.enter = () => {
        console.log(`entering ${name}`);
        asset.body.setSize(22, 95, 0, -2);
        asset.x += xOffset * _direction;
        asset.y += yOffset;
      };

      state.exit = () => {
        asset.x -= xOffset * _direction;
        asset.y -= yOffset;
      };

      return state;
    }

    function createDieState(name) {
      const xOffset = 8;
      const yOffset = 102;

      const state = createState(name);

      state.stop = state.duck = state.fire = state.idle = state.walk = state.run = state.stop = state.duck = state.jump = state.flyingJump = doNothing;

      state.enter = function () {
        console.log(`entering ${name}`);
        asset.body.setSize(22, 92, 0, -102);
        asset.x += xOffset;
        asset.y += yOffset;
      };

      const exit = () => {
        const newX = asset.x - (xOffset * _direction);
        const newY = asset.y - yOffset;
        return { x: newX, y: newY };
      };

      state.exit = exit();

      return state;
    }

    function createFireState(name) {
      const xOffset = 14;
      const yOffset = 9;

      const state = createState(name);

      const doNothing = () => { };

      state.fire = doNothing;
      state.duck = doNothing;
      state.idle = doNothing;
      state.walk = doNothing;
      state.run = doNothing;
      state.stop = doNothing;
      state.duck = doNothing;
      state.jump = doNothing;
      state.flyingJump = doNothing;

      state.enter = function () {
        console.log(`entering ${name}`);
        asset.body.setSize(22, 100, 0, -12);
        asset.x += xOffset * _direction;
        asset.y += yOffset;
      };

      state.exit = function () {
        asset.x -= xOffset * _direction;
        asset.y -= yOffset;
      };

      return state;
    }

    function createFlyingJumpState(name) {
      const xOffset = 17;
      const yOffset = 9;
      const state = createState(name);

      state.fire = state.duck = state.idle = state.walk = state.run = state.stop = state.duck = state.jump = state.flyingJump = doNothing;

      state.enter = function () {
        console.log(`entering ${name}`);
        asset.body.bounce.y = 0;
        game.add.tween(asset.body).to({ y: asset.body.y - 100 }, 1000, Phaser.Easing.Linear.None, true);
        asset.body.velocity.x = 200 * _direction;
        asset.x += xOffset * _direction;
        asset.y += yOffset;
      };

      state.exit = function () {
        asset.body.bounce.y = 0.4;
        asset.x -= xOffset * _direction;
        asset.y -= yOffset;
      };

      return state;
    }

    /**
     * Transition to the idle state.
     */
    function idle() {
      asset.animations.play("idle");
      setState(_idle);
    }

    /**
     * Transition to the die state.
     */
    function die() {
      asset.animations.play("die");
      asset.animations.currentAnim.onComplete.addOnce(onDieComplete, this);
      setState(_die);
    }

    /**
     * Callback function when die animation is complete.
     */
    function onDieComplete() {
      console.log("die complete!");
      asset.destroy();
    }

    /**
     * Transition to the run state.
     */
    function run() {
      const velocity = 200 * _direction;
      asset.scale.x = _direction;
      asset.body.velocity.x = velocity;
      asset.animations.play("run");
      setState(_run);
    }

    /**
     * Transition to the duck state.
     */
    function duck() {
      const duck = animations.duck;

      const onUpdate = (anim, frame) => {
        console.log(frame.index);
        // todo : remove magic number 14 //
        if (frame.index === 14) {
          asset.animations.stop();
        }
      };

      duck.enableUpdate = true;
      duck.onUpdate.add(onUpdate, this);

      duck.play();

      const onComplete = () => {
        console.log("duck complete");
        duck.onUpdate.remove(onUpdate, this);
        stop();
      };

      asset.animations.currentAnim.onComplete.addOnce(onComplete, this);

      setState(_duck);
    }

    /**
     * Tranistion to the stop state.
     */
    function stop() {
      asset.animations.play("stop");
      setState(_stop);
    }

    /**
     * Transition to the flying-jump state.
     */
    function flyingJump() {
      const flyingJump = animations.flyingJump;
      const mid = Math.floor(flyingJump.frameTotal / 2);
      const origYOffset = asset.body.offset.y;
      console.log(`total frames: ${flyingJump.frameTotal}`);
      console.log(`origYOffset: ${origYOffset}`);

      asset.body.offset.x += 10 * _direction;
      asset.body.offset.y -= 30;
      asset.body.y -= 22;

      flyingJump.enableUpdate = true;
      flyingJump.onUpdate.add(onUpdate, this);

      flyingJump.play();
      setState(_flyingJump);

      asset.animations.currentAnim.onComplete.addOnce(() => {
        console.log("jump complete");
        asset.body.offset.y += 24;
        flyingJump.onUpdate.remove(onUpdate, this);
        stop();
      }, this);

      function onUpdate(anim, frame) {
        console.log(frame.index);
        if (frame.index < 52) {
          console.log(`up y offset: ${asset.body.offset.y}`);
          asset.body.offset.y -= 1;
        } else {
          console.log(`down y offset: ${asset.body.offset.y}`);
          asset.body.offset.x -= 1 * _direction;
          asset.body.offset.y += 2;
        }
      }
    }

    /**
     * Transition to the fire state.
     */
    function fire() {
      const fire = animations.fire;
      fire.enableUpdate = true;
      let i = 0;
      const onUpdate = (anim, frame) => {
        console.log(i);
        i++;
      };
      fire.onUpdate.add(onUpdate, this);
      asset.animations.play("fire");
      setState(_fire);
      asset.animations.currentAnim.onComplete.addOnce(() => {
        console.log("fire complete!");
        fire.onUpdate.remove(onUpdate, this);
        stop();
      }, this);
    }

    const setState = (state) => {
      _state.exit();
      _state = state;
      _state.enter();
    };

    return {
      asset: asset,
      onKeyUp: function () {
        _state.onKeyUp();
      },
      onCursorRight: function () {
        _state.onCursorRight();
      },
      onCursorLeft: function () {
        _state.onCursorLeft();
      },
      run: function () {
        _state.run();
      },
      duck: function () {
        _state.duck();
      },
      idle: function () {
        _state.idle();
      },
      fire: function () {
        _state.fire();
      },
      flyingJump: function () {
        _state.flyingJump();
      },
      stop: function () {
        _state.stop();
      },
      die: function () {
        _state.die();
      },
      getStateName: function () {
        return _state.getName();
      },
      setState: setState,
      setDirection(direction) {
        _direction = direction;
      },
    };
  };

  /**
   * doNothing: Prevents state transitions.
   */
  function doNothing() {
    console.log("doing nothing!");
  }

  function init(game) {
    const asset = game.add.sprite(spawnX, spawnY, "halle");
    asset.anchor.setTo(0.5, 1);

    const animations = {
      walk: createAnimation("walk-", 1, 30),
      duck: createAnimation("duck-", 1, 28, false),
      jump: createAnimation("jump-", 1, 24, false),
      run: createAnimation("run-", 1, 21),
      flyingJump: createAnimation("flying-jump-", 1, 48, false),
      fire: createAnimation("lazer-", 1, 31, false),
      stop: createAnimation("stop-", 1, 2),
      idle: createAnimation("front-idle-", 1, 179),
      die: createAnimation("front-death-", 1, 64, false),
    };

    Object.values(animations).forEach((animation) => {
      asset.animations.add(animation.name, animation.frames, 30, animation.loop);
    });

    game.player = asset;
    game.physics.arcade.enable(asset);

    asset.body.bounce.y = 0.4;
    asset.body.gravity.y = 900;
    asset.body.setSize(22, 95, 0, -3);
    asset.body.collideWorldBounds = true;

    return asset;
  }

  const createAnimation = (prefix, start, end, loop = true) => ({
    name: prefix.slice(0, -1),
    frames: Array.from({ length: end - start + 1 }, (_, i) => `${prefix}${start + i}.png`),
    loop
  });
})(window);
