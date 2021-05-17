var db = require ('./DatabaseAccessHelper')
var SqlString = require('sqlString');

//Handle for creating the reporting
exports.getRevenueReport = (date, callBack) => {
  var conn = db.getConnection();
  const dataDate = [
    date.thang,
    date.nam,
  ]
  sql = SqlString.format('CALL USP_GetReportRevenue(?,?)',dataDate);
  conn.query(sql, function(err, result,fields) {
    if (err) throw err;
    // Callback the results and send it through CustomerController
    callBack(result);
  })

}

exports.getInventoryReport = (date, callBack) => {
  var conn = db.getConnection();
  const dataDate = [
    date.thang,
    date.nam,
  ]
  sql = SqlString.format('CALL USP_GetReportInventory(?,?)',dataDate);
  conn.query(sql, function(err, result,fields) {
    if (err) throw err;
    // Callback the results and send it through CustomerController
    callBack(result);
  })

}
