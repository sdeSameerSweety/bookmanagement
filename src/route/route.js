//hempal 1st API 
//samir 2nd API 

const express = require('express');
const router = express.Router();

const userController = require('../controller/userController')






router.post('/register',userController.createUser)


module.exports = router;