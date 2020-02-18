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
    database: 'promeddb'
});
connection.connect();




// rest service
app.get('/patient/insert', function (req, res) {
    var patient = JSON.parse(JSON.stringify(req.body));
    var query = "INSERT INTO patient VALUES (?,?,?,?,?,?,?)";

  connection.query(query, [patient.NSS, patient.Nom, patient.prenom,patient.address,patient.phone,patient.password,patient.newpassword],function(error,results) {
    if (error) {
        res.send("ERROR")
    }
    else {
        res.send("SUCCES")
    }

  })
    
});
// server creation

var server = app.listen(8082, function () {
    var host = server.address().address
    var port = server.address().port
});