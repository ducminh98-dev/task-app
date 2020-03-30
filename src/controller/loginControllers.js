const User = require('../models/user')

module.exports = {

    post: async (req,res) => {
       try{
           const user = await User.findByEmailPassword(req.body.email,req.body.password)
           const token = await user.gererateAuthToken()
           res.send({user, token})
       }catch(err){
           res.status(401).send(err)
       }

    }
}