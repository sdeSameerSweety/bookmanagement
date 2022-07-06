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

const getBooks = async function (req, res) {
    try {

        let allQuery = req.query
        let booksDetail = await bookModel.find(({ $and: [allQuery, { isDeleted: false }] }))
        console.log(booksDetail)
        if (booksDetail == false)
            res.status("404").send({ status: false, msg: "data not found" })
        else
            {
                let data=[]
                for(let i=0;i<booksDetail.length;i++){
            let books={
                "title": booksDetail[i].title,
                "excerpt": booksDetail[i].excerpt,
                "userId" : booksDetail[i].userId,
                "category" : booksDetail[i].category,
                "releasedAt" : booksDetail[i].releasedAt,
                "reviews" : booksDetail[i].reviews
            } 
            data.push(books)
            
                
        }
        data.sort(function(a,b){
            if(a.title.toLowerCase()<b.title.toLowerCase())return -1;
            if(a.title.toLowerCase()>b.title.toLowerCase())return 1
            return 0;
        })
            
            
            console.log(data) 
            res.status(200).send({ status: true, message : "Books List" , data: data })}
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports.createBook = createBook;
module.exports.getBooks=getBooks