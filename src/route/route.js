const express=require('express');
const router=express.Router();
const userController=require('../controller/userController')
const bookController=require('../controller/bookController');
const reviewController=require('../controller/reviewController');
const { authenticate, authorise, authoriseToCreateBook } = require('../middleware/commonMW');
// const reviewController=require('../controller/reviewController')
//const reviewController=require('../controller/reviewController')


//......................Create User....................................//
router.post('/register',userController.createUser)



//......................Login User....................................//

router.post('/login',userController.loginUser)

router.post('/books',authenticate,authoriseToCreateBook, bookController.createBook)
router.get('/books',authenticate, bookController.getBooks)




router.delete('/books/:bookId',authenticate,authorise, bookController.deleteBooks)


//......................Get Book By ID....................................//
router.put('/books/:bookId/review/:reviewId',reviewController.updateReview)
router.get('/books/:bookId',authenticate,bookController.getBookByID)
router.get('/books/:bookId',authenticate,authorise,bookController.getBookByID)
router.put('/books/:bookId',authenticate,authorise,bookController.updateBook)

// ........................Add Review.....................................//
router.post('/books/:bookId/review',reviewController.addReview)

router.delete('/books/:bookId/review/:reviewId', reviewController.deleteReviews)

//for invalid params
router.post('*',function (req,res){res.status(400).send({msg:"this page does not exist"})})
router.put('*',function (req,res){res.status(400).send({msg:"this page does not exist"})})
router.delete('*',function (req,res){res.status(400).send({msg:"this page does not exist"})})
router.get('*',function (req,res){res.status(400).send({msg:"this page does not exist"})})

module.exports = router;






