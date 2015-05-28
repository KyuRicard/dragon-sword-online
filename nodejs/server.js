gameServer = require('./gameServer.js');
httpServer = require('./httpServer');

data = new Date();

fs.writeFile('logs\\' + data.toDateString() + '.txt');
log = fs.createWriteStream('logs\\' + data.toDateString() + '.txt');

console.log('Iniciant Servidor de Dragon Sword Online');
log.write('Iniciant Servidor de Dragon Sword Online\n');    
console.log(data.toGMTString());
log.write(data.toGMTString() + '\n');

server = gameServer.Server();

ServidorHTTP = httpServer.HttpServer();
