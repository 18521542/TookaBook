const Bill = require("../Models/billModel");

// @desc Fetch all Bill
// @route Get/api/bills
// @access Public
const getBill= async (req, res) => {
};

// @desc Fetch all Bill by id
// @route Get/api/bills/id
// @access Public
const getBillByID = async (req, res) => {
};

// @desc    Add a  bills
// @route   Post /api/bills
// @access  Public
const createBill = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty",
    });
  }

  const bill = {
    MaKhachHang: req.body.MaKhachHang,
    NgayLap: req.body.NgayLap,
    TongTien: req.body.TongTien,
    ThanhToan: req.body.ThanhToan,
    ConLai: req.body.ConLai,
    BillInfo: req.body.ChiTietHoaDon,
  };

  await Bill.createBill(bill, (result) => {
    res.status(200).send({ message: "Created successfully" });
  });
};

module.exports = { getBill, createBill, getBillByID };
