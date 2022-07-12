const express=require('express');
const router=express.Router();
const userController=require('../controller/userController')
const bookController=require('../controller/bookController');
<<<<<<< HEAD
const reviewController=require('../controller/reviewController');
const { authenticate, authorise, authoriseToCreateBook } = require('../middleware/commonMW');
=======
const { authenticate, authorise, authoriseToCreateBook, authoriseToDeleteReviews } = require('../middleware/commonMW');
>>>>>>> 5e9be6fc2aae9759856a0065bf4ba17ab4e42979
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

module.exports = router;






