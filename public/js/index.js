var guerriersBien = 0 ;
var guerriersMal = 0;
var vieBoss = 5000;
var healthPourcentage = 100;

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
    vieBoss -= nbr;
    healthPourcentage = (vieBoss / 5000 ) * 100;
    $('#guerriers-bien').text(guerriersBien);
    vieBoss <=0 ? $('#health-value').text(0) :$('#health-value').text(vieBoss);
    $('#health').css('width', healthPourcentage + '%');
});

socket.on('dammagesMal', (nbr) => {
    guerriersMal += nbr;
    vieBoss -= nbr;
    
    healthPourcentage = (vieBoss / 5000 ) * 100;
    $('#guerriers-mal').text(guerriersMal);
    vieBoss <=0 ? $('#health-value').text(0) :$('#health-value').text(vieBoss);
    
    $('#health').css('width', healthPourcentage + '%');
});