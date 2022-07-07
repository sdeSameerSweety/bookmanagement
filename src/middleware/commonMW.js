const jwt = require("jsonwebtoken")

const authenticate = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if(!token) token =req.headers["X-Api-Key"];
        if (!token) return res.status(400).send({ status: false, msg: "Token Required" });
    try{
         let decodedToken = jwt.verify(token, "Book Management Project@#$%, team No.= 62")  
        if (!decodedToken) return res.status(401).send({ status: false, msg: "Authentication failed" });
      }
      catch(err){
       return res.status(401).send({status:false,msg:"Sorry Your token is expires now"})
      }
        next()
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}




module.exports.authenticate=authenticate