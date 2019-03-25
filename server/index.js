const cors = require('cors');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);


app.use(cors());

io.on('connection', () => {
    console.log('connected');
});



app.listen(3001, ()=> console.log('listening on 3001'));