const app = require('express')();
const server  = require('http').createServer(app);
const io = require('socket.io').listen(server, { origins: '*:*'});
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./models');
const { createMessage } = require('./handlers/messageHandler');
const { createUser } = require('./handlers/userHandler');


app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => 
    res.send("hello")
)

createUser({username: "admin", password: "admin"}).then(res => console.log(res));

const connections = new Map();
io.on('connection', (socket) => {
    console.log('connected ' + socket.id);
    console.log(socket.handshake.query.token);
    //проверить токен
    //если токен правильный пасс
    //нет - дисконект
    
    
    // get user from db by token
    const user = {isBanned: false, name: 'test', isMuted: false, isAdmin: false};

    if (!user || user.isBanned){
        socket.disconnect();
    }

    connections.set(socket.id, { socket, user } );

    db.Message.find({}).populate('user', 'username')
        .then( msgs => {
            // console.log(msgs);
            return socket.emit('messages', msgs);
        });

        // if user admin - send full users list
        if (user.isAdmin) {
            socket.emit('allusers', []);
        }

        // send online users
        socket.emit('users',[...connections.values()].map((user)=>{
            return {
                name: user.name
            };
        }));

    socket.on('message', async (msg) => {
        // загружаешь из бд последнее сообщение пользователя, который только что прислал сообщеник
        // и проверяешь время отправки. если текущее время меньше допустимого интервала для нового,
        // то просто выходишь из этого метода

        await createMessage({messageBody: msg, userId:'5c9c9a89816bd62beeaa6a23'});

        db.Message.find({}).populate('user', 'username')
            .then(newMessages => { 
                return io.sockets.emit('update', newMessages)
            });
    });

    // user disconnected
    socket.on('disconnect', async (msg) => {
        const connect = connections.get(socket.id);

        sockets.emit('user_gone_away', {name: connect.user.name});
        connections.delete(socket.id);
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

//todo ban unban on socket

// 5c9c9a89816bd62beeaa6a23