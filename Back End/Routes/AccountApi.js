const accountApiController = require("../Controllers/AccountApiController")
//write your code to link
//service and api
//of every action with account
module.exports = app => {
    app.get("/user/login",accountApiController.login)
    // router for get update
    app.get("/user/update",accountApiController.update)

    app.post("/user/register", accountApiController.register);
}
