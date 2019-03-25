const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors());





app.listen(3001, ()=> console.log('listening on 3001'));