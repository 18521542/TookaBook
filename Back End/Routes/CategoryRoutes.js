var CategoryController = require("../Controllers/categoryController")

module.exports = app => {
    app.get("/category", CategoryController.getCategories);
    app.post("/category",CategoryController.addCategory);

}