gameServer = require('./gameServer.js');
httpServer = require('./httpServer');

data = new Date();


console.log('Iniciant Servidor de Dragon Sword Online');   
console.log(data.toGMTString());

server = gameServer.Server();

ServidorHTTP = httpServer.HttpServer();
