var vieGentils = 5000;
var vieSauron = 5000;
var evilHealthPourcentage = 100;
var goodHealthPourcentage = 100;

var socket = io.connect('http://localhost:1337');

var app = new VTTCue( {
    el:
})

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
    vieSauron -= nbr;
    evilHealthPourcentage = (vieSauron / 5000 ) * 100;
    vieSauron <=0 ? $('#evil-health-value').text(0) :$('#evil-health-value').text(vieSauron);
    $('#evil-health').css('width', evilHealthPourcentage + '%');
});

socket.on('dammagesMal', (nbr) => {
    vieGentils -= nbr;
    
    goodHealthPourcentage = (vieGentils / 5000 ) * 100;
    vieGentils <=0 ? $('#good-health-value').text(0) :$('#good-health-value').text(vieGentils);
    
    $('#good-health').css('width', goodHealthPourcentage + '%');
});