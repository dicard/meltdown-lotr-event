//Imports de modules
const express = require('express'),
    path = require('path'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server);


//Import des routes
const index = require('./controllers/routes/index'),
    barman = require('./controllers/routes/barman');


//configuration du serveur
server.listen(1337);
app.use(express.static(path.join(__dirname, '/public')));



//mise en polace des routes

app.use('/', index);
app.use('/barman', barman);

//logique socket io
io.sockets.on('connection', (socket) => {
    socket.on('guerriersBien', (nbr) => {

        socket.broadcast.emit('dammagesBien', nbr)
    } );

    socket.on('guerriersMal', (nbr) => {

        socket.broadcast.emit('dammagesMal', nbr)
    } );
})