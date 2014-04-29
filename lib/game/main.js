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
    'game.entities.warpzone',
    'game.entities.crack',
    'game.entities.puddle',
    'game.entities.pukeemitter',
    'game.entities.gameovertitle',
    'game.levels.start',
    'game.levels.intro'
  )
  .defines(function () {

    var flushSound = new ig.Sound('media/sounds/flush.*');

    MyGame = ig.Game.extend({

      // Load a font
      font: new ig.Font('media/04b03.font.png'),

      gravity: 1000,

      init: function () {
        // Initialize your game here; bind keys etc.

        ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
        ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
        ig.input.bind(ig.KEY.DOWN_ARROW, 'warp');
        ig.input.bind(ig.KEY.UP_ARROW, 'up');
        ig.input.bind(ig.KEY.X, 'restart');

        ig.music.add('media/music/intro.*', 'intro');
        ig.music.add('media/music/game.*', 'game');

        ig.music.loop = true;
        ig.music.play('intro');

        this.loadLevel(LevelIntro);
      },

      spawnCrack: function (x, y, settings) {
        this.spawnEntity(EntityCrack, 0, 0);
      },

      update: function () {
        // Update all entities and backgroundMaps
        this.parent();

        if (ig.input.pressed('restart') && ig.game.realLevelLoaded) {
          this.isGameOver = false;

          console.log('load');

          ig.music.play('game');
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

        this.removeEntity(this.hero);

        var title = this.spawnEntity(EntityGameovertitle, ig.system.width/2, ig.system.height/2)
        title.currentAnim = title.anims.looser;

        flushSound.play();

      },

      gameWon: function () {

        this.removeEntity(this.hero);

        this.isGameOver = true;
        var title = this.spawnEntity(EntityGameovertitle, ig.system.width/2, ig.system.height/2)
        title.currentAnim = title.anims.winner;

        flushSound.play();

      }
    });


    ig.main('#canvas', MyGame, 60, 1000, 800, 1);
  });
