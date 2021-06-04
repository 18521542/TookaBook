var importBook = require("../Models/ImportBook")

const getImportBooks = function(req, res){
    var data = "hello";
    importBook.addImportBook(data)

    res.status(200).send({message: "OK"})
}

const addImportBooks = function(req,res){
    var data = "volla";
    importBook.addImportBook(data);

    res.status(200).send({message:"lala"})
}

module.exports = { getImportBooks, addImportBooks }