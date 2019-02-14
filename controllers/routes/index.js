var express = require('express'),
    index = express.Router();

index.get('/', (req, res) => {
 
    res.render('index.ejs', {title: 'Meltdown LOTR event' });

})

module.exports = index;