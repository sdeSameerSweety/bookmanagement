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
    if(/^[0-9]+$/.test(number)) return true
}

const isValidString = function(string) {
    if(/^([a-zA-Z. , ]){1,100}$/.test(string)) return true
}

const isValidISBN = function(ISBN) {
    if(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/.test(ISBN)) return true
}

// if(/^[1-9][0-9]{5}$/.test(pin))

module.exports={isValidEmail,isEmpty,isValid,validateMobile,isValidString,isValidISBN,isVerifyString}


