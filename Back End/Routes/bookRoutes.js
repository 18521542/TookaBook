var express = require("express");
var { getBooks, getBookById } = require("../Controllers/bookControllers");
var router = express.Router();

router.get("/", getBooks);

router.get("/:id", getBookById);

module.exports = router;
