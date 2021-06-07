const Payment = require("../Models/PaymentModel");
// @desc    Add a  payments
// @route   Post /api/payments
// @access  Public
const createPayment = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty",
    });
  }

  const payment = {
    MaKhachHang: req.body.MaKhachHang,
    NgayLap: req.body.NgayLap,
    TienThu: req.body.TienThu,
  };

  await Payment.createPayment(payment, (result) => {
    res.status(200).send({ message: "Created successfully" });
  });
};

module.exports = {  createPayment};
