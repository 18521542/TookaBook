var customerApi = require("../Models/Customer")
var path = require("path");

module.exports = {
  getCreate: function(req,res) {
    //const __dirname = process.cwd();
    let reqPath = path.join(__dirname, "../../");
    res.sendFile(reqPath + "/Front End/createCustomer.html");
  },

  // Create a new customer
  postCreate: function(req,res) {
    // Handle empty fields
    if (req.body == null) {
      res.status(400).send({
      message: "Content can not empty",
      });
    }
    //Handle for creating customer
    const newCustomer = {
      TenKhachHang: req.body.TenKhachHang,
      DiaChi: req.body.DiaChi,
      SoDienThoai: req.body.SoDienThoai,
      Email: req.body.Email
    };
    customerApi.createCustomer(newCustomer);
    res.send("Tao thanh cong");
  },

  // Handle for geting all of the lists of the customers
  getList: function(req,res) {
     customerApi.getCustomers(
       (result) => res.send(JSON.stringify(result)),
    );
  },

  // Search id of the customer
  getSearch: function(req,res) {
    let reqPath = path.join(__dirname, "../../");
    res.sendFile(reqPath + "/Front End/searchCustomer.html");
  },
  postSearch: async function(req,res) {
    if (req.body == null) {
      res.status(400).send({
      message: "Content can not empty",
      });
    }
    const id = req.body.MaKhachHang;
    customerApi.searchCustomer(id,
      result => res.send(result)
    );
  },

  // Update the customer
  patchUpdate: function(req,res) {
    // sth in here (not done)
  }
};
