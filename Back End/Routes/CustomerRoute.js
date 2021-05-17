const customerController = require("../Controllers/CustomerController")

 module.exports = app => {
  app.get("/customer/create", customerController.getCreate);
  app.post("/customer/create", customerController.postCreate);
  // get list of all of the customers
  app.get("/customer", customerController.getList);
  // search customer by id
  app.get("/customer/search", customerController.getSearch);
  app.post("/customer/search",customerController.postSearch);
  // Update customer by Id
  app.patch("/customer/:id", customerController.patchUpdate);
 }
