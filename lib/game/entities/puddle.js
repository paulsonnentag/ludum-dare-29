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
      _wmDrawBox: true,
      _wmBoxColor: '#5f3a04',

      waveTimer: new ig.Timer(),

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
        ctx.fillStyle = 'rgba(95, 58, 4, 0.5)';

        ctx.beginPath();
        ctx.moveTo(this.pos.x, this.pos.y)


        for (var x = this.pos.x; x < this.size.x; x+= 10) {
          ctx.lineTo(x, this.tideFn(x));
        }

        ctx.lineTo(this.pos.x + this.size.x, this.pos.y);
        ctx.lineTo(this.pos.x + this.size.x, this.pos.y + this.size.y);
        ctx.lineTo(this.pos.x, this.pos.y + this.size.y);
        ctx.fill();


        ctx.restore();
      },

      tideFn: function (x) {
        return Math.sin(this.waveTimer.delta() + (x/ 50)) * 5 + this.pos.y
      },

      check: function (other) {

        if (other.isParticle) {

          other.pos.y = this.tideFn(other.pos.x);


          if (!other.hasBeenCounted) {
            this.size.y += 0.001;
            this.pos.y -= 0.001;

            other.hasBeenCounted = true;
          }
        }

      },

      update: function () {

        this.parent();

      }
    });
  })