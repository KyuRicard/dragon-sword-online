var Imatge = function() {    
    var self = this;   
    
    //Constructor
    (function() {		
        game.load.image('!Door1', '/JS/game/view/!Door1.png');
        game.load.image('!Door2', '/JS/game/view/!Door2.png');
        game.load.image('!Door3', '/JS/game/view/!Door3.png');
        game.load.image('Outside_A2', '/JS/game/view/Outside_A2.png');
        game.load.image('Outside_A3', '/JS/game/view/Outside_A3.png');
        game.load.image('Outside_A4', '/JS/game/view/Outside_A4.png');
        game.load.image('Outside_A5', '/JS/game/view/Outside_A5.png');
        game.load.image('Outside_B', '/JS/game/view/Outside_B.png');
    })();
    
    this.carrega = function(imatge, context) {
        game.load.image(context, imatge);
    };
    
    this.afegeix = function(context, X, Y) {
        return game.add.sprite(X, Y, context);  
    };
    
    this.carregaMapa = function(mapa) {
        game.load.tilemap('mapa' + mapa, '/JS/game/view/mapa' + mapa + '.json', null, Phaser.Tilemap.TILED_JSON);        
    };
    
    this.addMapa = function(mapa) {
        map = game.add.tilemap('mapa' + mapa);   
        switch (mapa) {
            case 0:
                map.addTilesetImage('!Door1', '!Door1');                
                map.addTilesetImage('Outside_A2', 'Outside_A2');
                map.addTilesetImage('Outside_A3', 'Outside_A3');
                map.addTilesetImage('Outside_A4', 'Outside_A4');
                map.addTilesetImage('Outside_A5', 'Outside_A5');
                map.addTilesetImage('Outside_B', 'Outside_B');   
        };
        return map;
    };
    
    this.renderMap = function(map) {
        layer1 = map.createLayer('Capa de Patrones 1').resizeWorld();
        layer2 = map.createLayer('Capa de patrones 2').resizeWorld();
        layer3 = map.createLayer('Capa de patrones 3').resizeWorld();
        map.setCollisionBetween(500, 600);
        game.physics.p2.convertTilemap(map, layer1);
        game.physics.p2.setBoundsToWorld(true, true, true, true, false);
    };
}