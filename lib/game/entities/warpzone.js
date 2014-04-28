ig.module(
    'game.entities.warpzone'
  )
  .requires(
    'impact.entity'
  )
  .defines(function () {

    EntityWarpzone = ig.Entity.extend({
      size: {x: 400, y: 300},

      _wmBoxColor: 'rgba(255, 0, 0, 0.1)',
      _wmDrawBox: true,
      _wmScalable: true,

      offset: {x: 200, y: 300},

      checkAgainst: ig.Entity.TYPE.A,

      gravityFactor: 0,

      collides: ig.Entity.COLLIDES.NEVER,

      warping: false,

      check: function (other) {


        if (other.isHero) {

          if (ig.input.pressed('warp') && other.standing) {
            this.warping = true;
            ig.music.fadeOut();
          }

          if (this.warping) {
            other.vel.x = 0;
            other.vel.y = 0;

            other.size.y -= 1;
          }


          if (other.size.y <= 0) {

            ig.game.loadLevel(LevelStart);
            ig.music.play('game');

          }
        }

      }

    });


  });