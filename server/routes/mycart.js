const express = require('express')
const router = express.Router()
const { checkForAuthenticationCookie } = require('../middleware/authentication')
const User = require('../model/user')
const Product = require('../model/products')


router.post('/buynow',checkForAuthenticationCookie('token'),async(req,res)=>{
    try {
        const user = await User.findById(req.user._id)
        if(!user) return res.json({message:'error user not found'})
        
        //getting productId ,quantity from multiple products
        const { products } = req.body;

        
        if(!products || products.length === 0) return res.status(404).json({message:'no product selected'})
        
        const orderItems = []
        let totalPrice = 0;

        for(const item of products){
            const product = await Product.findById(item.productId)
            if(!product) continue;

            const itemTotal = product.price * item.quantity
            totalPrice+=itemTotal

            orderItems.push({
                productId : product._id,
                title : product.title,
                price : itemTotal,
                productImage : product.productImage,
                quantity : item.quantity
            });
        }

        if(orderItems.length ===0 ) {
            return res.status(404).json({message:"no valid product found"})
        }

        
        res.status(200).json({message:'proceed to checkout',
            order:{
                userId: user._id,
                items: orderItems,
                totalPrice
            }
        });

    } catch (error) {
        console.log('server error',error); 
    }
})


router.post('/mycart/:id',checkForAuthenticationCookie('token'),async(req,res)=>{
    try {
         if(!req.user) {
            return res.status(404).json({message:'login required'})
         }
        
        const user = await User.findById(req.user._id)
        const productId = req.params.id

        const existingItem = user.cart.find((item)=>String(item.productdetails) === String(productId))

        if(existingItem){
            return res.status(404).json({message:'product already in cart'})
        }

        user.cart.push({productdetails:productId,quantity:1})
        await user.save()

        res.json({message:'product added to your cart',
                              cart:user.cart
    });
    } catch (error) {
        console.log('error while adding product',error);
        
    }
})

//update the quantity of product
router.put('/mycart/:id',checkForAuthenticationCookie('token'),async(req,res)=>{
    try {
        if(!req.user) return res.status(401).json({message:'login required'})
        
        const { quantity } = req.body;
        const user = await User.findById(req.user._id)
        
        const existingItem = user.cart.find((item)=>String(item.productdetails) === String(req.params.id)) 

        if(!existingItem) return res.status(404).json({message:'product not in cart'})
        
        existingItem.quantity = quantity
        await user.save()

        res.status(200).json({message:'Quantity updated',cart:user.cart})
    } catch (error) {
        console.log('error while updating quantity',error);
    }
})

router.get('/viewmycart',checkForAuthenticationCookie('token'),async(req,res)=>{
    try {
        const user = await User.findById(req.user._id).populate('cart.productdetails')
        
        if(!user) return res.status(404).json({message:'user not found'})
        
        const cart = user.cart.filter(item => item.productdetails !== null  && item.productdetails !== undefined)
        .map((item)=>({
            cartItemId:item._id,
            productId:item.productdetails._id,
            title:item.productdetails.title,
            productImage:item.productdetails.productImage,
            price:item.productdetails.price,
            quantity:item.quantity
        }))
        res.status(200).json(cart)
    } catch (error) {
        console.log('something went wrong',error);
        
    }
})

router.post('/removefrm/:id',checkForAuthenticationCookie('token'),async(req,res)=>{
    try {
        const productId = req.params.id
        console.log('productId',productId);
        
        const user = await User.findByIdAndUpdate(req.user._id,
            {$pull:{cart:{productdetails:productId}}},
            {new:true}
        ).populate('cart.productdetails')

        if(!user) return res.status(404).json({message:'user not found'})

        res.status(200).json({
            message:'product removed from cart',
            cart:user.cart
        })
    } catch (error) {
        console.log('unable to remove from cart',error);
        
    }
})

module.exports = router