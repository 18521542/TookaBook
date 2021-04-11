const db = require("./DatabaseAccessHelper");

const Book = function (book) {
  this.MaSach = book.MaSach;
  this.TenSach = book.TenSach;
  this.MaTheLoai = book.MaTheLoai;
  this.NhaXuatBan = book.NhaXuatBan;
  this.NamXuatBan = book.NamXuatBan;
  this.SoLuongTon = book.SoLuongTon;
  this.DonGiaNhap = book.DonGiaNhap;
};

Book.create = (newBook, result) => {
  var conn = db.getConnection();
  var sqlString = "INSERT INTO SACH SET ?";
  conn.query(sqlString, newBook, (err, res) => {
    if (err) {
      console.log("error", err);
      result(err);
      return;
    } else {
      console.log(`Created book: ${res.MaSach}`.yellow.bold);
    }
  });
};

Book.findById = (maSach, result) => {
  var conn = db.getConnection();
  var sqlString = `Select * from SACH where MaSach = ${maSach}`;
  conn.query(sqlString, (err, res) => {
    if (err) {
      console.log(err);
      console.log("error", err);
      result(err);
      return;
    }

    if (res.length) {
      console.log("Found book:".yellow.bold, res[0]);
      result(res[0]);
      return;
    }

    result({ kind: "not_found" });
  });
};
Book.getAll = function (result) {
  var conn = db.getConnection();
  var sqlString = `Select * from SACH`;

  conn.query(sqlString, (err, res) => {
    if (err) {
      console.log(err);
      console.log("error:", err);
      return;
    }
    result(res);
  });
};

module.exports = Book;
