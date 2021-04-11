var db = require ('./DatabaseAccessHelper')

//write your code to handle service here
exports.Login = function(username, password, callbackQuerry){
    db.connect();
    var result = false;

    //var sqlString = "Call USP_Login('"+ username + "','"+password+"')";
    var sqlString="Select * from account where username ='"+username+"'";

    var conn = db.getConnection();
    conn.query(sqlString,
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
            }
            callbackQuerry(result);
        }
        else
            console.log("Nhay vao day");
    })
}
