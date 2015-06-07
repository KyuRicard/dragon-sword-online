var Player = function() {       
    //Constructor
    this.propietats = {
        X: 0,
        Y: 0,
        map: 0,
        HP: 0,
        MaxHP: 0,
        MP: 0,
        MaxMP: 0,
        Level: 0,
        Exp: 0,
        Inventory: {

        },
        Imatge: 'player',
        Sprite: undefined
    };
    
    (function() {
        
    })();
    
    this.tp = function(X, Y) {
        this.propietats.X = X;
        this.propietats.Y = Y;
    };
    
    this.inicialitza = function(player) {        
		player.propietats.Sprite = iLoad.afegeix('player', player.X, player.Y);
        map = iLoad.addMapa(0);
        map = iLoad.renderMap(map);            
        player.propietats.Sprite = game.add.sprite(player.propietats.X, player.propietats.Y, 'player');
        player.propietats.Sprite.animations.add('down', [0], 120, false);
        player.propietats.Sprite.animations.add('left', [3], 120, false);
        player.propietats.Sprite.animations.add('right', [6], 120, false);
        player.propietats.Sprite.animations.add('up', [9], 120, false);
        
    };
};