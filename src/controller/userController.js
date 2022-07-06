const userModel = require('../models/userModel')

const jwt=require('jsonwebtoken')
const{isValidEmail,isValid,isEmpty}=require('../middleware/validation')


const createUser = async function (req , res) {
    try {
        let data = req.body
        
        // destructuring the request body
        const {title,name,phone,email,password,address} = data

        // checking if request body is empty
        if(Object.keys(data).length == 0) {res.status(400).send({status:false, msg:"Enter the Author details"})}

        // checking if requireq fields is provided in request body
        if (!title) { return res.status(400).send({ status: false, msg: "title is required" }) }
        if (!name) { return res.status(400).send({ status: false, msg: "name is required" }) }
        if (!phone) { return res.status(400).send({ status: false, msg: "phone is required" }) }
        if (!password) { return res.status(400).send({ status: false, msg: "password is required" }) }
        if (!email) { return res.status(400).send({ status: false, msg: "email is required" }) }

        if (!address) { return res.status(400).send({ status: false, msg: "address is required" }) }

        
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
        //generate JWT
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



















// const{validateEmail,isEmpty,isValid}=require('../middleware/validation')
// const userModel=require('../models/userModel')
// let loginUser=async function(req,res){
//     try {
    //     const data=req.body
    //    const email=data.email
    //    const password=data.password

    //     if(Object.keys(data).length==0)return res.status(400).send({ status: false, msg: "Body can not be empty " })
    //     if(!(email in data))
    //     if(!(password in data))
    //     if(isValid(email))
    //     if(isValid(password))
    //     if(isEmpty(email))
    //     if(isEmpty(password))
    //     if(!validateEmail(email))return res.status(400).send({status:false,msg:"please enter valid email"})

    //     //finding user in DB
    //   let findEmail=await  userModel.findOne({email:email}) 
    //   if(!findEmail)return res.status(404).send({status:false,msg:"User not found"})
    //   //if password is wrong
    //   if((findEmail.password!=password)) return res.status(401).send({status:false,msg:"invalid password"})

//         let token=jwt.sign(
//             {
//                 id: findEmail._id.toString(),
//               },
//               "Book Management Project@#$%, team No.= 62"
//         )
//         res.setHeader(("x-api-key", jwt))
//         res.status(200).send({status:true, token:token})

//     } catch (error) {
//         res.status(500).send({ msg: error.message });
//     }
// }
// module.exports.loginUser=loginUser