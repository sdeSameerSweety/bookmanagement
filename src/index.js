const express=require('express');
const bodyParser=require('body-parser');
const router=require('./route/route');
const app=express();
const mongoose=require('mongoose');
const multer=require('multer');
const aws=require('aws-sdk');

app.use(bodyParser.json());


app.use(bodyParser.urlencoded({extended:true}));
app.use(multer().any())

aws.config.update({accessKeyId: "AKIAY3L35MCRVFM24Q7U",secretAccessKey: "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",region: "ap-south-1"})
mongoose.connect("mongodb+srv://samirlohiya909:Lohiya123@samirlohiya.nszppy8.mongodb.net/Project-3group62?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )


app.use('/',router)


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});


