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

  var bookID = req.params.id;
  Book.getBookById(bookID, 
    (result) => {
        res.status(200).send(result);
    },
    (err) => {
        res.status(404).send({message: "Not found"});
    })
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

  //Create new book
  const bookData = {
    TenSach: req.body.TenSach,
    MaTheLoai: parseInt(req.body.MaTheLoai),
    NhaXuatBan: req.body.NhaXuatBan,
    NamXuatBan: parseInt(req.body.NamXuatBan),
    MaTacGia: req.body.MaTacGia,
    Link: req.body.URL,
  };
  
  Book.addBook(bookData, 
    (rs) => {
      res.status(200).send({message: "Add Book success",});
    },
    (err) => {
      console.log(err)
      res.status(404).send({message:"Add book failed"})
    })
};

const UpdateBook = async (req,res) => {
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
    res.status(404);
    res.send({message:"content could not be empty"});
    return
  }

  //check book if exist
  var Data = {
    MaSach: req.body.MaSach,
    TenSach: req.body.TenSach,
    MaTheLoai: parseInt(req.body.MaTheLoai),
    NhaXuatBan: req.body.NhaXuatBan,
    NamXuatBan: parseInt(req.body.NamXuatBan),
    MaTacGia: req.body.MaTacGia,
    URL: req.body.URL
  };

 
  
  Book.updateBook(Data, 
    (result) => {
      res.status(200).send({message:"Update book success"});
    },
    (err) => {
      console.log(err)
      res.status(404).send({message:"Update book failed"});
    })
}

module.exports = { getBook, getBookById, addBook, UpdateBook };
