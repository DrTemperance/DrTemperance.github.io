let ready = $(document).ready(() => {
  let game  = window.opspark.createGame(create, update),
		lives = 5;

  function create() {
	 game.opspark.init();

	 window.opspark.platform.factory(game);
	 window.opspark.platform.init(game);

	 window.opspark.collectable.factory(game);
	 window.opspark.collectable.init(game);

	 window.opspark.cannon.factory(game);
	 window.opspark.cannon.init(game);

	 window.opspark.player.init(game);

	 game.score = game.add.text(16,16,`Score: 0`,{fontSize: '32px',fill: '#000'});
	 game.lives = game.add.text(16,70,`Lives: ${lives}`,{fontSize: '32px',fill: '#000'});
  }


  function update() {
	 game.physics.arcade.collide(game.player.asset,game.platforms);
	 game.physics.arcade.collide(game.player.asset,game.projectile);
	 game.physics.arcade.collide(game.collectable,game.platforms);
	 game.physics.arcade.overlap(game.player.asset,game.collectable,collectDb,null,this);
	 game.physics.arcade.overlap(game.player.asset,game.projectile,onProjectileOverlap,null,this);

	 game.playerManager.update();
  }

  function onProjectileOverlap() {
	 game.player.die();
	 () => {
		switch (lives) {
		  case 0:
			 setTimeout(() => game.lives.text = `Game Over: Refresh to Play Again`, 475);
			 break;
		  default:
			 lives--;
			 break;
		}
	 };
	 game.lives.text = `Lives ${lives}`;
	 if (lives>0) {window.opspark.player.init(game);}
  }

  function collectDb({kill,type}) {
	 game.score.text = `Score: ${parseInt(/\s+(\S*)$/.exec(game.score.text)[1],10) + type.points}`;
	 kill();
  }
});