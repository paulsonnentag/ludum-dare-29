ig.module(
    'game.entities.crack'
  )
  .requires(
    'impact.entity'
  )
  .defines(function () {

    EntityCrack = ig.Entity.extend({
      animSheet: new ig.AnimationSheet('media/risse-spritemap.png', 40, 40),

      size: {x: 40, y: 40},
      collides: ig.Entity.COLLIDES.NEVER,

      gravityFactor: 0,
      crackInterval: 2,

      init: function (x, y, settings) {

        this.parent(x, y, settings);

        this.addAnim('down', this.crackInterval, [0, 4, 8, 12, 16, 20], true);
        this.addAnim('up', this.crackInterval, [22, 18, 14, 10, 6, 2], true);
      },

      draw: function () {
        this.parent()
      }

    })

  });