var account = require("../Models/Account")
module.exports = {

  login: function(req,res)
  {
    console.log(req.query.username)
    console.log(req.query.password)
    var username = req.query.username;
    var password = req.query.password;
    account.Login
    (
        username,
        password,
        function(rs)
        {
            res.send(JSON.stringify(rs))
        }
    )
  },

  update: function(req,res)
  {
    console.log("this is an area for update account service")
  }
};