express = require('express');
app = express();
http = require('http');
socketIO = require('socket.io')(http.createServer(app));
mySql = require('mysql');

exports.Server = function () {
    var connection = mySql.createPool({
        connectionLimit: 5,
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'dso'
    });


    servidor = http.createServer(app);
    servidor.listen(1234, function () {
        host = servidor.address().address;
        port = servidor.address().port;
        console.log('http://%s:%s', host, port);
    });

    io = socketIO.listen(servidor);
    console.log('Escoltant al port %s', servidor.address().port);

    var players = {};
    var exists = function (exist) {
        return exist != undefined;
    };

    io.on('connection', function (socket) {
        socket.on('connecta', function (username) {
            console.log('connect');
            socket.username = username;
            players[username] = {};

            console.log(username + ' ' + socket.id);

            var query = 'SELECT id FROM players WHERE id LIKE ?';
            connection.query(query, [username], function (err, rows) {
                if (err) {
                    //console.log(err);
                } else {
                    exists(rows[0].id);
                }
            });

            if (!exists()) {
                query = 'INSERT INTO players(`id`, `Imatge`, `X`, `Y`) VALUES(?, ?, ?, ?)';
                connection.query(query, [username, 'player', 100, 100], function (err, rows) {
                    if (err) {
                        //console.log(err);
                    }
                });
            }
            socket.emit('waitOut', 'true');
        });

        socket.on('getPlayers', function () {
            for (var i = 0; i < players.length; ++i) {
                console.log('Emit: ' + i + ' %s', players[i])
            }
            socket.emit('players', players);

        });

        socket.on('disconnect', function () {
            var player = players[socket.username];
            if (player != undefined) {
                var query = 'UPDATE players SET X = ?, Y = ?, HP = ?, Exp = ?, Map = ?, Level = ? WHERE id LIKE ?';
                connection.query(query, [player.X, player.Y, player.HP, player.Exp, player.Map, player.Level, player.Name], function (err, rows) {
                    if (err) {
                        console.log(err);
                    }
                });
            }

            console.log('%s desconnectat.', socket.username);
            io.sockets.emit('playerDisconnect', socket.username);
            delete players[socket.username];
        });

        socket.on('sendPlayer', function (player) {
            players[socket.username] = player;
        });

        socket.on('getPlayer', function (name) {
            console.log('Get Player %s', name);
            var query = 'SELECT id, X, Y, HP, Exp, Map, Level FROM players WHERE id LIKE ?';
            connection.query(query, [name], function (err, rows) {
                if (err) {
                    console.log(err);
                }
                if (rows[0] != undefined) {
                    console.log('id: %s, X: %s, Y: %s', rows[0].id, rows[0].X, rows[0].Y);
                    setPlayerJson(rows[0], rows[0].id);
                    socket.emit('setPlayer', players[socket.username]);
                } else {
                    console.log('Empty');
                }
            });
            for (i in players) {
                console.log('Name: %s, X: %s, Y: %s', i.Name, i.X, i.Y);
            }
        });
    });

    var playerJson = {};

    var setPlayerJson = function (propietats, id) {
        players[id] = {
            Name: propietats.id,
            X: propietats.X,
            Y: propietats.Y,
            HP: propietats.HP,
            Exp: propietats.Exp,
            Map: propietats.Map,
            Level: propietats.Level
        };
    };
};