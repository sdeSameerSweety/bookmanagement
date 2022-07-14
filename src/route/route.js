const express=require('express');
const router=express.Router();
const userController=require('../controller/userController')
const bookController=require('../controller/bookController');
const reviewController=require('../controller/reviewController');
const { authenticate, authorise, authoriseToCreateBook } = require('../middleware/commonMW');
const aws= require("aws-sdk")
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




let uploadFile= async ( file) =>{
   return new Promise( function(resolve, reject) {
    // this function will upload file to aws and return the link
    let s3= new aws.S3({apiVersion: '2006-03-01'}); // we will be using the s3 service of aws

    var uploadParams= {
        ACL: "public-read",
        Bucket: "classroom-training-bucket",  //HERE
        Key: "abc/" + file.originalname, //HERE 
        Body: file.buffer
    }


    s3.upload( uploadParams, function (err, data ){
        if(err) {
            return reject({"error": err})
        }
        console.log(data)
        console.log("file uploaded succesfully")
        return resolve(data.Location)
    })

    // let data= await s3.upload( uploadParams)
    // if( data) return data.Location
    // else return "there is an error"

   })
}

router.post("/write-file-aws", async function(req, res){

    try{
        let files= req.files
        if(files && files.length>0){
            //upload to s3 and get the uploaded link
            // res.send the link back to frontend/postman
            let uploadedFileURL= await uploadFile( files[0] )
            res.status(201).send({msg: "file uploaded succesfully", data: uploadedFileURL})
        }
        else{
            res.status(400).send({ msg: "No file found" })
        }
        
    }
    catch(err){
        res.status(500).send({msg: err})
    }
    
})

router.post('*',function (req,res){res.status(400).send({msg:"this page does not exist"})})
router.put('*',function (req,res){res.status(400).send({msg:"this page does not exist"})})
router.delete('*',function (req,res){res.status(400).send({msg:"this page does not exist"})})

router.get('*',function (req,res){res.status(400).send({msg:"this page does not exist"})})

module.exports = router;






