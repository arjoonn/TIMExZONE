const express = require('express')
const Order = require('../model/payment')
const router = express.Router()

router.get('/admin/order',async(req,res)=>{
    try {
        const order = await Order.find({status:'PENDING'})
            .populate('user','email')
            .populate('products.productId','price title')

        res.render('adminOrder',{order})
    } catch (error) {
        console.log('something went wrong',error);
    }
})

router.post('/admin/order/:id/confirm',async(req,res)=>{
    await Order.findByIdAndUpdate(req.params.id,{status:'SUCCESS'})
    res.redirect('/admin/admin/order')
})

router.post('/admin/order/:id/reject',async(req,res)=>{
    await Order.findByIdAndUpdate(req.params.id,{status:'FAILED'})
    res.redirect('/admin/admin/order')
})


module.exports=router;