const Bill = require("../Models/billModel");
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

const getBill = (req, res) => {
  
}

const getBillByCustomerID = (req,res) => {
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
    res.status(404);
    res.send({message:"content could not be empty"});
    return
  }

  var CusID = req.body.CusID;
  Bill.GetBillByCustomerID(CusID, 
    (result) => {
        res.status(200).send(result);
    },
    (err) => {
        res.status(404).send({message: "Not found"});
    })
}

const getBillByBillID = (req, res) => {
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
    res.status(404);
    res.send({message:"content could not be empty"});
    return
  }

  var BillID = req.body.BillID;
  Bill.GetBillInfoByBillID(BillID, 
    (result) => {
      res.status(200).send(result);
    },
    (err) =>{
      res.status(404).send({message: "Not found"});
    })
};



module.exports = { getBill, createBill, getBillByBillID, getBillByCustomerID };
