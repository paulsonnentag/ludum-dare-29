ig.module(
    'game.main'
  )
  .requires(
    'impact.game',
    'impact.font',

    'game.entities.hero',
    'game.entities.particle',
    'game.entities.leak',
    'game.entities.puddle',
    'game.entities.gameovertitle',
    'game.levels.start',
    'game.levels.gameover',

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
        ig.input.bind(ig.KEY.X, 'jump');
        ig.input.bind(ig.KEY.UP_ARROW, 'jump');

        this.loadLevel(LevelStart);

      },

      update: function () {
        // Update all entities and backgroundMaps
        this.parent();


        if (this.isGameOver && ig.input.pressed('x')) {
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
        this.loadLevel(LevelGameover)
      }
    });


    ig.main('#canvas', MyGame, 60, 1000, 800, 1);
  });
