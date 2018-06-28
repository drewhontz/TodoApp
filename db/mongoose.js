var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
console.log('mongo deets', process.env.MONGOLAB_PURPLE_URI);
mongoose.connect(process.env.MONGOLAB_PURPLE_URI || 'mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};