const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = Promise;

mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb://localhost:27017/chat', { 
    useNewUrlParser: true,
    keepAlive: true,
    useFindAndModify: false
});

module.exports.User = require('./user');
module.exports.Message = require('./message');