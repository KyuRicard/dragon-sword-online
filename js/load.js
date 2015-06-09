var loadFase = {
    create: function () {
        console.log('Carregant físiques...');
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.restitution = 0.8;
        game.physics.p2.gravity.y = 0;
        game.physics.p2.gravity.x = 0;

        console.log('Creant...');

        control = new Control();



        map = iLoad.addMapa(0);
        iLoad.renderMap(map);
        player.inicialitza();
        game.physics.p2.enable(player.propietats.Sprite);
        player.propietats.Sprite.body.fixedRotation = true;
        game.camera.follow(player.propietats.Sprite, Phaser.Camera.FOLLOW_LOCKON);
    },

    update: function () {
        player.propietats.Sprite.body.setZeroVelocity();
        control.movement();
        player.updatePlayer();
        socket.emit('sendPlayer', player.sendProps(player));
    }
};