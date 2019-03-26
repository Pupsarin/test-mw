const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = Promise;

mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/chat', { 
    useNewUrlParser: true,
    keepAlive: true
});

module.exports.User = require('./user');
module.exports.Message = require('./message');