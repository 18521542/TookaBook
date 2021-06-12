const accountApiController = require("../Controllers/AccountApiController")
//write your code to link
//service and api
//of every action with account
module.exports = app => {
    app.post("/CreateAccount", accountApiController.addAccount);
    app.get("/login",accountApiController.login)
    // router for get update
    app.get("/update",accountApiController.update)
    app.get("/Account/List",accountApiController.getAccountList)
}
