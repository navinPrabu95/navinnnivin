const express = require('express')
const mongoose = require('mongoose')
const PORT = 7000
const MONGO_URL = "mongodb+srv://navin:guru@cluster0.xqq1s.mongodb.net/interviewTask?retryWrites=true&w=majority";
const cors =require('cors')


mongoose.connect(MONGO_URL,()=>{
    console.log("DB Connected sucessfully");
})

const app = express()
app.use(cors())
app.use(express.json())
app.use("/form",require('./Routers/DFormRouter'))




app.listen(PORT,()=>{
    console.log("Server started sucessfully");
})