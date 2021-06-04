const importBookController = require("../Controllers/ImportBookController")

module.exports = app => {
    app.get("/ImportBook",importBookController.getImportBooks)
    app.post("/ImportBook",importBookController.addImportBooks)
}