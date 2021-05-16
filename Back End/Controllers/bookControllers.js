var Book = require("../Models/bookModel");
//var asyncHandler = require("express-async-handler");

// @desc Fetch all Books
// @route Get/api/books
// @access Public
const getBook = async (req, res) => {
  await Book.getBook((result) => {
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
  await Book.getBookById(req.params.id, (result) => {
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
const addBook = async (req, res) => {
  //Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty",
    });
  }

  // Find book by name????

  //Create new book
  const bookData = {
    TenSach: req.body.TenSach,
    MaTheLoai: parseInt(req.body.MaTheLoai),
    NhaXuatBan: req.body.NhaXuatBan,
    NamXuatBan: parseInt(req.body.NamXuatBan),
    MaTacGia: req.body.MaTacGia,
  };
  //console.log(bookData);
  await Book.addBook(bookData, (result) => {});
};

// @desc    Create a new book
// @route   POST /api/books
// @access  Public
const updateBook = async (req, res) => {
  const { bookID } = req.params.id;

  const bookExists = await Book.findById(bookID, (result) => {
    if (result) {
      const bookData = {
        MaSach: req.body.MaSach,
        TenSach: req.body.TenSach,
        MaTheLoai: parseInt(req.body.MaTheLoai),
        NhaXuatBan: req.body.NhaXuatBan,
        NamXuatBan: parseInt(req.body.NamXuatBan),
        MaTacGia: req.body.MaTacGia,
      };
      Book.updateBook(bookData, (result) => {
        if (result) {
          res.send(JSON.stringify(result));
        } else {
          res.status(500);
          throw new Error("Update failed");
        }
      });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  });
};

module.exports = { getBook, getBookById, addBook, updateBook };
