ig.module(
    'game.entities.pukeemitter'
  )
  .requires(
    'impact.entity',
    'game.entities.particle'
  )
  .defines(function () {

    EntityPukeemitter = ig.Entity.extend({

      collides: ig.Entity.COLLIDES.NEVER,

      gravityFactor: 0,

      pukeInterval: 0.005,

      init: function (x, y, settings) {

        this.parent(x, y, settings);
        this.intervalTimer = new ig.Timer(this.intervalTimer);
      },

      update: function () {

        if (this.isPuking && this.intervalTimer.delta() >= this.pukeInterval) {


          this.intervalTimer.reset();
          ig.game.spawnEntity(EntitiyPukeParticle, ig.game.hero.pos.x + (ig.game.hero.size.x / 2) + 5, ig.game.hero.pos.y + 26);
        }
      }
    });

    var EntitiyPukeParticle = EntityParticle.extend(({
      lifetime: 20,
      fadetime: 1,
      bounciness: 0,
      size: {x: 10, y: 10},

      animSheet: new ig.AnimationSheet('media/puke.png', 10, 10),

      init: function (x, y, settings) {

        this.addAnim('falling', 10, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        this.addAnim('landed', 10, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);


        this.vel.x = Math.random() * 10 - 5;
        this.vel.y = 200;

        this.weight = Math.random();

        this.currentAnim = this.anims.falling;
        this.currentAnim.gotoRandomFrame();

        this.parent(x, y, settings);
      },

      update: function () {
        this.parent();
        this.currentAnim = this.anims.falling;

      }
    }));

  });