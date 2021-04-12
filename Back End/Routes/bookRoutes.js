var express = require("express");

var {
  getBooks,
  getBookById,
  createBook,
} = require("../Controllers/bookControllers");

module.exports = (app) => {
  var router = express.Router();
  router.route("/").get(getBooks).post(createBook);
  router.get("/:id", getBookById);

  app.use("/api/books", router);
};
