const jwt = require('jsonwebtoken')
const secret = 'bat@Man'

function createTokenForUser(user){
    const payload={
        _id:user._id,
        email:user.email,
        role:user.role
    }
    const token = jwt.sign(payload,secret)
    return token;
}

function createTempToken(user,expire){
    const temp_payload = {
        _id:user._id.toString()
    }
    const token = jwt.sign(temp_payload,secret,{expiresIn:expire})
    return token;
}

function validateToken(token){
    const payload = jwt.verify(token,secret)
    return payload
}

module.exports =  {
    createTokenForUser,
    validateToken,
    createTempToken
}