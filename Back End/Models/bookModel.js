const db = require("./DatabaseAccessHelper");

const Book = function (book) {
  this.maSach = book.maSach;
  this.tenSach = book.tenSach;
  this.maTheLoai = book.maTheLoai;
  this.nhaXuatBan = book.nhaXuatBan;
  this.namXuatBan = book.namXuatBan;
  this.soLuongTon = book.soLuongTon;
  this.donGiaNhap = book.donGiaNhap;
};

Book.create = (newBook, result) => {
  var conn = db.getConnection();
  var sqlString = "INSERT INTO BOOK SET ?";
  conn.query(sqlString, newBook, (err, res) => {
    if (err) {
      console.log("error", err);
      result(err, null);
      return;
    } else {
      console.log(`Created book: ${res.MaSach}`.yellow.bold);
    }
  });
};

Book.findById = (maSach, result) => {
  var conn = db.getConnection();
  var sqlString = `Select * from Book where MaSach = ${maSach}`;
  conn.query(sqlString, (err, res) => {
    if (err) {
      console.log(err);
      console.log("error", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Found book:".yellow.bold, res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Book.getAll = (result) => {
  var conn = db.getConnection();
  var sqlString = `Select * from Book`;

  conn.query(sqlString, (err, res) => {
    if (err) {
      console.log(err);
      console.log("error", err);
      result(err, null);
      return;
    }

    console.log(res);
    result(null, res);
  });
};

module.exports = Book;
