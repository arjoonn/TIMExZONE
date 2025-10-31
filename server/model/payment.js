const mongoose = require('mongoose')
const {Schema} =  require('mongoose')

const orderSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    products:[
        {
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'products',
            required:true
        },
        quantity:{
            type:String,
            required:true,
            min:1
        }
    }
    ],
    address:{
        type:String,
        required:true
    },
    orderId:{
        type:String,//Razorpay order Id
        required:true
    },
    paymentId:{
        type:String //Razorpay paymentID
    },
    status:{
        type:String,
        enum:['PENDING','SUCCESS','FAILED'],
        default:'PENDING'
    },
    amount:{
        type:Number,
        required:true
    }
},{timestamps:true})

const Order = mongoose.model('order',orderSchema)

module.exports = Order