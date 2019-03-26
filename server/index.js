const app = require('express')();
const server  = require('http').createServer(app);
const io = require('socket.io').listen(server, { origins: '*:*'});

server.listen(3001, ()=> console.log('listening on 3001'));

const db = require('./models');



io.on('connection', socket => {
    console.log('connected');
    socket.on('first_connection', () => {
        db.Message.find({})
            .then( msgs => io.sockets.emit('messages', msgs));
    })
});


