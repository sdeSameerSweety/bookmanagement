const bookModel = require('../models/bookModel')
const reviewModel = require('../models/reviewModel')
const { isEmpty, isValidISBN, isVerifyString, isValidDate,isValidObjectId  } = require('../middleware/validation')
const userModel = require("../models/userModel")
const {uploadFile}=require("../route/aws")




const createBook = async function (req, res) {
    try {
        let data = req.body;
        let files= req.files
        // destructuring the request body
        const { title, excerpt, userId, ISBN, category, subcategory, releasedAt } = data

        // checking if request body is empty
        if (Object.keys(data).length == 0) { return res.status(400).send({ status: false, msg: "Enter the Books details" }) }

        // checking if requireq fields is provided in request body
        if (!title) { return res.status(400).send({ status: false, msg: "title is required" }) }
        if (!excerpt) { return res.status(400).send({ status: false, msg: "excerpt is required" }) }
        if (!userId) { return res.status(400).send({ status: false, msg: "userId is required" }) }
        if (!ISBN) { return res.status(400).send({ status: false, msg: "ISBN is required" }) }
        if (!category) { return res.status(400).send({ status: false, msg: "category is required" }) }
        if (!subcategory) { return res.status(400).send({ status: false, msg: "subcategory is required" }) }
        if (!releasedAt) { return res.status(400).send({ status: false, msg: "releasedAt is required" }) }


        // checking if requireq fields is empty in request body
        if (!isEmpty(title)) return res.status(400).send({ status: false, msg: "Please enter Title" })

        if (!isEmpty(excerpt)) { return res.status(400).send({ status: false, msg: "excerpt is required" }) }

        let userID = data.userId
        let checkUserId = await userModel.findOne({ userId: userID })
        if (!checkUserId)
            return res.status(404).send({ status: false, msg: "userId don't Exist" })

        let ISBNnumber = data.ISBN;
        let checkISBN = await bookModel.findOne({ ISBN: ISBNnumber })
        if (checkISBN)
            return res.status(400).send({ status: false, msg: "ISBN Number already Exist" })

        if (!isEmpty(ISBN)) { return res.status(400).send({ status: false, msg: "ISBN is required" }) }
        if (!isValidISBN(ISBN)) { return res.status(400).send({ status: false, msg: "ISBN is not valid" }) }

        if (!isEmpty(category)) { return res.status(400).send({ status: false, msg: "category is required" }) }
        if (isVerifyString(category)) return res.status(400).send({ status: false, message: "category can't contain number" })

        if (!isValidDate(releasedAt)) return res.status(400).send({ status: false, message: "Enter a valid date with the format (YYYY-MM-DD)" })

        if (!isEmpty(subcategory)) { return res.status(400).send({ status: false, msg: "subcategory is required" }) }
        if (isVerifyString(subcategory)) return res.status(400).send({ status: false, message: "subcategory can't contain number" })
        let findTitle= await bookModel.findOne({title:title})
        if(findTitle) return res.status(400).send({ status: false, msg: "title already Exist" })
      
        if(files && files.length>0){
            let uploadedFileURL= await uploadFile( files[0] )
            data["bookCover"]=uploadedFileURL
        }
        else{
            res.status(400).send({ msg: "No file found" })
        }
        let bookData = await bookModel.create(data);
  return      res.status(201).send({ status: true, msg: bookData })

    } catch (error) {
        console.log("Server Error", error.message)
        res.status(500).send({ status: false, msg: "Server Error: " + error.message })
    }

}

