ig.module(
    'game.main'
  )
  .requires(
    'impact.game',
    'impact.font',

    'game.entities.hero',
    'game.entities.particle',
    'game.entities.debris',
    'game.levels.start'
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
        ig.input.bind(ig.KEY.C, 'shoot');

        this.loadLevel(LevelStart);
      },

      update: function () {
        // Update all entities and backgroundMaps
        this.parent();

        // Add your own, additional update code here
      },

      draw: function () {
        // Draw all entities and backgroundMaps
        this.parent();


      }
    });


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
    ig.main('#canvas', MyGame, 60, 800, 600, 1);
  });
