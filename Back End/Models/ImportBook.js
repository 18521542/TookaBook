var db = require("./DatabaseAccessHelper");
var sqlString = require("sqlString");

const addImportBook = function (data, callBackrs, callbackerr) {
    db.connect();
    
    //prepare sql
    var BookInfo = [];
    data.DanhSachSachMua.map(function await(DanhSachSachMua) {
        let qr = sqlString.format(
          `CALL USP_AddImportBookInfo(${DanhSachSachMua.MaSach}, ${DanhSachSachMua.SoLuong}, ${DanhSachSachMua.DonGia}, ${DanhSachSachMua.ThanhTien});`
        );
        BookInfo.push(qr);
    });
    const SqlImportBook = sqlString.format(`Call USP_AddImportBook(${data.NgayLap}, ${data.TongTien})`);

    //execute
    db.executeQuerry(SqlImportBook)
        .then(() => {
            BookInfo.map(function (eachQueryString){
                return db.executeQuerry(eachQueryString)
            })
        })
        .then((rs) => callBackrs(rs))
        .catch((err) => callbackerr(err))
        
}

const getImportBookByID = function(data, callBackrs, callbackerr){
    
    const sql = sqlString.format('Call USP_GetImporByBookID(?)', data);

    db.executeQuerry(sql)
        .then((rs) => callBackrs(rs))
        .catch((err) => callbackerr(err))
}

module.exports = {addImportBook, getImportBookByID};