ig.module(
    'game.entities.leak'
  )
  .requires(
    'impact.entity'
  )
  .defines(function () {

    EntityLeak = ig.Entity.extend({

      animSheet: new ig.AnimationSheet('media/spritemap.png', 20, 20),

      size: {x: 20, y: 30},

      leaks: [],

      maxLeaks: 10,

      leaksPerMinute: 20,

      bounceVel: 200,
      speedThreshold: 300,

      _wmDrawBox: true,
      _wmScalable: true,
      _wmBoxColor: '#bada55',

      type: ig.Entity.TYPE.A,
      checkAgainst: ig.Entity.TYPE.B,
      collides: ig.Entity.COLLIDES.NEVER,

      gravityFactor: 0,

      init: function (x, y, settings) {
        this.parent(x, y, settings);

        ig.game.hero = this;
      },

      update: function () {
        var leak;
        var y;
        var x;


        if (this.leaks.length < this.maxLeaks && (Math.random() < ( ig.system.tick / ( 60 / this.leaksPerMinute)))) {

          this.leaks.push({
            direction: Math.random () < 0.5 ? -1 : 1,
            position: (this.pos.x + 5) + (Math.random() * this.size.x - 10),
            timer: new ig.Timer(),
            interval: 1
          });

        }


        for (var i = 0; i < this.leaks.length; i++) {
          leak = this.leaks[i];

          if (leak.timer.delta() > leak.interval) {

            x = leak.position;
            y = leak.direction === -1 ? this.pos.y : this.pos.y + this.size.y;

            for (var j = 0;  leak.timer.delta() - j > leak.interval; j += leak.interval) {

              ig.game.spawnEntity(EntityLeakParticle, x, y, {
                vel: {x: Math.random() * 30 - 15, y: 500 * leak.direction}
              })

            }

            leak.timer.reset();
          }

        }

        this.parent();

      },

      fixLeak: function (start, end, direction) {
        var leak;

        for (var i = 0; i < this.leaks.length; i++) {
          leak = this.leaks[i];

          if (leak.direction === direction && leak.position > start && leak.position < end) {
            this.leaks.splice(i, 1);
          }
        }


      },

      check: function (other) {

        if (other.isHero) {

          if (Math.abs(other.prevVel.y) >= this.speedThreshold) {
            other.vel.y = other.prevVel.y < 0 ? 200 : -200;

            this.fixLeak(other.pos.x, other.pos.x + other.size.x, other.vel.y < 0 ? -1 : 1);
          }
        }

        this.parent(other)

      }
    });

    var EntityLeakParticle = EntityParticle.extend(({
      lifetime: 10,
      fadetime: 1,
      bounciness: 0.1,
      vel: {x: 60, y: 20},
      size: {x: 2, y: 2},

      animSheet: new ig.AnimationSheet('media/spritemap.png', 4, 4),

      init: function (x, y, settings) {

        this.addAnim('idle', 2, [0]);
        this.parent(x, y, settings);
      }
    }));

  })