const db = require("./DatabaseAccessHelper");
const sqlString = require("sqlstring");
const Bill = {};

Bill.createBill = async function (data, result) {
  var conn = db.getConnection();
  var dataBill = [
    data.NgayLap,
    data.TongTien,
    data.ThanhToan,
    data.ConLai,
    data.MaKhachHang,
  ];

  var queryString = sqlString.format(
    "CALL USP_AddBill(?,?,?,?,?);",
    dataBill
  );
  conn.query(queryString, (err, res) => {
    if (err) {
      //Todo: Handle error
      throw err;
    } else {
      console.log(`Created Bill successfully`);
      data.BillInfo.map(function await(billInfo) {
        let qr = sqlString.format(
          `CALL USP_AddBillInfo(${billInfo.MaSach},
            ${billInfo.SoLuong},
            ${billInfo.DonGiaBan},
            ${billInfo.ThanhTien});`
        );
        conn.query(qr, (error, response) => {
          if (error) {
            console.log(error);
          } else {
          }
        });
      });
      result(res[0]);
    }
  });
};

Bill.GetBillByCustomerID = (id, callbackrs, callbackerr) => {
  db.connect();
  //var sql = sqlString.format("Call USP_GetBillByCustomerID(?)",id);
  var sql = "Select * from HoaDon where MaKhachHang = "+ id +" group by SoHoaDon"
  db.executeQuerry(sql)
    .then((rs) => {
      callbackrs(rs)
    })
    .catch((err) => callbackerr(err))
};

Bill.GetBillInfoByBillID = (id, callbackrs, callbackerr) => {
  db.connect();
  var sql = sqlString.format("Call USP_GetBillByBillID(?)",id)
  db.executeQuerry(sql)
    .then((rs) => {
      var result = rs[0];
      callbackrs(result)
    })
    .catch((err) => callbackerr(err))
}

module.exports = Bill;
