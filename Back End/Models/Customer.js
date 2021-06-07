var db = require ('./DatabaseAccessHelper')
var SqlString = require('sqlstring');

// Handle for creating customer
exports.createCustomer = (customer) => {
  if (customer == null) return;
  var conn = db.getConnection();
  const dataCustomer = [
    customer.TenKhachHang,
    customer.DiaChi,
    customer.SoDienThoai,
    customer.Email
  ];
  sql = SqlString.format('CALL USP_AddCustomer(?,?,?,?)',dataCustomer);
  conn.query(sql, function(err, result, fields) {
    if (err) console.log("err, please try again");
    console.log(result);
  });
}

// Handle for getting all customers
exports.getCustomers = (callBack) => {
  var conn = db.getConnection();
  sql = SqlString.format('CALL USP_GetCustomer()');
  conn.query(sql, function(err, result,fields) {
    if (err) throw err;
    // Callback the results and send it through CustomerController
    callBack(result);
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

// Update the customer in the DataBase
exports.updateCustomer = (id,updateCustomer, callBack) => {
  if (id == null) return;
  var conn = db.getConnection();
  const dataCustomer = [
    updateCustomer.TenKhachHang,
    updateCustomer.DiaChi,
    updateCustomer.SoDienThoai,
    updateCustomer.Email,
  ];
  var queryString = sqlString.format('CALL USP_GetCustomerByID(?)',id);
  conn.query(sql, function(err,result, fields) {
    if (err)
      throw err;
    if (!result)
      callBack({message: "Customer is not found"});
    if (result[0].length) {
      console.log("Found customer:", res[0][0]);
    }

  });
  sql = sqlString.format('CALL USP_UpdateCusTomer(?,?,?,?)', dataCustomer);


}
