const reportController = require("../Controllers/ReportController")

module.exports = app => {

  // Get the data of BAOCAODOANHTHU
  app.get("/report/revenue", reportController.getRevenueList);
  app.post("/report/revenue", reportController.postRevenueList);

  // Get the data of BAOCAOTON
   app.get("/report/inventory", reportController.getInventoryList);
   app.post("/report/inventory", reportController.postInventoryList);
}
