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

      isLeak: true,

      leaks: [],

      maxLeaksPer100Pixel: 0.5,

      leakProbability: 0.00002,

      bounceVel: 200,
      speedThreshold: 100,

      _wmDrawBox: true,
      _wmScalable: true,
      _wmBoxColor: '#bada55',

      type: ig.Entity.TYPE.A,
      checkAgainst: ig.Entity.TYPE.A,
      collides: ig.Entity.COLLIDES.FIXED,

      gravityFactor: 0,

      init: function (x, y, settings) {
        this.parent(x, y, settings);

        this.maxLeaks = this.maxLeaksPer100Pixel * this.size.x / 100;
      },

      update: function () {
        var leak;
        var y;
        var x;

        if (!this.underwater) {


          if (this.leaks.length < this.maxLeaks && (Math.random() < ((this.leakProbability * this.size.y)))) {

            var position = (this.pos.x + 10) + (Math.random() * this.size.x - 20);
            var direction = Math.random() > 0.5 ? -1 : 1;


            var crackEntity = ig.game.spawnEntity(EntityCrack, position, this.pos.y, {
              zIndex: -100
            });

            crackEntity.currentAnim = direction < 0 ? crackEntity.anims.up : crackEntity.anims.down;

            this.leaks.push({
              direction: direction,
              position: position,
              timer: new ig.Timer(),
              interval: 0.1,
              crackEntity: crackEntity
            });

            ig.game.sortEntitiesDeferred();

          }


          for (var i = 0; i < this.leaks.length; i++) {
            leak = this.leaks[i];

            if (leak.timer.delta() > leak.interval) {

              x = leak.position;
              y = leak.direction === -1 ? this.pos.y - 11 : this.pos.y + this.size.y + 1;

              for (var j = 0; leak.timer.delta() - j > leak.interval; j += leak.interval) {

                ig.game.spawnEntity(EntityLeakParticle, x, y, {
                  vel: {x: Math.random() * 200 - 50, y: 1000 * leak.direction}
                })

              }

              leak.timer.reset();
            }

          }
        }

        this.parent();

      },

      fixLeak: function (start, end, direction) {
        var leak;

        for (var i = 0; i < this.leaks.length; i++) {
          leak = this.leaks[i];

          var s = Math.min(end, start);
          var e = Math.max(end, start);

          if (leak.direction === direction && leak.position >= s && leak.position <= e) {

            console.log('fixed');

            this.leaks.splice(i, 1);
          }
        }


      },

      collideWith: function (other, axis) {

        if (other.isHero) {


          if (Math.abs(other.prevVel.y) >= this.speedThreshold) {
            this.fixLeak(other.pos.x, other.pos.x + other.size.x, other.prevVel.y < 0 ? 1 : -1);
            other.prevVel.y = 0;
          }
        }

        else if (other.isParticle) {
          other.currentAnim = other.anims.landed;
        }

        this.parent(other, axis)

      }
    });

    var EntityLeakParticle = EntityParticle.extend(({
      lifetime: 7,
      fadetime: 1,
      bounciness: 0,
      size: {x: 10, y: 10},

      animSheet: new ig.AnimationSheet('media/poop.png', 10, 10),

      init: function (x, y, settings) {

        this.addAnim('falling', 10, [0]);
        this.addAnim('landed', 10, [1]);

        this.weight = Math.random();

        this.currentAnim = this.anims.falling;

        this.parent(x, y, settings);
      },

      update: function () {
        this.parent();
        this.currentAnim = this.anims.falling;

      }
    }));

    var EntityCrack = ig.Entity.extend({
      animSheet: new ig.AnimationSheet('media/poop.png', 10, 10),

      size: {x: 40, y: 40},
      offset: {x: 20, y: 0},
      collides: ig.Entity.COLLIDES.NEVER,

      gravityFactor: 0,

      init: function (x, y, settings) {

        this.addAnim('bottom', 1, [0]);
        this.addAnim('top', 1, [0]);

        this.parent(x, y, settings);
      }

    })

  })