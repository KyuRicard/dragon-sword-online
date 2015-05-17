window.game = new Phaser.Game(1280,720, Phaser.AUTO, '', 
{
                              
    preload: function() {
        console.log("Carregant Phaser...");
        // Load Sprite
        // window.game.load.atlasJSONHash(nom, imatge, json);
        this.guiBar = game.load.image('GUI', 'media/img/GUI720.png');
        console.log("Carregant imatges...");
        this.playerImg = game.load.image('player', 'media/img/player.png');       
    },

    create: function() {
        console.log("Creant...");
        var boardView = new BoardView();
        this.player = new Player();
    },

    update: function() {
        this.player.movement();
    }
});

