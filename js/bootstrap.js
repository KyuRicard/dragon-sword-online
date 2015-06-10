var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'game');

game.state.add('boot', bootFase);
game.state.add('load', loadFase);
game.state.start('boot');

var player = undefined;
var jugadors = {};
var frame = 0;