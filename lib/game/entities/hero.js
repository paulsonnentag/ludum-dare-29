ig.module(
    'game.entities.hero'
  )
  .requires(
    'impact.entity'
  )
  .defines(function () {

    EntityHero = ig.Entity.extend({

      animSheet: new ig.AnimationSheet('media/mario_spritemap.png', 53, 70),

      swimming: false,

      isHero: true,

      size: {x: 40, y: 70},
      offset: {x: 5, y: 0},
      maxVel: {x: 300, y: 800},
      friction: {x: 800, y: 0},

      prevVel: {x: 0, y: 0},

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

        this.addAnim('idle', 1, [0]);
        this.addAnim('walking', 0.05, [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24]);

        ig.game.hero = this;
      },

      check: function (other) {

        if (other.isPuddle) {
          this.swimming = true
        }
      },

      update: function () {


        if (this.swimming) {
          this.gravityFactor = 0.2;
        } else {
          this.gravityFactor = 1;
        }


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

          this.currentAnim.flip.x = this.flip;

          // jump
          if (this.standing && ig.input.pressed('up')) {
            this.vel.y = -this.jump;
          }

        } else {
          this.currentAnim = this.anims.idle;
        }

        this.swimming = false;

        this.parent();

      }
    })

  })