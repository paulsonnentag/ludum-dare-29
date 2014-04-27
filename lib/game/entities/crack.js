ig.module(
    'game.entities.crack'
  )
  .requires(
    'impact.entity'
  )
  .defines(function () {

    EntityCrack = ig.Entity.extend({
      animSheet: new ig.AnimationSheet('media/spritemap.png', 40, 40),

      size: {x: 40, y: 40},
      collides: ig.Entity.COLLIDES.NEVER,

      gravityFactor: 0,

      init: function (x, y, settings) {


        this.parent(x, y, settings);

        this.addAnim('down', 1, [4]);
        this.addAnim('up', 1, [5]);

      },

      draw: function () {
        //ig.system.context.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);

        this.parent()
      }

    })

  });