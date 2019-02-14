var vieGentils = 5000;
var vieSauron = 5000;
var evilHealthPourcentage = 100;
var goodHealthPourcentage = 100;
var socket = io.connect('http://localhost:1337');


function dealDamage(factionDamaged, damageAmount) {
    socket.emit(factionDamaged, damageAmount);
};

function showQuest(questId) {
    socket.emit('show-quest', questId)
};

function finishQuest(questId) {
    var winner = prompt("Entrer si les bons ou les mauvais ont gagné.")
    if(winner === 'bon') {
        socket.emit('set-winner', questId, 'Communautée de l\'anneau');
        
    }
    else if(winner === 'mauvais') {
        socket.emit('set-winner', questId, 'Sauron');    }
    else {
        this.finishQuest(questId);
    }
}

socket.on('quests-list', function(questsList) {
    questsList.forEach(function (quest)  {
        $('#quest-wrapper').append('<div class="quest-card"> <h2 class="quest-title">' + quest.name + '</h2> <button class="quest-button" onclick="showQuest('+ quest.id +')"> Afficher la quete </button> <button class="quest-button" onclick="finishQuest('+ quest.id +')"> Valider la quete </button> </div>') 
    });
      
})

socket.on('hit-evil-boss', function (nbr)  {
    vieSauron -= nbr;
    evilHealthPourcentage = (vieSauron / 5000 ) * 100;
    vieSauron <=0 ? $('#evil-health-value').text(0) :$('#evil-health-value').text(vieSauron);
    $('#evil-health').css('width', evilHealthPourcentage + '%');
});

socket.on('hit-good-boss', function (nbr) { 
    vieGentils -= nbr;
    
    goodHealthPourcentage = (vieGentils / 5000 ) * 100;
    vieGentils <=0 ? $('#good-health-value').text(0) :$('#good-health-value').text(vieGentils);
    
    $('#good-health').css('width', goodHealthPourcentage + '%');
});

socket.on('quest-to-show', function (quest) {
    
    if (quest.showned === false) {

        $('#quests-list').append('<div class="quest-item"> <h2 class ="quest-title"> Quete N° '+ quest.id +' : </h2><p>'+ quest.name +'</p><h2>Degats au boss : </h2><p>'+ quest.value +' HP</p><h2>Vainqueurs : </h2><p id="quest-'+ quest.id +'">'+ quest.winner+'</p></div>');
    }
})

socket.on('show-winner', function (quest) {
  
    if(quest.winned === false) {
        $('#quest-'+quest.id).text(quest.winner);
    }
})