const getBooks = async function (req, res) {
    try {

            let allQuery = req.query
            let checkInput= Object.keys(allQuery)
            let  arr=['category','userId','subcategory'] 
        
            for(let i=0;i<checkInput.length;i++){
            
            let as=arr.includes(checkInput[i]) 
            if(!as)return res.status(400).send({status:false,msg:"query should be one of these:category, subcategory, userId"})
            }
        
        let temp={}
        if(allQuery.userId){
        if (!isValidObjectId(allQuery.userId))  return res.status(400).send({ status: false, data: "please provide correct Object id for user" })
            temp["userId"]=allQuery.userId
        }
        if(allQuery.category){
            temp["category"]=allQuery.category.toLowerCase()
        }
        if(allQuery.subcategory){
            temp["subcategory"]=allQuery.subcategory.toLowerCase()
        }
        let booksDetail = await bookModel.find(({ $and: [temp, { isDeleted: false }] })).sort({title:1})
      
        if (booksDetail == false)
            {return res.status(404).send({ status: false, msg: "data not found" })}
        
            res.status(200).send({ status: true, message: "Books List", data: booksDetail })
        
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: err.message })
    }
} 

// ### GET /books/:bookId
let getBookByID=async function(req,res){
    try {
        let data=req.params.bookId
        if(!data)return res.status(400).send({status:false,msg:"please enter book id"})
        if (!isValidObjectId(data))  return res.status(400).send({ status: false, data: "please provide correct id" })
        let findBook=await bookModel.findOne({_id:data,isDeleted: false}).lean()
        if(!findBook)return res.status(404).send({status:false, meg:"No Data Found For this ID"})
        let findReview=await reviewModel.find(({ $and: [{bookId: data},{ isDeleted: false }] })).select({isDeleted:0,createdAt:0,updatedAt:0, __v:0})
       
        findBook['reviewsData']=findReview
        return res.status(200).send({status:true,message:'Books list',Data:findBook})
    } catch (error) {
        return res.status(500).send({status:false,err:error.message})
    }
};

const deleteBooks = async function (req, res) {
    try {
        let book = req.params.bookId
        console.log(book)
        const check = await bookModel.findById(book)
        if(check.isDeleted==true) return res.status(404).send({ status: false, msg: "data is already deleted" })
        let DeletedBook = await bookModel.findByIdAndUpdate(  { _id: book }, {$set: { isDeleted: true,deletedAt:new Date() }})

        return res.status(200).send({ status: true, data:"Deleted successfully " })
    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({ status: false, msg: err.message })
    }


};

let updateBook=async function (req,res){
    try {
        let data=req.body 
        let book=req.params.bookId 
        const findBook = await bookModel.findOne({_id:book,isDeleted:false})
        if(!findBook) return res.status(404).send({ status: false, msg:"No book found"  })

        let temp={};
    
        if(data.title){
            trimTitle=data.title.trim()
            const checkTitle = await bookModel.findOne({title:trimTitle})
            if(checkTitle)return res.status(400).send({status:false,msg:"this title:"+trimTitle +" "+"already present in database"})
            temp["title"]=trimTitle
        }
        if(data.excerpt){
            trimExcerpt=data.excerpt.trim()
            temp["excerpt"]=data.excerpt
        }
        if(data.ISBN){
            trimISBN=data.ISBN.trim()
           if( !isValidISBN(trimISBN))return res.status(400).send({status:false,msg:" Enter valid ISBN "})
            const checkISBN = await bookModel.findOne({ISBN:trimISBN})
            if(checkISBN)return res.status(400).send({status:false,msg:"this ISBN:"+trimISBN +" "+"already present in database"})
            temp["ISBN"]=trimISBN
        }
         if(data.releasedAt){
            trimReleasedAt=data.releasedAt.trim()
           if(! isValidDate(trimReleasedAt))return res.status(400).send({status:false,msg:"Enter valid date (YYYY-MM-DD) "})
            temp["releasedAt"]=trimReleasedAt
         }

        let update=await bookModel.findOneAndUpdate({_id:book},{$set:temp},{new:true})
        return res.status(200).send({status:true,msg:"success",data:update})
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ status: false, msg: error.message })
    }
} 



module.exports.createBook = createBook;
module.exports.getBooks = getBooks
module.exports.deleteBooks=deleteBooks
module.exports.getBookByID=getBookByID
module.exports.updateBook=updateBook