const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const bookModel= require("../models/bookModel")
const {isValidObjectId}= require("../middleware/validation")
const mongoose=require('mongoose')


const authenticate = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if(!token) token =req.headers["X-Api-Key"];
        if (!token) return res.status(400).send({ status: false, msg: "Token Required" });
    
         let decodedToken = jwt.verify(token, "Book Management Project@#$%, team No.= 62")  
         if (!decodedToken) return res.status(401).send({ status: false, msg: "Authentication failed" });
    
  
        next()
    }
    catch (err) {
        if(err.message=="jwt expired") return res.status(401).send({status:false,msg:" Your token is expires "})
        return res.status(500).send({ status: false, msg: err.message })
    }
}




const authoriseToCreateBook = async function (req, res, next) {
    try {

        let user = req.body.userId
        if (!isValidObjectId(user))  return res.status(400).send({ status: false, data: "please provide correct id" })
        let check = await userModel.findById(user)
        if(!check) return res.status(404).send({ status: false, msg: "User Id not found" })

        let token = req.headers["x-api-key"];
        let decodedToken = jwt.verify(token, "Book Management Project@#$%, team No.= 62")
        console.log(check._id.toString())
        if (decodedToken.id !== check._id.toString()) return res.status(401).send({ status: false, msg: "User logged is not allowed to create a book" })
        
    
        next()
       
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}



const authorise = async function (req, res, next) {
    try {
    
        let book = req.params.bookId

      if (!isValidObjectId(book))  return res.status(400).send({ status: false, data: "please provide correct id" })
 
        if (!book) return res.status(400).send({ status: false, data: "ID not Found in path param" })
        const check = await bookModel.findById(book)
        if (!check) return res.status(404).send({ status: false, msg: "data not found with this book id" })
        console.log(check)
        let token = req.headers["x-api-key"];
        let decodedToken = jwt.verify(token, "Book Management Project@#$%, team No.= 62")
        console.log(check.userId.toString())
        if (decodedToken.id !== check.userId.toString()) return res.status(401).send({ status: false, msg: "User logged is not allowed to modify the requested book data" })
        next()
       
          
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}



module.exports.authenticate=authenticate
module.exports.authorise=authorise
module.exports.authoriseToCreateBook=authoriseToCreateBook