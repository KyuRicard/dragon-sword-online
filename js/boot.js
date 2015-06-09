var bootFase = {
    preload: function () {
        console.log('Carregant Phaser...');
        player = new Player();

        console.log('Carregant imatges...');
        iLoad = new Imatge();
        game.load.spritesheet('player', '/media/img/player.png', 30, 32, 12);
        iLoad.carregaMapa(0);

        socket = io('http://localhost:8080');

        console.log('Carregant Usuari...');
        var nom = getCookie('user');

        socket.emit('getPlayer', nom);

        socket.on('setPlayer', function (propietats) {
            player.createPlayer(propietats);
            game.state.start('load');
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