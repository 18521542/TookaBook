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

Book.UpdateBook = async function (updateData, callBack) {
    var conn = db.getConnection();
    var isUpdated= false;
    var StringCheckIsExist = sqlString.format(`CALL USP_GetBookByID(${updateData.MaSach})`);
    var StringUpdateBook = "CALL USP_UpdateBook("+ updateData.MaSach+ 
    ",'"+updateData.TenSach+
    "','"+updateData.MaTheLoai+
    "','"+updateData.NhaXuatBan+
    "','"+updateData.NamXuatBan+
    "')"

  //Check if have book in database
  var isExist = false;
  
  // Func Check id of all books
  const checkBookisExist = await (() => {
    return new Promise((resolve, reject) => {
      conn.query(StringCheckIsExist, function(err, result, fields) {
        
        if(err){
          isExist=false;
          reject(err)
        }
        else{
          if(result[0].length>0){
            isExist = true;
          }
          else{
            isExist = false;
          }
        }
        resolve("Finish checking");
      })
    })
  })();

  if(isExist){
    //Update book first
    const UpdateBookFirst = await (() => {
      return new Promise((resolve, reject) => {
        conn.query(StringUpdateBook, function(err, result, fields) {
          if(err){
            throw reject(callBack(isUpdated));
          }
          resolve("Finish update book");
        })
      })
    })();
    
    //then
    updateData.DanhSachTacGia.map(function await(DanhSachTacGia) {
      let qr = sqlString.format(
        `CALL USP_UpdateBookAuthor(${updateData.MaSach},${DanhSachTacGia.MaTacGia});`
      );
      conn.query(qr, (error, response) => {
        if (error) {
          callBack(false)
        } else {
          callBack(true)
        }
      });
    });
  }
  else{
    callBack(isUpdated)
  }
  
};

module.exports = Book;
