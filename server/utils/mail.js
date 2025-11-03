const  axios  = require("axios")

const sendMail = async(to,subject,otp)=>{
  try {
    const respose = await axios.post("https://api.brevo.com/v3/smtp/email",{
      sender:{
        name:'TIMExZONE',
        email:process.env.EMAIL_ID
      },
      to:[{email:to}],
      subject:subject,
      htmlContent:`<div style="font-family:Arial,sans-serif;">
                        <h2>Your OTP is: ${otp}</h2>
                        <p>This OTP is valid for 5 minutes.</p>
                      </div>`,
    },{
     headers:{
        'Content-Type':'application/json',
        'api-key' : process.env.API_KEY,
        withCredentials : true
      },
  });

    console.log("email sent successfully to",to);
    
  } catch (error) {
    console.log("error while sending emails",error);
    
  }
}

module.exports = { sendMail }