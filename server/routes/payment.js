const express = require('express')
const router = express.Router()
const Razorpay = require('razorpay')
const crypto = require('crypto');
const { checkForAuthenticationCookie } = require('../middleware/authentication');
require('dotenv').config()
const Order = require('../model/payment');
const Product = require('../model/products');


const razorpay = new Razorpay({
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret : process.env.RAZORPAY_KEY_SECRET
});

    router.post('/placeorder',checkForAuthenticationCookie('token'),async(req,res)=>{
        try {
            const {products,address,amount} = req.body;
            const userId = req.user._id
            for (const p of products) {
                const product = await Product.findById(p.productId)
                if (!product) return res.status(404).json({ message: "Product not found" });
            }
            const options = {
                amount: req.body.amount * 100,
                currency:"INR",
                receipt:`order_${Date.now()}`,
                payment_capture: 1
            };

            console.log("Creating Razorpay order with options:", options);
            console.log("Using Key Secret:", razorpay.key_secret ? "Loaded" : "Missing");

            const order = await razorpay.orders.create(options)
            console.log("✅ Razorpay response:", order);

            const createdOrder = await Order.create({
                user:userId,
                products,
                address,
                orderId:order.id,
                amount,
                status:'PENDING'
            })

            console.log("order response:", createdOrder);
            res.json({razorpayOrder:order, dbOrder:createdOrder,message:'order placed successfully'})

        } catch (error) {
            res.status(500).json({message:'something went wrong'})
            console.log('error',error);
        }
    })

router.post('/verifypayment',checkForAuthenticationCookie('token'),async(req,res)=>{
    try {
        const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body;

        const generated_signature = crypto.createHmac('sha256',process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id+'|'+razorpay_payment_id)
            .digest('hex')

        if(generated_signature !== razorpay_signature){
            res.status(500).json({message:'Invalid signature'})
        }

        const order = await Order.findOneAndUpdate(
            {orderId:razorpay_order_id},
            {paymentId:razorpay_payment_id,status:'SUCCESS'},
            {new:true}
        )

        res.json({message:'payment verified successfully',order})
    } catch (error) {
        console.log('paymet issue',error);
    }
})

router.get('/confirmedorder',checkForAuthenticationCookie('token'),async(req,res)=>{
    try {
        const orderDetails = await Order.find({user:req.user._id,status:'SUCCESS'})
        .populate('products.productId', 'productImage title')
        .select('orderId  status')
        res.status(200).json({orderDetails})
    } catch (error) {
        res.status(404).json({message:'order not found'})
        console.log('order not found');
    }
})

module.exports = router