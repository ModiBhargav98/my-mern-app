const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Passowrd"],
        minlength:[8,"Password should be greater than 8 characters"],
       //  select meanings getfindallusers to not show users password
        select:false
    },
})

module.exports = mongoose.model("user",userSchema)