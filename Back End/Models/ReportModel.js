var db = require ('./DatabaseAccessHelper')
var SqlString = require('sqlstring');

//Handle for creating the reporting
exports.getRevenueReport = async (date, callBack) => {
  var conn = db.getConnection();
  const dataDate = [
    date.Thang,
    date.Nam,
  ]
  sqlFresh = SqlString.format('CALL USP_FreshReportRevenue(?,?)', dataDate);
  sqlSelectBook = SqlString.format('CALL USP_GetBook()');
  try {
    await conn.query(sqlFresh);
    console.log("Fresh successfully!");
    const listIdBook = [];

    // Func get id of all books
    const getIdBook = await (() => {
      return new Promise((resolve, reject) => {
        conn.query(sqlSelectBook, function(err, result, fields) {
          const Book = result[0];
          for (const i of Book)
          {
            listIdBook.push(i.MaSach);
          }
          resolve("Successfully got id of all books");
        })
      })
    })();

    console.log("Get id of the books successfully");

    // Import id book to the report
    const importReport = await(() => {
      return new Promise((resolve, reject) => {
      for (const id of listIdBook)
      {
        sqlImport = SqlString.format('CALL USP_ImportReportRevenue(?,?,?)', [date.Thang,date.Nam,id]);
        conn.query(sqlImport);
      }
      resolve("Successfully for importing books into the report");
    })
    })();
    console.log("Imported successfully");

    sqlGetReport = SqlString.format('CALL USP_GetReportRevenue(?,?)', dataDate);
    conn.query(sqlGetReport, (err, result) => {
      callBack(result[0]);
    })
  }
  catch (err)
  {
    throw err;
  }
}

exports.getInventoryReport = async (date, callBack) => {
  var conn = db.getConnection();
  const dataDate = [
    date.Thang,
    date.Nam,
  ]
  sqlFresh = SqlString.format('CALL USP_FreshReportInventory(?,?)', dataDate);
  sqlSelectBook = SqlString.format('CALL USP_GetBook()');
  try {
    await conn.query(sqlFresh);
    console.log("Fresh successfully!");
    const listIdBook = [];

    // Func get id of all books
    const getIdBook = await (() => {
      return new Promise((resolve, reject) => {
        conn.query(sqlSelectBook, function(err, result, fields) {
          const Book = result[0];
          for (const i of Book)
          {
            listIdBook.push(i.MaSach);
          }
          resolve("Successfully got id of all books");
        })
      })
    })();

    console.log("Get id of the books successfully");

    // Import id book to the report
    const importReport = await(() => {
      return new Promise((resolve, reject) => {
      for (const id of listIdBook)
      {
        sqlImport = SqlString.format('CALL USP_ImportReportInventory(?,?,?)', [date.Thang,date.Nam,id]);
        conn.query(sqlImport);
      }
      resolve("Successfully for importing books into the report");
    })
    })();
    console.log("Imported successfully");
    
    sqlGetReport = SqlString.format('CALL USP_GetReportInventory(?,?)', dataDate); 
    conn.query(sqlGetReport, (err, result) => {
      callBack(result[0]);
    })
  }
  catch (err)
  {
    throw err;
  }
}
