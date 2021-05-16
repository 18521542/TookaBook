var db = require ('./DatabaseAccessHelper')
var SqlString = require('sqlString');

// Handle for creating customer
exports.createCustomer = (customer) => {
  if (customer == null) return;
  var conn = db.getConnection();
  const dataCustomer = [customer.TenKhachHang, customer.DiaChi, customer.SoDienThoai, customer.Email]
  sql = SqlString.format('CALL USP_AddCustomer(?,?,?,?)',dataCustomer);
  conn.query(sql, function(err, result, fields) {
    if (err) console.log("err, please try again");
    console.log(result);
  });
}

// Handle for getting all customers
exports.getCustomers = (callBack) => {
  sql = SqlString.format('CALL USP_GetCustomer()');
  var conn = db.getConnection();
  conn.query(sql, function(err, result,fields) {
    if (err) throw err;
    // Callback the results and send it through CustomerController
    callback(result);
  })
}

// Search id of the customers
exports.searchCustomer = (id,callBack) => {
  if (id == null) return;
  var conn = db.getConnection();
  sql = SqlString.format('CALL USP_GetCustomerByID(?)',id);
  conn.query(sql,function(err,result,fields){
    if (err) console.log("error search, please try again");
    callBack(result);
  });
}
