//this is an area for database connection
var mysql = require('mysql');

//variable to check if db is connected or not
var connected = 0;

//config
var connection = mysql.createConnection({
    host: '192.168.64.2',
    user: 'username',
    password: 'password',
    database: 'BookStoreManagement'
})



//method of db
exports.connect = function(){
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

exports.close = function(){
    connection.end(function(err){
        if(!err){
            console.log("DB close");
        }
    })
}

exports.getConnection = function(){
    return connection;
}
