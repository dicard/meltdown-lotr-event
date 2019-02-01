var guerriersBien = 0 ;
var guerriersMal = 0

var socket = io.connect('http://localhost:1337');

$('#shooter-bien').click( e => {
    socket.emit('guerriersBien', 3);
});

$('#shooter-mal').click( e => {
    socket.emit('guerriersMal', 3);
});

$('#mettre-bien').click( e => {
    socket.emit('guerriersBien', 20);
});

$('#mettre-mal').click( e => {
    socket.emit('guerriersMal', 20);
});

$('#bierre-bien').click( e => {
    socket.emit('guerriersBien', 5);
});

$('#bierre-mal').click( e => {
    socket.emit('guerriersMal', 5);
});

$('#cocktail-bien').click( e => {
    socket.emit('guerriersBien', 7);
});

$('#cocktail-mal').click( e => {
    socket.emit('guerriersMal', 7);
});

$('#bouteille-bien').click( e => {
    socket.emit('guerriersBien', 50);
});

$('#bouteille-mal').click( e => {
    socket.emit('guerriersMal', 50);
});

socket.on('dammagesBien', (nbr) => {
    guerriersBien += nbr;
    $('#guerriers-bien').text(guerriersBien);
});

socket.on('dammagesMal', (nbr) => {
    guerriersMal += nbr;
    $('#guerriers-mal').text(guerriersMal);
});