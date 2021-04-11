var express = require("express");
var {
  getBooks,
  getBookById,
  createBook,
} = require("../Controllers/bookControllers");
var router = express.Router();

router.route("/").get(getBooks).post(createBook);

router.get("/:id", getBookById);

module.exports = router;
