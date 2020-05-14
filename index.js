const express = require('express');
const app = express();
const http = require('http').Server(app);
const expressLayouts = require("express-ejs-layouts");
const io = require('socket.io')(http);

app.use(express.static('public'));
app.use(expressLayouts);
app.set("view engine", "ejs");

app.get('/', function(req, res) {
    res.render('index');
});

io.sockets.on('connection', function(socket) {
    socket.on('username', function(username) {
        socket.username = username;
        io.emit('is_online', '<img src = "/images/icon.png" width="40px"> </img>** <i>' + socket.username + ' joined the chat.. **</i>');
    });

    socket.on('disconnect', function(username) {
        io.emit('is_online', '<img src = "/images/icon.png" width="40px"> </img>** <i>' + socket.username + ' left the chat.. **</i>');
    })

    socket.on('chat_message', function(message) {
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });

});

const server = http.listen(4000, function() {
    console.log('server started on PORT 4000');
});
