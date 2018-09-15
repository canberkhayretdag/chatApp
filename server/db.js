const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true });

    mongoose.connection.on('open', () => {
        console.log("Great!")
    });

    mongoose.connection.on('error', (err) => {
        console.log('error', err);
    });    

    mongoose.Promise = global.Promise;

}