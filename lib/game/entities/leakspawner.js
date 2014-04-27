ig.module(
    'game.entities.leakspawner'
  )
  .requires(
    'impact.entity'
  )
  .defines(function () {

    EntityLeakspawner = ig.Entity.extend({

      _wmBoxColor: 'rgba(255, 0, 0, 0.2)',
      _wmDrawBox: true,

      collides: ig.Entity.COLLIDES.NEVER,

      delay: 10,

      gravityFactor: 0,

      init: function (x, y, settings) {

        if (ig.game.getEntitiesByType) {

          var leaks = ig.game.getEntitiesByType(EntityLeak);

          this.startLeaks = settings.startLeaks || 0;

          for (var i = 0; i < this.startLeaks; i++) {

            var index = Math.floor(Math.random() * leaks.length);

            leaks.splice(index, 1)[0].addLeak();
          }


        }


        this.parent(x, y, settings);
      },

      update: function () {

        this.parent();
      }
    });


  });