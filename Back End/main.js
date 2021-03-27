var express = require("express")
var db = require("./database")

var app = express();

var port = 1234;

app.get("/", function(req, res){
    res.send("Hello Express");
})

app.get("/login",function(req,res){
    //res.writeHead(200, {'Content-Type':'application/json'});

    var username = req.query.username;
    var password = req.query.password;


    db.Login
    (
        username, 
        password, 
        function(rs)
        {
            res.send(JSON.stringify(rs))
        }
    )
})

app.listen(port);