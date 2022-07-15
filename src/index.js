const express=require('express');

const bodyParser=require('body-parser');
const router=require('./route/route');
const app=express();
const mongoose=require('mongoose');
const multer=require('multer');

app.use(bodyParser.json());

 
app.use(bodyParser.urlencoded({extended:true}));
app.use(multer().any())

mongoose.connect("mongodb+srv://samirlohiya909:Lohiya123@samirlohiya.nszppy8.mongodb.net/Project-3group62?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )


app.use('/',router)


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});


