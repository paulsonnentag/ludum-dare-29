ig.module( 'game.levels.gameover' )
.requires( 'impact.image','game.entities.puddle','game.entities.gameovertitle' )
.defines(function(){
LevelGameover=/*JSON[*/{"entities":[{"type":"EntityPuddle","x":0,"y":64,"settings":{"size":{"x":1004,"y":736}}},{"type":"EntityGameovertitle","x":332,"y":292}],"layer":[{"name":"background","width":10,"height":8,"linkWithCollision":false,"visible":1,"tilesetName":"media/background.png","repeat":false,"preRender":false,"distance":"1","tilesize":100,"foreground":false,"data":[[2,2,2,2,2,2,2,2,2,2],[2,2,2,2,2,2,2,2,2,2],[2,2,2,2,2,2,2,2,2,2],[2,2,2,2,2,2,2,2,2,2],[2,2,2,2,2,2,2,2,2,2],[2,2,2,2,2,2,2,2,2,2],[2,2,2,2,2,2,2,2,2,2],[2,2,2,2,2,2,2,2,2,2]]}]}/*]JSON*/;
LevelGameoverResources=[new ig.Image('media/background.png')];
});