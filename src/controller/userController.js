const jwt=require('jsonwebtoken')
const{validateEmail}=require('../middleware/validation')

let loginUser=async function(req,res){
    try {
        const data=req.body
        const {email,password}=data



        let jwt=jwt.sign(
            {
                id: validateEmail._id.toString(),
              },
              "Book Management Project@#$%, team No.= 62"
        )
        
        

    } catch (error) {
        
    }
}