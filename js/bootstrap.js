window.game = new Phaser.Game(1280,720, Phaser.AUTO, 'game', 
{      
    preload: function() {
        console.log("Carregant Phaser...");
        player = new Player();
        // Load Sprite
        // window.game.load.atlasJSONHash(nom, imatge, json);
        console.log("Carregant imatges...");
        iLoad = new Imatge();
        game.load.spritesheet('player', '/media/img/player.png', 30, 32, 12);
        iLoad.carregaMapa(0);
        game.time.advancedTiming = true;
    },

    create: function() {
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.restitution = 0.8;
        game.physics.p2.gravity.y = 0;
        game.physics.p2.gravity.x = 0;
        
        console.log("Creant...");
        var boardView = new BoardView();
        control = new Control();        
        
        player.inicialitza(player);
        
        game.physics.p2.enable(player.propietats.Sprite);
        player.propietats.Sprite.body.fixedRotation = true;
        game.camera.follow(player.propietats.Sprite, Phaser.Camera.FOLLOW_LOCKON);
        
        frames = 0;
    },

    update: function() {  
        frames++;
        player.propietats.Sprite.body.setZeroVelocity();        
        control.movement(player);          
        game.debug.text(game.time.fps, 2, 14, '#00A0FF');
    }
});

