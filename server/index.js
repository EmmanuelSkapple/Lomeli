const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));




var ListUser = []

app.get('/', function (req, res) {
    res.send('Hello World!');
});


app.post('/Entrar', function (req, res) {
    var data = req.body;
    var user = data.User;
    var pass = data.Pass;
    let bandera = false;
    if(ListUser.length>0){
        ListUser.forEach(function (snap) {
            if (snap.User == user && snap.Pass == pass) {
                res.send('OK')
                bandera =true;
            }
        })
    if(!bandera){
        res.send(false)

    }

    }else{

    }
   
})


app.post('/Registrar', function (req, res) {
    var data = req.body;
    var user = data.User;
    var pass = data.Pass;
   ListUser.push({
       User:user,
       Pass:pass,
   })
   res.send("OK")

})

app.post('/Modificar', function (req, res) {
    var data = req.body;
    var user = data.User;
    var pass = data.Pass;
    var index =data.Index;
    ListUser[index] = {  User: user, Pass: pass,}
    res.send("OK");

})


app.post('/Eliminar', function (req, res) {
    ListUser.splice(req.body.Index, 1);
    res.send("OK");

})


app.post('/Consultar', function (req, res) {
    res.send(ListUser);
})

app.post('/Limpiar', function (req, res) {

    ListUser=[];
    res.send("OK");
})






app.listen(process.env.PORT || 4000, function () {
    console.log("up and running on port " + process.env.PORT);
});