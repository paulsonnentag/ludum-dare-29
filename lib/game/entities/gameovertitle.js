ig.module(
    'game.entities.gameovertitle'
  )
  .requires(
    'impact.entity'
  )
  .defines(function () {

    EntityGameovertitle = ig.Entity.extend({
      size: {x: 400, y: 300},

      gravityFactor: 0,

      collides: ig.Entity.COLLIDES.NEVER,

      animSheet: new ig.AnimationSheet('media/gameover_title.png', 400, 300),

      init: function (x, y, settings) {

        this.addAnim('idle', 1, [0]);

        this.opacity = 0;


        this.parent(x, y, settings);
      }
    });


  });