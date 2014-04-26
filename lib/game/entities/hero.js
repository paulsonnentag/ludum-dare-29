ig.module(
    'game.entities.hero'
  )
  .requires(
    'impact.entity'
  )
  .defines(function () {

    EntityHero = ig.Entity.extend({

      animSheet: new ig.AnimationSheet('media/hero.png', 20, 30),

      size: {x: 20, y: 30},
      offset: {x: 0, y: 0},
      maxVel: {x: 400, y: 800},
      friction: {x: 800, y: 0},

      type: ig.Entity.TYPE.A, // Player friendly group
      checkAgainst: ig.Entity.TYPE.NONE,
      collides: ig.Entity.COLLIDES.PASSIVE,


      flip: false,
      accelGround: 1200,
      accelAir: 600,
      jump: 500,
      standing: true,



      init: function (x, y, settings) {
        this.parent(x, y, settings);

        this.addAnim('idle', 1, [0]);

        ig.game.hero = this;
      },

      update: function () {

        // Handle user input; move left or right
        var accel = this.standing ? this.accelGround : this.accelAir;


        if( ig.input.state('left') ) {
        console.log('left')


          this.accel.x = -accel;
          this.flip = true;
        }
        else if( ig.input.state('right') ) {
          this.accel.x = accel;
          this.flip = false;
        }
        else {
          this.accel.x = 0;
        }

        // jump
        if( this.standing && ig.input.pressed('jump') ) {
          this.vel.y = -this.jump;
        }

        this.parent();

      }
    })

  })