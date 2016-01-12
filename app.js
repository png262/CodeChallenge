var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var morgan = require('morgan')


// static file middleware
app.use(express.static(__dirname + '/public'));

//use to parse body of incoming requests
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//use to troubleshoot/diagnose requests
app.use(morgan('tiny'));

//Use routes folder for specific routing
app.use('/', require('./routes/'));

//Start server on port 3000
app.listen(3000)
