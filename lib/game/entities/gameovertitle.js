ig.module(
    'game.entities.gameovertitle'
  )
  .requires(
    'impact.entity'
  )
  .defines(function () {

    EntityGameovertitle = ig.Entity.extend({
      size: {x: 400, y: 300},

      offset: {x: 200, y: 300},

      gravityFactor: 0,

      collides: ig.Entity.COLLIDES.NEVER,

      animSheet: new ig.AnimationSheet('media/gameover_title.png', 400, 300),

      init: function (x, y, settings) {

        this.addAnim('looser', 1, [0]);
        this.addAnim('winner', 1, [1]);


        this.parent(x, y, settings);
      }
    });


  });