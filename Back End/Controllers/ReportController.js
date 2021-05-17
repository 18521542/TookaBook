var reportApi = require("../Models/ReportModel")
var path = require("path");

module.exports = {
  getRevenueList: function(req,res) {
    let reqPath = path.join(__dirname, "../../");
    res.sendFile(reqPath + "/Front End/getRevenueReporting.html");
  },
  postRevenueList: function(req,res) {
    // Handle empty fields
    if (req.body == null) {
      res.status(400).send({
      message: "Content can not empty",
      });
    }
    //Handle for creating customer
    const date = {
      Thang: req.body.Thang,
      Nam: req.body.Nam,
    };
    reportApi.getRevenueReport(date,
      result => res.send(result)
    );
  },
  // Get the inventory report

  getInventoryList: function(req,res) {
    let reqPath = path.join(__dirname, "../../");
    res.sendFile(reqPath + "/Front End/getInventoryReport.html");
  },
  postInventoryList: function(req,res) {
    // Handle empty fields
    if (req.body == null) {
      res.status(400).send({
      message: "Content can not empty",
      });
    }
    //Handle for creating customer
    const date = {
      Thang: req.body.Thang,
      Nam: req.body.Nam,
    };
    reportApi.getInventoryReport(date,
      result => res.send(result)
    );
  }
}
