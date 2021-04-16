const db = require("./DatabaseAccessHelper");
const sqlString = require("sqlstring");

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
  var dataBook = [
    newBook.TenSach,
    newBook.MaTheLoai,
    newBook.NhaXuatBan,
    newBook.NamXuatBan,
    newBook.MaTacGia,
  ];

  //Todo: Need to check if this book is already existed

  var queryString = sqlString.format(
    "CALL USP_AddBook(?,?,?,?); CALL USP_AddBookAuthor(?)",
    dataBook
  );
  conn.query(queryString, (err, res) => {
    if (err) {
      //Todo: Handle error
      throw err;
    } else {
      console.log(`Created book ${newBook.TenSach} successfully`);
    }
  });
};

Book.findById = (maSach, result) => {
  var conn = db.getConnection();
  var queryString = sqlString.format(`CALL USP_GetBookByID(${maSach})`);
  conn.query(queryString, (err, res) => {
    if (err) {
      throw err;
    }
    if (res[0].length) {
      console.log("Found book:".yellow.bold, res[0][0]);
      result(res[0][0]);
      return;
    }
  });
};

// Fetch all book in DataBase
Book.getAll = function (callBack) {
  var conn = db.getConnection();
  var queryString = sqlString.format("CALL USP_GetBook()");

  conn.query(queryString, (err, results, fields) => {
    if (err) {
      throw err;
    }

    callBack(results[0]);
  });
};

module.exports = Book;
