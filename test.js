var http = require('http');
var fs = require('fs');

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);
var x = 0;
// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    x++;
    socket.clientttt = x;
    socket.emit('message', 'Vous êtes le client n°' + socket.clientttt);

    // Quand le serveur reçoit un signal de type "message" du client    
    socket.on('message', function (message) {
        console.log('le client n°' +socket.clientttt+'m as dit : ' + message);
        socket.emit('dou','stp arrete tu force!');
    });	
});

console.log("http://localhost:8080");
server.listen(8080);
