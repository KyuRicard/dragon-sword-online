express = require('express');
http = require('http');
socketIO = require('socket.io');
fs = require('fs');

data = new Date();

fs.writeFile('logs\\' + data.toDateString() + '.txt', writeFile = function(err) {
    
});

log = fs.createWriteStream('logs\\' + data.toDateString() + '.txt');

var Server = function() {
    console.log('Iniciant Servidor de Dragon Sword Online');
    log.write('Iniciant Servidor de Dragon Sword Online\n');
    
    console.log(data.toGMTString());
    log.write(data.toGMTString() + '\n');
    
    this.init = function(context) {
        app = express();
        servidor = http.createServer(app);
        servidor.listen(8080, function() {
                host = servidor.address().address;
                port = servidor.address().port;        
                console.log('http://%s:%s', host, port);
                log.write('http://' + host + ':' + port + '\n');
            }
        );
        
        httpLoader = express();
        httpLoader.use(express.static('../')); 
        httpLoader.use('/LogIn/', express.static('../html/login.html'));
        httpLoader.use('/SignUp/', express.static('../html/signup.html'));
        httpLoader.use('/Game/', express.static('../html/game.html'));
        httpLoader.listen(80)
        
        
        return servidor;
    }
            
    this.start = function(servidor) {
        io = socketIO.listen(servidor);
        console.log('Escoltant al port %s', servidor.address().port);
        log.write('Escoltant al port ' + servidor.address().port + '\n');
        io.on('connection', function(socket) {
            console.log('IP %s Connected.', socket.address().ip);
            log.write('IP ' + socket.address().ip + ' connected.\n');
            socket.on('disconnect', function() {
                console.log('IP %s Disconnected.', socket.address().ip);
                log.write('IP ' + socket.address().ip + ' Disconnected.\n');
            });
        });
    }

};

server = new Server();
var servidor = server.init(server);
server.start(servidor);
//log.end();

