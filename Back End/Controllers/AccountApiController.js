var account = require("../Models/Account")
module.exports = {

  login: function (req, res) {
    console.log(req.query.username)
    console.log(req.query.password)
    var username = req.query.username;
    var password = req.query.password;
    account.Login
      (
        username,
        password,
        function (rs) {
          res.send(JSON.stringify(rs))
        }
      )
  },

  update: function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      res.status(404);
      res.send({ message: "content could not be empty" });
      return
    }

    var data = req.body;

    account.UpdateAccount(
      data,
      rs => res.status(200).send({ message: "Update account success" }),
      err => res.status(400).send({ message: "Update account fail" })
    )
  },

  getAccountList: (req, res) => {
    account.getAccountList(
      rs => res.status(200).send(rs),
      err => res.status(400).send({ message: "Not found" })
    )
  },

  addAccount: (req, res) => {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      res.status(404);
      res.send({ message: "content could not be empty" });
      return
    }

    var data = req.body;

    account.addAccount(
      data,
      rs => res.status(200).send({ message: "Add account success" }),
      err => res.status(400).send({ message: "Add account fail" })
    )
  }
};
