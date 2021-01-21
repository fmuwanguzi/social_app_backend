require('dotenv').config({path: '../.env'});
const mongoose = require('mongoose');

console.log(process.env.MONGO_URI)
// Mongo connection
mongoose.connect(process.env.MONGO_URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

// Mongoose connection object
const db = mongoose.connection;

// Set up an event listener that will fire once the connection opens for the DB
// Log to the terminal what host and port we are on.
db.once('open', () => {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});

db.on('error', (error) => {
    console.log(`Database error \n ${error}`);
});


module.exports.User = require('./User');
