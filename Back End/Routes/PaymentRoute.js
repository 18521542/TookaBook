var express = require("express");
var paymentControllers = require("../Controllers/PaymentController")

module.exports = (app) => {
  var router = express.Router();
  router.route("/").post(paymentControllers.createPayment);
  app.use("/api/payments", router);
};
