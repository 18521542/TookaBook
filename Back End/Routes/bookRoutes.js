var express = require("express");
var { getAll, getById } = require("../Controllers/bookControllers");
var router = express.Router();
const books = {
  MaSach: 1,
  TenSach: "The Lord Of The Rings",
  MaTheLoai: 1,
  NhaXuatBan: "NhaNam",
  NamXuatBan: 2000,
  SoLuongTon: 100,
  DonGiaNhap: 100000,
};

router.get("/", (req, res) => {
  res.json(books);
});

router.get("/:id", (req, res) => {
  if (req.params.id === "1") {
    res.json(books);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

module.exports = router;
