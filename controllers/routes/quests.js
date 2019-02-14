var express = require('express'),
    quests = express.Router();

quests.get('/', (req, res) => {
 
    res.render('quests.ejs', {title: 'Meltdown LOTR event' });

})

module.exports = quests;