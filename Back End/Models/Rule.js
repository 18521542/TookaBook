var db = require("./DatabaseAccessHelper")
var sqlString = require("sqlstring")

const getRules = (callBackrs, callbackerr) => {

    db.connect();
    let sql = "Call USP_GetRules()";
    db.executeQuerry(sql)
        .then((rs) => callBackrs(rs[0]))
        .catch((err) => callbackerr(err))
}

const updateRules = (data, callBackrs, callbackerr) => {

    db.connect();
    var RulesInfo = [
        data.LuongNhapToiThieu,
        data.LuongTonTruocKhiNhap,
        data.LuongTonSauKhiBan,
        data.TienNoToiDa,
    ]
    let sql = sqlString.format("Call USP_UpdateRules(?,?,?,?)",RulesInfo);
    console.log(sql)
    db.executeQuerry(sql)
      .then(rs => callBackrs(rs))
      .catch(err => callbackerr(err))
}
module.exports = {getRules, updateRules};