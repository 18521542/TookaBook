var db = require("./DatabaseAccessHelper");
var sqlString = require("sqlString");

const addImportBook = function (data, result) {
    console.log("hello there");
}

const getImportBookByID = function(data, callBackrs, callbackerr){
    
    const sql = sqlString.format('Call USP_GetImporByBookID(?)', data);

    db.executeQuerry(sql)
        .then( (rs) => { callBackrs(rs)} )
        .catch( (err) => { callbackerr(err)} )
}

module.exports = {addImportBook, getImportBookByID};