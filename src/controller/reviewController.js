const reviewModel = require('../models/reviewModel')
const validator = require('../middleware/validation')
const bookModel = require('../models/bookModel')

//Adding review for a specific book.
const addReview = async function (req, res) {
    // try {
        const bookId = req.params.bookId //accessing bookId from params.
        requestReviewBody = req.body
        // const { reviewedBy, rating, review } = requestReviewBody;
         let reviewedBy= requestReviewBody.reviewedBy;
        let rating= requestReviewBody.rating;

        let review= requestReviewBody.review;



        // if(requestReviewBody.reviewedBy=="" || requestReviewBody.reviewedBy==" " ) {
        //     requestReviewBody.reviewedBy = "Guest"
        // }
        if (!validator.isEmpty(reviewedBy)) {
            requestReviewBody.reviewedBy = "Guest"
        }
        
        //for empty request body.
        if (Object.keys(requestReviewBody).length == 0) { res.status(400).send({ status: false, msg: "Enter the Books details" }) }
        if (!Object.keys(requestReviewBody).includes("reviewedBy")) {
            requestReviewBody["reviewedBy"]= "Guest"
        }
        // console.log(Object.keys(requestReviewBody))
        // let keys = Object.keys(requestReviewBody)
        // // if(keys.includes(reviewedBy))
        // console.log(keys.includes("reviewedBy"))

        // if (!reviewedBy) { return res.status(400).send({ status: false, msg: "reviewedBy field is required" }) }
        if (!rating) { return res.status(400).send({ status: false, msg: "rating field is required" }) }
        if (!review) { return res.status(400).send({ status: false, msg: "review is required" }) }


        //validation starts.
        if (!validator.isValidObjectId(bookId)) {return res.status(400).send({ status: false, message: "Invalid bookId." })}
      
        
        console.log(requestReviewBody)
         //if (!validator.isValid(reviewedBy)) { return res.status(400).send({ status: false, message: "Reviewer's name must be present" })};
         //if (!validator.isEmpty(reviewedBy)) { return res.status(400).send({status:false, message:"please provide a valid Reviewer's name"})}
        if (typeof reviewedBy == 'number'){return res.status(400).send({status:false, message: "provide a valid Reviewer's name"})}
        //if (validator.isVerifyString(reviewedBy)) {return res.status(400).send({status:false, message: "Reviewer's name can't contain number"})}

        
        if (!validator.isValid(rating)) {return res.status(400).send({ status: false, message: "Rating is required" })}
        if (!validator.isEmpty(rating)) {return res.status(400).send({ status: false, message: " please provide Rating" })}

        //setting rating limit between 1-5.
        if (!(rating >= 1 && rating <= 5)) {
            return res.status(400).send({ status: false, message: "Rating must be in between 1 to 5." })
        }


        const searchBook = await bookModel.findById({ _id: bookId})
        if (!searchBook) { return res.status(404).send({ status: false, message: `Book does not exist by this id ${bookId}.` })}
        //verifying the book is deleted or not so that we can add a review to it.
        if (searchBook.isDeleted == true) {
            return res.status(400).send({ status: false, message: "Cannot add review, Book has been already deleted." })
        }
        requestReviewBody.bookId = searchBook._id;
        requestReviewBody.reviewedAt = new Date();

        const saveReview = await reviewModel.create(requestReviewBody)

        if (saveReview) {
            await bookModel.findOneAndUpdate({ _id: bookId }, { $inc: { review: 1 } })
        }
       console.log(saveReview);
        const response = await reviewModel.findOne({ _id: saveReview._id }).select({
            __v: 0,
            createdAt: 0,
            updatedAt: 0,
            isDeleted: 0
        })
        return res.status(201).send({ status: true, message: `Review added successfully for ${searchBook.title}`, data: response })
    // } catch (err) {
    //     return res.status(500).send({ status: false, Error: err.message })
    // }
}

module.exports.addReview = addReview
