ig.module(
    'game.main'
  )
  .requires(
    'impact.game',
    'impact.font',

    'game.entities.hero',
    'game.entities.particle',
    'game.entities.leak',
    'game.entities.leakspawner',
    'game.entities.crack',
    'game.entities.puddle',
    'game.entities.pukeemitter',
    'game.entities.gameovertitle',
    'game.levels.start',
    'game.levels.test',

    'impact.debug.debug'
  )
  .defines(function () {

    MyGame = ig.Game.extend({

      // Load a font
      font: new ig.Font('media/04b03.font.png'),

      gravity: 1000,

      init: function () {
        // Initialize your game here; bind keys etc.

        ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
        ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
        ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
        ig.input.bind(ig.KEY.UP_ARROW, 'up');
        ig.input.bind(ig.KEY.R, 'restart');

        if (window.location.hash === '#test') {
          this.loadLevel(LevelTest);
        } else {
          this.loadLevel(LevelStart);
        }
      },

      spawnCrack: function (x, y, settings) {
        this.spawnEntity(EntityCrack, 0, 0);
      },

      update: function () {
        // Update all entities and backgroundMaps
        this.parent();

        if (ig.input.pressed('restart')) {
          this.isGameOver = false;
          this.loadLevel(LevelStart);
        }

        // Add your own, additional update code here
      },

      draw: function () {
        // Draw all entities and backgroundMaps
        this.parent();

        if (this.puddle) {
          this.puddle.draw();
        }

      },

      gameOver: function () {
        this.isGameOver = true;

        this.spawnEntity(EntityGameovertitle, ig.system.width/2, ig.system.height/2)
      },

      gameWon: function () {

        this.isGameOver = true;
        this.spawnEntity(EntityGameovertitle, ig.system.width/2, ig.system.height/2)
      }
    });


    ig.main('#canvas', MyGame, 60, 1000, 800, 1);
  });
