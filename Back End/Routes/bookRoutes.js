var express = require("express");

var {
  getBook,
  getBookById,
  addBook,
  updateBook,
  UpdateBook
} = require("../Controllers/bookControllers");

//const { UpdateBook } = require("../Models/bookModel");

module.exports = (app) => {
  var router = express.Router();
  router.route("/").get(getBook).post(addBook);
  //router.route("/:id").get(getBookById).patch(updateBook);
  router.route("/:id").get(getBookById).patch(UpdateBook);
  app.use("/api/books", router);
};
