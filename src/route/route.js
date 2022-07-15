const express=require('express');
const router=express.Router();
const userController=require('../controller/userController')
const bookController=require('../controller/bookController');
const reviewController=require('../controller/reviewController');
const { authenticate, authorise, authoriseToCreateBook } = require('../middleware/commonMW');


//...................... User....................................//
router.post('/register',userController.createUser)
router.post('/login',userController.loginUser)

//...................... Book....................................//
router.post('/books',authenticate,authoriseToCreateBook, bookController.createBook)
router.get('/books',authenticate, bookController.getBooks)

router.get('/books/:bookId',authenticate,bookController.getBookByID)
router.put('/books/:bookId',authenticate,authorise,bookController.updateBook)
router.delete('/books/:bookId',authenticate,authorise, bookController.deleteBooks)

//......................Review....................................//
router.post('/books/:bookId/review',reviewController.addReview)
router.put('/books/:bookId/review/:reviewId',reviewController.updateReview)
router.delete('/books/:bookId/review/:reviewId', reviewController.deleteReviews)



//......................invalid params....................................//
router.all('*',function (req,res){res.status(400).send({msg:"this page does not exist"})})



module.exports = router;






