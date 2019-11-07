var express = require('express');
var socket =  require('socket.io');

// App Setup
var app = express();
var port = process.env.PORT || 3000;

var path = require('path');
var server = require('http').createServer(app);
server.listen(port,function(){
    console.log('listening request on port ' + port);
});


// Routing
app.use(express.static(path.join(__dirname, 'public')));

// Socket setup
var io = socket(server);
// var io = require('../..')(server);

io.on('connection', function(socket){
    console.log("made socket connection with " + socket.id);

    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    })

    socket.on('sensorY', function(data){
        socket.broadcast.emit('sensorY', data);
    })

    socket.on('sensorZ', function(data){
        socket.broadcast.emit('sensorZ', data);
    })

});
