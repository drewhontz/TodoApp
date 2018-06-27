var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://heroku_48mwzsgb:rv17fa3vu9fospuu06ai8mlaq@ds115396.mlab.com:15396/heroku_48mwzsgb');

module.exports = {mongoose};