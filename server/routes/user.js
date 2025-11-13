const express = require("express");
const User = require("../model/user");
const { sendMail } = require("../utils/mail");
const { createTokenForUser } = require("../services/authentication");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { fullname, email, password } = req.body;

  await User.create({
    fullname,
    email,
    password,
  });
  return res.status(201).json({ message: "user registerd successfully" });
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

    console.log("✉️ Sending OTP to:", email);
    await sendMail(email, "Your otp is:", otp);
    console.log("OTP SEND");
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

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ ok: true });
});

module.exports = router;
