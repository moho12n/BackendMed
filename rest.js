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


const accountSid = "ACc987331099df0758e8d187d84cae45de";
const authToken = 'cea77ee626d343552419551dfd00024e';
const client = require('twilio')(accountSid, authToken);



// rest service

app.get('/medecin/insert', function (req, res) {
    var medecin = JSON.parse(JSON.stringify(req.body));
    var query = "INSERT INTO medecin VALUES (?,?,?,?,?,?,?,?,?,?)";
    connection.query(query,[medecin.full_name,medecin.commune,
        medecin.specialite,medecin.phone,medecin.localisation,
        medecin.heure_ouverture,medecin.heure_fermeture,null,
        medecin.password,medecin.newpassword],function(error,results){
        if (error) {
            res.send("ERROR")
        }
        else {
            res.send("SUCCES")
        }

    })


})


app.post('/medecin/acceptpatient/:patient/:medecin', function (req, res) {
    var query =
     "UPDATE demandeajout set statut='accepted' where patient='"+req.params.patient
     +"'"+" and medecin='"+req.params.medecin+"'";
     connection.query(query,function(error,results){
        if (error) {
            res.send("ERROR")
        }
        else {
            res.send("SUCCES")
        }}
        );});
/// DEmande Ajout 
app.get('/patient/demandeajout', function (req, res) {
    var demandeajout = JSON.parse(JSON.stringify(req.body));
    var query = "INSERT INTO demandeajout VALUES (?,?,?,?,?)";
    connection.query(query,[demandeajout.date,demandeajout.id,demandeajout.medecin,
        demandeajout.patient,demandeajout.statut],function(error,results){
        if (error) {
            res.send("ERROR")
        }
        else {
            res.send("SUCCES")
        }}
    );});
app.get('/login/:phone/:password', function (req, res) {    

    var query = "Select * from patient where phone = '"+ req.params.phone +"' and password = '"+req.params.password+" '";
 
    connection.query(query, function (error, results) {
        console.log(req.params.phone,req.params.password)
        if(results || results==null) res.send(results);
        if (error) throw error;
        
        
    });


});
/// vol 2


app.get('/getDemandeAjout/:medecin', function (req, res) {
    var query = "select * from demandeajout where statut = 'pending' and demandeajout.medecin = '" + req.params.medecin+"'";
    connection.query(query, function (error, results) {
        if (error) throw error;
        res.send(results);
    });
});
//---------------------------------------






app.post('/patient/insert', function (req, res) {
    var patient = JSON.parse(JSON.stringify(req.body));
    var query = "INSERT INTO patient VALUES (?,?,?,?,?,?,?)";

  connection.query(query, [patient.NSS, patient.Nom, patient.Prenom,patient.adresse,patient.phone,patient.password,patient.newpassword],
    function(error,results) {
    if (error) {
        res.send("ERROR")
        console.log(error)
    }
    else {
        res.send("SUCCES")
        console.log("aa")

    }

  })
    
});




app.post('/patient/update/:phone/:password', function (req, res) {
    var query = "Update patient SET password='"+ req.params.password+"' ,newpassword='0' where phone ='"+req.params.phone+"'";

  connection.query(query, function(error,results) {
    if (error) {
        res.send("ERROR")
        console.log(error)
    }
    else {
        res.send("SUCCES")
    }

  })
    
});

// API03:  medecins traitants

app.get('/getMedTraitant/:phone/:statut', function (req, res) {
    var query = "select medecin.* from medecin inner join demandeajout ON demandeajout.medecin = medecin.phone where demandeajout.statut = '"+req.params.statut+"' and demandeajout.patient = '" + req.params.phone+"'";

    connection.query(query, function (error, results) {
        if (error) throw error;
        res.send(results);
        
    });
});

