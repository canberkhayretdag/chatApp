const socketio = require('socket.io');
const socketAuthorization = require('../middleware/socketAuthorization');
const io = socketio();

const socketApi = {
    io
};

// libs

const Users = require('./lib/Users');

io.use(socketAuthorization);

/* adapter */

const redisAdapter = require('socket.io-redis');
io.adapter(redisAdapter({
    host: process.env.REDIS_URI,
    port: process.env.REDIS_PORT
}));


io.on('connection', socket => {
    console.log('Hello, ' + socket.request.user.name);

    Users.upsert(socket.id, socket.request.user);

    Users.list(Users => {
        io.emit('onlineList', Users);
    });

    socket.on('disconnect', () => {
        Users.remove(socket.request.user.googleId);

        Users.list(Users => {
            io.emit('onlineList', Users);
        });
    });
});

module.exports = socketApi;