const app = require('express')();
const server  = require('http').createServer(app);
const io = require('socket.io').listen(server, { origins: '*:*'});

server.listen(3001, ()=> console.log('listening on 3001'));

const db = require('./models');

const { createMessage } = require('./handlers/messageHandler');

io.on('connection', socket => {
    console.log('connected');
    socket.on('first_connection', () => {
        db.Message.find({})
            .then( msgs => {
                console.log(msgs)
                return io.sockets.emit('messages', msgs);
            });
    });
    socket.on('message', (msg) => {
        createMessage({messageBody: msg, userId:'5c9a389554eea663ad72ac93'});
    })
});


// 5c9a389554eea663ad72ac93