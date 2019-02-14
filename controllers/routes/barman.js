var express = require('express'),
    barman = express.Router();

barman.get('/', (req, res) => {
 
    res.render('barman.ejs', {title: 'Barmen part' });

})

module.exports = barman;