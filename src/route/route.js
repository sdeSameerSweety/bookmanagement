//hempal 1st API 
//samir 2nd API 

const express=require('express');
const router=express.Router();
const userController=require('../controller/userController')
const bookController=require('../controller/bookController')
// const reviewController=require('../controller/reviewController')
//......................Create User....................................//
router.post('/register',userController.createUser)



//......................Login User....................................//

router.post('/login',userController.loginUser)
router.post('/books',bookController.createBook)

router.post('/login',userController.loginUser)



module.exports = router;
