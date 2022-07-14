const bookModel = require('../models/bookModel')
const reviewModel = require('../models/reviewModel')
const validator = require('../middleware/validation')

const addReview = async function (req, res) {
    try {
        const bookId = req.params.bookId 
        requestReviewBody = req.body
         let reviewedBy= requestReviewBody.reviewedBy;
        let rating= requestReviewBody.rating;
        let review= requestReviewBody.review;
        console.log(requestReviewBody)

        if (Object.keys(requestReviewBody).length == 0) { res.status(400).send({ status: false, msg: "Enter the Books details" }) }
        if(!validator.isValidObjectId(bookId)){return res.status(400).send({ status: false, message: "Invalid bookId." })}
        const findBookData = await bookModel.findOne({_id :bookId,isDeleted:false})
              if(!findBookData) return res.status(404).send({status:false,message:'No Book Data  Found '}) 
        
              if (!validator.isEmpty(reviewedBy)) {
            requestReviewBody.reviewedBy = "Guest"
        }
        
        //for empty request body.
       
        if (!Object.keys(requestReviewBody).includes("reviewedBy")) {
            requestReviewBody["reviewedBy"]= "Guest"
        }
        // if (!reviewedBy) { return res.status(400).send({ status: false, msg: "reviewedBy field is required" }) }
        if (!rating) { return res.status(400).send({ status: false, msg: "rating field is required" }) }
        if (!review) { return res.status(400).send({ status: false, msg: "review is required" }) }

        if (!validator.isValidObjectId(bookId)) {return res.status(400).send({ status: false, message: "Invalid bookId." })}
    
        if (typeof reviewedBy == 'number'){return res.status(400).send({status:false, message: "provide a valid Reviewer's name"})}
        if (!validator.isValid(rating)) {return res.status(400).send({ status: false, message: "Rating is required" })}
        if (!validator.isEmpty(rating)) {return res.status(400).send({ status: false, message: " please provide Rating" })}

        //validation for number

        //setting rating limit between 1-5.
        if (!(rating >= 1 && rating <= 5  )) {
            return res.status(400).send({ status: false, message: "Rating must be in between 1 to 5." })
        }

        const searchBook = await bookModel.findById({ _id: bookId,isDeleted:false})
        if (!searchBook) { return res.status(404).send({ status: false, message: `Book does not exist by this id ${bookId}.` })}
        
       
     //extracted Book id 
        requestReviewBody["bookId"] = findBookData._id;
        requestReviewBody.reviewedAt = new Date();

        const saveReview = await reviewModel.create(requestReviewBody)
          let BookDetails=  await bookModel.findOneAndUpdate({ _id:  req.params.bookId }, {$set:{reviews:findBookData.reviews+1 }},{new:true}).lean()
        
       
        const response = await reviewModel.findOne({ _id: saveReview._id }).select({
            __v: 0,
            createdAt: 0,
            updatedAt: 0,
            isDeleted: 0
        })
        BookDetails["reviewsData"]=response
        return res.status(201).send({ status: true, message: `Review added successfully for ${findBookData.title}`, data: BookDetails })

    } catch (err) {
        return res.status(500).send({ status: false, Error: err.message })
    }
}



let updateReview = async function (req, res) {

    try {

        let bodyData = req.body
        let book = req.params.bookId;
        let reviewId = req.params.reviewId;
        let checkInput= Object.keys(bodyData)
        let  arr=['reviewedBy','review','rating'] 

        if(!validator.isValidObjectId(book)){return res.status(400).send({ status: false, message: "Invalid bookId." })}
        if(!validator.isValidObjectId(reviewId)){return res.status(400).send({ status: false, message: "Invalid reviewId." })}
        if (Object.keys(bodyData).length == 0) { return res.status(400).send({ status: false, msg: "Enter the Books details" }) }
     
        
        for(let i=0;i<checkInput.length;i++){
        
        let as=arr.includes(checkInput[i]) 
        if(!as)return res.status(400).send({status:false,msg:"you can only update  review,rating and reviewedBy fields."})
        }


        const findBook = await bookModel.findOne({ _id: book, isDeleted: false }).lean()
        if (!findBook) res.status(404).send({ status: false, msg: "No book found" })

        let data = {};

        if (bodyData.review) {
            data["review"] = bodyData.review
        }

        if (bodyData.rating) {
            data["rating"] = bodyData.rating
        }

        if (bodyData.reviewedBy) {
            data["reviewedBy"] = bodyData.reviewedBy
        }

        let updatedReview = await reviewModel.findOneAndUpdate({ _id:reviewId, isDeleted: false }, { $set: data }, { new: true }).select({isDeleted:0,updatedAt:0,createdAt:0})
        if (!updatedReview) return res.status(404).send({ status: false, msg: "Review Data Not found" })
        
        findBook["reviewsData"]=updatedReview
       return res.status(200).send({ status: true, msg:"updated review document", data: findBook })

    } catch (err) {
        console.log(err.message)
        res.status(500).send({ status: false, msg: err.message })
    }
}


const deleteReviews = async function (req, res) {
    try {
        let book = req.params.bookId.trim()
        let review = req.params.reviewId.trim()
     
     if(!validator.isValidObjectId(book)){return res.status(400).send({ status: false, message: "Invalid bookId." })}
      if(!validator.isValidObjectId(review)){return res.status(400).send({ status: false, message: "Invalid reviewId." })}
        
        const findReviewData = await reviewModel.findOne({_id : review,bookId: book,isDeleted:false})
        if(!findReviewData) return res.status(404).send({status:false,message:'No review Data Found'})
       
        let changeReviewCount= await bookModel.findOneAndUpdate( {isDeleted: false,_id: book})
        if(changeReviewCount==null) return res.status(404).send({status:false,message:'Data Not Found, Book is deleted'})
        changeReviewCount.reviews= changeReviewCount.reviews===0 ?0 :changeReviewCount.reviews -1
            await changeReviewCount.save()
        let DeletedReview = await reviewModel.findByIdAndUpdate(  { _id: review }, {$set: { isDeleted: true }})
        return res.status(200).send({status:true,Data:"review Deleted successfully"})
     
    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({ status: false, msg: err.message })
    }
};

module.exports.deleteReviews=deleteReviews
module.exports.updateReview = updateReview
module.exports.addReview = addReview
