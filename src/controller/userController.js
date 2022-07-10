const userModel = require('../models/userModel')

const jwt=require('jsonwebtoken')
const{isValidEmail,isValid,isEmpty,isVerifyString,validateMobile,validPasward}=require('../middleware/validation')


const createUser = async function (req , res) {
    try {
        let data = req.body
        
        // destructuring the request body
        const {title,name,phone,email,password,address} = data

        // checking if request body is empty
        if(Object.keys(data).length == 0) {return res.status(400).send({status:false, msg:"Enter the Author details"})}

        // checking if requireq fields is provided in request body
        if (!title) { return res.status(400).send({ status: false, msg: "title is required" }) }
        if (!name) { return res.status(400).send({ status: false, msg: "name is required" }) }
        if (!phone) { return res.status(400).send({ status: false, msg: "phone is required" }) }
        if (!password) { return res.status(400).send({ status: false, msg: "password is required" }) }
        if (!email) { return res.status(400).send({ status: false, msg: "email is required" }) }
        if (!address) { return res.status(400).send({ status: false, msg: "address is required" }) }
        if (!address.city) { return res.status(400).send({ status: false, msg: "city name is required in address" }) }
        if (!address.pincode) { return res.status(400).send({ status: false, msg: "pincode is required" }) }


       
        // validation for title
        if (!isValid(title)) {return res.status(400).send({ status: false, message: "Title must be present" })};
        const isValidTitle = function(title) {return ['Mr', 'Mrs', 'Miss'].indexOf(title) !== -1}
        if (!isValidTitle(title)) {return res.status(400).send({ status: false, message: `Title should be among Mr, Mrs or Miss` }) }

        // validation for name
        if (!isValid(name)) { return res.status(400).send({ status: false, message: "name must be present" })};
        if (!isEmpty(name)) { return res.status(400).send({status:false, message:"please provide a valid name"})}
        if (typeof name == 'number'){return res.status(400).send({status:false, message: "provide a valid name"})}
        if (isVerifyString(name)) {return res.status(400).send({status:false, message: "name can't contain number"}) } 

        // validation for Phone number
        if (!isValid(phone)) {return res.status(400).send({ status: false, message: "phone must be present" }) };
        //validation for mobile number length and unique number
        if(!validateMobile(phone)) return res.status(400).send({status:false, message:"phone number is not valid, please provide a valid number"})
        
        // checking if phone number is already preasent in the collection
        if(await userModel.findOne({phone:data.phone})){
            return res.status(400).send({status:false, message:"PhoneNumber already exists. Please give another one"})
        }
        
        // validation for email
        if (!isValid(email)) { return res.status(400).send({ status: false, message: "email must be present" }) };
        if (!isValidEmail(email)) { return res.status(400).send({status:false, message: "please provide a valid email"})}
        // checking if given email is already preasent in the db collection
        if(await userModel.findOne({email:data.email})){return res.status(400).send({status:false, message:"Email already exists. Please give another one"})}

        // validation for passward
        if (!isValid(password)) {return res.status(400).send({ status: false, message: "password must be present" })};
        if (!validPasward(password)) {return res.status(400).send({status:false, message: "password shoud be 8 to 15 characters which contain at least one numeric digit, one uppercase and one lowercase letter"})}

        //validation for address
        if (!isValid(address)) { return res.status(400).send({ status: false, message: "address must be present" }) };
        if (typeof address.city == 'number') {return res.status(400).send({status:false, message:"provide a valid city name"})}
        if (isVerifyString(address.city)) {return res.status(400).send({status:false, message:"city name can't contain number"})}
        if (address.pincode.length != 6) {return res.status(400).send({status:false,message:"Pincode should be of 6 digits"})}
        if(!/^[1-9][0-9]{5}$/.test(address.pincode)) {return res.status(400).send({status:false,message:"please provide valid pincode"})}

        
       

        //saving user data into DB.
        const userData = await userModel.create(data)
        return res.status(201).send({ status: true, message: "Successfully saved User data", data: userData })

    }
    catch(err) { return res.status(500).send({ status: false, message: "Something went wrong", Error: err.message})}

}


let loginUser=async function(req,res){
    try {
        const data=req.body
        const email=data.email
        const password=data.password
            if(Object.keys(data).length==0)return res.status(400).send({ status: false, msg: "Body can not be empty " });
            if(!("email" in data)) return res.status(400).send({ status: false, msg: "email is required " });
            if(!("password" in data)) return res.status(400).send({ status: false, msg: "password is required " })
            if(!isEmpty(email)) return res.status(400).send({ status: false, msg: "email can not be empty and must be string" })
            if(!isEmpty(password))return res.status(400).send({ status: false, msg: "password can not be empty and must be string" })
            if(!isValid(email)) return res.status(400).send({ status: false, msg: "email can not be null and undefined" })
            if(!isValid(password)) return res.status(400).send({ status: false, msg: "password can not be null or undefined" })
            if(!isValidEmail(email))return res.status(400).send({status:false,msg:"please enter valid email"})
    
         //   finding user in DB
             let findEmail=await  userModel.findOne({email:email}) 
             if(!findEmail)return res.status(404).send({status:false,msg:"User not found"})
         //   if password is wrong
             if((findEmail.password!=password)) return res.status(401).send({status:false,msg:"invalid password"})
         //   generate JWT
             let token=jwt.sign(
             {
                id: findEmail._id.toString(),
                iat:Math.floor(new Date().getTime()/1000),
              },
              "Book Management Project@#$%, team No.= 62",{expiresIn:"1h"});
        res.setHeader("x-api-key", token);
        res.status(200).send({status:true, token:token})
        

    } catch (error) {
        res.status(500).send({ msg: error.message });
    }
}

module.exports.createUser = createUser
module.exports.loginUser = loginUser



















