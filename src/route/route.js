//hempal 1st API 
//samir 2nd API 

const express=require('express');
const router=express.Router();
const userController=require('../controller/userController')
const bookController=require('../controller/bookController');
const { authenticate, authorise } = require('../middleware/commonMW');
// const reviewController=require('../controller/reviewController')
//......................Create User....................................//
router.post('/register',userController.createUser)



//......................Login User....................................//

router.post('/login',userController.loginUser)

router.post('/books',authenticate, bookController.createBook)
router.get('/books',authenticate, bookController.getBooks)
router.delete('/books/:bookId',authenticate,authorise, bookController.deleteBooks)


//....................in case of invalid URL.....(static route)...../
router.get('*',function (req,res){res.status(404).send({msg:"this page does not exist"})})




//....................in case of invalid URL.....(static route)...../
router.get('*',function (req,res){res.status(404).send({msg:"this page does not exist"})})

//......................Get Book By Query....................................//
// router.get('/books/:bookId',bookController.getBookByQuery)


module.exports = router;
