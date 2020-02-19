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

app.get('/medecin/insert', function (req, res) {
    var medecin = JSON.parse(JSON.stringify(req.body));
    var query = "INSERT INTO medecin VALUES (?,?,?,?,?,?,?,?,?,?)";
    connection.query(query,[medecin.full_name,medecin.commune,
        medecin.specialite,medecin.phone,medecin.localisation,
        medecin.heure_ouverture,medecin.heure_fermeture,null,
        medecin.password,medecin.newpassword],function(error,results){
        if (error) {
            res.send("ERRORaa")
        }
        else {
            res.send("SUCCES")
        }

    })


})


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
//*** API07: GET RDV */

app.get('/getRDV/:patient', function (req, res) {
    var query = "select * from rdv where patient = '"+ req.params.patient +"'";
    connection.query(query, function (error, results) {
        if (error) throw error;
        res.send(results);
    });
});
//***API 08 : GET AGENDA */
app.get('/getAgenda/:medecin', function (req, res) {
    var query = "select * from agenda where medecin = '"+ req.params.medecin +"'";
    connection.query(query, function (error, results) {
        if (error) throw error;
        res.send(results);
    });
});

//******************* */
var server = app.listen(8082, function () {
    var host = server.address().address
    var port = server.address().port
});