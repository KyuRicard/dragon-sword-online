var Control = function () {
    console.log('Carregant controls...');
    this.up = game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.down = game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.left = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.right = game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.escape = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    this.intro = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

    this.movement = function () {
        if (this.up.isDown) {
            player.propietats.Sprite.body.moveUp(200);
            player.propietats.Sprite.play('up');
        } else if (this.down.isDown) {
            player.propietats.Sprite.body.moveDown(200);
            player.propietats.Sprite.play('down');
        }
        if (this.left.isDown) {
            player.propietats.Sprite.body.moveLeft(200);
            player.propietats.Sprite.play('left');
        } else if (this.right.isDown) {
            player.propietats.Sprite.body.moveRight(200);
            player.propietats.Sprite.play('right');
        }
        if (this.up.isDown) {

        } else if (this.down.isDown) {

        }
        if (this.left.isDown) {

        } else if (this.right.isDown) {

        }
    };

};