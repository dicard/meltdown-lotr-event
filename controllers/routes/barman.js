var express = require('express'),
    index = express.Router();

index.get('/', (req, res) => {
 
    res.render('barman.html', {title: 'Barmen part' });

})

module.exports = index;