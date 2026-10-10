const mongoose = require("mongoose")

const emiSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    },
    emiHistory:[{
        amount:{
            type:Number,
            require:true
        },
        rate:{
            type:Number,
            require:true,
        },
        months:{
            type:Number,
            require:true
        },
        monthlyEmi: {
            type: Number
        },
        totalInterest: {
            type: Number
        },
        totalPayment: {
            type: Number
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
}, { timestamps: true })

module.exports = mongoose.model("emiHistory",emiSchema)