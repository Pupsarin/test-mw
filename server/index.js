const app = require('express')();
const server  = require('http').createServer(app);
const io = require('socket.io').listen(server, { origins: '*:*'});
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./models');
const { createMessage, getAllMessages } = require('./handlers/messageHandler');
const { getAllUsers } = require('./handlers/userHandler');
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

function getAllOnlineUsers(connections) {
    let users = [...connections.values()].map((item)=>{
        return {
            username: item.user.username
        };
    });
    let distinctUsers = [];
    let map = new Map();
    for (let user of users) {
        if(!map.has(user.username)){
            map.set(user.username, true);
            distinctUsers.push(user);
        }
    }
    return distinctUsers;   
}

async function getAllUsersForAdmin(distinctUsers) {
    let allUsers = await getAllUsers();
    allUsers.forEach( (user) => {
        if (distinctUsers.find((el) => el.username === user.username)){
            user.isOnline = true;
        } else {
            user.isOnline = false;
        }
    });
    return allUsers;
}


// db.User.create({username: 'admin', password: 'admin', isAdmin: true});
const connections = new Map();
io.on('connection', async (socket) => {

    // get user from db by token
    const user = await db.User.findOne({'token': socket.handshake.query.token});

    if (socket.handshake.query.token !== user.token) {
        console.log('disconnected ' + socket.id)
        socket.disconnect();
    }
    
    if (!user || user.isBanned){
        socket.disconnect();
    }

    connections.set( socket.id, { socket, user } );

    let msg = await getAllMessages();
    socket.emit('messages', msg);

    // send online users
    io.sockets.emit('users_online', getAllOnlineUsers(connections));

    // if user admin - send full users list
    if (user.isAdmin) {
        let allUsers = await getAllUsersForAdmin(getAllOnlineUsers(connections));
        socket.emit('all_users', allUsers);
    } else {
        //todo wrap into function userBroadcast for admin
        let adminSocketId = [...connections.values()].filter((user)=> user.user.isAdmin );
        let allUsers = await getAllUsersForAdmin(getAllOnlineUsers(connections));
        adminSocketId.forEach((el) => io.to(el.socket.id).emit('all_users', allUsers));
    }
    

    socket.on('message', async (newMsg) => {
        if (user.isMuted){
            return false;
        }

        let lastMessage = await db.Message.find({'user': user.id}).sort({ $natural: -1 }).limit(1);
        let timeDifference = 0;
        
        if (lastMessage) {
            let lastMessageTime = lastMessage[0].createdAt/1000|0;
            timeDifference = (Date.now()/1000|0) - lastMessageTime;
        }

        if (newMsg.message && timeDifference > 15) {
            await createMessage(newMsg);
            let newMessages = await getAllMessages();
            io.sockets.emit('update', newMessages);
        }
        
        return false;
    });

    // user disconnected
    socket.on('disconnect', async () => {
        const connect = connections.get(socket.id);
        io.sockets.emit('user_gone_away', {name: connect.user.username});
        connect.socket.disconnect();
        connections.delete(socket.id);
        io.sockets.emit('users_online', getAllOnlineUsers(connections));
        //todo wrap into function userBroadcast for admin
        let adminSocketId = [...connections.values()].filter((user)=> user.user.isAdmin );
        let allUsers = await getAllUsersForAdmin(getAllOnlineUsers(connections));
        adminSocketId.forEach((el) => io.to(el.socket.id).emit('all_users', allUsers));
    });

    socket.on('mute', async (targetUser) => {
        if (!user.idAdmin){
            return false;
        }
        await db.User.findOneAndUpdate({ username: targetUser }, { isMuted: true }, { new: true });
        socket.emit('muted');
    });

    socket.on('unmute', async (targetUser) => {
        if (!user.idAdmin){
            return false;
        }
        await db.User.findOneAndUpdate({ username: targetUser }, { isMuted: false }, { new: true });
        socket.emit('unmuted');
    });

    socket.on('ban', async (targetUser) => {
        if (!user.idAdmin){
            return false;
        }
        
        await db.User.findOneAndUpdate({ username: targetUser }, { isBanned: true }, { new: true });
        // ban user by id
        // .... db command
        const userForBanId = 0;

        // disconnect banned user
        connections.forEach((connection, socketId, map)=>{
            // 
            if (connection.user.id.equals(userForBanId)){
                connection.socket.disconnect();

                // send all user, that admin banned some user
                socket.emit('admin_banned_user', {name: connection.user.name});
            }
        });
    });

    socket.on('unban', async (targetUser) => {
        if (!user.idAdmin){
            return false;
        }
        // unban user by id
        await db.User.findOneAndUpdate({ username: targetUser }, { isBanned: false }, { new: true });
        socket.emit('unbanned');
    });
});

server.listen(3001, ()=> console.log('listening on 3001'));


// 5c9ce836bcb92526aaa226e0