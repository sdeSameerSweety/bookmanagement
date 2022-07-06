//Sandip
const bookModel = require('../models/bookModel')

const createBook = async function (req, res) {

    try {
        let data = req.body;
        let bookData = await bookModel.create(data);
        res.status(201).send({ status: true, msg: bookData })

    } catch (error) {
        console.log("Server Error", error.message)
        res.status(500).send({ status: false, msg: "Server Error: " + error.message })
    }

}

module.exports.createBook = createBook;