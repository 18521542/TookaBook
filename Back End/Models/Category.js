var db = require("./DatabaseAccessHelper");
var sqlString = require("sqlstring")

exports.getCategories = function(callBack){
    var conn = db.getConnection();
    var queryString = sqlString.format("CALL USP_GetCategory()");

    conn.query(queryString, (err, results, fields) => {
        if (err) {
            throw err;
        }
        callBack(results[0]);
    });
}

exports.addCategory = function(newCategory, callBack){
    //db.connect();
    var conn = db.getConnection();
    var queryString = sqlString.format("Call USP_AddCategory(?)", newCategory);
    conn.query(queryString, (err, rs)=>{
        callBack(rs)
    })
}
