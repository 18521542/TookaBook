const customerController = require("../Controllers/CustomerController")

 module.exports = app => {
  app.get("/customer/create", customerController.getCreate);
  app.post("/customer/create", customerController.postCreate);
  app.get("/customer/list", customerController.getList);
  // search customer by id
  app.get("/customer/search", customerController.getSearch);
  app.post("/customer/search",customerController.postSearch);
 }
