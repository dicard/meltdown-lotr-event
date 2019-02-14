//Imports de modules
const express = require('express'),
    path = require('path'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server);


//Import des routes
const index = require('./controllers/routes/index'),
    barman = require('./controllers/routes/barman'),
    questsRoute = require('./controllers/routes/quests');

//import json
const questsList = require('./data/quests');
//configuration du serveur
server.listen(1337);
app.use(express.static(path.join(__dirname, '/public')));
// app.set('views', __dirname, '/vue');



//mise en polace des routes

app.use('/', index);
app.use('/barman', barman);
app.use('/quests', questsRoute);

let questIndexFinder = (questId) => {
    var index = questsList.findIndex(i => i.id === questId);
    return index
    
} 
//logique socket io
io.sockets.on('connection', (socket) => {

    socket.emit('quests-list', questsList);

    socket.on('good-damaged', (nbr) => {

        socket.broadcast.emit('hit-good-boss', nbr);
    } );

    socket.on('evil-damaged', (nbr) => {  
        socket.broadcast.emit('hit-evil-boss', nbr);
    } );

    socket.on('show-quest', (questId) => {
        var questIndex = questIndexFinder(questId)        
        var quest = questsList[questIndex];           
        socket.broadcast.emit('quest-to-show', quest);
        questsList[questIndex].showned = true;
    })

    socket.on('set-winner', (questId, winner) => {
        var questIndex = questIndexFinder(questId)        
        if(questsList[questIndex].showned === true) {
            questsList[questIndex].winner = winner;
            var quest = questsList[questIndex];
            socket.broadcast.emit('show-winner', quest);
            questsList[questIndex].winned = true; 
            if(winner === 'Communautée de l\'anneau'){
                socket.broadcast.emit('hit-evil-boss',quest.value)
            }
            else if (winner === 'Sauron') {
                socket.broadcast.emit('hit-good-boss',quest.value)
            }

            questsList[questIndex].showned = false;
        }
    })        
})