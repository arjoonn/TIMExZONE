const verifier = require('email-verifier')
const axios = require('axios')

async function verifyValidEmail(email){
    const accesskey = process.env.MAILOXLAYER_API;
    const apiURL =  `http://apilayer.net/api/check?access_key=${accesskey}&email=${email}`

    try {
        const res = await axios(apiURL)
        if(res.data.smtp_check == true){
            return true;
        }else{
            return false;
        }
    } catch (error) {
        console.log('validation failed');
    }
}

module.exports = { verifyValidEmail }