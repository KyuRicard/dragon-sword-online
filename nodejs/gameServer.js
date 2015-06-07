express = require('express');
http = require('http');
socketIO = require('socket.io');
fs = require('fs');

exports.Server = function() {   
    app = express();
    servidor = http.createServer(app);
    servidor.listen(8080, function() {
            host = servidor.address().address;
            port = servidor.address().port;        
            console.log('http://%s:%s', host, port);
    }); 
    
    io = socketIO.listen(servidor);
    console.log('Escoltant al port %s', servidor.address().port);
    log.write('Escoltant al port ' + servidor.address().port + '\n');
    io.on('connection', function(socket) {
        console.log('IP %s Connected.', socket.address().ip);
		//execute(funcion, parametres[]);
        socket.on('disconnect', function() {
            console.log('IP %s Disconnected.', socket.address().ip);
            log.write('IP ' + socket.address().ip + ' Disconnected.\n');
        });
    });
};