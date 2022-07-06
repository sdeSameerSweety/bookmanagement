//Sandip
const bookModel = require('../models/bookModel')

const createBook = async function (req, res) {

    try {
        let data = req.body;
        // destructuring the request body
        const { title, excerpt, userId, ISBN, category, subcategory } = data

        // checking if request body is empty
        if (Object.keys(data).length == 0) { res.status(400).send({ status: false, msg: "Enter the Books details" }) }

        // checking if requireq fields is provided in request body
        if (!title) { return res.status(400).send({ status: false, msg: "title is required" }) }
        if (!excerpt) { return res.status(400).send({ status: false, msg: "excerpt is required" }) }
        if (!userId) { return res.status(400).send({ status: false, msg: "userId is required" }) }
        if (!ISBN) { return res.status(400).send({ status: false, msg: "ISBN is required" }) }
        if (!category) { return res.status(400).send({ status: false, msg: "category is required" }) }
        if (!subcategory) { return res.status(400).send({ status: false, msg: "subcategory is required" }) }

        // checking if requireq fields is empty in request body
        if(!isEmpty(title)) return res.status(400).send({ status: false, msg: "Please enter Title" })
        

        let bookData = await bookModel.create(data);
        res.status(201).send({ status: true, msg: bookData })

    } catch (error) {
        console.log("Server Error", error.message)
        res.status(500).send({ status: false, msg: "Server Error: " + error.message })
    }

}

module.exports.createBook = createBook;