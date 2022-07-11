const express=require('express');
const router=express.Router();
const userController=require('../controller/userController')
const bookController=require('../controller/bookController');
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
router.get('/books/:bookId',bookController.getBookByID)
router.put('/books/:bookId',bookController.updateBook)
router.put('/books/:bookId/review',bookController.updateReview)
router.get('/books/:bookId',authenticate,bookController.getBookByID)
router.put('/books/:bookId',authenticate,authorise,bookController.updateBook)

module.exports = router;
