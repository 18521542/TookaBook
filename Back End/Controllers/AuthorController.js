var author = require("../Models/Author")

module.exports = {
    getAuthors: async function (req, res) {
        await author.getAuthors((result) => {
            if (result) {
                res.send(JSON.stringify(result));
            }
            else {
                res.status(404);
                res.send({ data: "not found" });
            }
        });
    },

    addAuthor: async function (req, res) {
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(404);
            res.send({ message: "content could not be empty" });
            return
        }

        var authorName = req.body.name;
        await author.addAuthor(authorName, (result) => {
            if (result) {
                res.status(200).send({ message: "Add new author success" });
            }
            else {
                res.status(404);
                res.send({ message: "Add new author fail" });
            }
        })
    }
}