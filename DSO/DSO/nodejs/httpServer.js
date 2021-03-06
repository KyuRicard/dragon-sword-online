express = require('express');
jade = require('jade');
path = require('path');
cookieParser = require('cookie-parser');
io = require('socket.io')();

//En aquest servidor farem servir MySQL com a Base de Dades
mySql = require('mysql');
//Important pels mètodes POST
bodyParser = require('body-parser');

exports.HttpServer = function () {
    //Init
    httpLoader = express();

    httpLoader.use(cookieParser());
    //View
    httpLoader.set('view engine', 'jade');
    //Parser
    httpLoader.use(bodyParser.json());
    httpLoader.use(bodyParser.urlencoded({
        extended: true
    }));

    //Static Context
    httpLoader.use('/', express.static('../'));
    httpLoader.use('/LogIn/', express.static('../html/login.html'));
    httpLoader.use('/SignUp/', express.static('../html/signup.html'));
    httpLoader.use('/Index/', express.static('/jade/'));
    httpLoader.set('views', path.join(__dirname, 'jade'));

    //Listener
    httpLoader.listen(80)

    //POST de Sign Up
    httpLoader.post('/SignUpUsr', signUp = function (req, res) {
        if (!req.cookies.user) {
            //Comprova que coincideixin les dues contrasenyes
            var pass1 = req.body.pass1;
            var pass2 = req.body.pass2;

            var checked = passChecker(pass1, pass2);

            //Crea la connexió
            if (checked) {
                connection = mySql.createPool({
                    connectionLimit: 5,
                    host: 'localhost',
                    user: 'root',
                    password: '',
                    database: 'dso'
                });

                var username = req.body.username;
                var email = req.body.mail;
                var password = req.body.pass1;

                //Consulta si l'usuari ja existeix
                var query = 'SELECT Username FROM user WHERE Username = ?';

                this.check =
                    connection.query(query, [username], function (err, rows, fields) {
                        if (err || rows[0] == undefined) {
                            checkUser(false);
                        } else {
                            checkUser(true);
                        }
                    });

                //Si no existeix, el crea
                if (check) {
                    /*var insert = 'INSERT INTO user VALUES (?, ?, ?)';
                    connection.query(insert, [username, password, email], function (err, rows) {

                    });*/
                    res.cookie('user', username);
                    insert = 'INSERT INTO player VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
                    connection.query(insert, [username, 100, 100, 0, 0, 0, 0, 0, 'player'], function (err, rows) {

                    });
                } else {
                    res.send("<script>alert('Usuari ja existent. Utilitza un usuari diferent.')</script><meta http-equiv='refresh' content='0;url=/SignUp' />");
                    res.end();
                }

            } else {
                res.send("<script>alert('Les contrasenyes no coincideixen.')</script><meta http-equiv='refresh' content='0;url=/SignUp' />");
                res.end();
            }
        }
        res.redirect('/');
    });

    //POST de Log In
    httpLoader.post('/', login = function (req, res) {
        var pass = req.body.pass;
        var usr = req.body.username;
        var logged = LogIn(usr, pass);
        if (logged) {
            res.cookie('user', usr);
            res.redirect('/');
        } else {
            res.send("<script>alert('Usuari o contrasenya incorrectes.')</script><meta http-equiv='refresh' content='0;url=/LogIn' />");
            res.end();
        }
    });

    httpLoader.get('/', function (req, res) {
        res.render('index', {
            user: req.cookies.user
        });
    });

    httpLoader.get('/Admin', function (req, res) {
        io = io('http://localhost:8080');
        io.emit('getPlayers');
        io.on('players', function (players) {
            res.render('admin', {
                playArr: players
            });
        });
    });

    //GET de Game
    httpLoader.get('/Game', function (req, res) {

        res.render('game', {
            user: req.cookies.user
        });
    });

    httpLoader.get('/LogOut', function (req, res) {
        res.clearCookie('user');
        res.redirect('/');
    });

    var checked;

    var checkUser = function (check) {
        checked = check;
    };

    var LogIn = function (user, pass) {
        connection = mySql.createPool({
            connectionLimit: 5,
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'dso'
        });

        var query = 'SELECT Username FROM user WHERE Username LIKE ? AND Password LIKE ?';

        connection.query(query, [user, pass], function (err, rows, fields) {
            if (err) {
                console.log(err);
            } else {
                check = rows[0].Username;
                checkUser(check);
            }
        });

        return checked != null;
    };

    var passChecker = function (pass1, pass2) {
        return pass1 == pass2;
    };

    var userChecker = function (user, dbuser) {
        return user == dbuser;
    };
};