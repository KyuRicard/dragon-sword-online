express = require('express');
app = express();
http = require('http');
socketIO = require('socket.io')(http.createServer(app));
fs = require('fs');
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
    servidor.listen(8080, function () {
        host = servidor.address().address;
        port = servidor.address().port;
        console.log('http://%s:%s', host, port);
    });

    io = socketIO.listen(servidor);
    console.log('Escoltant al port %s', servidor.address().port);
    log.write('Escoltant al port ' + servidor.address().port + '\n');

    var users = {};
    var numPlayers = 0;
    var players = {};

    io.on('connection', function (socket) {
        socket.on('connect', function (username) {
            socket.username = username;
            users[username] = username;
            ++numPlayers;
        });

        socket.on('getPlayers', function () {
            socket.emit('players', players);
        });

        socket.on('disconnect', function () {
            delete users[socket.username];
            --numPlayers;
            var player = players[socket.username];
            var query = 'UPDATE players SET X = ?, Y = ?, HP = ?, Exp = ?, Map = ?, Level = ? WHERE id LIKE ?';
            connection.query(query, [player.X, player.Y, player.HP, player.Exp, player.Map, player.Level, player.Name], function (err, rows) {
                if (err) {
                    console.log(err);
                }
            });

            delete players[socket.username];
        });

        socket.on('sendPlayer', function (player) {
            players[socket.username] = player;
        });

        socket.on('getPlayer', function (name) {
            console.log('Get Player %s', name);
            var query = 'SELECT id, X, Y, HP, Exp, Map, Level FROM players WHERE id LIKE ?';
            connection.query(query, [name], function (err, rows) {
                setPlayerJson(rows[0]);
            });
            players[socket.username] = playerJson;
            socket.emit('setPlayer', playerJson);
            io.sockets.emit('setPlayer', playerJson);
        });
    });

    var playerJson = {};

    var setPlayerJson = function (propietats) {
        playerJson = {
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