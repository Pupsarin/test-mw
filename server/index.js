const app = require('express')();
const server  = require('http').createServer(app);
const io = require('socket.io').listen(server, { origins: '*:*'});
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./models');
const { createMessage, getAllMessages } = require('./handlers/messageHandler');
const authRoute = require('./routes/authRoute');


app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoute);

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: err
    });
});

function getAllOnlineUsers(io, connections) {
    io.sockets.emit('users_online', [...connections.values()].map((item)=>{
        return {
            name: item.user.username
        };
    }));
}

const connections = new Map();
io.on('connection', async (socket) => {
    //проверить токен
    //если токен правильный пасс
    //нет - дисконект
    // if (socket.handshake.query.token !== '123') {
    //     console.log('disconnected ' + socket.id)
    //     socket.disconnect();
    // }
    
    // get user from db by token
    const user = await db.User.findOne({'token': socket.handshake.query.token});
    // const user = {isBanned: false, name: 'test', isMuted: false, isAdmin: false};

    if (!user || user.isBanned){
        socket.disconnect();
    }

    connections.set(socket.id, { socket, user } );
    // console.log(connections);

    let msg = await getAllMessages(); 
    socket.emit('messages', msg);

    // if user admin - send full users list
    if (user.isAdmin) {
        socket.emit('allusers', []);
    }
    // console.log([...connections.values()][0].user.username);
    // send online users
    getAllOnlineUsers(io, connections);

    socket.on('message', async (msg) => {
        // загружаешь из бд последнее сообщение пользователя, который только что прислал сообщеник
        // и проверяешь время отправки. если текущее время меньше допустимого интервала для нового,
        // то просто выходишь из этого метода
        await createMessage(msg);

        let newMessages = await getAllMessages();
        io.sockets.emit('update', newMessages);

    });

    // user disconnected
    socket.on('disconnect', () => {
        const connect = connections.get(socket.id);
        io.sockets.emit('user_gone_away', {name: connect.user.username});
        connect.socket.disconnect();
        connections.delete(socket.id);
        getAllOnlineUsers(io, connections);
    });

    socket.on('mute', async (msg) => {
        if (!user.idAdmin){
            return false;
        }

        // mute user by id
    });

    socket.on('unmute', async (msg) => {
        if (!user.idAdmin){
            return false;
        }

        // unmute user by id
    });

    socket.on('ban', async (msg) => {
        if (!user.idAdmin){
            return false;
        }
        
        // ban user by id
        // .... db command
        const userForBanId = 0;

        // disconnect banned user
        connections.forEach((connection, socketId, map)=>{
            // 
            if (connection.user.id.equals(userForBanId)){
                connection.socket.disconnect();

                // send all user, that admin banned some user
                sockets.emit('admin_banned_user', {name: connection.user.name});
            }
        });
    });

    socket.on('unban', async (msg) => {
        if (!user.idAdmin){
            return false;
        }

        // unban user by id
    });
});

server.listen(3001, ()=> console.log('listening on 3001'));


// 5c9ce836bcb92526aaa226e0