require('dotenv').config();
const nodemailer = require('nodemailer')

async function sendMail(to,subject,text){

    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure:false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
  },
});
await transporter.sendMail({
    from: `TIMExZONE <${process.env.EMAIL_ID}>`,
    to,
    subject,
    text
  })
}

module.exports  = {sendMail}