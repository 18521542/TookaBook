var account = require("../Models/Account")

//write your code to link
//service and api
//of every action with account
module.exports = function(app){

    //app.get("/login", loginfunc(req,res))


    //app.get("/update", update)
    app.get("/login", function(req,res){
        //res.writeHead(200, {'Content-Type':'application/json'});
    
        console.log( req.query.username)
        console.log(req.query.password)
        var username = req.query.username;
        var password = req.query.password;
    
    
        account.Login
        (
            username, 
            password, 
            function(rs)
            {
                res.send(JSON.stringify(rs))
            }
        )
    })

    app.get("/update",function(req,res){
        console.log("this is an area for update account service")
    })
}