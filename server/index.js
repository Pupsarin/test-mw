const app = require('express')();
const cors = require('cors');
const http = require('http').Server(app);
const io = require('socket.io')(http);


app.use(cors());





app.listen(3001, ()=> console.log('listening on 3001'));