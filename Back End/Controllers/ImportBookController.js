var importBook = require("../Models/ImportBook")

const getImportBookByID = function(req, res){
    
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(404);
        res.send({message:"content could not be empty"});
        return
    }

    var ID = req.body.bookID;
    importBook.getImportBookByID( ID, 
        (rs) => { res.status(200).send(rs[0]) }, 
        (err) =>{ res.status(404).send( {message: "Not found"} ) } )

}

const addImportBooks = function(req,res){
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(404);
        res.send({message:"content could not be empty"});
        return
    }
    var data = {
        NgayLap: req.body.NgayLap,
        TongTien: req.body.TongTien,
        DanhSachSachMua: req.body.DanhSachSachMua
    };
    importBook.addImportBook(data, 
        (result) => {
            res.status(200).send({message:"Add Import Book success"})
        },
        (err) => {
            res.status(404).send({message:"Add Fail"})
        });
}

const getImportBooks = (req,res) => {

    importBook.getImportBook(   
        rs => res.status(200).send(rs),
        err => res.status(400).send({message: "Not found"})
    )
}

module.exports = { getImportBookByID, addImportBooks, getImportBooks }