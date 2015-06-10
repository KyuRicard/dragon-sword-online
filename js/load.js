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
        socket.emit('sendPlayer', player.sendProps());
        frame++;
        if (frame % 20 == 0) {
            socket.emit('getPlayers');
            socket.on('players', function (players) {
                for (plId in players) {
                    pl = players[plId];
                    debugger;
                    if (pl.Name != player.propietats.Name || pl == undefined) {
                        if (jugadors[pl.Name] == undefined || jugadors[pl.Name] == null) {
                            sprite = game.add.sprite(pl.X, pl.Y, 'player');
                            //sprite.body.fixedRotation = true;
                            game.physics.p2.enable(sprite);
                            jugadors[pl.Name] = sprite;
                        } else {
                            jugadors[pl.Name].body.setZeroVelocity();
                            jugadors[pl.Name].body.x = pl.X;
                            jugadors[pl.Name].body.y = pl.Y;
                        }
                    }
                }
            });
        }
        socket.on('playerDisconnect', function (playerDisc) {
            jugadors[playerDisc].destroy(true);
            delete jugadors[playerDisc];
        });
    }
};