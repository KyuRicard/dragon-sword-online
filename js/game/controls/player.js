var Player = function() { 
    
    console.log("Carregant jugador...");
    this.sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    this.sprite.anchor.setTo(0.25, 0.25);
    //this.sprite.fixedToCamera = true;
    this.posX = 0;
    this.posY = 0;

    this.up = game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.down = game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.left = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.right = game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.escape = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    this.intro = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

    this.move = function(x, y) {
        if (x < 0) {
            x = 0;
        }
        if (y < 0) {
            y = 0;   
        }
        this.posX = x;
        this.posY = y;
        this.sprite.x = this.posX;
        this.sprite.y = this.posY;     
        
    };  
   
    
    this.movement = function() {
        if (this.up.isDown) {
            this.move(this.posX, this.posY - 1);   
        } else if (this.down.isDown) {
            this.move(this.posX, this.posY + 1);   
        } else if (this.left.isDown) {
            this.move(this.posX - 1, this.posY);
        } else if (this.right.isDown) {
            this.move(this.posX + 1, this.posY);   
        }
        console.log('X: ' + this.posX + ' Y: ' + this.posY + '\n');
           
    };
}