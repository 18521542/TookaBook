var express = require("express");
var billControllers = require("../Controllers/billControllers")
var {
  getBill,
  createBill,
} = require("../Controllers/billControllers");

module.exports = (app) => {

  app.get("/api/bills", billControllers.getBillByCustomerID );
  app.get("/api/bills/getbillbybillid", billControllers.getBillByBillID);
  var router = express.Router();
  router.route("/").get(getBill).post(createBill);
  //router.route("/:id").get(getBillByID);

  app.use("/api/bills", router);
  
};
