const userModel = require('../models/userModel')


const createUser = async function (req , res) {
    try {
        let data = req.body
        
        // destructuring the request body
        const {title,name,phone,email,password,address} = data

        // checking if request body is empty
        if(Object.keys(author).length == 0) {res.status(400).send({status:false, msg:"Enter the Author details"})}

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

module.exports.createUser = createUser