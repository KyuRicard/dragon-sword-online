var bootFase = {
    preload: function () {
        var nom = getCookie('user');
        console.log('Carregant Phaser...');
        player = new Player();

        console.log('Carregant imatges...');
        iLoad = new Imatge();
        game.load.spritesheet('player', '/media/img/player.png', 30, 32, 12);
        iLoad.carregaMapa(0);

        socket = io('localhost:1234'); //Put server's IP here

        player.propietats.Name = nom;

        socket.emit('connecta', nom);
        console.log('Carregant Usuari...');
        socket.on('waitOut', function (wait) {
            socket.emit('getPlayer', nom);
            socket.on('setPlayer', function (propietats) {
                debugger;
                player.createPlayer(propietats);
                game.state.start('load');
            });

        });

    }
};

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}
