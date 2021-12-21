const express = require('express')
const router = express.Router()
const User = require('../Models/UserInfo')
const Basic = require('../Models/BasicDetail')
const jwt = require('jsonwebtoken')
const { JWT_SECRET_KEY } = require('../Config/dev')
const middleware = require('../Middleware.js/middleware')




router.post('/signin', (request, response) => {
    const { email } = request.body

    if (!email) {
        response.status(420).json({ errorMsg: "please enter your email" })
    }else{
        User.findOne({ email: email }).then(user => {

            if (!user) {
                response.status(420).json({ errorMsg: "Inavalid email" })
            }else {
                const{_id,email,FormName,FormCreated} = user  
                const token = jwt.sign({_id:user._id},JWT_SECRET_KEY)
                response.status(200).json({ sucessMsg: "sucess",token ,user})
            }
        })
    }
})

router.get('/allFields',(request,response)=>{

    User.find({})
    .populate('basicDetail',"_id name gender")
    .then(res=>{
        console.log(res);
    })
 })



module.exports = router