var express = require('express')
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');


app.set('view engine', 'jade');
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

app.use('/', require('./routes/index.js'));
app.use('/contacts', require('./routes/contacts.js'));
//app.use('/delete', require('./routes/contacts.js'))

app.listen(process.env.PORT || 5000)
