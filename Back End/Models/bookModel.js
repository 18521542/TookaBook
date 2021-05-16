const db = require("./DatabaseAccessHelper");
const sqlString = require("sqlstring");

const Book =  {
};

Book.addBook= (newBook, result) => {
  var conn = db.getConnection();
  var dataBook = [
    newBook.TenSach,
    newBook.MaTheLoai,
    newBook.NhaXuatBan,
    newBook.NamXuatBan,
    newBook.MaTacGia,
  ];

  //Todo: Need to check if this book is already created

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

Book.getBookById = (maSach, callBack) => {
  var conn = db.getConnection();
  var queryString = sqlString.format(`CALL USP_GetBookByID(${maSach})`);
  conn.query(queryString, (err, res) => {
    if (err) {
      throw err;
    }
    if (res[0].length) {
      console.log("Found book:".yellow.bold, res[0][0]);
      callBack(res[0][0]);
      return;
    }
  });
};

// Fetch all book in DataBase
Book.getBook = function (callBack) {
  var conn = db.getConnection();
  var queryString = sqlString.format("CALL USP_GetBook()");

  conn.query(queryString, (err, results, fields) => {
    if (err) {
      throw err;
    }

    callBack(results[0]);
  });
};

Book.updateBook = function (updateData, callBack) {
  var conn = db.getConnection();
  var dataBook = [
    updateData.MaSach,
    updateData.TenSach,
    updateData.MaTheLoai,
    updateData.NhaXuatBan,
    updateData.NamXuatBan,
    updateData.MaTacGia,
  ];
  var queryString = sqlString.format(`CALL USP_GetBookByID(${maSach})`);
  conn.query(queryString, (err, res) => {
    if (err) {
      throw err;
    }
    if (!res) {
      callBack({ message: "Book not found!" });
    }
    if (res[0].length) {
      console.log("Found book:".yellow.bold, res[0][0]);
      var queryString = sqlString.format(
        `CALL USP_UpdateBook(?,?,?,?); CALL USP_UpdateBookAuthor(${updateData.MaSach},?)`,
        dataBook
      );
      conn.query(queryString, (err, res) => {
        if (err) {
          //Todo: Handle error
          throw err;
        } else {
          console.log(`Updated book ${updateData.TenSach} successfully`);
        }
      });
    }
  });
};

module.exports = Book;
