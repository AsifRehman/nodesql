var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
app.use(cors())

var port = process.env.port || 3300

app.listen(port, () => {
    console.log("Hi This port is running @ http://localhost:3300/api/");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = require('./routes')();
 
app.use('/api', router);


