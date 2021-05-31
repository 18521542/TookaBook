var categories = require("../Models/Category")

module.exports = {
    getCategories: async function(req,res){
        await categories.getCategories((result) => {
            if(result){
                res.send(JSON.stringify(result));
            }
            else{
                res.status(404);
                res.send({data:"not found"});
            }
        });
    }
}