const db = require("./DatabaseAccessHelper");
const sqlString = require("sqlstring");
var Author = require("./Author");
const { json } = require("body-parser");

const Book =  {
};

Book.addBook= (newBook, callBackrs, callbackerr) => {
  var conn = db.getConnection();
  var dataBook = [
    newBook.TenSach,
    newBook.MaTheLoai,
    newBook.NhaXuatBan,
    newBook.NamXuatBan,
    newBook.MaTacGia
  ];
  //Todo: Need to check if this book is already created
  var queryString = sqlString.format(
    "CALL USP_AddBook(?,?,?,?);CALL USP_AddBookAuthor(?)",
    dataBook
  );

  let ArrTwoStringSql = queryString.split(";")

  let StringAddBook = ArrTwoStringSql[0];
  let StringAddBookAuthor = ArrTwoStringSql[1];
  let StringAddURL = sqlString.format("CALL USP_AddBookURL(?)", newBook.Link);

  db.executeQuerry(StringAddBook)
    .then(() => { return db.executeQuerry(StringAddBookAuthor); })
    .then(() => { return db.executeQuerry(StringAddURL); })
    .then((result) => callBackrs(result))
    .catch((err) => callbackerr(err))
  
};

Book.getBookById = (maSach, callBackrs, callbackerr) => {
  var conn = db.getConnection();
  var queryString = sqlString.format(`CALL USP_GetBookByID(${maSach})`);

  db.executeQuerry(queryString)
    .then((rs)=>callBackrs(rs[0]))
    .catch((err)=>callbackerr(err))
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

Book.updateBook = function (updateData, callBackrs, callBackerr) {
  var conn = db.getConnection();
  var dataBook = [
    updateData.MaSach,
    updateData.TenSach,
    updateData.MaTheLoai,
    updateData.NhaXuatBan,
    updateData.NamXuatBan,
    updateData.URL
  ];

  var dataBookAuthor = [
    updateData.MaSach,
    updateData.MaTacGia
  ]

  var SqlUpdateBook = sqlString.format("Call USP_UpdateBook(?,?,?,?,?,?)",dataBook);
  var SqlUpdateBookAuthor = sqlString.format("Call USP_UpdateBookAuthor(?,?)",dataBookAuthor);

  db.executeQuerry(SqlUpdateBook)
    .then(() => {
      return db.executeQuerry(SqlUpdateBookAuthor)
    })
    .then((rs) => callBackrs(rs))
    .catch((err)=> callBackerr(err))
  
  // console.log(SqlUpdateBook);
  // console.log(SqlUpdateBookAuthor);
  // console.log(SqlCheckExist);
};

module.exports = Book;
