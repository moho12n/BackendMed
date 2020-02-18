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
app.get('/patient/insert/:nss/:nom/:prenom/:adresse/:phone/:password/', function (req, res) {
    var query= "INSERT INTO patient(NSS, Nom, prenom, adresse, phone, password, newpassword) Values ('"+req.params.nss +"','"+req.params.nom +"','"+req.params.prenom +"','"+req.params.address +"','"+req.params.phone +"','"+req.params.password +"','false')" ;
  
  connection.query(query,function(error,results) {
    if (error)throw error;
res.send(results);
  })
    
});

// API03: Get medecin traitant 
app.get('/getMedTraitant/:nss', function (req, res) {
    var query = "select * from demandeajout where statut = 'accepted' and patient = " + req.params.nss;
    connection.query(query, function (error, results) {
        if (error) throw error;
        res.send(results);
    });
});
//API04:

var server = app.listen(8082, function () {
    var host = server.address().address
    var port = server.address().port
});