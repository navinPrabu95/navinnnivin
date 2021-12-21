const mongoose = require('mongoose')
const Schema = mongoose.Schema

const d = new Date()
const date = `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`

const dynamicFormSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true 
    },
    validity:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    users:[{
        type:String,
        required:true
    }],
    fields:[{
        name:{
            type:String,
            required:true
        },
        type:{
            type:String,
            required:true
        },
        options:{
            type:String,
            required:true
        },
        isPublic:{
            type:Boolean,
            required:true
        },
        isRequired:{
            type:Boolean,
            required:true
        },
        isPrintable:{
            type:Boolean,
            required:true
        },
        sortOrder:{
            type:Number,
            required:true
        }
    }],
    FormCreated:{
        type:'string',
        default:date
    }
})

module.exports= mongoose.model('dynamic_form', dynamicFormSchema)