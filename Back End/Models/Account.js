var db = require ('./DatabaseAccessHelper')
var sqlString = require("sqlstring");
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

exports.getAccountList = (callBackrs, callbackerr) => {

    let sql = "Call USP_GetAccount()";

    db.executeQuerry(sql)
        .then((rs) => callBackrs(rs[0]))
        .catch((err) => callbackerr(err))
}

exports.addAccount = (data, callBackrs, callbackerr) => {

    var AccountInfo = [
        data.username,
        data.password,
        data.type,
        data.realname,
        data.PhoneNumber,
        data.Email,
        data.Address
      ];
    
    let sql = sqlString.format("Call USP_AddAccount(?,?,?,?,?,?,?)", AccountInfo);
    db.executeQuerry(sql)
        .then(rs => callBackrs(rs))
        .catch(err => callbackerr(err))
}
