ig.module(
    'game.entities.puddle'
  )
  .requires(
    'impact.entity'
  )
  .defines(function () {

    EntityPuddle = ig.Entity.extend({

      size: {x: 20, y: 30},

      _wmScalable: true,

      volume: 0,

      type: ig.Entity.TYPE.A,
      checkAgainst: ig.Entity.TYPE.B,
      collides: ig.Entity.COLLIDES.NEVER,

      gravityFactor: 0,

      init: function (x, y, settings) {
        this.parent(x, y, settings);

        ig.game.puddle = this;
      },

      draw: function () {
        var ctx = ig.system.context;

        ctx.save();
        ctx.fillStyle = 'rgba(100,100,0,0.5)';
        ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
        ctx.restore();
      },

      check: function (other) {

        if (other.isParticle) {
          other.kill();

          this.size.y += 1;
          this.pos.y -= 1;
        } else {
          debugger;
        }

      },

      update: function () {

        this.parent();

      }
    });
  })