const jwt = require('jsonwebtoken')
const User = require('../models/user')
module.exports = {

    auth: async (req,res,next) => {
    try{
        let token =  req.header('Authorization').replace('Bearer ', '')
        let decode = jwt.verify(token,process.env.SECRET_TOKEN)
        let user = await User.findOne({_id: decode._id, 'tokens.token': token })
        if(!user) throw new Error()
        req.user = user
        req.token = token
        next()
    }catch(e){
        res.status(401).send('Please authncation')
    }

    }
}