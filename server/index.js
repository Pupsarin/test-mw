// const cors = require('cors');
const app = require('express')();
const server  = require('http').createServer(app);
const io = require('socket.io').listen(server, { origins: '*:*'});
server.listen(3001, ()=> console.log('listening on 3001'));



io.on('connection', () => {
    console.log('connected');
});


