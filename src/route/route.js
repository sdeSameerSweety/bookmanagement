const express=require('express');
const router=express.Router();
const userController=require('../controller/userController')
const bookController=require('../controller/bookController');
const { authenticate,authorise } = require('../middleware/commonMW');
const reviewController=require('../controller/reviewController')


//......................Create User....................................//
router.post('/register',userController.createUser)



//......................Login User....................................//
router.post('/login',userController.loginUser) //done
router.post('/books',authenticate, bookController.createBook)
router.get('/books',authenticate, bookController.getBooks)//done

router.delete('/books/:bookId',authenticate,authorise, bookController.deleteBooks)


//......................Get Book By ID....................................//
router.get('/books/:bookId',bookController.getBookByID)
router.put('/books/:bookId',bookController.updateBook)

module.exports = router;
