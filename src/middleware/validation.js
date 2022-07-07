const isValid = function (value) {
    if (typeof value === "undefined" || typeof value === "null") return false
    if (value == null) return false
    return true
}
const isEmpty = function (value) {
    if (typeof value === "string" && value.trim().length === 0) return false
    return true
}
const isValidEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
        return true
}

const regex = /\d/;
const isVerifyString = function (string) {
    return regex.test(string)
}


const isValidString = function (string) {
    if (/^([a-zA-Z. , ]){1,100}$/.test(string)) return true}

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



const isValidISBN = function (ISBN) {
    if (/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/.test(ISBN)) return true
}

const isValidDate = function (Date) {
    if (/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(Date)) return true
}




module.exports = { isValidEmail, isEmpty, isValid, isVerifyString, validateMobile, isValidString, isValidISBN, isValidDate,validPasward }




