const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const productSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    productImage:{
        type:[String],
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        min:0
    },
    gender:{
        type:String,
        required:true
    },
    services:[
        {
            icon:{type:String},
            type:{type:String}
        }
    ]
},{timestamps:true})


const Product = mongoose.model('products',productSchema)

module.exports = Product