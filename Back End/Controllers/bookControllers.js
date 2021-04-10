var Book = require("../Models/bookModel");

const getBooks = async (req, res) => {
  const books = await Book.getAll();
  res.json(books);
};

const getBookById = async (req, res) => {
  const book = await Book.findById(req.params.MaSach);

  if (book) {
    res.json(book);
  } else {
    res.status(404);
    throw new Error("Book not found");
  }
};

module.exports = { getBooks, getBookById };
