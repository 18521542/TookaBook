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
    DanhSachTacGia: req.body.DanhSachTacGia,
  };

  // var updateResult = false;
  // const UpdateBookFirst = await (() => {
  //   return new Promise((resolve, reject) => {
  //     Book.UpdateBook(Data, (result) => {
  //       updateResult = result;
  //       console.log(result)
  //       //console.log(updateResult)
  //       resolve("Finish updating")
  //     })
  //   })
  // })();
  await Book.UpdateBook(Data, (result) =>{
    if(result){
      if(!res.headersSent){
        res.status(200).send({message:"Update success"});
      }
    }
    else{
      res.status(404).send({message:"Update fail"});
    }
  })
}

module.exports = { getBook, getBookById, addBook, updateBook, UpdateBook };
