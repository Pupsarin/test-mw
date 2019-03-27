const app = require('express')();
const server  = require('http').createServer(app);
const io = require('socket.io').listen(server, { origins: '*:*'});

server.listen(3001, ()=> console.log('listening on 3001'));

const db = require('./models');

const { createMessage } = require('./handlers/messageHandler');

io.on('connection', socket => {
    console.log('connected ' + socket.id);
    db.Message.find({}).populate('user', 'username')
        .then( msgs => {
            // console.log(msgs);
            return socket.emit('messages', msgs);
        });

    socket.on('message', async (msg) => {
        await createMessage({messageBody: msg, userId:'5c9a389554eea663ad72ac93'});
        db.Message.find({}).populate('user', 'username')
            .then(newMessages => { 
                return io.sockets.emit('update', newMessages)
            });
    });
});


// 5c9a389554eea663ad72ac93