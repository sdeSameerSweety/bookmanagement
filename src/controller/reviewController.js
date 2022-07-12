const bookModel = require('../models/bookModel')
const reviewModel = require('../models/reviewModel')
//const { isEmpty, isValidISBN, isVerifyString, isValidDate,isValidObjectId } = require('../middleware/validation')



/*
-> PUT /books/:bookId/review/:reviewId
-> Update the review - review, rating, reviewer's name.
-> Check if the bookId exists and is not deleted before updating the review. Check if the review exist before updating the review. Send an error response with appropirate status code like this if the book does not exist
->Get review details like review, rating, reviewer's name in request body.
-> Return the updated book document with reviews data on successful operation. The response body should be in the form of JSON object like this
*/

let updateReview = async function (req, res) {

    try {

        let bodyData = req.body
        let book = req.params.bookId;
        const findBook = await bookModel.findOne({ _id: book, isDeleted: false })
        if (!findBook) res.status(404).send({ status: false, msg: "No book found" })


        let review = req.params.reviewId;
        const findReviewer = await reviewModel.find({ _id: review, isDeleted: false })
        if (!findReviewer) return res.status(404).send({ status: false, msg: "Reviewer is Not Available" })




        let data = {};

        if (bodyData.review) {
            review = bodyData.review
            findReviewer.review = bodyData.review
            data["review"] = bodyData.review
        }

        if (bodyData.rating) {
            rating = bodyData.rating
            findReviewer.rating = bodyData.rating
            data["rating"] = bodyData.rating
        }

        if (bodyData.reviewedBy) {
            reviewedBy = bodyData.reviewedBy
            findReviewer.reviewedBy = bodyData.reviewedBy
            data["reviewedBy"] = bodyData.reviewedBy
        }


        let updatedReview = await reviewModel.findOneAndUpdate({ _id:review }, { $set: data }, { new: true })


        
        // const reviewList = await reviewModel.find({ bookId: findBook._id, isDeleted: false }).select({
        //     bookId:1,
        //     review: 1,
        //     rating: 1,
        //     reviewedBy: 1,
        //     reviewedAt:1
        //   })

          //let reviewCount = updatedReview.length

          let output = {
            "_id":findBook._id,
          "title": findBook.title,
          "excerpt" : findBook.excerpt,
          "userId" : findBook.userId,
          "category" : findBook.category,
          "subcategory" : findBook.subcategory,
          "reviews" :findBook.review,
          "review" : updatedReview
          }
        
       return res.status(200).send({ status: true, msg:"Book List", data: output })

    } catch (err) {
        console.log(err.message)
        res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports.updateReview = updateReview