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
<<<<<<< HEAD
    database: 'promeddb'
=======
    database: 'suivis_intervention_maintenance'
>>>>>>> 77f8092606b56fcfd7b50ff925b7da6bdd6487e0
});
connection.connect();




// rest service
app.get('/', function (req, res) {
    
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
    
});
// server creation
app.get('/', function (req, res) {
    var query= "INSERT INTO medecin (full_name, commune, specialite, phone, localisation, heure_ouverture, heure_fermeture, agenda) VALUES ('ssss', 'ss', 'géni', '04244444', 'lien google', '08:00:00', '16:00:00', NULL)"
  
  connection.query(query,function(error,results) {
    if (error)throw error;
res.send(results);
  })
    
});

var server = app.listen(8082, function () {
    var host = server.address().address
    var port = server.address().port
});