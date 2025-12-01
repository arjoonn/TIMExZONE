const express = require("express");
const User = require("../model/user");
const { sendMail } = require("../utils/mail");
const { createTokenForUser, validateToken } = require("../services/authentication");
const { verifyValidEmail } = require("../utils/emailVerify");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { fullname, email, password } = req.body;
  try{
    const existiUser = await User.findOne({email})
    if(existiUser){
      return res.status(400).json({message:'User already exist. Please login'})
    }   

    const isValidEmail = await verifyValidEmail(email)
    if(!isValidEmail){
      return res.status(400).json({message:"Not a valid email!!"})
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpire = Date.now() + 5 * 60 * 1000;

    try {
      await sendMail(email,"Your otp is:", otp)
    } catch (error) {
      return res.status(400).json({message:"unable to send otp",error})
    }
    await User.create({
      fullname,
      email,
      password,
      otp,
      otpExpire
    });
    return res.status(200).json({ message: "otp send successfully"});
  }catch(error){
    console.log('Something went wrong',error)
  }
});

//otp based verification
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  console.log("user email", email);
  try {
    //validating email and password
    await User.matchPasswordGenToken(email, password);

    //otp generation
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await User.updateOne(
      { email },
      {
        $set: {
          otp,
          otpExpire: new Date(Date.now() + 5 * 60 * 1000),
        },
      }
    );

    await sendMail(email, "Your otp is:", otp);
    res.status(200).json({ message: "OTP send successfully" });
  } catch (error) {
    console.log("signin error", error.message);
    res.status(401).json({ message: error.message });
  }
});

router.post("/verify", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "user not found" });

    if (!user.otp || user.otp !== otp || user.otpExpire < Date.now()) {
      return res.status(404).json({ message: "OTP expired" });
    }

    user.otp = undefined;
    user.otpExpire = undefined;
    await user.save();

    const token = createTokenForUser(user);
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json({ message: `welcome ${user.fullname}`, user, token });
  } catch (error) {
    console.log("Something went wrong");
  }
});

router.post('/forgot-password',async(req,res)=>{
  try{
    const { email } = req.body;
    const user = await User.findOne({email})

    if(!user) return res.status(400).json({message:'User not found'})
    const token = createTokenForUser(user,'10m')

    const resetLink = `http://localhost:5173/reset-pass/${token}`;
    
    await sendMail(
      user.email,
      "Reset your Password",
      `click the link to reset password \n ${resetLink}\n The link will expire within 10 minutes`
    )
    return res.json({message:'password resest mail send to your email',resetLink})
  }catch(error){
    console.log('Unable to send!! request failed',error);
  }
})

router.post('reset-pass',async(req,res)=>{
  try {
    const { token,newPassword } = req.body;

    if(!token || !newPassword) return res.status(400).json({message:'Invalid request'})

    const payload = validateToken(token)

    if(!payload || !payload._id){
      return res.status(400).json({message:'token expired or Invalid'})
    }

    const user = await User.findOne({_id:payload._id})
    if(!user) return res.status(400).json({message:'user not found'})

    user.password = newPassword;
    await user.save();
    return res.status(200).json({message:'password changed successfully'})
  } catch (error) {
    console.log('Something went wrong',error)
  }
})

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ ok: true });
});

module.exports = router;
