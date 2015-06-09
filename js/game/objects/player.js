var Player = function () {
    //Constructor
    //work
    this.propietats = {
        Name: '',
        X: 0,
        Y: 0,
        Map: 0,
        HP: 0,
        Level: 0,
        Exp: 0,
        Inventory: {

        },
        Imatge: 'player',
        Sprite: undefined
    };

    (function () {

    })();

    //idk
    this.inicialitza = function () {
        player.propietats.Sprite = game.add.sprite(player.propietats.X, player.propietats.Y, 'player');

        player.propietats.Sprite.animations.add('down', [0], 120, false);
        player.propietats.Sprite.animations.add('left', [3], 120, false);
        player.propietats.Sprite.animations.add('right', [6], 120, false);
        player.propietats.Sprite.animations.add('up', [9], 120, false);
    };

    //work
    this.sendProps = function () {
        var props = player.propietats;
        var array = {
            Name: props.Name,
            X: props.X,
            Y: props.Y,
            Map: props.Map,
            HP: props.HP,
            Level: props.Level,
            Exp: props.Exp
        };
        return array;
    };

    //work
    this.updatePlayer = function () {
        player.propietats.X = player.propietats.Sprite.x;
        player.propietats.Y = player.propietats.Sprite.y;
    };

    //mig
    this.createPlayer = function (propietats) {
        player.propietats.X = propietats.X;
        player.propietats.Y = propietats.Y;
        player.propietats.Exp = propietats.Exp;
        player.propietats.HP = propietats.HP;
        player.propietats.Map = propietats.Map;
        player.propietats.Level = propietats.Level;
        player.propietats.Name = propietats.Name;
    };
};