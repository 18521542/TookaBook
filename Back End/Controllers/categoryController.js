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
    },

    addCategory: async function(req,res){

        //console.log(!req.body)
        if(req.body.constructor === Object && Object.keys(req.body).length === 0){
            res.status(404);
            res.send({message:"content could not be empty"});
            return
        }

        categoryName = req.body.name;
        await categories.addCategory(categoryName, (result)=>{
            if(result){
                res.status(200).send({message:"Add new category success"});
            }
            else{
                res.status(404);
                res.send({message:"Add new category fail"});
            }
        })
    }
}