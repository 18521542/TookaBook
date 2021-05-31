var db = require("./DatabaseAccessHelper");
var sqlString = require("sqlString")

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