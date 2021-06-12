var rules = require("../Models/Rule")

const getRules = (req,res) => {
    rules.getRules(
        rs => res.status(200).send(rs),
        err => res.status(404).send({message:"Not found"})
    )
}

const updateRules = (req,res) => {
    var data = req.body;

    rules.updateRules(data,
        rs => res.status(200).send({message:"Update rule success"}),
        err => res.status(404).send({message:"Update fail"})
    )
}

module.exports = {getRules, updateRules};