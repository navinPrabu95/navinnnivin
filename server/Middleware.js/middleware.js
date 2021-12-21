const jwt = require('jsonwebtoken')
const {JWT_SECRET_KEY}=require('../Config/dev')
const User = require('../Models/UserInfo')
const Basic = require('../Models/BasicDetail')




module.exports=(request,response,next)=>{
     const {authorization} =  request.headers

     if(!authorization){
         response.status(420).json({errorMsg:"You must login first"})
         console.log("a");
     }else{
         const token = authorization.replace("Bearer  ","")
         console.log("b");

         jwt.verify(token,JWT_SECRET_KEY,(err,payload)=>{
             if(err){
                 console.log("error");
                response.status(420).json({errorMsg:"login failed"})
             }else{
                 const{_id} = payload
                 User.findById(_id).then(user=>{
                     request.user = user
                     next()
                 })
             }
         })
     }
}