const express = require("express");
const User = require("../model/user");
const router = express.Router(); 
const {checkForAuthenticationCookie} = require('../middleware/authentication')


router.post("/add/:id",checkForAuthenticationCookie('token'),async (req,res) => {
   try {
       if (!req.user) {
          return res.status(401).json({ message: "Login required" });
    }
    
      const productId = req.params.id;
      const user = await User.findById(req.user._id);
            
      if (user.wishlist.includes(productId)) {
        return res
          .status(404)
          .json({ message: "product already in wishlist"});
      }

      //adding product to wishlist and save it
      user.wishlist.push(productId);
      await user.save();

      res.json({
        message: "product added to wishlist",
        wishlist: user.wishlist,
      });
    } catch (error) {
      console.log("server error", error);
    }
  }
);

router.post('/removefrm/:id',checkForAuthenticationCookie('token'),async(req,res)=>{
  try {
      const productId = req.params.id;
      const user = await User.findById(req.user._id)

      if(!user.wishlist.includes(productId)){
          return res.status(200).json({message:'product not in the wishlist'})
      }

      user.wishlist.pull(productId)
      await user.save()

      res.json({
          message:'product removed from wishlist',
          wishlist:user.wishlist
      })
  } catch (error) {
      console.log('unable to remove',error);
  }
})

router.get('/viewwishlist',checkForAuthenticationCookie('token'),async(req,res)=>{
  if(!req.user) return res.status(404).json({message:'login required'})

  try {
    const user = await User.findById(req.user._id).populate('wishlist')
     if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.wishlist)
  } catch (error) {
    console.log('something went wrong',error);
    
  }
})

module.exports = router;
