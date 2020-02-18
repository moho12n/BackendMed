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
//API04: Ajout medecin traitant

//API05: Recherche Medecin par commune 
// both
app.get('/getMedecin/:commune/:specialite', function (req, res) {
    var query = "select * from medecin where commune = '"+ req.params.commune +"' and specialite = '" + req.params.specialite+"'";
    connection.query(query, function (error, results) {
        if (error) throw error;
        res.send(results);
    });
});
// Commune uniquement
app.get('/getMedecinCommune/:commune', function (req, res) {
    var query = "select * from medecin where commune = '"+ req.params.commune +"'";
    connection.query(query, function (error, results) {
        if (error) throw error;
        res.send(results);
    });
});
// specialite uniquement
app.get('/getMedecinSpecialite/:specialite', function (req, res) {
    var query = "select * from medecin where specialite = '"+ req.params.specialite +"'";
    connection.query(query, function (error, results) {
        if (error) throw error;
        res.send(results);
    });
});

//*** API06: Get traitement */

app.get('/getTraitement/:patient', function (req, res) {
    var query = "select * from traitements where patient = '"+ req.params.patient +"'";
    connection.query(query, function (error, results) {
        if (error) throw error;
        res.send(results);
    });
});
//*** */

var server = app.listen(8082, function () {
    var host = server.address().address
    var port = server.address().port
});