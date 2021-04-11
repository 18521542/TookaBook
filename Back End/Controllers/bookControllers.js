var Book = require("../Models/bookModel");

// @desc Fetch all Books
// @route Get/api/books
// @access Public
const getBooks = async (req, res) => {
  Book.getAll((result) => {
    if (result) {
      res.send(JSON.stringify(result));
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  });
};

// @desc    GET user profile
// @route   GET /api/users/profile
// @access  Public
const getBookById = async (req, res) => {
  Book.findById(req.params.id, (result) => {
    if (result) {
      res.send(JSON.stringify(result));
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  });
};

module.exports = { getBooks, getBookById };
