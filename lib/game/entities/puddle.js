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
      checkAgainst: ig.Entity.TYPE.A,
      collides: ig.Entity.COLLIDES.NEVER,

      gravityFactor: 0,

      init: function (x, y, settings) {
        this.parent(x, y, settings);

        ig.game.puddle = this;
      },

      draw: function () {
        var ctx = ig.system.context;


        ctx.save();
        ctx.fillStyle = 'rgba(95, 58, 4, 0.3)';

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
        return Math.sin(this.waveTimer.delta() + (x/ 50)) * 4 + this.pos.y
      },

      check: function (other) {

        if (other.isParticle) {

          other.pos.y = this.tideFn(other.pos.x) + (other.weight * 10 - 5);

          other.currentAnim = other.anims.landed;

          if (!other.hasBeenCounted) {
            this.size.y += 0.03;
            this.pos.y -= 0.03;

            this.vel.x *= 0.1;

            other.collides = ig.Entity.COLLIDES.NEVER;
            other.hasBeenCounted = true;
          }
        } else if (other.isLeak) {

          other.underwater = true;

          this.size.y += 0.02;
          this.pos.y -= 0.02;
        }

        if (this.pos.y <= 64) {
          ig.game.gameOver();
        }

      },

      update: function () {

        this.parent();

      }
    });
  })