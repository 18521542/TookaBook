var express = require("express");

var {
  getBook,
  getBookById,
  addBook,
  updateBook,
} = require("../Controllers/bookControllers");

module.exports = (app) => {
  var router = express.Router();
  router.route("/").get(getBook).post(addBook);
  router.route("/:id").get(getBookById).patch(updateBook);

  app.use("/api/books", router);
};
