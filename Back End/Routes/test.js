var test = require("../Models/DatabaseAccessHelper")

module.exports  = (app)=>{
    app.get("/test", function(req,res){
        var qrString = "Select * from sach";
        var qrString2 = "Select * from ct_tacgia"
        //test.connect();
        test.executeQuerry(qrString2)
            .then(test.executeQuerry(qrString))
            .then( (result)=> res.status(200).send({message:result}))
            .catch( (err) => (res.status(404).send({message: "not found"})))
    })
}

