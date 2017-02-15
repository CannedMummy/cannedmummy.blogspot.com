var express = require('express');
var exphbs = require('express-handlebars');

var app = express();

app.engine('.hbs', exphbs({
    defaultLayout: 'main_layout',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.get('/', function (req, res) {
    res.render('index');
});

app.listen(3000);