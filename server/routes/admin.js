const express = require('express')
const Order = require('../model/payment')
const router = express.Router()

router.get('/admin/order',async(req,res)=>{
    try {
        const order = await Order.find({status:'PENDING'})
            .populate('user','email')
            .populate('products.productId')
            .lean()
            
        const updatedOrder =order.map((item)=>{
            const updatedProducts = item.products.map((p)=>{
                const price = p.productId?.price;
                const qty = p.quantity;
                const totalPrice = price*qty
                return{...p,totalPrice}
            })
            return{...item,products:updatedProducts}
        })

        res.render('adminOrder',{order:updatedOrder})
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