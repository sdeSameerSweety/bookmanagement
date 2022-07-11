const bookModel = require('../models/bookModel')
const reviewModel = require('../models/reviewModel')
const userModel = require("../models/userModel")

const deleteReviews = async function (req, res) {
    try {
        let book = req.params.bookId
        let review = req.params.reviewId
        // console.log(review)
        let findBook=await bookModel.findOne({_id:book}).lean()
        const check = await reviewModel.findOne({_id : review,bookId: book})
        if(!check) return res.status(200).send({status:false,message:'wrong ids'})
        let DeletedBook = await reviewModel.findByIdAndUpdate(  { _id: review }, {$set: { isDeleted: true }})
        let findreviews= await reviewModel.find(({ $and: [{bookId: book},{ isDeleted: false }] }))
        ReviewCount=findreviews.length
        findBook.reviews=ReviewCount
        findBook['reviewsData']=findreviews        
        return res.status(200).send({status:true,message:'Books list',Data:findBook})
     
    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({ status: false, msg: err.message })
    }


};

module.exports.deleteReviews=deleteReviews
