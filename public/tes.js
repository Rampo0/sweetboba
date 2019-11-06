var socket = io();

//listen for events
socket.on('chat', function(data){
    console.log(data);
});


socket.on('typing', function(data){
    console.log(data);
});


//send message
socket.emit('chat',
    "hello serverdd"
);

socket.emit('typing', "i am typing here");
