const mongoose = require('mongoose')
const { createHmac,randomBytes } = require('node:crypto');
const {Schema} = require('mongoose');
const {createTokenForUser} = require('../services/authentication');

const userSchema = new Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    salt:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    otp:{
        type:String
    },
    otpExpire:{
        type:Date
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    },
    wishlist:[{
        type:mongoose.Schema.ObjectId,
        ref:'products'
    }],
    cart:[{
        productdetails:{type:mongoose.Schema.ObjectId,ref:'products'},
        quantity:{type:Number,default:1}    
    }],
    confirmedorder:[{
        type:mongoose.Schema.ObjectId,
        ref:'order'
    }]
});

userSchema.pre('save',function(next){
    const user =this;
    if(!user.isModified('password')) return next();
    const salt = randomBytes(16).toString();

    const hashPassword = createHmac('sha256', salt)
               .update(user.password)
               .digest('hex');

    user.salt = salt;
    user.password = hashPassword;

    next()
})

//schemaObject.static( method, callback );
userSchema.static('matchPasswordGenToken',async function(email,password){
    
    const user = await this.findOne({email})

    if(!user) throw new Error('user not found')

    const salt = user.salt;
    const hashPassword = user.password
    const userProvidedHash = createHmac('sha256', salt)
               .update(password)
               .digest('hex');
    
   if(userProvidedHash!==hashPassword) throw new Error('Incorrect Email or Password')

   return user;
   
})

const User = mongoose.model('user',userSchema)
module.exports = User
