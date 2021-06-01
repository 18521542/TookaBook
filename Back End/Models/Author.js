var db = require("./DatabaseAccessHelper");
var sqlString = require("sqlString")

exports.getAuthors = function(callBack){
    var conn = db.getConnection();
    var queryString = sqlString.format("CALL USP_GetAuthor()");

    conn.query(queryString, (err, results, fields) => {
        if (err) {
            throw err;
        }
        callBack(results[0]);
    });
}

exports.addAuthor = function(newAuthor, callBack){
    //db.connect();
    var conn = db.getConnection();
    var queryString = sqlString.format("Call USP_AddAuthor(?)", newAuthor);
    conn.query(queryString, (err, rs)=>{
        callBack(rs)
    })
}