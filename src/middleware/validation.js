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






module.exports={isValidEmail,isEmpty,isValid}