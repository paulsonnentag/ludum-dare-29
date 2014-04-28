ig.module(
    'game.entities.hero'
  )
  .requires(
    'impact.entity',
    'game.entities.pukeemitter'
  )
  .defines(function () {

    EntityHero = ig.Entity.extend({

      animSheet: new ig.AnimationSheet('media/mario_spritemap.png', 62, 70),

      swimming: false,

      isHero: true,

      size: {x: 40, y: 70},
      offset: {x: 12, y: 0},
      maxVel: {x: 300, y: 800},
      friction: {x: 800, y: 0},

      prevVel: {x: 0, y: 0},

      pukeResistance: 2,
      pukeDuration: 2,

      waterFactor: 0.5,

      type: ig.Entity.TYPE.A, // Player friendly group
      checkAgainst: ig.Entity.TYPE.A,
      collides: ig.Entity.COLLIDES.PASSIVE,

      accelGround: 1200,
      accelAir: 600,
      jump: 600,
      standing: true,

      flip: false,

      init: function (x, y, settings) {
        this.parent(x, y, settings);

        if (ig.game.spawnEntity) {
          this.pukeEmitter = ig.game.spawnEntity(EntityPukeemitter, 0, 0);
        }

        this.addAnim('idle', 1, [0]);
        this.addAnim('walking', 0.02, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]);
        this.addAnim('sick', this.pukeResistance / 20, [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45]);
        this.addAnim('puking', 0.02, [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64]);

        this.durationTimer = new ig.Timer(this.pukeResistance);
        this.durationTimer.pause();

        ig.game.hero = this;
      },

      check: function (other) {

        if (other.isPuddle) {

          if (this.durationTimer.delta() === -this.pukeResistance) {
            this.durationTimer.reset();
            this.durationTimer.unpause();
          }

          this.swimming = true
        }
      },

      update: function () {


        if (!ig.game.isGameOver) {

          // save prev speed
          if (this.vel.x !== 0) {
            this.prevVel.x = this.vel.x;
          }

          if (this.vel.y !== 0) {
            this.prevVel.y = this.vel.y;
          }

          // Handle user input; move left or right
          var accel = this.standing ? this.accelGround : this.accelAir;

          if (ig.input.state('left')) {
            this.accel.x = -accel;
            this.flip = true;
            this.currentAnim = this.anims.walking;
          }
          else if (ig.input.state('right')) {
            this.accel.x = accel;
            this.flip = false;
            this.currentAnim = this.anims.walking;
          }
          else {
            this.accel.x = 0;
            this.currentAnim = this.anims.idle;
          }

          if (Math.abs(this.vel.y) > 0.1) {
            this.currentAnim = this.anims.idle;
          }

          // jump
          if (this.standing && ig.input.pressed('up')) {
            this.vel.y = -this.jump;
          }

          // swimming
          if (this.swimming) {
            this.gravityFactor = this.waterFactor;

            this.currentAnim = this.anims.sick;

          } else {

            if (this.durationTimer.delta() < 0 ) {
              this.anims.sick.rewind();
              this.durationTimer.reset();
              this.durationTimer.pause();
            }

            this.gravityFactor = 1;
          }

          // puking
          if (this.durationTimer.delta() >= 0 ) {
            this.vel.y = -600;

            this.pukeEmitter.isPuking = true;

            this.currentAnim = this.anims.puking;

            if (this.durationTimer.delta() >= this.pukeDuration) {

              this.pukeEmitter.isPuking = false;

              this.anims.sick.rewind();

              this.durationTimer.reset();
              this.durationTimer.pause();
            }
          }


        } else {
          this.currentAnim = this.anims.idle;
        }

        if (this.currentAnim !== this.anims.puking) {
          this.currentAnim.flip.x = this.flip;
        }


        this.swimming = false;

        this.parent();

      }
    })

  })