/*
 Base entity class for particle entities. Subclass your own particles from
 this class. See the EntityDebrisParticle in debris.js for an example.

 Particle entities will kill themselfs after #lifetime# seconds. #fadetime#
 seconds before the #lifetime# ends, they will start to fade out.

 The velocity of a particle is randomly determined by its initial .vel
 properties. Its Animation will start at a random frame.
 */

ig.module(
    'game.entities.particle'
  )
  .requires(
    'impact.entity'
  )
  .defines(function () {

    EntityParticle = ig.Entity.extend({
      size: {x: 4, y: 4},
      offset: {x: 0, y: 0},
      maxVel: {x: 200, y: 300},
      minBounceVelocity: 0,

      isParticle: true,

      type: ig.Entity.TYPE.A,
      checkAgainst: ig.Entity.TYPE.A,
      collides: ig.Entity.COLLIDES.PASSIVE,

      lifetime: 5,
      fadetime: 1,
      bounciness: 0,
      friction: {x: 0, y: 0},

      init: function (x, y, settings) {
        this.parent(x, y, settings);

        this.idleTimer = new ig.Timer();
      },

      update: function () {

        if (!ig.game.isGameOver) {

          if (this.idleTimer.delta() > this.lifetime) {
            this.kill();
            return;
          }

          this.currentAnim.alpha = this.idleTimer.delta().map(
            this.lifetime - this.fadetime, this.lifetime,
            1, 0
          );
        }

        this.parent();
      }
    });


  });