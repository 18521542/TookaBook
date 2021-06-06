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
    var data = "volla";
    importBook.addImportBook(data);

    res.status(200).send({message:"lala"})
}

module.exports = { getImportBookByID, addImportBooks }