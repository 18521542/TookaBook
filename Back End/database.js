var mysql = require('mysql');
var connected = 0;
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bookstoremanagement'
})

var connect = function(){
    if(connected==1){
        return;
    }
    connected=1;
    connection.connect(function (err) {
        if(!err) {
            console.log("DB connected");
        }
        else {
            console.log("err");
        }
    })
}

var close = function(){
    connection.end(function(err){
        if(!err){
            console.log("DB close");
        }
    })
}

exports.getAlluser = function(callbackQuerry){
    connect();
    connection.query("Call USP_Login('admin','admin')", function(err, rs, fields){
        if(!err){
            callbackQuerry(rs)
        }
        else{
            console.log(err)
        }
    })
    close();
}

exports.Login = function(username, password, callbackQuerry){
    
    connect();
    var result = false;
    
    //var sqlString = "Call USP_Login('"+ username + "','"+password+"')";
    var sqlString="Select * from account where username ='"+username+"'";
    
    connection.query(sqlString, 
    function(err, rs, fields)
    {
        if(!err){
            //console.log(rs[0]);
            if(rs.length>0)
            {
                if(rs[0].password == password){
                    result = true;
                }
                else{
                    result=false;
                }
            }
            else {
                rs=false;
                callbackQuerry("no data found")
            }
            callbackQuerry(result);
        }
        else
            console.log("Nhay vao day");
    })
    //close();
}