const isValid= function(value){
    if (typeof value=== "undefined" || typeof value === "null") return false
    if(value==null)return false 
    return true
}
const isEmpty= function(value){
    if (typeof value==="string" && value.trim().length===0) return false
    return true
}
const isValidEmail=(mail)=>{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    return true
}

const regex = /\d/;
const isVerifyString = function (string) {
    return regex.test(string)
}

const validateMobile = function(number) {
    let trim = number.trim()
  var  reg = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/
  return  reg.test(trim) ;
}


const validPasward = function checkPassword(password)
{
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(password);
}

//^[0-9]+$/
//^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$
//^[0-9]+$
//r'^(+91[-\s]?)?[0]?(91)?[789]\d{9}$'
// if(/^[1-9][0-9]{5}$/.test(pin))

module.exports={isValidEmail,isEmpty,isValid,isVerifyString,validateMobile,validPasward}




