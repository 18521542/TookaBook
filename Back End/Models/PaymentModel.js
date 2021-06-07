const db = require("./DatabaseAccessHelper");
const sqlString = require("sqlstring");
const Payment = {};

Payment.createPayment= async function (data, result) {
  var conn = db.getConnection();
  var dataPayment = [
    data.NgayLap,
    data.TienThu,
    data.MaKhachHang,
  ];

  var queryString = sqlString.format(
    "CALL USP_AddPayment(?,?,?);",
    dataPayment
  );
  conn.query(queryString, (err, res) => {
    if (err) {
      //Todo: Handle error
      throw err;
    } else {
      console.log(`Created Payment successfully`);
      result(res[0]);
    }
  });
};


module.exports =Payment;
