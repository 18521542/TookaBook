var express = require("express")
var AccountApi = require("./Routes/AccountApi")

//init server by express
var app = express();

//config port
var port = 1234;

//hello express
app.get("/", function(req, res){
    res.send("Hello Express");
})

//handle all api here
AccountApi(app);


app.listen(port);