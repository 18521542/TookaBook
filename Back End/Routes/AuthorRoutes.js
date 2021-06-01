var AuthorController = require("../Controllers/AuthorController")

module.exports = app => {
    app.get("/author", AuthorController.getAuthors);
    app.post("/author",AuthorController.addAuthor);

}