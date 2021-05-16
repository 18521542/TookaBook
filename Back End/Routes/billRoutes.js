var express = require("express");

var {
  getBill,
  createBill,
  getBillByID,
} = require("../Controllers/billControllers");

module.exports = (app) => {
  var router = express.Router();
  router.route("/").get(getBill).post(createBill);
  router.route("/:id").get(getBillByID);

  app.use("/api/bills", router);
};
