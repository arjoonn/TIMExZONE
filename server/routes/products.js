const express = require('express')
const Product = require('../model/products')
const router = express.Router()

router.get('/products',async(req,res)=>{
    const allProducts = await Product.find({})
    return res.status(200).json({products:allProducts})
})


router.get('/products/:id',async(req,res)=>{
    try {
        const watch = await Product.findById(req.params.id)
        if(!watch) return res.status(404).json({message:'item not found'})
        res.json({watch})    
        
    } catch (error) {
        console.log('server error',error);
        
    }
})


module.exports = router