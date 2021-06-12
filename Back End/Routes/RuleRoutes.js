const rulesController = require("../Controllers/RuleController")

module.exports = app => {

  // Get the data of BAOCAODOANHTHU
  app.get("/rules", rulesController.getRules);
  app.put("/rules", rulesController.updateRules);
}