const express = require('express')
const User = require('../model/user')
const {sendMail} = require('../utils/mail')
const { createTokenForUser } = require('../services/authentication')
const router = express.Router()
const otpStore={}


router.post('/signup',async(req,res)=>{
    const {fullname,email,password} = req.body

    await User.create({
        fullname,
        email,
        password
    })
    return res.status(201).json({message:'user registerd successfully'})
})


//otp based verification
router.post('/signin',async(req,res)=>{
    const {email,password} = req.body;
    try{
        //validating email and password
        await User.matchPasswordGenToken(email,password)

        //otp generation
        const otp = Math.floor(100000+Math.random()*900000).toString()
        otpStore[email] = otp;
        setTimeout(()=>delete otpStore[email],5 * 60 * 1000)
        await sendMail(
            email,
            'Your otp is:',
            `${otp}`
        );
        res.status(200).json({message:'OTP send successfully'})

    }catch(error){
        console.log('signin error',error.message); 
        res.status(401).json({message:error.message}) 
    }
})

router.post('/verify',async(req,res)=>{
    const {email,otp} = req.body;
    if(otpStore[email]!==otp) return res.status(401).json({message:'otp expired or incorrect'})

    delete otpStore[email]
    
    
    const user = await User.findOne({email}).select('-password')
    const token = createTokenForUser(user);

    res.status(200).cookie('token',token,{
        httpOnly:true,
        secure:true,
        sameSite: 'none'
    }).json({message:'login successfull',user,token})
    
})

router.get('/logout',(req,res)=>{
    res.clearCookie('token')
    res.status(200).json({ok:true });
})

module.exports = router