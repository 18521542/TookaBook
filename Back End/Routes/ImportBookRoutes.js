const importBookController = require("../Controllers/ImportBookController")

module.exports = app => {
    app.get("/ImportBookList",importBookController.getImportBooks)
    app.get("/ImportBook",importBookController.getImportBookByID)
    app.post("/ImportBook",importBookController.addImportBooks)
}