ig.module(
    'game.entities.pipe'
  )
  .requires(
    'impact.entity'
  )
  .defines(function () {

    EntityPipe = ig.Entity.extend({
      size: {x: 80, y: 80},

      gravityFactor: 0,

      collides: ig.Entity.COLLIDES.NEVER,

      checkAgainst: ig.Entity.TYPE.A,

      animSheet: new ig.AnimationSheet('media/pipe.png', 80, 80),

      init: function (x, y, settings) {

        this.addAnim('idle', 1, [0]);

        this.parent(x, y, settings);
      },

      check: function (other) {
        if(other.isHero) {
          other.vel.x = 0;
        }
      }
    });


  });