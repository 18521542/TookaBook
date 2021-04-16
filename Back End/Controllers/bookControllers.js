var Book = require("../Models/bookModel");
//var asyncHandler = require("express-async-handler");

// @desc Fetch all Books
// @route Get/api/books
// @access Public
const getBooks = async (req, res) => {
  await Book.getAll((result) => {
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
  await Book.findById(req.params.id, (result) => {
    if (result) {
      res.send(JSON.stringify(result));
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  });
};

// @desc    Create a new book
// @route   POST /api/books
// @access  Public
const createBook = async (req, res) => {
  //Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty",
    });
  }

  //Create new book
  const bookData = {
    TenSach: req.body.TenSach,
    MaTheLoai: parseInt(req.body.MaTheLoai),
    NhaXuatBan: req.body.NhaXuatBan,
    NamXuatBan: parseInt(req.body.NamXuatBan),
    MaTacGia: req.body.MaTacGia,
  };
  //console.log(bookData);
  await Book.create(bookData, (result) => {});
};

module.exports = { getBooks, getBookById, createBook };
