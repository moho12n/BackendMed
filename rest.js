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
    database: 'tp4'
});
connection.connect();




// rest service
app.get('/getplayers', function (req, res) {
    var query = "select * from player";
    connection.query(query, function (error, results) {
        if (error) throw error;
        res.send(results);
    });
});


app.get('/getplayers/:id_player', function (req, res) {
    var query = "select * from player where id_team = " + req.params.id_player;
    connection.query(query, function (error, results) {
        if (error) throw error;
        res.send(results);
    });
});

app.get('/getteams', function (req, res) {
    var query = "select * from team";
    connection.query(query, function (error, results) {
        if (error) throw error;
        res.send(results);
    })
});

app.post('/addteam', function (req, res) {
    console.log(req.body);
    var team = JSON.parse(JSON.stringify(req.body));
    var query = "INSERT INTO team VALUES (?,?,?)";
    connection.query(query, [team.id_team, team.team_name, team.continent], function (error, results) {
        if (error) {
            res.send("ERROR")
        }
        else {
            res.send("SUCCES")
        }
    });
})
// server creation

var server = app.listen(8082, function () {
    var host = server.address().address
    var port = server.address().port
});