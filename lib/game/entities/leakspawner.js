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

      leakCounter: 0,

      init: function (x, y, settings) {

        if (ig.game.getEntitiesByType) {

          var leaks = ig.game.getEntitiesByType(EntityLeak);

          this.startLeaks = settings.startLeaks || 0;

          for (var i = 0; i < this.startLeaks; i++) {

            var index = Math.floor(Math.random() * leaks.length);

            leaks.splice(index, 1)[0].addLeak();
          }

        }

        this.timer = new ig.Timer(2);

        this.parent(x, y, settings);
      },

      update: function () {
        var leaks = ig.game.getEntitiesByType(EntityLeak);
        var totalLeaks = 0;

        for (var i = 0; i < leaks.length; i++) {
          totalLeaks += leaks[i].leaks.length;
        }

        if (totalLeaks === 0) {
          ig.game.gameWon();
        }

        if (!ig.game.isGameOver) {

          if (this.timer.delta() >= this.leakCounter * 1.5) {
            var index = Math.floor(Math.random() * leaks.length);
            leaks[index].addLeak();

            this.timer.reset();

            this.leakCounter++;
          }

        }

        this.parent();
      }
    });


  });