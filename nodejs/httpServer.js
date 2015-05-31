express = require('express');
jade = require('jade');
path = require('path');

//En aquest servidor farem servir MySQL com a Base de Dades
mySql = require('mysql');
//Important pels mètodes POST
bodyParser = require('body-parser');

exports.HttpServer = function() {    
    //Init
    httpLoader = express();
    
    //View
    httpLoader.set('view engine', 'jade');
    //Parser
    httpLoader.use(bodyParser.json());
    httpLoader.use(bodyParser.urlencoded({ extended: true }));
    
    //Static Context
    httpLoader.use(express.static('../')); 
    httpLoader.use('/LogIn/', express.static('../html/login.html'));
    httpLoader.use('/SignUp/', express.static('../html/signup.html'));
    httpLoader.use('/Game/', express.static('../html/game.html'));
    httpLoader.use('/Index/', express.static('/jade/'));
    httpLoader.set('views', path.join(__dirname, 'jade'));
    
    //Listener
    httpLoader.listen(80)       
    
    //POST de Sign Up
    httpLoader.post('/SignUpUsr', signUp = function(req, res) {
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
            connection.query(query, [username], function(err, rows, fields) {
                console.log(rows);
                return rows == null;             
            });           
            
            //Si no existeix, el crea
            if (check) {
                var insert = 'INSERT INTO user VALUES (?, ?, ?)';
                connection.query(insert, [username, password, email], function(err, rows) {                
                    
                }); 
            } else {           
                res.send("<script>alert('Usuari ja existent. Utilitza un usuari diferent.')</script><meta http-equiv='refresh' content='0;url=/SignUp' />");
                res.end();
            }
                          
        } else {
            res.send("<script>alert('Les contrasenyes no coincideixen.')</script><meta http-equiv='refresh' content='0;url=/SignUp' />");
                res.end();
        }
        
    });                    
    
    //POST de Log In
    httpLoader.post('/', login = function(req, res) {
        var pass = req.body.pass;
        var usr = req.body.username;
        var logged = LogIn(usr, pass);
        if (logged) {
            res.render('index', {user: usr});   
        } else {
            res.send("<script>alert('Usuari o contrasenya incorrectes.')</script><meta http-equiv='refresh' content='0;url=/LogIn' />");
            res.end();      
        }
    });
    
    //GET de Game
    httpLoader.get('/Game', function(req, res) {
        req.render('game');    
    });
    
    var LogIn = function(user, pass) {
        connection = mySql.createPool({
                connectionLimit: 5,
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'dso'
        });
        
        var query = 'SELECT Username FROM user WHERE Username = ? AND Password = ?';
        console.log(query);
        
        this.check = connection.query(query, [user, pass]);
        
        console.log('Usuari: %s Check: %s', user, check[0].Username);
        if (user == check.Username) {
            return true;   
        } else {
            return false;   
        }
    };
    
    var passChecker = function(pass1, pass2) {
        return pass1 == pass2;  
    };
    
    var userChecker = function(user, dbuser) {
        return user == dbuser;
    };
};