//API04: Ajout medecin traitant
app.post('/patient/demandetraitement',function(req,res){

    var demandeajout = JSON.parse(JSON.stringify(req.body));

var query = "insert into demandeajout values (?,?,?,?,?)"
connection.query(query,[demandeajout.date,null,demandeajout.medecin,demandeajout.patient,demandeajout.statut],function(error,results) {
    if (error) {
        res.send("ERROR")
        console.log(error)
    }
    else {
        res.send("SUCCES")
        console.log("aa")

    }

  })


}

);

app.post('/medecin/accepterpatient/:patient/:medecin', function (req, res) {
 
    var query = "Update demandeajout SET statut='accepted' where patient='"+req.params.patient+"' and medecin='"+req.params.medecin+"'"

    connection.query(query,function(error,results) {
        if (error) {
            res.send("ERROR")
            console.log(error)
        }
        else {
            res.send("SUCCES")
    
        }
    
      })
})
app.post('/medecin/refuserpatient/:patient/:medecin', function (req, res) {
 
    var query = "Update demandeajout SET statut='refused' where patient='"+req.params.patient+"' and medecin='"+req.params.medecin+"'"

    connection.query(query,function(error,results) {
        if (error) {
            res.send("ERROR")
            console.log(error)
        }
        else {
            res.send("SUCCES")
    
        }
    
      })
})

//API05: Recherche Medecin par commune 
// both
app.get('/getMedecin/:commune/:specialite', function (req, res) {
    var query = "select * from medecin where commune like '"+ req.params.commune +"%' and specialite like '" + req.params.specialite+"%'";
    connection.query(query, function (error, results) {
        if (error) throw error;
        res.send(results);
    });
});
// vol 2
app.get('/getMedecin/:commune/', function (req, res) {
    var query = "select * from medecin where commune like '" + req.params.commune +"%'";
    connection.query(query, function (error, results) {
        if (error) throw error;
        res.send(results);
    });
});
// vol 3
app.get('/getMedecin//:specialite/', function (req, res) {
    var query = "select * from medecin where specialite like '" + req.params.specialite +"%'";
    connection.query(query, function (error, results) {
        if (error) throw error;
        res.send(results);
    });
});
// vol 4 
// tout
app.get('/getMedecin//', function (req, res) {
    var query = "select * from medecin ";
    connection.query(query, function (error, results) {
        if (error) throw error;
        res.send(results);
    });
});
app.get('/getMedecin', function (req, res) {
    var query = "select * from medecin ";
    connection.query(query, function (error, results) {
        if (error) throw error;
        res.send(results);
    });
});

app.get('/getMedecinCommune/:commune', function (req, res) {
    console.log(req.params.commune);
    if(req.params.commune != null)
    var query = "select * from medecin where commune like '"+ req.params.commune +"%'";
    else var query = "select * from medecin";     
    connection.query(query, function (error, results) {
        if (error) throw error;
        res.send(results);
    });
});
app.get('/getMedecinCommune/', function (req, res) {    
    var query = "select * from medecin";     
    connection.query(query, function (error, results) {
        if (error) throw error;
        res.send(results);
    });
});
// specialite uniquement
app.get('/getMedecinSpecialite/:specialite', function (req, res) {
    
    var query = "select * from medecin where specialite like'"+ req.params.specialite +"%'";
    connection.query(query, function (error, results) {
        if (error) throw error;
        res.send(results);
    });
});

app.get('/getMedecinSpecialite/', function (req, res) {
    var query = "select * from medecin";     
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

app.post('/sendSMS',function(req,res){
    var password= req.body.password;
    var num = req.body.phone;
    client.messages.create({
        to: "+"+num,
        from: '+12818154469',
        body: "Votre mot de passe est = "+ password,
      },function(err,message) {
        if(err){
          console.error(err.message);
          //res.send("err");
          res.send(JSON.stringify("err.message"));
        }
        else{
          console.log(message.body);
        //  res.send("success");
          res.send(JSON.stringify("message.body)"));
        }
      });
  });

//******************* */
var server = app.listen(8082, function () {
    var host = server.address().address
    var port = server.address().port
});