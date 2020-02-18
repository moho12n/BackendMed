var express = require("express")
var mysql = require("mysql")
var app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static('public'));

//database connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'suivis_intervention_maintenance'
});
connection.connect();




// rest service
app.get('/', function (req, res) {
    
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
    
});
// server creation

var server = app.listen(8082, function () {
    var host = server.address().address
    var port = server.address().port
});