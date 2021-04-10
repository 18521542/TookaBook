var db = require ('./DatabaseAccessHelper')

//write your code to handle service here
exports.Login = function(username, password, callbackQuerry){
    db.connect();
    var result = false;

    var sqlString="Select * from account where username ='"+username+"'";

    var conn = db.getConnection();
    conn.query(sqlString,
    function(err, rs, fields)
    {
        if (err) {
          console.log("Nhay vao day");
          return;
        }
        result = (rs, password) => rs.length > 0  && rs[0].password == password;
        callbackQuerry(result);
    })
}
